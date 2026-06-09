"use client";
import Link from "next/link";
import { useState } from "react";
import { BookOpen, Search, Clock, Users } from "lucide-react";
import { mockModules } from "@/lib/mockData";

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
      <section className="py-20 px-4 text-white" style={{ background: "linear-gradient(135deg, #1A3C6E, #122a4e)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen size={40} className="mx-auto mb-4 opacity-80" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Nos Formations</h1>
          <p className="text-blue-200 text-lg mb-6">
            {mockModules.length} modules de formation théologique et spirituelle — accessibles gratuitement
          </p>
          <div className="relative max-w-lg mx-auto">
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
        </div>
      </section>

      {/* Filtres */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-200 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-6 py-3">
          <div className="flex gap-1 overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={`px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors min-h-[44px] flex items-center ${
                  cat === c ? "text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
                style={cat === c ? { backgroundColor: "#1A3C6E" } : {}}
              >
                {c}
              </button>
            ))}
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
            <div className="text-center py-20 text-gray-400">
              <BookOpen size={40} className="mx-auto mb-3" />
              <p>Aucun module ne correspond à votre recherche.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
