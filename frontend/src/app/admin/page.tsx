"use client";
import { useState } from "react";
import { Users, BookOpen, CalendarDays, Heart, TrendingUp, ArrowUpRight, SlidersHorizontal, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StaggerContainer, StaggerItem, HoverCard } from "@/components/ui/animations";
import { HistogrammeDons, CamembertAffectations } from "./components/DonCharts";
import { useThemeVars } from "./components/AdminPageWrapper";

type MonthStats = { dons: number; inscrits: number; apprenants: number; events: number };

const kpiData: Record<string, Record<string, MonthStats>> = {
  "2026": {
    "01": { dons: 580000,  inscrits: 180, apprenants: 680,  events: 2 },
    "02": { dons: 620000,  inscrits: 120, apprenants: 720,  events: 3 },
    "03": { dons: 750000,  inscrits: 250, apprenants: 820,  events: 5 },
    "04": { dons: 890000,  inscrits: 310, apprenants: 920,  events: 4 },
    "05": { dons: 830000,  inscrits: 290, apprenants: 980,  events: 6 },
    "06": { dons: 1240000, inscrits: 380, apprenants: 1204, events: 6 },
    "07": { dons: 0, inscrits: 0, apprenants: 0, events: 0 },
    "08": { dons: 0, inscrits: 0, apprenants: 0, events: 0 },
    "09": { dons: 0, inscrits: 0, apprenants: 0, events: 0 },
    "10": { dons: 0, inscrits: 0, apprenants: 0, events: 0 },
    "11": { dons: 0, inscrits: 0, apprenants: 0, events: 0 },
    "12": { dons: 0, inscrits: 0, apprenants: 0, events: 0 },
  },
};

const allUsers = [
  { name: "Marie Adjoua",    email: "m.adjoua@gmail.com",    date: "05/06/2026", role: "Fidèle"},
  { name: "Paul Koné",       email: "p.kone@yahoo.fr",        date: "04/06/2026", role: "Admin Contenu" },
  { name: "Sophie Traoré",   email: "s.traore@gmail.com",     date: "03/06/2026", role: "Fidèle"},
  { name: "Arsène Bah",      email: "a.bah@gmail.com",        date: "02/06/2026", role: "Fidèle"},
  { name: "Jean Yao",        email: "j.yao@gmail.com",        date: "18/05/2026", role: "Modérateur" },
  { name: "Claire Diallo",   email: "c.diallo@gmail.com",     date: "14/05/2026", role: "Fidèle"},
  { name: "Antoine Gbagbo",  email: "a.gbagbo@gmail.com",     date: "10/05/2026", role: "Admin Contenu" },
  { name: "Fatou Coulibaly", email: "f.coulibaly@gmail.com",  date: "03/05/2026", role: "Fidèle"},
  { name: "Hervé Ouattara",  email: "h.ouattara@gmail.com",   date: "22/04/2026", role: "Admin Financier" },
  { name: "Ines Akissi",     email: "i.akissi@gmail.com",     date: "17/04/2026", role: "Fidèle"},
  { name: "Brice Dembélé",   email: "b.dembele@gmail.com",    date: "09/04/2026", role: "Modérateur" },
  { name: "Léa N'Guessan",   email: "l.nguessan@gmail.com",   date: "05/04/2026", role: "Fidèle"},
  { name: "Kofi Asante",     email: "k.asante@gmail.com",     date: "28/03/2026", role: "Admin" },
  { name: "Amina Sylla",     email: "a.sylla@gmail.com",      date: "15/03/2026", role: "Fidèle"},
  { name: "Roger Tape",      email: "r.tape@gmail.com",       date: "02/03/2026", role: "Admin Financier" },
];

const logs = [
  "Nouveau fidèle inscrit : Marie Adjoua",
  "Événement « Retraite spirituelle » complet",
  "Don de 50 000 FCFA reçu via Wave CI",
  "Nouveau module ajouté : Évangile de Jean",
  "Photo ajoutée à la galerie — Pâques 2026",
];

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

const selectCls = "text-sm border rounded-lg px-3 py-2 focus:outline-none focus:border-[#1A3C6E] cursor-pointer transition-colors";

const roleBadge: Record<string, string> = {
  "Admin":           "#FEE2E2|#991B1B",
  "Admin Contenu":   "#EFF6FF|#1A3C6E",
  "Admin Financier": "#DCFCE7|#166534",
  "Modérateur":      "#F3E8FF|#6B21A8",
  "Fidèle":          "#F1F5F9|#475569",
};

