"use client";
import { useState } from "react";
import { Image as ImageIcon, Video } from "lucide-react";

const tabs = ["Tous", "Photos", "Vidéos", "Albums"];

const mockMedia = [
  { id: 1, type: "photo", title: "Messe de Pâques 2025", date: "20 Avril 2025", category: "Liturgie" },
  { id: 2, type: "photo", title: "Retraite des Jeunes", date: "15 Mars 2025", category: "Jeunesse" },
  { id: 3, type: "video", title: "Homélie du Dimanche", date: "12 Mai 2025", category: "Enseignement" },
  { id: 4, type: "photo", title: "Concert de Louange", date: "3 Mai 2025", category: "Musique" },
  { id: 5, type: "photo", title: "Baptêmes de Pentecôte", date: "8 Juin 2025", category: "Sacrements" },
  { id: 6, type: "video", title: "Formation Catéchistes", date: "25 Avril 2025", category: "Formation" },
  { id: 7, type: "photo", title: "Journée de Solidarité", date: "1 Mai 2025", category: "Social" },
  { id: 8, type: "photo", title: "Confirmation 2025", date: "18 Mai 2025", category: "Sacrements" },
  { id: 9, type: "video", title: "Témoignage — Jean-Baptiste", date: "10 Mai 2025", category: "Témoignage" },
  { id: 10, type: "photo", title: "Journée Famille 2025", date: "22 Juin 2025", category: "Famille" },
  { id: 11, type: "photo", title: "Veillée de Prière", date: "5 Juillet 2025", category: "Liturgie" },
  { id: 12, type: "video", title: "Enseignement — Vie Spirituelle", date: "14 Juin 2025", category: "Formation" },
];

const PAGE_SIZE = 9;

export default function GaleriePage() {
  const [activeTab, setActiveTab] = useState("Tous");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = mockMedia.filter((m) => {
    if (activeTab === "Tous") return true;
    if (activeTab === "Photos") return m.type === "photo";
    if (activeTab === "Vidéos") return m.type === "video";
    return true;
  });

  const displayed = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setVisible(PAGE_SIZE);
  };

  return (
    <div>
      {/* Header */}
      <section className="py-20 px-4 text-white" style={{ background: "linear-gradient(135deg, #1A3C6E, #122a4e)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#C8941A" }}>Médiathèque</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-4">Galerie MCTD</h1>
          <p className="text-blue-200 text-lg">Revivez les moments forts de notre communauté en photos et vidéos</p>
        </div>
      </section>

      {/* Filtres */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-200 px-4" role="tablist" aria-label="Filtrer la galerie">
        <div className="max-w-7xl mx-auto flex gap-1 py-3 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => handleTabChange(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors min-h-[44px] flex items-center ${
                activeTab === tab
                  ? "text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              style={activeTab === tab ? { backgroundColor: "#1A3C6E" } : {}}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Grille */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayed.map((item) => (
            <div
              key={item.id}
              className="card cursor-pointer hover:shadow-md transition-shadow group overflow-hidden"
              role="article"
              aria-label={item.title}
            >
              <div
                className="aspect-square flex items-center justify-center relative"
                style={{ backgroundColor: item.type === "video" ? "#122a4e" : "#1A3C6E" }}
              >
                {item.type === "video" ? (
                  <Video size={32} className="text-white/50" aria-hidden="true" />
                ) : (
                  <ImageIcon size={32} className="text-white/50" aria-hidden="true" />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 font-medium text-sm transition-opacity">
                    Voir
                  </span>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-gray-900 truncate">{item.title}</p>
                <p className="text-xs text-gray-400">{item.date}</p>
                <span className="badge badge-primary text-xs mt-1">{item.category}</span>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-10">
            <button
              type="button"
              className="btn-outline"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
            >
              Charger {Math.min(PAGE_SIZE, filtered.length - visible)} élément(s) de plus
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
