import Link from "next/link";
import { mockEvents } from "@/lib/mockData";
import { CalendarDays, MapPin, Users, ChevronLeft, Clock, Share2 } from "lucide-react";

export default async function EvenementDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = mockEvents.find((e) => e.slug === slug) ?? mockEvents[0];

  return (
    <div>
      {/* Bannière */}
      <section className="relative h-64 md:h-80 flex items-end" style={{ backgroundColor: "#122a4e" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <CalendarDays size={80} className="text-white/10" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-6 w-full">
          <Link href="/evenements" className="flex items-center gap-1 text-blue-300 text-sm mb-4 hover:text-white">
            <ChevronLeft size={16} /> Tous les événements
          </Link>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="badge badge-primary">{event.category}</span>
              <span className={`badge ${event.status === "complet" ? "badge-danger" : "badge-success"}`}>
                {event.status === "complet" ? "Complet" : "Inscriptions ouvertes"}
              </span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1A3C6E" }}>{event.title}</h1>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: CalendarDays, label: "Date & Heure", value: `${event.date}\n${event.time}` },
                { icon: MapPin, label: "Lieu", value: event.location },
                { icon: Users, label: "Places", value: event.status === "complet" ? "Complet" : `${event.placesLeft} restantes` },
              ].map((item) => (
                <div key={item.label} className="card p-4 flex items-start gap-3">
                  <item.icon size={18} style={{ color: "#C8941A" }} className="mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase">{item.label}</p>
                    {item.value.split("\n").map((l, i) => <p key={i} className="text-sm font-semibold text-gray-900">{l}</p>)}
                  </div>
                </div>
              ))}
            </div>

            <h2 className="font-heading text-xl font-bold mb-3" style={{ color: "#1A3C6E" }}>Description</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{event.description}</p>

            {event.programme.length > 0 && (
              <>
                <h2 className="font-heading text-xl font-bold mb-3" style={{ color: "#1A3C6E" }}>Programme</h2>
                <div className="space-y-3">
                  {event.programme.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-3 rounded-lg" style={{ backgroundColor: "#F8FAFC" }}>
                      <span className="text-xs font-bold w-12 shrink-0" style={{ color: "#C8941A" }}>{item.time}</span>
                      <span className="text-sm text-gray-700">{item.activity}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="flex gap-3 mt-8">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium text-gray-600 hover:bg-gray-50">
                <Share2 size={16} /> Partager
              </button>
            </div>
          </div>

          {/* Sidebar inscription */}
          <div>
            <div className="card p-6 sticky top-24">
              <div className="text-center mb-4">
                <p className="text-2xl font-bold" style={{ color: event.status === "complet" ? "#EF4444" : "#1A3C6E" }}>
                  {event.status === "complet" ? "Complet" : event.price}
                </p>
                {event.status !== "complet" && (
                  <p className="text-sm text-gray-500 mt-1">{event.placesLeft} places disponibles</p>
                )}
              </div>

              {event.status !== "complet" ? (
                <Link href={`/evenements/${event.slug}/inscription`} className="btn-primary w-full justify-center mb-3">
                  S'inscrire maintenant
                </Link>
              ) : (
                <button className="btn-outline w-full justify-center mb-3" disabled>
                  Liste d'attente
                </button>
              )}

              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-500">
                <p className="flex items-center gap-2"><Clock size={12} /> Confirmation par email immédiate</p>
                <p className="flex items-center gap-2"><Users size={12} /> QR Code d'accès généré</p>
                <p className="flex items-center gap-2"><CalendarDays size={12} /> Rappel 24h avant l'événement</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
