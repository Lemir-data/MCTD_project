"use client";
import { useState } from "react";
import { Search, UserPlus, ChevronLeft, ChevronRight, Mail, Phone, KeyRound, UserCog, Trash2, X, Eye, EyeOff, UserCheck, UserX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const allUsers = [
  { id: 1, name: "Marie Adjoua",   email: "m.adjoua@gmail.com",   phone: "+225 07 11 22 33", role: "Fidèle",          statut: "actif",   date: "05/06/2024" },
  { id: 2, name: "Paul Koné",      email: "p.kone@yahoo.fr",      phone: "+225 05 44 55 66", role: "Admin Contenu",   statut: "actif",   date: "04/06/2024" },
  { id: 3, name: "Sophie Traoré",  email: "s.traore@gmail.com",   phone: "+225 01 77 88 99", role: "Fidèle",          statut: "inactif", date: "03/06/2024" },
  { id: 4, name: "Arsène Bah",     email: "a.bah@gmail.com",      phone: "+225 07 22 33 44", role: "Modérateur",      statut: "actif",   date: "02/06/2024" },
  { id: 5, name: "Adjoua Kouamé",  email: "a.kouame@gmail.com",   phone: "+225 05 55 66 77", role: "Admin Financier", statut: "actif",   date: "01/06/2024" },
  { id: 6, name: "Jean N'Goran",   email: "j.ngoran@gmail.com",   phone: "+225 01 88 99 00", role: "Fidèle",          statut: "actif",   date: "31/05/2024" },
  { id: 7, name: "Kouassi Yao",    email: "k.yao@gmail.com",      phone: "+225 01 22 44 66", role: "Admin",           statut: "actif",   date: "28/05/2024" },
];

type Fidele = typeof allUsers[number];

const roles = ["Fidèle", "Modérateur", "Admin Contenu", "Admin Financier", "Admin"];

const roleBadge: Record<string, string> = {
  "Admin":           "#FEE2E2|#991B1B",
  "Admin Contenu":   "#EFF6FF|#1A3C6E",
  "Admin Financier": "#DCFCE7|#166534",
  "Modérateur":      "#F3E8FF|#6B21A8",
  "Fidèle":          "#F1F5F9|#475569",
};

export default function AdminUtilisateursPage() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("Fidèle");
  const [editUser, setEditUser]     = useState<Fidele | null>(null);
  const [deleteUser, setDeleteUser] = useState<Fidele | null>(null);
  const [showPwd, setShowPwd]       = useState(false);
  const [form, setForm] = useState({ email: "", phone: "", role: "", password: "", statut: "actif" });
  const [selected, setSelected]     = useState<Set<number>>(new Set());
  const [bulkDelete, setBulkDelete] = useState(false);

  const openEdit = (u: Fidele) => {
    setForm({ email: u.email, phone: u.phone, role: u.role, password: "", statut: u.statut });
    setShowPwd(false);
    setEditUser(u);
  };

  const filtered = allUsers.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = role === "Fidèle" || u.role === role;
    return matchSearch && matchRole;
  });

  const allSelected = filtered.length > 0 && filtered.every((u) => selected.has(u.id));

  const toggleSelect = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelected((prev) => {
      if (filtered.every((u) => prev.has(u.id))) return new Set();
      return new Set(filtered.map((u) => u.id));
    });
  };

  const clearSelection = () => setSelected(new Set());

  const assignRoleToSelection = (r: string) => {
    // TODO : appel API pour affecter le rôle "r" aux fidèles sélectionnés
    clearSelection();
  };

  const setStatutForSelection = (statut: "actif" | "inactif") => {
    // TODO : appel API pour activer/désactiver les fidèles sélectionnés
    clearSelection();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold" style={{ color: "#1A3C6E" }}>Fidèles</h1>
          <p className="text-gray-500 text-sm mt-0.5">{allUsers.length} membres inscrits</p>
        </div>
        <button className="btn-primary">
          <UserPlus size={15} /> Ajouter un fidèle
        </button>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Rechercher un fidèle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]"
          />
        </div>
        <div className="flex gap-1">
          {roles.map((r) => (
            <button key={r} onClick={() => setRole(r)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${role === r ? "text-white" : "text-gray-600 hover:bg-gray-100"}`}
              style={role === r ? { backgroundColor: "#1A3C6E" } : {}}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Barre d'actions groupées */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden">
            <div className="flex flex-wrap items-center gap-3 rounded-xl border px-4 py-3"
              style={{ backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }}>
              <span className="text-sm font-semibold" style={{ color: "#1A3C6E" }}>
                {selected.size} sélectionné{selected.size > 1 ? "s" : ""}
              </span>
              <button onClick={clearSelection} className="text-xs font-medium text-gray-500 hover:text-gray-700 underline underline-offset-2">
                Tout désélectionner
              </button>

              <div className="ml-auto flex flex-wrap items-center gap-2">
                <button onClick={() => setStatutForSelection("actif")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 bg-white text-green-700 hover:bg-green-50 transition-colors">
                  <UserCheck size={13} /> Activer
                </button>
                <button onClick={() => setStatutForSelection("inactif")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 bg-white text-gray-500 hover:bg-gray-100 transition-colors">
                  <UserX size={13} /> Désactiver
                </button>
                <span className="w-px h-5 bg-gray-200 mx-1" />
                <span className="text-xs text-gray-500 mr-1">Affecter le rôle :</span>
                {roles.map((r) => (
                  <button key={r} onClick={() => assignRoleToSelection(r)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors">
                    {r}
                  </button>
                ))}
                <span className="w-px h-5 bg-gray-200 mx-1" />
                <button onClick={() => setBulkDelete(true)}
                  title="Supprimer la sélection"
                  className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tableau */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: "#F8FAFC" }}>
              <tr>
                <th className="w-12 pl-5 pr-2 py-3.5">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-[#1A3C6E]"
                  />
                </th>
                {["Fidèle", "Téléphone", "Rôle", "Statut", "Inscrit le", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((u) => (
                <tr key={u.id} onClick={() => openEdit(u)} className="group hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="pl-5 pr-2 py-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selected.has(u.id)}
                      onChange={() => toggleSelect(u.id)}
                      className={`w-4 h-4 rounded border-gray-300 cursor-pointer accent-[#1A3C6E] transition-opacity ${
                        selected.has(u.id) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ backgroundColor: "#1A3C6E" }}>
                        {u.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{u.name}</p>
                        <p className="text-xs text-gray-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{u.phone}</td>
                  <td className="px-5 py-4">
                    {(() => {
                      const [bg, fg] = (roleBadge[u.role] ?? "#F1F5F9|#475569").split("|");
                      return (
                        <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: bg, color: fg }}>
                          {u.role}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${u.statut === "actif" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {u.statut}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">{u.date}</td>
                  <td className="px-5 py-4">
                    <button
                      onClick={(e) => { e.stopPropagation(); setDeleteUser(u); }}
                      title="Supprimer ce fidèle"
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">{filtered.length} résultat(s)</p>
          <div className="flex gap-1">
            <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-400">
              <ChevronLeft size={14} />
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: "#1A3C6E" }}>1</button>
            <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-400">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Modale d'édition ── */}
      <AnimatePresence>
        {editUser && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setEditUser(null)}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}>

              {/* En-tête */}
              <div className="flex items-center gap-3 p-6 border-b border-gray-100">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                  style={{ backgroundColor: "#1A3C6E" }}>
                  {editUser.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{editUser.name}</p>
                  <p className="text-xs text-gray-400">Modifier les informations du fidèle</p>
                </div>
                <button onClick={() => setEditUser(null)} className="ml-auto p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                  <X size={18} />
                </button>
              </div>

              {/* Formulaire */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Téléphone</label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Rôle</label>
                  <div className="relative">
                    <UserCog size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <select
                      value={form.role}
                      onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] appearance-none cursor-pointer bg-white">
                      {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Statut du compte</label>
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, statut: f.statut === "actif" ? "inactif" : "actif" }))}
                    className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="flex items-center gap-2 text-sm font-medium" style={{ color: form.statut === "actif" ? "#166534" : "#6B7280" }}>
                      {form.statut === "actif" ? <UserCheck size={15} /> : <UserX size={15} />}
                      {form.statut === "actif" ? "Compte actif" : "Compte inactif"}
                    </span>
                    <span className={`relative w-10 h-5.5 rounded-full transition-colors shrink-0 ${form.statut === "actif" ? "bg-green-500" : "bg-gray-300"}`}
                      style={{ width: 40, height: 22 }}>
                      <span className="absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-all"
                        style={{ width: 18, height: 18, left: form.statut === "actif" ? 20 : 2 }} />
                    </span>
                  </button>
                  <p className="text-xs text-gray-400 mt-1.5">
                    {form.statut === "actif" ? "Le fidèle peut se connecter et utiliser la plateforme." : "Le fidèle ne peut plus se connecter à la plateforme."}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Nouveau mot de passe</label>
                  <div className="relative">
                    <KeyRound size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPwd ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                      placeholder="Laisser vide pour ne pas changer"
                      className="w-full pl-9 pr-11 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                    <button type="button" onClick={() => setShowPwd((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Pied */}
              <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100" style={{ backgroundColor: "#F8FAFC" }}>
                <button onClick={() => setEditUser(null)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                  Annuler
                </button>
                <motion.button
                  onClick={() => setEditUser(null)}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                  style={{ backgroundColor: "#1A3C6E" }}>
                  Enregistrer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modale de confirmation suppression ── */}
      <AnimatePresence>
        {deleteUser && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setDeleteUser(null)}>
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
              <h3 className="font-semibold text-gray-900 mb-1">Supprimer ce fidèle ?</h3>
              <p className="text-sm text-gray-500 mb-6">
                <span className="font-medium text-gray-700">{deleteUser.name}</span> sera définitivement supprimé de la plateforme. Cette action est irréversible.
              </p>
              <div className="flex gap-2">
                <button onClick={() => setDeleteUser(null)}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <motion.button
                  onClick={() => setDeleteUser(null)}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors">
                  Supprimer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modale de confirmation suppression groupée ── */}
      <AnimatePresence>
        {bulkDelete && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setBulkDelete(false)}>
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
              <h3 className="font-semibold text-gray-900 mb-1">Supprimer {selected.size} fidèle{selected.size > 1 ? "s" : ""} ?</h3>
              <p className="text-sm text-gray-500 mb-6">
                <span className="font-medium text-gray-700">{selected.size} fidèle{selected.size > 1 ? "s" : ""}</span> seront définitivement supprimé{selected.size > 1 ? "s" : ""} de la plateforme. Cette action est irréversible.
              </p>
              <div className="flex gap-2">
                <button onClick={() => setBulkDelete(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <motion.button
                  onClick={() => { setBulkDelete(false); clearSelection(); }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors">
                  Supprimer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
