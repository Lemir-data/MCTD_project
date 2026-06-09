"use client";
import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const logs = [
  { id: 1, user: "Marie Adjoua",   role: "Fidèle",          action: "Inscription", detail: "Nouveau fidèle créé", ip: "196.168.1.10", date: "05/06/2024 14:32" },
  { id: 2, user: "Administrateur", role: "Admin",           action: "Création", detail: "Événement «Retraite Juillet» créé", ip: "196.168.1.1", date: "05/06/2024 11:15" },
  { id: 3, user: "Paul Koné",      role: "Admin Contenu",   action: "Don", detail: "Don de 10 000 FCFA via Orange Money", ip: "196.168.1.22", date: "04/06/2024 16:48" },
  { id: 4, user: "Sophie Traoré",  role: "Fidèle",          action: "Connexion", detail: "Connexion réussie", ip: "196.168.1.33", date: "04/06/2024 09:05" },
  { id: 5, user: "Administrateur", role: "Admin",           action: "Suppression", detail: "Photo «Test» supprimée de la galerie", ip: "196.168.1.1", date: "03/06/2024 18:22" },
  { id: 6, user: "Arsène Bah",     role: "Fidèle",          action: "Inscription événement", detail: "Inscrit à «Retraite spirituelle»", ip: "196.168.1.44", date: "03/06/2024 10:11" },
  { id: 7, user: "Administrateur", role: "Admin",           action: "Modification", detail: "Module «Évangile de Marc» mis à jour", ip: "196.168.1.1", date: "02/06/2024 15:30" },
  { id: 8, user: "Système",        role: "Système",         action: "Erreur", detail: "Échec de paiement — transaction #TXN-009", ip: "—", date: "02/06/2024 12:00" },
];

const actionColors: Record<string, { bg: string; color: string }> = {
  Inscription: { bg: "#EFF6FF", color: "#1A3C6E" },
  Création: { bg: "#dcfce7", color: "#16a34a" },
  Don: { bg: "#FEF3C7", color: "#C8941A" },
  Connexion: { bg: "#F3F4F6", color: "#4B5563" },
  Suppression: { bg: "#fee2e2", color: "#dc2626" },
  "Inscription événement": { bg: "#F0FDF4", color: "#15803d" },
  Modification: { bg: "#EDE9FE", color: "#7C3AED" },
  Erreur: { bg: "#fee2e2", color: "#dc2626" },
};

const roleColors: Record<string, { bg: string; color: string }> = {
  "Admin":           { bg: "#FEE2E2", color: "#991B1B" },
  "Admin Contenu":   { bg: "#EFF6FF", color: "#1A3C6E" },
  "Admin Financier": { bg: "#DCFCE7", color: "#166534" },
  "Modérateur":      { bg: "#F3E8FF", color: "#6B21A8" },
  "Fidèle":          { bg: "#F1F5F9", color: "#475569" },
  "Système":         { bg: "#F3F4F6", color: "#4B5563" },
};

const PAGE_SIZE = 7;

export default function AdminLogsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const filtered = logs.filter((l) =>
    l.user.toLowerCase().includes(search.toLowerCase()) ||
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.detail.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedLogs = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const updateSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold" style={{ color: "#1A3C6E" }}>Logs d'activité</h1>
        <p className="text-gray-500 text-sm mt-0.5">Historique complet des actions sur la plateforme</p>
      </div>

      <div className="relative mb-5 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          placeholder="Rechercher dans les logs..."
          value={search}
          onChange={(e) => updateSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]"
        />
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead style={{ backgroundColor: "#F8FAFC" }}>
            <tr>
              {["Nom", "Rôle", "Action", "Détails", "IP", "Date / heure"].map((h) => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedLogs.map((log) => {
              const style = actionColors[log.action] ?? { bg: "#F3F4F6", color: "#4B5563" };
              const roleStyle = roleColors[log.role] ?? { bg: "#F3F4F6", color: "#4B5563" };
              return (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3.5 font-medium text-sm text-gray-900">{log.user}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: roleStyle.bg, color: roleStyle.color }}>
                      {log.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: style.bg, color: style.color }}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-600 max-w-xs truncate">{log.detail}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-400 font-mono">{log.ip}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-500 whitespace-nowrap">{log.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Page {currentPage} sur {totalPages} — {filtered.length} log{filtered.length > 1 ? "s" : ""} au total
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <ChevronLeft size={13} /> Précédent
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              Suivant <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
