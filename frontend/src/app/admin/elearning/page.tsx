"use client";
import { useState, useRef } from "react";
import { Plus, Search, BookOpen, FileText, Trash2, X, Globe, Lock, Tag, ChevronDown, Video, Type, HelpCircle, ArrowUp, ArrowDown, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockModules, mockCourses } from "@/lib/mockData";

const tabs = ["Catégories", "Modules", "Cours"];

type Access = "tous" | "inscrits";
type ModuleCourse = { title: string; access: Access };
type ModuleItem = (typeof mockModules)[number] & { actif: boolean; courses: ModuleCourse[] };

const initialModules: ModuleItem[] = mockModules.map((m) => ({
  ...m,
  actif: true,
  courses: m.slug === "fondements-de-la-foi"
    ? mockCourses.map((c) => ({ title: c.title, access: c.isPreview ? "tous" : "inscrits" } as ModuleCourse))
    : [],
}));

const availableRoles = ["Fidèle", "Modérateur", "Admin Contenu", "Admin Financier", "Admin"];

type ElearningCategory = { id: string; name: string; actif: boolean; roles: string[] };
const initialElearningCategories: ElearningCategory[] = [
  { id: "theologie",    name: "Théologie",    actif: true, roles: ["Fidèle"] },
  { id: "leadership",   name: "Leadership",   actif: true, roles: ["Modérateur", "Admin Contenu"] },
  { id: "bible",        name: "Bible",        actif: true, roles: ["Fidèle", "Modérateur"] },
  { id: "spiritualite", name: "Spiritualité", actif: true, roles: ["Fidèle"] },
];

type ContentBlockType = "pdf" | "video" | "texte" | "quiz";
type ContentBlock = { id: string; type: ContentBlockType; label: string };
type CourseItem = (typeof mockCourses)[number] & { content: ContentBlock[] };

const initialCourses: CourseItem[] = mockCourses.map((c) => ({ ...c, content: [] }));

const blockIcon: Record<ContentBlockType, any> = { pdf: FileText, video: Video, texte: Type, quiz: HelpCircle };
const blockColor: Record<ContentBlockType, string> = { pdf: "#991B1B", video: "#1A3C6E", texte: "#C8941A", quiz: "#7C3AED" };

