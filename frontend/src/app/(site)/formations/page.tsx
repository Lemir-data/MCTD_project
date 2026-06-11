"use client";
import Link from "next/link";
import { useState } from "react";
import { BookOpen, Search, Clock, Users } from "lucide-react";
import { mockModules } from "@/lib/mockData";
import { PageHeader, FilterPillBar, EmptyState } from "@/components/ui/ui";

const categories = ["Tous", "Théologie", "Bible", "Leadership", "Spiritualité"];

export default function FormationsPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Tous");

  const filtered = mockModules.filter((m) => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = cat === "Tous" || m.category === cat;
    return matchSearch && matchCat;
  });

  return (
    <div>
      {/* Header */}
      <PageHeader
        icon={<BookOpen size={40} className="mx-auto mb-4 opacity-80" />}
        title="Nos Formations"
        subtitle={`${mockModules.length} modules de formation théologique et spirituelle — accessibles gratuitement`}
      >
        <div className="relative max-w-lg mx-auto mt-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
          <input
            type="text"
            aria-label="Rechercher un module de formation"
            placeholder="Rechercher un module..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-white w-full pl-12 pr-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
            style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.25)" }}
          />
        </div>
      </PageHeader>

      {/* Filtres */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-200 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-6 py-3">
          <FilterPillBar
            tabs={categories.map((c) => ({ id: c, label: c }))}
            active={cat}
            onChange={setCat}
            layoutId="formations"
            ariaLabel="Filtrer les formations"
          />
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
                <div className="h-44 flex items-center justify-center relative" style={{ backgroundColor: "#1A3C6E" }}>
                  <BookOpen size={40} className="text-white/40" />
                </div>
                <div className="p-4">
                  <span className="badge badge-primary text-xs">{module.category}</span>
                  <h3 className="font-semibold mt-2 mb-1 text-gray-900 group-hover:text-[#1A3C6E] transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">{module.description}</p>
                  <p className="text-xs text-gray-400 mb-3">par {module.instructor}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
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
