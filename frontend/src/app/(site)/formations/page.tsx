"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { BookOpen, Search, Clock, Users } from "lucide-react";
import { mockModules } from "@/lib/mockData";
import { FilterPillBar, EmptyState } from "@/components/ui/ui";

const categories = ["Tous", "Théologie", "Bible", "Leadership", "Spiritualité"];

// Slugs du sous-menu de navigation → catégories affichées
const catSlugs: Record<string, string> = {
  theologie: "Théologie",
  bible: "Bible",
  leadership: "Leadership",
  spiritualite: "Spiritualité",
};

function FormationsContent() {
  const searchParams = useSearchParams();
  const initialCat = catSlugs[searchParams.get("cat") ?? ""] ?? "Tous";
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState(initialCat);
  const shouldReduce = useReducedMotion();

  const filtered = mockModules.filter((m) => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = cat === "Tous" || m.category === cat;
    return matchSearch && matchCat;
  });

  return (
    <div>
      {/* Header */}
      <section className="relative aspect-video text-white overflow-hidden" style={{ backgroundColor: "#122a4e" }}>
        <div className={`absolute inset-0${shouldReduce ? "" : " kenburns"}`}>
          <Image
            src="/logos/formation.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(18,42,78,0.9) 0%, rgba(18,42,78,0.35) 55%, rgba(18,42,78,0.05) 100%)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-end py-12 md:py-16 px-4">
          <div className="relative w-full max-w-7xl mx-auto text-center mb-2 sm:mb-12 md:mb-28 lg:mb-40">
            <BookOpen size={40} className="mb-4 opacity-80 mx-auto hidden sm:block" />
            <p className="text-blue-200 text-lg max-w-2xl mx-auto hidden sm:block">
              {mockModules.length} modules de formation théologique et spirituelle — accessibles gratuitement
            </p>
          </div>
        </div>
      </section>

      {/* Filtres + Recherche */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-200 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 py-3">
          <FilterPillBar
            tabs={categories.map((c) => ({ id: c, label: c }))}
            active={cat}
            onChange={setCat}
            layoutId="formations"
            ariaLabel="Filtrer les formations"
          />
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              aria-label="Rechercher un module de formation"
              placeholder="Rechercher un module..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20"
            />
          </div>
        </div>
      </section>

      {/* Grille de modules */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-500 mb-6">{filtered.length} module(s) trouvé(s)</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((module) => (
              <Link
                key={module.slug}
                href={`/formations/${module.slug}`}
                className="card hover:shadow-md transition-shadow group"
              >
                <div className="h-36 px-5 flex items-end pb-4 relative" style={{ backgroundColor: "#1A3C6E" }}>
                  <span className="font-heading text-2xl font-semibold text-white/90 leading-tight" aria-hidden="true">
                    {module.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1 text-gray-900 group-hover:text-[#1A3C6E] transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-3">{module.description}</p>
                  <p className="text-xs text-gray-500 mb-3">par {module.instructor}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <span className="flex items-center gap-1"><Clock size={11} /> {module.duration}</span>
                    <span className="flex items-center gap-1"><Users size={11} /> {module.enrolled}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <EmptyState
              icon={<BookOpen size={40} />}
              title="Aucun module ne correspond à votre recherche."
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default function FormationsPage() {
  return (
    <Suspense fallback={null}>
      <FormationsContent />
    </Suspense>
  );
}
