"use client";
import Link from "next/link";
import { useState } from "react";
import { CalendarDays, MapPin, Search, Users } from "lucide-react";
import { mockEvents } from "@/lib/mockData";
import { PageHeader, FilterPillBar, EmptyState } from "@/components/ui/ui";

const categories = ["Tous", "Retraite", "Conférence", "Concert", "Formation"];

export default function EvenementsPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Tous");

  const filtered = mockEvents.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = cat === "Tous" || e.category === cat;
    return matchSearch && matchCat;
  });

  return (
    <div>
      {/* Header */}
      <PageHeader
        icon={<CalendarDays size={40} className="mx-auto mb-4 opacity-80" />}
        title="Événements MCTD"
        subtitle="Découvrez et participez aux activités de notre communauté"
      >
        <div className="relative max-w-lg mx-auto mt-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
          <input
            type="text"
            aria-label="Rechercher un événement"
            placeholder="Rechercher un événement..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-white w-full pl-12 pr-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
            style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.25)" }}
          />
        </div>
      </PageHeader>

      {/* Filtres */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-200 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4 py-3">
          <FilterPillBar
            tabs={categories.map((c) => ({ id: c, label: c }))}
            active={cat}
            onChange={setCat}
            layoutId="evenements"
            ariaLabel="Filtrer les événements"
          />
        </div>
      </section>

      {/* Grille événements */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-500 mb-6">{filtered.length} événement(s) trouvé(s)</p>
          {filtered.length === 0 && (
            <EmptyState
              icon={<CalendarDays size={40} />}
              title="Aucun événement trouvé"
              description="Essayez d'autres filtres ou modifiez votre recherche."
            />
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <Link key={event.slug} href={`/evenements/${event.slug}`} className="card hover:shadow-md transition-shadow group">
                <div className="h-48 flex items-center justify-center relative" style={{ backgroundColor: "#122a4e" }}>
                  <CalendarDays size={48} className="text-white/20" />
                  <div className="absolute top-3 left-3">
                    <span className={`badge text-xs ${event.status === "complet" ? "badge-danger" : "badge-success"}`}>
                      {event.status === "complet" ? "Complet" : "Ouvert"}
                    </span>
                  </div>
                  <span className="absolute top-3 right-3 badge badge-primary text-xs">{event.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#1A3C6E] transition-colors mb-2">{event.title}</h3>
                  <div className="space-y-1.5 text-xs text-gray-500 mb-3">
                    <p className="flex items-center gap-1.5"><CalendarDays size={12} /> {event.date} — {event.time}</p>
                    <p className="flex items-center gap-1.5"><MapPin size={12} /> {event.location}</p>
                    <p className="flex items-center gap-1.5"><Users size={12} />
                      {event.status === "complet"
                        ? <span className="text-red-500">Complet</span>
                        : <span style={{ color: "#1A3C6E" }}>{event.placesLeft} places restantes</span>
                      }
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-sm font-semibold" style={{ color: "#C8941A" }}>{event.price}</span>
                    {event.status !== "complet" && (
                      <span className="text-xs font-medium text-white px-3 py-1 rounded-full" style={{ backgroundColor: "#1A3C6E" }}>
                        S'inscrire
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