export default function AdminDashboardPage() {
  const { isDark, cardBg, cardBorder, text, textMuted, textSub, inputBg, hoverBg, rowHover, divider, selectBg } = useThemeVars();
  const [filterMois,  setFilterMois]  = useState(MOIS_COURANT);
  const [filterAnnee, setFilterAnnee] = useState(String(ANNEE_COURANTE));

  const defaultMois  = MOIS_COURANT;
  const defaultAnnee = String(ANNEE_COURANTE);
  const activeCount  = [
    filterMois  !== defaultMois,
    filterAnnee !== defaultAnnee,
  ].filter(Boolean).length;

  const reset = () => { setFilterMois(defaultMois); setFilterAnnee(defaultAnnee); };

  // ── Calcul KPIs dynamiques ──
  const yearData = kpiData[filterAnnee] ?? {};
  const isAllMonths = filterMois === "00";

  const sumAll = (key: keyof MonthStats) =>
    Object.values(yearData).reduce((s, m) => s + m[key], 0);

  const getVal = (key: keyof MonthStats) =>
    isAllMonths ? sumAll(key) : (yearData[filterMois]?.[key] ?? 0);

  const getChange = (key: keyof MonthStats, isPct = false) => {
    if (isAllMonths) return "—";
    const curr = yearData[filterMois]?.[key] ?? 0;
    const prevM = String(Number(filterMois) - 1).padStart(2, "0");
    if (Number(filterMois) <= 1) return "—";
    const prev = yearData[prevM]?.[key] ?? 0;
    const diff = curr - prev;
    if (isPct && prev > 0) {
      const pct = Math.round((diff / prev) * 100);
      return pct >= 0 ? `+${pct}%` : `${pct}%`;
    }
    return diff >= 0 ? `+${diff}` : `${diff}`;
  };

  const fmt = (n: number) => n.toLocaleString("fr-FR");
  const vsLabel = isAllMonths ? "vs année précédente" : "vs mois précédent";

  // Libellé de période + total dons pour le camembert
  const moisLabel  = (MOIS.find(m => m.value === filterMois)?.label ?? "").toLowerCase();
  const periodLabel = isAllMonths ? `année ${filterAnnee}` : `${moisLabel} ${filterAnnee}`;
  const donsTotal   = getVal("dons");

  const kpis = [
    { label: "Dons collectés (FCFA)", display: fmt(getVal("dons")),      change: getChange("dons", true), icon: Heart,        color: "#C8941A" },
    { label: "Inscrits",              display: fmt(getVal("inscrits")),   change: getChange("inscrits"),   icon: Users,        color: "#1A3C6E" },
    { label: "Apprenants actifs",     display: fmt(getVal("apprenants")), change: getChange("apprenants"), icon: BookOpen,     color: "#7C3AED" },
    { label: "Événements",            display: fmt(getVal("events")),     change: getChange("events"),     icon: CalendarDays, color: "#F97316" },
  ];

  const filteredUsers = allUsers.filter(u => {
    const [, mois, annee] = u.date.split("/");
    return annee === filterAnnee && (isAllMonths || mois === filterMois);
  });

  return (
    <div className="p-6 lg:p-8">
      {/* En-tête */}
      <motion.div className="mb-6" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-heading text-2xl font-bold" style={{ color: "#1A3C6E" }}>Tableau de bord</h1>
        <p className="text-gray-500 text-sm mt-1">Vue d'ensemble de la plateforme MCTD</p>
      </motion.div>

      {/* ── Barre de filtres ── */}
      <motion.div
        className="rounded-xl border p-4 mb-6 transition-colors"
        style={{ backgroundColor: cardBg, borderColor: cardBorder }}
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

          <select value={filterMois} onChange={e => setFilterMois(e.target.value)} className={selectCls}
            style={{ backgroundColor: selectBg, borderColor: cardBorder, color: text }}>
            {MOIS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>

          <select value={filterAnnee} onChange={e => setFilterAnnee(e.target.value)} className={selectCls}
            style={{ backgroundColor: selectBg, borderColor: cardBorder, color: text }}>
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
      <StaggerContainer className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {kpis.map((k) => (
          <StaggerItem key={k.label}>
            <HoverCard>
              <div className="card p-5 flex flex-col gap-3">
                {/* Nom + icône */}
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: k.color }}>{k.label}</p>
                  <motion.div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${k.color}15` }}
                    whileHover={{ scale: 1.15, rotate: 5 }}>
                    <k.icon size={16} style={{ color: k.color }} />
                  </motion.div>
                </div>

                {/* Valeur centrale */}
                <p className="text-3xl font-bold leading-none" style={{ color: text }}>{k.display}</p>

                {/* Évolution */}
                <motion.div
                  className="flex items-center gap-1.5"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}>
                  {k.change === "—" ? (
                    <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">—</span>
                  ) : k.change.startsWith("-") ? (
                    <span className="flex items-center gap-0.5 text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                      ↓ {k.change}
                    </span>
                  ) : (
                    <span className="flex items-center gap-0.5 text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      <ArrowUpRight size={11} /> {k.change}
                    </span>
                  )}
                  <span className="text-xs" style={{ color: textMuted }}>{vsLabel}</span>
                </motion.div>
              </div>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Graphiques */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2"><HistogrammeDons /></div>
        <div><CamembertAffectations total={donsTotal} periodLabel={periodLabel} /></div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tableau utilisateurs */}
        <motion.div
          className="lg:col-span-2 rounded-xl border p-6 transition-colors"
          style={{ backgroundColor: cardBg, borderColor: cardBorder }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold" style={{ color: text }}>
              Fidèles
              {activeCount > 0 && (
                <span className="ml-2 text-xs font-normal text-gray-400">
                  — {filteredUsers.length} résultat{filteredUsers.length !== 1 ? "s" : ""}
                </span>
              )}
            </h2>
            <a href="/admin/utilisateurs" className="text-sm flex items-center gap-1" style={{ color: "#1A3C6E" }}>
              Voir tout <ArrowUpRight size={13} />
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Nom", "Email", "Date", "Rôle"].map(h => (
                    <th key={h} className="text-left py-2 text-xs font-semibold text-gray-400 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <AnimatePresence mode="wait">
                <motion.tbody
                  key={`${filterMois}-${filterAnnee}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-sm" style={{ color: textMuted }}>
                        Aucun fidèle pour ces filtres
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => {
                      const [bgBadge, fg] = (roleBadge[u.role] ?? "#F1F5F9|#475569").split("|");
                      return (
                        <tr
                          key={u.email}
                          className="cursor-default transition-colors"
                          style={{ borderBottom: `1px solid ${divider}` }}
                          onMouseEnter={e => (e.currentTarget.style.backgroundColor = rowHover)}
                          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}>
                          <td className="py-3 font-medium text-sm" style={{ color: text }}>{u.name}</td>
                          <td className="py-3 text-xs" style={{ color: textMuted }}>{u.email}</td>
                          <td className="py-3 text-xs" style={{ color: textMuted }}>{u.date}</td>
                          <td className="py-3">
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                              style={{ backgroundColor: bgBadge, color: fg }}>
                              {u.role}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </motion.tbody>
              </AnimatePresence>
            </table>
          </div>
        </motion.div>

        {/* Sidebar */}
        <div className="space-y-4">
          <motion.div className="rounded-xl border p-5 transition-colors" style={{ backgroundColor: cardBg, borderColor: cardBorder }}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: text }}>
              <TrendingUp size={16} style={{ color: "#C8941A" }} /> Activité récente
            </h3>
            <div className="space-y-3 text-xs text-gray-600">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-2 py-2 border-b border-gray-100 last:border-0"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.07 }}>
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: "#C8941A" }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  />
                  {log}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="rounded-xl border p-5 transition-colors" style={{ backgroundColor: cardBg, borderColor: cardBorder }}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <h3 className="font-semibold text-sm mb-3" style={{ color: text }}>Accès rapides</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Ajouter cours",    href: "/admin/elearning" },
                { label: "Créer événement",  href: "/admin/evenements" },
                { label: "Voir les dons",    href: "/admin/dons" },
                { label: "Modérer galerie",  href: "/admin/galerie" },
              ].map(item => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="text-xs font-medium p-3 rounded-lg text-center border block transition-colors"
                  style={{ borderColor: cardBorder, color: textMuted, backgroundColor: "transparent" }}
                  whileHover={{ scale: 1.04, borderColor: "#1A3C6E", color: "#1A3C6E", backgroundColor: "#EFF6FF" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}>
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
