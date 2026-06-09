import Link from "next/link";
import { CalendarDays, MapPin, ChevronLeft, Download, QrCode } from "lucide-react";
import { mockEvents } from "@/lib/mockData";

const inscriptions = mockEvents.map((e, i) => ({
  ...e,
  refCode: `MCTD-2024-${String(i + 1).padStart(4, "0")}`,
  statut: i === 0 ? "confirmé" : i === 1 ? "en attente" : "confirmé",
  places: 1,
}));

const statutStyle: Record<string, { bg: string; color: string; label: string }> = {
  confirmé: { bg: "#dcfce7", color: "#16a34a", label: "Confirmé" },
  "en attente": { bg: "#FEF9C3", color: "#a16207", label: "En attente" },
  annulé: { bg: "#fee2e2", color: "#dc2626", label: "Annulé" },
};

export default function MesInscriptionsPage() {
  return (
    <div className="py-10 px-4" style={{ backgroundColor: "#F8FAFC", minHeight: "80vh" }}>
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#1A3C6E] mb-6">
          <ChevronLeft size={16} /> Retour au tableau de bord
        </Link>

        <h1 className="font-heading text-2xl font-bold mb-6" style={{ color: "#1A3C6E" }}>
          Mes inscriptions aux événements
        </h1>

        <div className="space-y-4">
          {inscriptions.map((ins) => {
            const s = statutStyle[ins.statut];
            return (
              <div key={ins.slug} className="card p-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#EFF6FF" }}>
                    <CalendarDays size={22} style={{ color: "#1A3C6E" }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{ins.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: s.bg, color: s.color }}>
                        {s.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><CalendarDays size={11} /> {ins.date}</span>
                      <span className="flex items-center gap-1"><MapPin size={11} /> {ins.location}</span>
                      <span className="font-medium text-gray-700">Réf : {ins.refCode}</span>
                      <span>{ins.places} place(s)</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {ins.statut === "confirmé" && (
                      <>
                        <button className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600">
                          <QrCode size={13} /> QR Code
                        </button>
                        <button className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg text-white"
                          style={{ backgroundColor: "#1A3C6E" }}>
                          <Download size={13} /> Convocation
                        </button>
                      </>
                    )}
                    {ins.statut === "en attente" && (
                      <span className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                        En cours de traitement
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link href="/evenements" className="btn-primary">
            Découvrir d'autres événements
          </Link>
        </div>
      </div>
    </div>
  );
}
