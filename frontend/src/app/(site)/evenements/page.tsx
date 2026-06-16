"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { CalendarDays, MapPin, Search } from "lucide-react";
import { mockEvents } from "@/lib/mockData";
import { FilterPillBar, EmptyState } from "@/components/ui/ui";
import { StaggerContainer, StaggerItem, HoverCard } from "@/components/ui/animations";

const categories = ["Tous", "Retraite", "Conférence", "Concert", "Formation"];

export default function EvenementsPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Tous");
  const shouldReduce = useReducedMotion();

  const filtered = mockEvents.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = cat === "Tous" || e.category === cat;
    return matchSearch && matchCat;
  });

  return (
    <div>
      {/* Header */}
      <section className="relative aspect-video text-white overflow-hidden" style={{ backgroundColor: "#122a4e" }}>
        <div className={`absolute inset-0${shouldReduce ? "" : " kenburns"}`}>
          <Image
            src="/logos/evenement.png"
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
            <CalendarDays size={40} className="mb-4 opacity-80 mx-auto hidden sm:block" />
            <p className="text-blue-200 text-lg max-w-2xl mx-auto hidden sm:block">
              Découvrez et participez aux activités de notre communauté
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
            layoutId="evenements"
            ariaLabel="Filtrer les événements"
          />
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              aria-label="Rechercher un événement"
              placeholder="Rechercher un événement..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20"
            />
          </div>
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
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <StaggerItem key={event.slug}>
                <HoverCard className="h-full">
                  <Link href={`/evenements/${event.slug}`} className="card block h-full group">
                    <div className="p-4 flex items-start gap-4">
                      <div className="shrink-0 w-16 rounded-lg overflow-hidden text-center" style={{ backgroundColor: "#1A3C6E" }}>
                        <p className="font-heading text-2xl font-bold text-white pt-2 leading-none">{event.date.split(" ")[0]}</p>
                        <p className="text-[11px] uppercase font-semibold text-blue-200 pb-2 pt-1">{event.date.split(" ")[1]}</p>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <span className={`badge text-xs ${event.status === "complet" ? "badge-danger" : "badge-success"}`}>
                            {event.status === "complet" ? "Complet" : "Inscriptions ouvertes"}
                          </span>
                          <span className="badge badge-primary text-xs">{event.category}</span>
                        </div>
                        <h3 className="font-semibold mb-1 text-gray-900 group-hover:text-[#1A3C6E] transition-colors">{event.title}</h3>
                        <div className="space-y-1 text-xs text-gray-600">
                          <p className="flex items-center gap-1"><CalendarDays size={12} /> {event.date} — {event.time}</p>
                          <p className="flex items-center gap-1"><MapPin size={12} /> {event.location}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mx-4 mb-4 pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                      <span className="font-semibold" style={{ color: "#C8941A" }}>{event.price}</span>
                      {event.status === "complet" ? (
                        <span className="text-red-500 font-medium">Complet</span>
                      ) : (
                        <span style={{ color: "#1A3C6E" }} className="font-medium">{event.placesLeft} places restantes</span>
                      )}
                    </div>
                  </Link>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
