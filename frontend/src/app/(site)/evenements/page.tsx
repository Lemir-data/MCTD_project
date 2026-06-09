"use client";
import Link from "next/link";
import { useState } from "react";
import { CalendarDays, MapPin, Search, Users } from "lucide-react";
import { mockEvents } from "@/lib/mockData";

const categories = ["Tous", "Retraite", "Conférence", "Concert", "Formation"];
const statuts = ["Tous", "Ouvert", "Complet"];

export default function EvenementsPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Tous");
  const [statut, setStatut] = useState("Tous");

  const filtered = mockEvents.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = cat === "Tous" || e.category === cat;
    const matchStatut = statut === "Tous" || (statut === "Complet" ? e.status === "complet" : e.status !== "complet");
    return matchSearch && matchCat && matchStatut;
  });

  return (
    <div>
      {/* Header */}
      <section className="py-20 px-4 text-white" style={{ background: "linear-gradient(135deg, #1A3C6E, #122a4e)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <CalendarDays size={40} className="mx-auto mb-4 opacity-80" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Événements MCTD</h1>
          <p className="text-blue-200 text-lg mb-6">Découvrez et participez aux activités de notre communauté</p>
          <div className="relative max-w-lg mx-auto">
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
        </div>
      </section>

      {/* Filtres */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-200 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4 py-3">
          <div className="flex gap-1 overflow-x-auto">
            {categories.map((c) => (
              <button key={c} type="button" onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={`px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors min-h-[44px] flex items-center ${cat === c ? "text-white" : "text-gray-600 hover:bg-gray-100"}`}
                style={cat === c ? { backgroundColor: "#1A3C6E" } : {}}>
                {c}
              </button>
            ))}
          </div>
          <select
            value={statut}
            onChange={(e) => setStatut(e.target.value)}
            aria-label="Filtrer par statut"
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20 text-gray-600"
          >
            {statuts.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </section>

      {/* Grille événements */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-500 mb-6">{filtered.length} événement(s) trouvé(s)</p>
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
