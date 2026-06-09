"use client";
import { useState } from "react";
import { Heart, TrendingUp, ArrowUpRight, Download, SlidersHorizontal, RotateCcw, Trophy, ChevronLeft, ChevronRight, X, Mail, Phone, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CamembertAnonymat } from "../components/DonCharts";

const MOIS = [
  { value: "00", label: "Tous les mois" },
  { value: "01", label: "Janvier" }, { value: "02", label: "Février" },
  { value: "03", label: "Mars" },    { value: "04", label: "Avril" },
  { value: "05", label: "Mai" },     { value: "06", label: "Juin" },
  { value: "07", label: "Juillet" }, { value: "08", label: "Août" },
  { value: "09", label: "Septembre" },{ value: "10", label: "Octobre" },
  { value: "11", label: "Novembre" },{ value: "12", label: "Décembre" },
];

const ANNEE_DEBUT = 2026;
const now = new Date();
const ANNEE_COURANTE = now.getFullYear();
const MOIS_COURANT   = String(now.getMonth() + 1).padStart(2, "0");
const ANNEES = Array.from(
  { length: ANNEE_COURANTE - ANNEE_DEBUT + 1 },
  (_, i) => String(ANNEE_DEBUT + i)
);

const selectCls = "text-sm border rounded-lg px-3 py-2 focus:outline-none focus:border-[#1A3C6E] cursor-pointer transition-colors bg-white border-gray-200 text-gray-700";

const dons = [
  { ref: "DON-001", donor: "Marie A.", email: "marie.adjoua@gmail.com", phone: "+225 07 01 02 03 04", amount: "50 000 FCFA", method: "Wave", cause: "Œuvres sociales", date: "05/06/2026", statut: "confirmé" },
  { ref: "DON-002", donor: "Paul K.", email: "p.kone@yahoo.fr", phone: "+225 05 12 34 56 78", amount: "10 000 FCFA", method: "Orange Money", cause: "Construction", date: "04/06/2026", statut: "confirmé" },
  { ref: "DON-003", donor: "Anonyme", email: null, phone: null, amount: "5 000 FCFA", method: "MTN MoMo", cause: "Général", date: "03/06/2026", statut: "en attente" },
  { ref: "DON-004", donor: "Sophie T.", email: "s.traore@gmail.com", phone: "+225 01 23 45 67 89", amount: "25 000 FCFA", method: "Carte bancaire", cause: "E-Learning", date: "02/06/2026", statut: "confirmé" },
  { ref: "DON-005", donor: "Arsène B.", email: "a.bah@gmail.com", phone: "+225 07 98 76 54 32", amount: "15 000 FCFA", method: "Wave", cause: "Événements", date: "01/06/2026", statut: "confirmé" },
  { ref: "DON-006", donor: "Jean Y.", email: "j.yao@gmail.com", phone: "+225 05 11 22 33 44", amount: "30 000 FCFA", method: "Wave", cause: "Construction", date: "28/05/2026", statut: "confirmé" },
  { ref: "DON-007", donor: "Anonyme", email: null, phone: null, amount: "8 000 FCFA", method: "Orange Money", cause: "Général", date: "22/05/2026", statut: "confirmé" },
  { ref: "DON-008", donor: "Claire D.", email: "c.diallo@gmail.com", phone: "+225 01 55 66 77 88", amount: "20 000 FCFA", method: "MTN MoMo", cause: "Missions", date: "15/05/2026", statut: "confirmé" },
  { ref: "DON-009", donor: "Marie A.", email: "marie.adjoua@gmail.com", phone: "+225 07 01 02 03 04", amount: "12 000 FCFA", method: "Wave", cause: "Œuvres sociales", date: "30/04/2026", statut: "confirmé" },
  { ref: "DON-010", donor: "Paul K.", email: "p.kone@yahoo.fr", phone: "+225 05 12 34 56 78", amount: "18 000 FCFA", method: "Carte bancaire", cause: "E-Learning", date: "18/04/2026", statut: "en attente" },
];

type Don = (typeof dons)[number];

const fmt = (n: number) => n.toLocaleString("fr-FR");
const parseAmount = (s: string) => parseInt(s.replace(/\D/g, ""), 10);
const medalColors = ["#C8941A", "#94A3B8", "#B45309"];

