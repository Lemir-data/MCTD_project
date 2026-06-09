"use client";
import { useState } from "react";
import { Upload, Trash2, Eye, Search, Plus } from "lucide-react";

const mediaItems = [
  { id: 1, title: "Messe de Pâques 2024", type: "photo", date: "31/03/2024", visible: true },
  { id: 2, title: "Retraite spirituelle Mars", type: "photo", date: "15/03/2024", visible: true },
  { id: 3, title: "Concert de louange", type: "video", date: "10/03/2024", visible: false },
  { id: 4, title: "Baptêmes 2024", type: "photo", date: "25/02/2024", visible: true },
  { id: 5, title: "Témoignage — Marie A.", type: "video", date: "14/02/2024", visible: true },
  { id: 6, title: "Album Noël 2023", type: "album", date: "25/12/2023", visible: true },
];

const filters = ["Tous", "Photos", "Vidéos", "Albums"];

export default function AdminGaleriePage() {
  const [filter, setFilter] = useState("Tous");
  const [search, setSearch] = useState("");

  const filtered = mediaItems.filter((m) => {
    const matchFilter = filter === "Tous" ||
      (filter === "Photos" && m.type === "photo") ||
      (filter === "Vidéos" && m.type === "video") ||
      (filter === "Albums" && m.type === "album");
    return matchFilter && m.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold" style={{ color: "#1A3C6E" }}>Galerie</h1>
          <p className="text-gray-500 text-sm mt-0.5">{mediaItems.length} médias</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Upload size={15} /> Importer
          </button>
          <button className="btn-primary">
            <Plus size={15} /> Créer un album
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]"
          />
        </div>
        <div className="flex gap-1">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f ? "text-white" : "text-gray-600 hover:bg-gray-100"}`}
              style={filter === f ? { backgroundColor: "#1A3C6E" } : {}}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m) => (
          <div key={m.id} className="card overflow-hidden group">
            <div className="h-44 flex items-center justify-center relative" style={{ backgroundColor: "#122a4e" }}>
              <div className="text-white/30 text-6xl font-bold">{m.type === "video" ? "▶" : m.type === "album" ? "⊞" : "◻"}</div>
              {!m.visible && (
                <div className="absolute top-2 right-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-500 text-white">Masqué</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button className="p-2.5 rounded-lg bg-white/20 hover:bg-white/30 text-white"><Eye size={16} /></button>
                <button className="p-2.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white"><Trash2 size={16} /></button>
              </div>
            </div>
            <div className="p-4">
              <p className="font-medium text-sm text-gray-900 mb-1">{m.title}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 capitalize">{m.type}</span>
                  <span className="text-xs text-gray-400">{m.date}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={m.visible} className="sr-only peer" />
                  <div className="w-9 h-5 rounded-full peer peer-checked:bg-[#1A3C6E] bg-gray-200 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