function CourseContentEditor({ content, onChange }: { content: ContentBlock[]; onChange: (next: ContentBlock[]) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addBlock = (type: ContentBlockType, label: string) =>
    onChange([...content, { id: `blk-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`, type, label }]);

  const updateLabel = (id: string, label: string) =>
    onChange(content.map((b) => (b.id === id ? { ...b, label } : b)));

  const removeBlock = (id: string) => onChange(content.filter((b) => b.id !== id));

  const moveBlock = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= content.length) return;
    const next = [...content];
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    addBlock(file.type.startsWith("video/") ? "video" : "pdf", file.name);
    e.target.value = "";
  };

  return (
    <div>
      <div className="space-y-1.5 mb-3 max-h-52 overflow-y-auto pr-0.5">
        {content.map((b, i) => {
          const Icon = blockIcon[b.type];
          return (
            <div key={b.id} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-gray-100">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${blockColor[b.type]}15` }}>
                <Icon size={14} style={{ color: blockColor[b.type] }} />
              </div>
              <input
                value={b.label}
                onChange={(e) => updateLabel(b.id, e.target.value)}
                className="flex-1 min-w-0 px-2 py-1 text-sm text-gray-700 border border-transparent rounded hover:border-gray-200 focus:border-[#1A3C6E] focus:outline-none bg-transparent"
              />
              <div className="flex items-center gap-0.5 shrink-0">
                <button type="button" onClick={() => moveBlock(i, -1)} disabled={i === 0}
                  className="p-1 rounded text-gray-300 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors">
                  <ArrowUp size={13} />
                </button>
                <button type="button" onClick={() => moveBlock(i, 1)} disabled={i === content.length - 1}
                  className="p-1 rounded text-gray-300 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors">
                  <ArrowDown size={13} />
                </button>
                <button type="button" onClick={() => removeBlock(b.id)}
                  className="p-1 rounded text-gray-300 hover:text-red-600 hover:bg-red-50 transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          );
        })}
        {content.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">Aucun contenu pour l'instant</p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <input ref={fileInputRef} type="file" accept=".pdf,video/*" className="hidden" onChange={handleFileChange} />
        <button type="button" onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
          <Upload size={13} /> Importer un fichier
        </button>
        <button type="button" onClick={() => addBlock("texte", "Nouveau bloc de texte")}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
          <Type size={13} /> Ajouter du texte
        </button>
        <button type="button" onClick={() => addBlock("quiz", "Nouveau quiz")}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
          <HelpCircle size={13} /> Ajouter un quiz
        </button>
      </div>
    </div>
  );
}

function ToggleSwitch({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative rounded-full transition-colors shrink-0 ${on ? "bg-green-500" : "bg-gray-300"}`}
      style={{ width: 40, height: 22 }}>
      <span
        className="absolute top-0.5 bg-white rounded-full shadow transition-all"
        style={{ width: 18, height: 18, left: on ? 20 : 2 }}
      />
    </button>
  );
}

export default function AdminElearningPage() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [modules, setModules] = useState<ModuleItem[]>(initialModules);
  const [editModule, setEditModule] = useState<ModuleItem | null>(null);
  const [form, setForm] = useState<{ title: string; category: string; courses: ModuleCourse[] }>({ title: "", category: "", courses: [] });
  const [courseMenuOpen, setCourseMenuOpen] = useState(false);
  const [coursesToAdd, setCoursesToAdd] = useState<Set<string>>(new Set());
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<{ title: string; category: string; courses: ModuleCourse[] }>({ title: "", category: "", courses: [] });
  const [courseMenuOpenCreate, setCourseMenuOpenCreate] = useState(false);
  const [coursesToAddCreate, setCoursesToAddCreate] = useState<Set<string>>(new Set());

  const [categories, setCategories] = useState<ElearningCategory[]>(initialElearningCategories);
  const [editCategory, setEditCategory] = useState<ElearningCategory | null>(null);
  const [categoryForm, setCategoryForm] = useState<{ name: string; roles: string[] }>({ name: "", roles: [] });
  const [createCategoryOpen, setCreateCategoryOpen] = useState(false);
  const [createCategoryForm, setCreateCategoryForm] = useState<{ name: string; roles: string[] }>({ name: "", roles: [] });

  const [courses, setCourses] = useState<CourseItem[]>(initialCourses);
  const [editCourse, setEditCourse] = useState<CourseItem | null>(null);
  const [courseForm, setCourseForm] = useState<{ title: string; duration: string; modules: Set<string>; content: ContentBlock[] }>({ title: "", duration: "", modules: new Set(), content: [] });
  const [deleteCourse, setDeleteCourse] = useState<CourseItem | null>(null);
  const [createCourseOpen, setCreateCourseOpen] = useState(false);
  const [createCourseForm, setCreateCourseForm] = useState<{ title: string; duration: string; modules: Set<string>; content: ContentBlock[] }>({ title: "", duration: "", modules: new Set(), content: [] });

  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedModules, setSelectedModules] = useState<Set<string>>(new Set());
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState<null | "categories" | "modules" | "courses">(null);

  const toggleSet = (set: Set<string>, setSet: (s: Set<string>) => void, key: string) => {
    const next = new Set(set);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setSet(next);
  };
  const toggleSelectCategory = (id: string) => toggleSet(selectedCategories, setSelectedCategories, id);
  const toggleSelectModule   = (slug: string) => toggleSet(selectedModules, setSelectedModules, slug);
  const toggleSelectCourse   = (id: string) => toggleSet(selectedCourses, setSelectedCourses, id);

  const confirmBulkDelete = () => {
    if (bulkDeleteOpen === "categories") {
      const names = categories.filter((c) => selectedCategories.has(c.id)).map((c) => c.name);
      setCategories((cs) => cs.filter((c) => !selectedCategories.has(c.id)));
      setModules((ms) => ms.map((m) => (names.includes(m.category) ? { ...m, category: "" } : m)));
      setSelectedCategories(new Set());
    } else if (bulkDeleteOpen === "modules") {
      setModules((ms) => ms.filter((m) => !selectedModules.has(m.slug)));
      setSelectedModules(new Set());
    } else if (bulkDeleteOpen === "courses") {
      const titles = courses.filter((c) => selectedCourses.has(c.id)).map((c) => c.title);
      setCourses((cs) => cs.filter((c) => !selectedCourses.has(c.id)));
      setModules((ms) => ms.map((m) => {
        const nextCourses = m.courses.filter((mc) => !titles.includes(mc.title));
        return nextCourses.length === m.courses.length ? m : { ...m, courses: nextCourses, lessons: nextCourses.length };
      }));
      setSelectedCourses(new Set());
    }
    setBulkDeleteOpen(null);
  };

  const filteredModules = modules.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()));
  const filteredCourses = courses.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));
  const filteredCategories = categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const toggleModuleActif = (slug: string) =>
    setModules((ms) => ms.map((m) => (m.slug === slug ? { ...m, actif: !m.actif } : m)));

  const openModule = (m: ModuleItem) => {
    setForm({ title: m.title, category: m.category, courses: m.courses.map((c) => ({ ...c })) });
    setCourseMenuOpen(false);
    setCoursesToAdd(new Set());
    setEditModule(m);
  };

  const toggleCourseToAdd = (title: string) =>
    setCoursesToAdd((s) => {
      const next = new Set(s);
      if (next.has(title)) next.delete(title); else next.add(title);
      return next;
    });

  const confirmAddCourses = () => {
    if (coursesToAdd.size === 0) return;
    setForm((f) => ({
      ...f,
      courses: [...f.courses, ...Array.from(coursesToAdd).map((title) => ({ title, access: "inscrits" as Access }))],
    }));
    setCoursesToAdd(new Set());
    setCourseMenuOpen(false);
  };

  const removeCourseFromForm = (idx: number) =>
    setForm((f) => ({ ...f, courses: f.courses.filter((_, i) => i !== idx) }));

  const toggleCourseAccess = (idx: number) =>
    setForm((f) => ({
      ...f,
      courses: f.courses.map((c, i) => (i === idx ? { ...c, access: c.access === "tous" ? "inscrits" : "tous" } : c)),
    }));

  const saveModule = () => {
    if (!editModule) return;
    setModules((ms) => ms.map((m) =>
      m.slug === editModule.slug
        ? { ...m, title: form.title, category: form.category, courses: form.courses, lessons: form.courses.length }
        : m
    ));
    setEditModule(null);
  };

  const openCreateModule = () => {
    setCreateForm({ title: "", category: categories[0]?.name ?? "", courses: [] });
    setCourseMenuOpenCreate(false);
    setCoursesToAddCreate(new Set());
    setCreateOpen(true);
  };

  const toggleCourseToAddCreate = (title: string) =>
    setCoursesToAddCreate((s) => {
      const next = new Set(s);
      if (next.has(title)) next.delete(title); else next.add(title);
      return next;
    });

  const confirmAddCoursesCreate = () => {
    if (coursesToAddCreate.size === 0) return;
    setCreateForm((f) => ({
      ...f,
      courses: [...f.courses, ...Array.from(coursesToAddCreate).map((title) => ({ title, access: "inscrits" as Access }))],
    }));
    setCoursesToAddCreate(new Set());
    setCourseMenuOpenCreate(false);
  };

  const removeCourseFromCreateForm = (idx: number) =>
    setCreateForm((f) => ({ ...f, courses: f.courses.filter((_, i) => i !== idx) }));

  const toggleCreateCourseAccess = (idx: number) =>
    setCreateForm((f) => ({
      ...f,
      courses: f.courses.map((c, i) => (i === idx ? { ...c, access: c.access === "tous" ? "inscrits" : "tous" } : c)),
    }));

  const createModule = () => {
    const title = createForm.title.trim();
    if (!title) return;
    const slug = `${title.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Date.now().toString(36)}`;
    setModules((ms) => [
      ...ms,
      {
        slug,
        title,
        category: createForm.category,
        description: "",
        instructor: "MCTD",
        duration: "",
        lessons: createForm.courses.length,
        isPremium: false,
        thumbnail: "",
        enrolled: 0,
        actif: true,
        courses: createForm.courses,
      },
    ]);
    setCreateOpen(false);
  };

  const toggleCategoryActif = (id: string) =>
    setCategories((cs) => cs.map((c) => (c.id === id ? { ...c, actif: !c.actif } : c)));

  const openCategory = (c: ElearningCategory) => {
    setCategoryForm({ name: c.name, roles: [...c.roles] });
    setEditCategory(c);
  };

  const toggleCategoryFormRole = (role: string) =>
    setCategoryForm((f) => ({
      ...f,
      roles: f.roles.includes(role) ? f.roles.filter((r) => r !== role) : [...f.roles, role],
    }));

  const saveCategory = () => {
    if (!editCategory) return;
    const name = categoryForm.name.trim();
    if (!name) return;
    setCategories((cs) => cs.map((c) => (c.id === editCategory.id ? { ...c, name, roles: categoryForm.roles } : c)));
    setModules((ms) => ms.map((m) => (m.category === editCategory.name ? { ...m, category: name } : m)));
    setEditCategory(null);
  };

  const openCreateCategory = () => {
    setCreateCategoryForm({ name: "", roles: [] });
    setCreateCategoryOpen(true);
  };

  const toggleCreateCategoryFormRole = (role: string) =>
    setCreateCategoryForm((f) => ({
      ...f,
      roles: f.roles.includes(role) ? f.roles.filter((r) => r !== role) : [...f.roles, role],
    }));

  const createCategory = () => {
    const name = createCategoryForm.name.trim();
    if (!name) return;
    setCategories((cs) => [
      ...cs,
      { id: `cat-${Date.now().toString(36)}`, name, actif: true, roles: createCategoryForm.roles },
    ]);
    setCreateCategoryOpen(false);
  };

  const openCourse = (c: CourseItem) => {
    const assignedSlugs = new Set(modules.filter((m) => m.courses.some((mc) => mc.title === c.title)).map((m) => m.slug));
    setCourseForm({ title: c.title, duration: c.duration, modules: assignedSlugs, content: c.content.map((b) => ({ ...b })) });
    setEditCourse(c);
  };

  const toggleCourseFormModule = (slug: string) =>
    setCourseForm((f) => {
      const next = new Set(f.modules);
      if (next.has(slug)) next.delete(slug); else next.add(slug);
      return { ...f, modules: next };
    });

  const saveCourse = () => {
    if (!editCourse) return;
    const title = courseForm.title.trim();
    if (!title) return;
    const oldTitle = editCourse.title;

    setCourses((cs) => cs.map((c) => (c.id === editCourse.id ? { ...c, title, duration: courseForm.duration.trim(), content: courseForm.content } : c)));

    setModules((ms) => ms.map((m) => {
      const isSelected = courseForm.modules.has(m.slug);
      const hasCourse = m.courses.some((mc) => mc.title === oldTitle);
      let nextCourses = m.courses;
      if (isSelected && !hasCourse) {
        nextCourses = [...m.courses, { title, access: "inscrits" as Access }];
      } else if (!isSelected && hasCourse) {
        nextCourses = m.courses.filter((mc) => mc.title !== oldTitle);
      } else if (isSelected && hasCourse && oldTitle !== title) {
        nextCourses = m.courses.map((mc) => (mc.title === oldTitle ? { ...mc, title } : mc));
      }
      return nextCourses === m.courses ? m : { ...m, courses: nextCourses, lessons: nextCourses.length };
    }));

    setEditCourse(null);
  };

  const confirmDeleteCourse = () => {
    if (!deleteCourse) return;
    const title = deleteCourse.title;
    setCourses((cs) => cs.filter((c) => c.id !== deleteCourse.id));
    setModules((ms) => ms.map((m) => {
      if (!m.courses.some((mc) => mc.title === title)) return m;
      const nextCourses = m.courses.filter((mc) => mc.title !== title);
      return { ...m, courses: nextCourses, lessons: nextCourses.length };
    }));
    setDeleteCourse(null);
  };

  const openCreateCourse = () => {
    setCreateCourseForm({ title: "", duration: "", modules: new Set(), content: [] });
    setCreateCourseOpen(true);
  };

  const toggleCreateCourseFormModule = (slug: string) =>
    setCreateCourseForm((f) => {
      const next = new Set(f.modules);
      if (next.has(slug)) next.delete(slug); else next.add(slug);
      return { ...f, modules: next };
    });

  const createCourse = () => {
    const title = createCourseForm.title.trim();
    if (!title) return;
    const id = `course-${Date.now().toString(36)}`;
    setCourses((cs) => [...cs, { id, title, duration: createCourseForm.duration.trim(), type: "video", completed: false, isPreview: false, content: createCourseForm.content }]);
    setModules((ms) => ms.map((m) =>
      createCourseForm.modules.has(m.slug)
        ? { ...m, courses: [...m.courses, { title, access: "inscrits" as Access }], lessons: m.courses.length + 1 }
        : m
    ));
    setCreateCourseOpen(false);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold" style={{ color: "#1A3C6E" }}>E-Learning</h1>
          <p className="text-gray-500 text-sm mt-0.5">{categories.length} catégories · {modules.length} modules · {courses.length} cours</p>
        </div>
        <button className="btn-primary" onClick={() => { if (tab === 0) openCreateCategory(); else if (tab === 1) openCreateModule(); else openCreateCourse(); }}>
          <Plus size={15} /> {tab === 0 ? "Nouvelle catégorie" : tab === 1 ? "Nouveau module" : "Nouveau cours"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setTab(i)}
            className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === i ? "border-[#1A3C6E] text-[#1A3C6E]" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Recherche */}
      <div className="relative mb-5 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]"
        />
      </div>

      {/* Barre d'actions de sélection multiple */}
      {(() => {
        const sel = tab === 0 ? selectedCategories : tab === 1 ? selectedModules : selectedCourses;
        const clearSel = tab === 0 ? () => setSelectedCategories(new Set()) : tab === 1 ? () => setSelectedModules(new Set()) : () => setSelectedCourses(new Set());
        if (sel.size === 0) return null;
        return (
          <div className="flex items-center justify-between gap-4 mb-4 px-4 py-3 rounded-lg" style={{ backgroundColor: "#EFF6FF" }}>
            <p className="text-sm font-medium" style={{ color: "#1A3C6E" }}>
              {sel.size} élément{sel.size > 1 ? "s" : ""} sélectionné{sel.size > 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-3">
              <button onClick={clearSel} className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Annuler</button>
              <button onClick={() => setBulkDeleteOpen(tab === 0 ? "categories" : tab === 1 ? "modules" : "courses")}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors">
                <Trash2 size={14} /> Supprimer
              </button>
            </div>
          </div>
        );
      })()}

      {/* Catégories */}
      {tab === 0 && (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead style={{ backgroundColor: "#F8FAFC" }}>
              <tr>
                <th className="px-5 py-3.5 w-10">
                  {selectedCategories.size > 0 && (
                    <input type="checkbox"
                      checked={filteredCategories.length > 0 && filteredCategories.every((c) => selectedCategories.has(c.id))}
                      onChange={() => {
                        const allSelected = filteredCategories.every((c) => selectedCategories.has(c.id));
                        setSelectedCategories(allSelected ? new Set() : new Set(filteredCategories.map((c) => c.id)));
                      }}
                      className="rounded border-gray-300 text-[#1A3C6E] focus:ring-0" />
                  )}
                </th>
                {["Catégorie", "Rôles ciblés", "Affectations", "Statut"].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCategories.map((c) => {
                const moduleCount = modules.filter((m) => m.category === c.name).length;
                const checked = selectedCategories.has(c.id);
                return (
                  <tr key={c.id} onClick={() => openCategory(c)} className="group hover:bg-gray-50 cursor-pointer transition-colors">
                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" checked={checked} onChange={() => toggleSelectCategory(c.id)}
                        className={`rounded border-gray-300 text-[#1A3C6E] focus:ring-0 transition-opacity ${checked ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#EFF6FF" }}>
                          <Tag size={16} style={{ color: "#1A3C6E" }} />
                        </div>
                        <p className="font-medium text-sm text-gray-900">{c.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {c.roles.length > 0 ? (
                          c.roles.map((r) => (
                            <span key={r} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{r}</span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-400">Aucun rôle ciblé</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-700">
                      {moduleCount} module{moduleCount > 1 ? "s" : ""}
                    </td>
                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium" style={{ color: c.actif ? "#166534" : "#6B7280" }}>
                          {c.actif ? "Activée" : "Désactivée"}
                        </span>
                        <ToggleSwitch on={c.actif} onClick={() => toggleCategoryActif(c.id)} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredCategories.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-10">Aucune catégorie</p>
          )}
        </div>
      )}

      {/* Modules */}
      {tab === 1 && (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead style={{ backgroundColor: "#F8FAFC" }}>
              <tr>
                <th className="px-5 py-3.5 w-10">
                  {selectedModules.size > 0 && (
                    <input type="checkbox"
                      checked={filteredModules.length > 0 && filteredModules.every((m) => selectedModules.has(m.slug))}
                      onChange={() => {
                        const allSelected = filteredModules.every((m) => selectedModules.has(m.slug));
                        setSelectedModules(allSelected ? new Set() : new Set(filteredModules.map((m) => m.slug)));
                      }}
                      className="rounded border-gray-300 text-[#1A3C6E] focus:ring-0" />
                  )}
                </th>
                {["Module", "Catégorie", "Cours", "Apprenants", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredModules.map((m) => {
                const checked = selectedModules.has(m.slug);
                return (
                <tr key={m.slug} onClick={() => openModule(m)} className="group hover:bg-gray-50 cursor-pointer transition-colors">
                  <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" checked={checked} onChange={() => toggleSelectModule(m.slug)}
                      className={`rounded border-gray-300 text-[#1A3C6E] focus:ring-0 transition-opacity ${checked ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#EFF6FF" }}>
                        <BookOpen size={16} style={{ color: "#1A3C6E" }} />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{m.title}</p>
                        <p className="text-xs text-gray-400">{m.instructor}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {m.category ? (
                      <span className="badge badge-primary text-xs">{m.category}</span>
                    ) : (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500" title="Accessible à tous les fidèles">Aucune catégorie</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700">{m.lessons}</td>
                  <td className="px-5 py-4 text-sm text-gray-700">{m.enrolled}</td>
                  <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium" style={{ color: m.actif ? "#166534" : "#6B7280" }}>
                        {m.actif ? "Activé" : "Désactivé"}
                      </span>
                      <ToggleSwitch on={m.actif} onClick={() => toggleModuleActif(m.slug)} />
                    </div>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Cours */}
      {tab === 2 && (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead style={{ backgroundColor: "#F8FAFC" }}>
              <tr>
                <th className="px-5 py-3.5 w-10">
                  {selectedCourses.size > 0 && (
                    <input type="checkbox"
                      checked={filteredCourses.length > 0 && filteredCourses.every((c) => selectedCourses.has(c.id))}
                      onChange={() => {
                        const allSelected = filteredCourses.every((c) => selectedCourses.has(c.id));
                        setSelectedCourses(allSelected ? new Set() : new Set(filteredCourses.map((c) => c.id)));
                      }}
                      className="rounded border-gray-300 text-[#1A3C6E] focus:ring-0" />
                  )}
                </th>
                {["Cours", "Type", "Durée", "Modules", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCourses.map((c) => {
                const checked = selectedCourses.has(c.id);
                return (
                <tr key={c.id} onClick={() => openCourse(c)} className="group hover:bg-gray-50 cursor-pointer transition-colors">
                  <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" checked={checked} onChange={() => toggleSelectCourse(c.id)}
                      className={`rounded border-gray-300 text-[#1A3C6E] focus:ring-0 transition-opacity ${checked ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                  </td>
                  <td className="px-5 py-4 font-medium text-sm text-gray-900">{c.title}</td>
                  <td className="px-5 py-4">
                    {(() => {
                      const labels: Record<"pdf" | "video" | "texte", string> = { pdf: "PDF", video: "Vidéo", texte: "Texte" };
                      const present = (["pdf", "video", "texte"] as const).filter((t) => c.content.some((b) => b.type === t));
                      if (present.length === 0) return <span className="text-xs text-gray-400">—</span>;
                      return (
                        <div className="flex flex-wrap items-center gap-2.5">
                          {present.map((t) => {
                            const Icon = blockIcon[t];
                            return (
                              <span key={t} className="flex items-center gap-1.5 text-xs text-gray-600">
                                <Icon size={12} style={{ color: blockColor[t] }} /> {labels[t]}
                              </span>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{c.duration}</td>
                  <td className="px-5 py-4">
                    {(() => {
                      const count = modules.filter((m) => m.courses.some((mc) => mc.title === c.title)).length;
                      return (
                        <span className={`text-xs px-2.5 py-1 rounded-full ${count > 0 ? "bg-blue-50 text-[#1A3C6E]" : "bg-gray-100 text-gray-500"}`}>
                          {count} module{count > 1 ? "s" : ""}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setDeleteCourse(c)} title="Supprimer ce cours"
                      className="p-1.5 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-600 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Modale d'édition d'un module ── */}
      <AnimatePresence>
        {editModule && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setEditModule(null)}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}>
              {/* En-tête */}
              <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#EFF6FF" }}>
                    <BookOpen size={16} style={{ color: "#1A3C6E" }} />
                  </div>
                  <h3 className="font-semibold text-gray-900 truncate">Modifier le module</h3>
                </div>
                <button onClick={() => setEditModule(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors shrink-0">
                  <X size={17} />
                </button>
              </div>

              {/* Contenu */}
              <div className="px-6 py-5 space-y-5 overflow-y-auto">
                {/* Nom du module */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Nom du module</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]"
                  />
                </div>

                {/* Catégorie */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Catégorie</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] bg-white">
                    <option value="">Aucune catégorie (accessible à tous les fidèles)</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Cours du module */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">
                    Cours du module ({form.courses.length})
                  </label>
                  <p className="text-xs text-gray-400 mb-3">
                    Définissez, pour chaque cours, s'il est accessible à tous les visiteurs ou réservé aux fidèles inscrits.
                  </p>
                  <div className="space-y-1.5 mb-3 max-h-56 overflow-y-auto pr-0.5">
                    {form.courses.map((c, i) => (
                      <div key={i} className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border border-gray-100">
                        <span className="text-sm text-gray-700 truncate min-w-0">{c.title}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleCourseAccess(i)}
                            title={c.access === "tous" ? "Accessible à tous les visiteurs" : "Réservé aux fidèles inscrits"}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                              c.access === "tous"
                                ? "border-blue-200 bg-blue-50 text-[#1A3C6E]"
                                : "border-gray-200 bg-gray-50 text-gray-500"
                            }`}>
                            {c.access === "tous" ? <Globe size={12} /> : <Lock size={12} />}
                            {c.access === "tous" ? "Tous" : "Inscrits"}
                          </button>
                          <button onClick={() => removeCourseFromForm(i)} title="Retirer ce cours"
                            className="p-1.5 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-600 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {form.courses.length === 0 && (
                      <p className="text-sm text-gray-400 text-center py-4">Aucun cours dans ce module</p>
                    )}
                  </div>
                  <div className="relative">
                    <button type="button" onClick={() => setCourseMenuOpen((o) => !o)}
                      className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                      <span className="flex items-center gap-2">
                        <Plus size={15} />
                        {coursesToAdd.size > 0 ? `${coursesToAdd.size} cours sélectionné${coursesToAdd.size > 1 ? "s" : ""}` : "Ajouter des cours existants"}
                      </span>
                      <ChevronDown size={15} className={`text-gray-400 transition-transform ${courseMenuOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {courseMenuOpen && (() => {
                        const available = mockCourses.filter((c) => !form.courses.some((fc) => fc.title === c.title));
                        return (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.15 }}
                            className="absolute z-10 mt-1.5 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                            <div className="max-h-48 overflow-y-auto divide-y divide-gray-50">
                              {available.map((c) => (
                                <label key={c.id} className="flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                                  <input type="checkbox" checked={coursesToAdd.has(c.title)} onChange={() => toggleCourseToAdd(c.title)}
                                    className="rounded border-gray-300 text-[#1A3C6E] focus:ring-0" />
                                  {c.title}
                                </label>
                              ))}
                              {available.length === 0 && (
                                <p className="text-xs text-gray-400 text-center py-4">Tous les cours disponibles sont déjà dans ce module</p>
                              )}
                            </div>
                            {available.length > 0 && (
                              <div className="p-2 border-t border-gray-100">
                                <motion.button type="button" onClick={confirmAddCourses} whileTap={{ scale: 0.97 }}
                                  disabled={coursesToAdd.size === 0}
                                  className="w-full px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                  style={{ backgroundColor: "#1A3C6E" }}>
                                  Ajouter {coursesToAdd.size > 0 ? `(${coursesToAdd.size})` : "la sélection"}
                                </motion.button>
                              </div>
                            )}
                          </motion.div>
                        );
                      })()}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Pied */}
              <div className="flex gap-2 px-6 py-4 border-t border-gray-100">
                <button onClick={() => setEditModule(null)}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <motion.button
                  onClick={saveModule}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors"
                  style={{ backgroundColor: "#1A3C6E" }}>
                  Enregistrer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modale de création d'un module ── */}
      <AnimatePresence>
        {createOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setCreateOpen(false)}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}>
              {/* En-tête */}
              <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#EFF6FF" }}>
                    <BookOpen size={16} style={{ color: "#1A3C6E" }} />
                  </div>
                  <h3 className="font-semibold text-gray-900 truncate">Nouveau module</h3>
                </div>
                <button onClick={() => setCreateOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors shrink-0">
                  <X size={17} />
                </button>
              </div>

              {/* Contenu */}
              <div className="px-6 py-5 space-y-5 overflow-y-auto">
                {/* Nom du module */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Nom du module</label>
                  <input
                    value={createForm.title}
                    onChange={(e) => setCreateForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="Ex : Vie Spirituelle et Prière"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]"
                  />
                </div>

                {/* Catégorie */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Catégorie</label>
                  <select
                    value={createForm.category}
                    onChange={(e) => setCreateForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] bg-white">
                    <option value="">Aucune catégorie (accessible à tous les fidèles)</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Cours du module */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">
                    Cours du module ({createForm.courses.length})
                  </label>
                  <p className="text-xs text-gray-400 mb-3">
                    Définissez, pour chaque cours, s'il est accessible à tous les visiteurs ou réservé aux fidèles inscrits.
                  </p>
                  <div className="space-y-1.5 mb-3 max-h-56 overflow-y-auto pr-0.5">
                    {createForm.courses.map((c, i) => (
                      <div key={i} className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border border-gray-100">
                        <span className="text-sm text-gray-700 truncate min-w-0">{c.title}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleCreateCourseAccess(i)}
                            title={c.access === "tous" ? "Accessible à tous les visiteurs" : "Réservé aux fidèles inscrits"}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                              c.access === "tous"
                                ? "border-blue-200 bg-blue-50 text-[#1A3C6E]"
                                : "border-gray-200 bg-gray-50 text-gray-500"
                            }`}>
                            {c.access === "tous" ? <Globe size={12} /> : <Lock size={12} />}
                            {c.access === "tous" ? "Tous" : "Inscrits"}
                          </button>
                          <button onClick={() => removeCourseFromCreateForm(i)} title="Retirer ce cours"
                            className="p-1.5 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-600 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {createForm.courses.length === 0 && (
                      <p className="text-sm text-gray-400 text-center py-4">Aucun cours ajouté pour l'instant</p>
                    )}
                  </div>
                  <div className="relative">
                    <button type="button" onClick={() => setCourseMenuOpenCreate((o) => !o)}
                      className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                      <span className="flex items-center gap-2">
                        <Plus size={15} />
                        {coursesToAddCreate.size > 0 ? `${coursesToAddCreate.size} cours sélectionné${coursesToAddCreate.size > 1 ? "s" : ""}` : "Ajouter des cours existants"}
                      </span>
                      <ChevronDown size={15} className={`text-gray-400 transition-transform ${courseMenuOpenCreate ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {courseMenuOpenCreate && (() => {
                        const available = mockCourses.filter((c) => !createForm.courses.some((fc) => fc.title === c.title));
                        return (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.15 }}
                            className="absolute z-10 mt-1.5 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                            <div className="max-h-48 overflow-y-auto divide-y divide-gray-50">
                              {available.map((c) => (
                                <label key={c.id} className="flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                                  <input type="checkbox" checked={coursesToAddCreate.has(c.title)} onChange={() => toggleCourseToAddCreate(c.title)}
                                    className="rounded border-gray-300 text-[#1A3C6E] focus:ring-0" />
                                  {c.title}
                                </label>
                              ))}
                              {available.length === 0 && (
                                <p className="text-xs text-gray-400 text-center py-4">Tous les cours disponibles sont déjà dans ce module</p>
                              )}
                            </div>
                            {available.length > 0 && (
                              <div className="p-2 border-t border-gray-100">
                                <motion.button type="button" onClick={confirmAddCoursesCreate} whileTap={{ scale: 0.97 }}
                                  disabled={coursesToAddCreate.size === 0}
                                  className="w-full px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                  style={{ backgroundColor: "#1A3C6E" }}>
                                  Ajouter {coursesToAddCreate.size > 0 ? `(${coursesToAddCreate.size})` : "la sélection"}
                                </motion.button>
                              </div>
                            )}
                          </motion.div>
                        );
                      })()}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Pied */}
              <div className="flex gap-2 px-6 py-4 border-t border-gray-100">
                <button onClick={() => setCreateOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <motion.button
                  onClick={createModule}
                  whileTap={{ scale: 0.97 }}
                  disabled={!createForm.title.trim()}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#1A3C6E" }}>
                  Créer le module
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modale de modification d'une catégorie ── */}
      <AnimatePresence>
        {editCategory && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setEditCategory(null)}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#EFF6FF" }}>
                    <Tag size={16} style={{ color: "#1A3C6E" }} />
                  </div>
                  <h3 className="font-semibold text-gray-900 truncate">Modifier la catégorie</h3>
                </div>
                <button onClick={() => setEditCategory(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors shrink-0">
                  <X size={17} />
                </button>
              </div>
              <div className="px-6 py-5 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Nom de la catégorie</label>
                  <input
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Adressée aux fidèles ayant le rôle</label>
                  <p className="text-xs text-gray-400 mb-3">Sélectionnez les rôles des fidèles auxquels cette catégorie de contenus est destinée.</p>
                  <div className="flex flex-wrap gap-2">
                    {availableRoles.map((r) => {
                      const active = categoryForm.roles.includes(r);
                      return (
                        <button key={r} type="button" onClick={() => toggleCategoryFormRole(r)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                            active ? "border-blue-200 bg-blue-50 text-[#1A3C6E]" : "border-gray-200 bg-gray-50 text-gray-500"
                          }`}>
                          {r}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 px-6 py-4 border-t border-gray-100">
                <button onClick={() => setEditCategory(null)}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <motion.button
                  onClick={saveCategory}
                  whileTap={{ scale: 0.97 }}
                  disabled={!categoryForm.name.trim()}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#1A3C6E" }}>
                  Enregistrer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modale de création d'une catégorie ── */}
      <AnimatePresence>
        {createCategoryOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setCreateCategoryOpen(false)}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#EFF6FF" }}>
                    <Tag size={16} style={{ color: "#1A3C6E" }} />
                  </div>
                  <h3 className="font-semibold text-gray-900 truncate">Nouvelle catégorie</h3>
                </div>
                <button onClick={() => setCreateCategoryOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors shrink-0">
                  <X size={17} />
                </button>
              </div>
              <div className="px-6 py-5 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Nom de la catégorie</label>
                  <input
                    value={createCategoryForm.name}
                    onChange={(e) => setCreateCategoryForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Ex : Jeunesse"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Adressée aux fidèles ayant le rôle</label>
                  <p className="text-xs text-gray-400 mb-3">Sélectionnez les rôles des fidèles auxquels cette catégorie de contenus est destinée.</p>
                  <div className="flex flex-wrap gap-2">
                    {availableRoles.map((r) => {
                      const active = createCategoryForm.roles.includes(r);
                      return (
                        <button key={r} type="button" onClick={() => toggleCreateCategoryFormRole(r)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                            active ? "border-blue-200 bg-blue-50 text-[#1A3C6E]" : "border-gray-200 bg-gray-50 text-gray-500"
                          }`}>
                          {r}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 px-6 py-4 border-t border-gray-100">
                <button onClick={() => setCreateCategoryOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <motion.button
                  onClick={createCategory}
                  whileTap={{ scale: 0.97 }}
                  disabled={!createCategoryForm.name.trim()}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#1A3C6E" }}>
                  Créer la catégorie
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modale de modification d'un cours ── */}
      <AnimatePresence>
        {editCourse && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setEditCourse(null)}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}>
              {/* En-tête */}
              <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#EFF6FF" }}>
                    <BookOpen size={16} style={{ color: "#1A3C6E" }} />
                  </div>
                  <h3 className="font-semibold text-gray-900 truncate">Modifier le cours</h3>
                </div>
                <button onClick={() => setEditCourse(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors shrink-0">
                  <X size={17} />
                </button>
              </div>

              {/* Contenu */}
              <div className="px-6 py-5 space-y-5 overflow-y-auto">
                {/* Nom du cours */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Nom du cours</label>
                  <input
                    value={courseForm.title}
                    onChange={(e) => setCourseForm((f) => ({ ...f, title: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]"
                  />
                </div>

                {/* Durée */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Durée</label>
                  <input
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm((f) => ({ ...f, duration: e.target.value }))}
                    placeholder="Ex : 12 min, 1h 30min"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]"
                  />
                </div>

                {/* Modules associés */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">
                    Modules associés ({courseForm.modules.size})
                  </label>
                  <p className="text-xs text-gray-400 mb-3">Sélectionnez le ou les modules auxquels ce cours doit être rattaché.</p>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-0.5">
                    {modules.map((m) => (
                      <label key={m.slug} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                        <input type="checkbox" checked={courseForm.modules.has(m.slug)} onChange={() => toggleCourseFormModule(m.slug)}
                          className="rounded border-gray-300 text-[#1A3C6E] focus:ring-0" />
                        {m.title}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Contenu du cours */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Contenu du cours</label>
                  <p className="text-xs text-gray-400 mb-3">Importez des fichiers, organisez les sections, ajoutez du texte ou des quiz.</p>
                  <CourseContentEditor content={courseForm.content} onChange={(next) => setCourseForm((f) => ({ ...f, content: next }))} />
                </div>
              </div>

              {/* Pied */}
              <div className="flex gap-2 px-6 py-4 border-t border-gray-100">
                <button onClick={() => setEditCourse(null)}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <motion.button
                  onClick={saveCourse}
                  whileTap={{ scale: 0.97 }}
                  disabled={!courseForm.title.trim()}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#1A3C6E" }}>
                  Enregistrer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modale de confirmation suppression d'un cours ── */}
      <AnimatePresence>
        {deleteCourse && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setDeleteCourse(null)}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#FEE2E2" }}>
                <Trash2 size={20} style={{ color: "#991B1B" }} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Supprimer ce cours ?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Le cours <span className="font-medium text-gray-700">{deleteCourse.title}</span> sera définitivement supprimé et retiré de tous les modules auxquels il est rattaché. Cette action est irréversible.
              </p>
              <div className="flex gap-2">
                <button onClick={() => setDeleteCourse(null)}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <motion.button
                  onClick={confirmDeleteCourse}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors">
                  Supprimer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modale de création d'un cours ── */}
      <AnimatePresence>
        {createCourseOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setCreateCourseOpen(false)}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}>
              {/* En-tête */}
              <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#EFF6FF" }}>
                    <BookOpen size={16} style={{ color: "#1A3C6E" }} />
                  </div>
                  <h3 className="font-semibold text-gray-900 truncate">Nouveau cours</h3>
                </div>
                <button onClick={() => setCreateCourseOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors shrink-0">
                  <X size={17} />
                </button>
              </div>

              {/* Contenu */}
              <div className="px-6 py-5 space-y-5 overflow-y-auto">
                {/* Nom du cours */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Nom du cours</label>
                  <input
                    value={createCourseForm.title}
                    onChange={(e) => setCreateCourseForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="Ex : Introduction à la prière"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]"
                  />
                </div>

                {/* Durée */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Durée</label>
                  <input
                    value={createCourseForm.duration}
                    onChange={(e) => setCreateCourseForm((f) => ({ ...f, duration: e.target.value }))}
                    placeholder="Ex : 12 min, 1h 30min"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]"
                  />
                </div>

                {/* Modules associés */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">
                    Modules associés ({createCourseForm.modules.size})
                  </label>
                  <p className="text-xs text-gray-400 mb-3">Sélectionnez le ou les modules auxquels ce cours doit être rattaché.</p>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-0.5">
                    {modules.map((m) => (
                      <label key={m.slug} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
                        <input type="checkbox" checked={createCourseForm.modules.has(m.slug)} onChange={() => toggleCreateCourseFormModule(m.slug)}
                          className="rounded border-gray-300 text-[#1A3C6E] focus:ring-0" />
                        {m.title}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Contenu du cours */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Contenu du cours</label>
                  <p className="text-xs text-gray-400 mb-3">Importez des fichiers, organisez les sections, ajoutez du texte ou des quiz.</p>
                  <CourseContentEditor content={createCourseForm.content} onChange={(next) => setCreateCourseForm((f) => ({ ...f, content: next }))} />
                </div>
              </div>

              {/* Pied */}
              <div className="flex gap-2 px-6 py-4 border-t border-gray-100">
                <button onClick={() => setCreateCourseOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <motion.button
                  onClick={createCourse}
                  whileTap={{ scale: 0.97 }}
                  disabled={!createCourseForm.title.trim()}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#1A3C6E" }}>
                  Créer le cours
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modale de confirmation de suppression en masse ── */}
      <AnimatePresence>
        {bulkDeleteOpen && (() => {
          const count = bulkDeleteOpen === "categories" ? selectedCategories.size : bulkDeleteOpen === "modules" ? selectedModules.size : selectedCourses.size;
          const label = bulkDeleteOpen === "categories" ? `catégorie${count > 1 ? "s" : ""}` : bulkDeleteOpen === "modules" ? `module${count > 1 ? "s" : ""}` : `cours`;
          const extra = bulkDeleteOpen === "courses"
            ? " Ils seront également retirés de tous les modules auxquels ils sont rattachés."
            : bulkDeleteOpen === "modules"
            ? " Les cours qu'ils contiennent resteront disponibles dans la partie Cours."
            : " Les modules qui leur sont affectés n'auront plus de catégorie et deviendront accessibles à tous les fidèles, sans restriction de rôle.";
          return (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setBulkDeleteOpen(null)}>
              <motion.div
                className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center"
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#FEE2E2" }}>
                  <Trash2 size={20} style={{ color: "#991B1B" }} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Supprimer {count} {label} ?</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Cette action est irréversible.{extra}
                </p>
                <div className="flex gap-2">
                  <button onClick={() => setBulkDeleteOpen(null)}
                    className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
                    Annuler
                  </button>
                  <motion.button
                    onClick={confirmBulkDelete}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors">
                    Supprimer
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