export default function AdminDonsPage() {
  const [filterMois, setFilterMois] = useState(MOIS_COURANT);
  const [filterAnnee, setFilterAnnee] = useState(String(ANNEE_COURANTE));
  const [page, setPage] = useState(1);
  const [selectedDon, setSelectedDon] = useState<Don | null>(null);

  const defaultMois  = MOIS_COURANT;
  const defaultAnnee = String(ANNEE_COURANTE);
  const activeCount = [
    filterMois  !== defaultMois,
    filterAnnee !== defaultAnnee,
  ].filter(Boolean).length;

  const reset = () => { setFilterMois(defaultMois); setFilterAnnee(defaultAnnee); };

  // ── Filtrage des dons selon la période sélectionnée ──
  const isAllMonths = filterMois === "00";
  const inPeriod = (mois: string, annee: string) =>
    dons.filter(d => {
      const [, m, y] = d.date.split("/");
      return y === annee && (mois === "00" || m === mois);
    });

  const filteredDons = inPeriod(filterMois, filterAnnee);
  const prevMois = String(Number(filterMois) - 1).padStart(2, "0");
  const prevDons = (!isAllMonths && Number(filterMois) > 1) ? inPeriod(prevMois, filterAnnee) : [];

  const totalAmount  = filteredDons.reduce((s, d) => s + parseAmount(d.amount), 0);
  const donCount     = filteredDons.length;
  const avgDon       = donCount > 0 ? Math.round(totalAmount / donCount) : 0;
  const uniqueDonors = new Set(filteredDons.map(d => d.donor)).size;

  const prevTotal      = prevDons.reduce((s, d) => s + parseAmount(d.amount), 0);
  const prevCount      = prevDons.length;
  const prevAvg        = prevCount > 0 ? Math.round(prevTotal / prevCount) : 0;
  const prevDonors     = new Set(prevDons.map(d => d.donor)).size;

  const change = (curr: number, prev: number, isPct = true) => {
    if (isAllMonths || prevDons.length === 0) return "—";
    if (isPct) {
      if (prev === 0) return "—";
      const pct = Math.round(((curr - prev) / prev) * 100);
      return pct >= 0 ? `+${pct}%` : `${pct}%`;
    }
    const diff = curr - prev;
    return diff >= 0 ? `+${diff}` : `${diff}`;
  };

  const vsLabel = isAllMonths ? "vs année précédente" : "vs mois précédent";
  const moisLabel = (MOIS.find(m => m.value === filterMois)?.label ?? "").toLowerCase();
  const periodLabel = isAllMonths ? `année ${filterAnnee}` : `${moisLabel} ${filterAnnee}`;

  const PAGE_SIZE = 5;
  const totalPages = Math.max(1, Math.ceil(dons.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedDons = dons.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const anonymes        = filteredDons.filter(d => d.donor === "Anonyme");
  const nonAnonymes     = filteredDons.filter(d => d.donor !== "Anonyme");
  const anonymatData = [
    { name: "Anonyme", value: anonymes.length, amount: anonymes.reduce((s, d) => s + parseAmount(d.amount), 0), color: "#94A3B8" },
    { name: "Non-anonyme", value: nonAnonymes.length, amount: nonAnonymes.reduce((s, d) => s + parseAmount(d.amount), 0), color: "#1A3C6E" },
  ];

  const stats = [
    { label: "Dons collectés (FCFA)",     value: fmt(totalAmount),     change: change(totalAmount, prevTotal, true),       color: "#C8941A" },
    { label: "Nombre de dons",            value: String(donCount),     change: change(donCount, prevCount, false),         color: "#7C3AED" },
    { label: "Don moyen par mois (FCFA)", value: fmt(avgDon),          change: change(avgDon, prevAvg, true),              color: "#C8941A" },
    { label: "Donateurs uniques",         value: String(uniqueDonors), change: change(uniqueDonors, prevDonors, false),    color: "#16a34a" },
  ];

  // "Anonyme" est traité comme un donateur à part entière dans le classement
  const topDonors = Object.values(
    filteredDons.reduce((acc, d) => {
      const amount = parseAmount(d.amount);
      if (!acc[d.donor]) acc[d.donor] = { name: d.donor, total: 0, count: 0 };
      acc[d.donor].total += amount;
      acc[d.donor].count += 1;
      return acc;
    }, {} as Record<string, { name: string; total: number; count: number }>)
  ).sort((a, b) => b.total - a.total);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold" style={{ color: "#1A3C6E" }}>Dons & Finance</h1>
          <p className="text-gray-500 text-sm mt-0.5">Suivi des dons et transactions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <Download size={15} /> Exporter CSV
        </button>
      </div>

      {/* ── Barre de filtres ── */}
      <motion.div
        className="rounded-xl border border-gray-200 bg-white p-4 mb-6"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <SlidersHorizontal size={15} style={{ color: "#1A3C6E" }} />
            Filtres
            {activeCount > 0 && (
              <span className="text-xs font-bold text-white px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "#1A3C6E" }}>
                {activeCount}
              </span>
            )}
          </div>

          <select value={filterMois} onChange={e => setFilterMois(e.target.value)} className={selectCls}>
            {MOIS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>

          <select value={filterAnnee} onChange={e => setFilterAnnee(e.target.value)} className={selectCls}>
            {ANNEES.map(a => <option key={a} value={a}>{a}</option>)}
          </select>

          <AnimatePresence>
            {activeCount > 0 && (
              <motion.button
                onClick={reset}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}>
                <RotateCcw size={12} /> Aujourd'hui
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* KPIs */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="card p-5 flex flex-col gap-3">
            {/* Nom + icône */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: s.color }}>{s.label}</p>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                <Heart size={16} style={{ color: s.color }} />
              </div>
            </div>

            {/* Valeur centrale */}
            <p className="text-3xl font-bold leading-none text-gray-900">{s.value}</p>

            {/* Évolution */}
            <div className="flex items-center gap-1.5">
              {s.change === "—" ? (
                <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">—</span>
              ) : s.change.startsWith("-") ? (
                <span className="flex items-center gap-0.5 text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                  ↓ {s.change}
                </span>
              ) : (
                <span className="flex items-center gap-0.5 text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  <ArrowUpRight size={11} /> {s.change}
                </span>
              )}
              <span className="text-xs text-gray-400">{vsLabel}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Classement + Camembert anonymat — côte à côte */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="card overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
            <Trophy size={16} style={{ color: "#C8941A" }} />
            <h2 className="font-semibold text-gray-900">Meilleurs donateurs</h2>
          </div>
          <ul className="divide-y divide-gray-100">
            {topDonors.map((donor, i) => (
              <li key={donor.name} className="flex items-center gap-3 px-6 py-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ backgroundColor: medalColors[i] ?? "#CBD5E1" }}>
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{donor.name}</p>
                  <p className="text-xs text-gray-500">{donor.count} don{donor.count > 1 ? "s" : ""}</p>
                </div>
                <p className="text-sm font-semibold whitespace-nowrap" style={{ color: "#1A3C6E" }}>
                  {donor.total.toLocaleString("fr-FR")} FCFA
                </p>
              </li>
            ))}
          </ul>
        </div>

        <CamembertAnonymat data={anonymatData} periodLabel={periodLabel} />
      </div>

      {/* Historique des dons */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Historique des dons</h2>
          <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
            <TrendingUp size={13} /> Ce mois
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: "#F8FAFC" }}>
              <tr>
                {["Réf.", "Donateur", "Montant", "Moyen", "Cause", "Date", "Statut"].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedDons.map((d) => {
                const clickable = d.donor !== "Anonyme";
                return (
                  <tr
                    key={d.ref}
                    onClick={() => clickable && setSelectedDon(d)}
                    className={`hover:bg-gray-50 ${clickable ? "cursor-pointer" : "cursor-default"}`}
                    title={clickable ? "Voir les informations du donateur" : undefined}>
                    <td className="px-5 py-4 text-xs font-mono text-gray-500">{d.ref}</td>
                    <td className="px-5 py-4 font-medium text-sm text-gray-900">{d.donor}</td>
                    <td className="px-5 py-4 font-semibold text-sm" style={{ color: "#1A3C6E" }}>{d.amount}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{d.method}</td>
                    <td className="px-5 py-4">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{d.cause}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">{d.date}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${d.statut === "confirmé" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                        {d.statut}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Page {currentPage} sur {totalPages} — {dons.length} don{dons.length > 1 ? "s" : ""} au total
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              <ChevronLeft size={13} /> Précédent
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              Suivant <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Modale informations du donateur ── */}
      <AnimatePresence>
        {selectedDon && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedDon(null)}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-gray-900">Informations du donateur</h3>
                <button onClick={() => setSelectedDon(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={18} />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: "#1A3C6E" }}>
                  <User size={20} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{selectedDon.donor}</p>
                  <p className="text-xs text-gray-500">Réf. don : {selectedDon.ref}</p>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Mail size={15} className="text-gray-400 shrink-0" />
                  <span className="truncate">{selectedDon.email ?? "Non renseigné"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Phone size={15} className="text-gray-400 shrink-0" />
                  <span>{selectedDon.phone ?? "Non renseigné"}</span>
                </div>
              </div>

              <div className="rounded-xl p-4 space-y-2" style={{ backgroundColor: "#F8FAFC" }}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Montant</span>
                  <span className="font-semibold" style={{ color: "#1A3C6E" }}>{selectedDon.amount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Cause</span>
                  <span className="text-gray-700">{selectedDon.cause}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Moyen</span>
                  <span className="text-gray-700">{selectedDon.method}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Date</span>
                  <span className="text-gray-700">{selectedDon.date}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Statut</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${selectedDon.statut === "confirmé" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                    {selectedDon.statut}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
