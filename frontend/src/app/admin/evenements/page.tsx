"use client";
import { useState } from "react";
import { Plus, Search, CalendarDays, MapPin, X, Trash2, Power, Users, UserX } from "lucide-react";
import { mockEvents } from "@/lib/mockData";
import { motion, AnimatePresence } from "framer-motion";

/* ── Dates des évènements (format "15 Juillet 2025") ── */
const MONTHS: Record<string, number> = {
  janvier: 0, février: 1, mars: 2, avril: 3, mai: 4, juin: 5,
  juillet: 6, août: 7, septembre: 8, octobre: 9, novembre: 10, décembre: 11,
};
function parseEventDate(date: string): Date | null {
  const m = date.toLowerCase().match(/(\d{1,2})\s+([a-zà-ÿ]+)\s+(\d{4})/);
  if (!m) return null;
  const month = MONTHS[m[2]];
  if (month === undefined) return null;
  return new Date(parseInt(m[3], 10), month, parseInt(m[1], 10));
}
function isEventPast(date: string): boolean {
  const d = parseEventDate(date);
  if (!d) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d.getTime() < today.getTime();
}

/* ── Curseur actif/inactif ── */
function Toggle({ on, onClick, disabled, title }: { on: boolean; onClick: () => void; disabled?: boolean; title?: string }) {
  return (
    <button
      type="button"
      title={title}
      onClick={(e) => { e.stopPropagation(); if (!disabled) onClick(); }}
      className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
      style={{ backgroundColor: on ? "#1A3C6E" : "#E2E8F0" }}
    >
      <motion.span
        className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow"
        animate={{ left: on ? 18 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      />
    </button>
  );
}

/* ── Rôles autorisés (alignés sur la page admin "Rôles") ── */
const ROLES = ["Fidèle", "Modérateur", "Admin Contenu", "Admin Financier", "Admin"];

type AdminEvent = (typeof mockEvents)[number] & { actif: boolean; audience: string[] };
type ProgrammeItem = { time: string; activity: string };
type EventFormData = {
  title: string; category: string; location: string; date: string; time: string;
  description: string; price: string; places: number; maxPlacesParPersonne: number; audience: string[];
  programme: ProgrammeItem[];
};

const emptyForm = (): EventFormData => ({
  title: "", category: "", location: "", date: "", time: "", description: "",
  price: "Gratuit", places: 50, maxPlacesParPersonne: 5, audience: ["Fidèle"], programme: [],
});
const eventToForm = (e: AdminEvent): EventFormData => ({
  title: e.title, category: e.category, location: e.location, date: e.date, time: e.time,
  description: e.description, price: e.price, places: e.places, maxPlacesParPersonne: e.maxPlacesParPersonne, audience: e.audience,
  programme: e.programme,
});

/* ── Inscrits à un évènement (données fictives) ── */
type Inscrit = { id: string; name: string; email: string; phone: string; date: string; places: number };
const INSCRIT_POOL = [
  { name: "Marie Adjoua", email: "m.adjoua@gmail.com", phone: "+225 07 11 22 33" },
  { name: "Paul Koné", email: "p.kone@yahoo.fr", phone: "+225 05 44 55 66" },
  { name: "Sophie Traoré", email: "s.traore@gmail.com", phone: "+225 01 77 88 99" },
  { name: "Arsène Bah", email: "a.bah@gmail.com", phone: "+225 07 22 33 44" },
  { name: "Adjoua Kouamé", email: "a.kouame@gmail.com", phone: "+225 05 55 66 77" },
  { name: "Jean N'Goran", email: "j.ngoran@gmail.com", phone: "+225 01 88 99 00" },
  { name: "Kouassi Yao", email: "k.yao@gmail.com", phone: "+225 01 22 44 66" },
  { name: "Aya Brou", email: "a.brou@gmail.com", phone: "+225 07 33 55 77" },
  { name: "Yves Konan", email: "y.konan@gmail.com", phone: "+225 05 66 88 11" },
  { name: "Nadège Coulibaly", email: "n.coulibaly@gmail.com", phone: "+225 01 99 22 44" },
];
const REG_DATES = ["02 juin 2026", "03 juin 2026", "04 juin 2026", "05 juin 2026", "06 juin 2026"];
function makeInscrits(totalPlaces: number, seed: string): Inscrit[] {
  const list: Inscrit[] = [];
  let remaining = Math.max(0, totalPlaces);
  let i = 0;
  while (remaining > 0) {
    const places = Math.min(remaining, (i % 3) + 1);
    const base = INSCRIT_POOL[i % INSCRIT_POOL.length];
    const lap = Math.floor(i / INSCRIT_POOL.length);
    list.push({
      id: `${seed}-${i}`,
      name: lap > 0 ? `${base.name} (${lap + 1})` : base.name,
      email: base.email,
      phone: base.phone,
      date: REG_DATES[i % REG_DATES.length],
      places,
    });
    remaining -= places;
    i++;
  }
  return list;
}
function deriveStatus(placesLeft: number): "ouvert" | "complet" {
  return placesLeft <= 0 ? "complet" : "ouvert";
}

/* ── Modale de création / modification ── */
function EventModal({
  initial, onClose, onSave, onDelete, onViewInscrits,
}: {
  initial: AdminEvent | null;
  onClose: () => void;
  onSave: (data: EventFormData) => void;
  onDelete?: () => void;
  onViewInscrits?: () => void;
}) {
  const [form, setForm] = useState<EventFormData>(() => (initial ? eventToForm(initial) : emptyForm()));
  const isPaid = form.price !== "Gratuit";
  const update = (patch: Partial<EventFormData>) => setForm((f) => ({ ...f, ...patch }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || form.audience.length === 0) return;
    onSave({ ...form, price: isPaid ? (form.price.trim() || "Payant") : "Gratuit", places: Math.max(1, form.places || 0) });
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-heading text-lg font-bold" style={{ color: "#1A3C6E" }}>
            {initial ? "Modifier l'événement" : "Créer un événement"}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Nom de l'événement</label>
            <input value={form.title} onChange={(e) => update({ title: e.target.value })} required
              placeholder="Ex : Retraite Spirituelle Annuelle"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Catégorie</label>
              <input value={form.category} onChange={(e) => update({ category: e.target.value })}
                placeholder="Ex : Conférence"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Lieu</label>
              <input value={form.location} onChange={(e) => update({ location: e.target.value })}
                placeholder="Ex : Centre Pastoral MCTD, Cocody"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Date</label>
              <input value={form.date} onChange={(e) => update({ date: e.target.value })}
                placeholder="Ex : 15 Juillet 2026"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Heure</label>
              <input value={form.time} onChange={(e) => update({ time: e.target.value })}
                placeholder="Ex : 08h00 - 18h00"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Description</label>
            <textarea value={form.description} onChange={(e) => update({ description: e.target.value })} rows={4}
              placeholder="Présentation de l'événement affichée sur sa page de description..."
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] resize-none" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-gray-500">Programme de l'événement</label>
              <button type="button"
                onClick={() => update({ programme: [...form.programme, { time: "", activity: "" }] })}
                className="flex items-center gap-1 text-xs font-medium hover:underline" style={{ color: "#1A3C6E" }}>
                <Plus size={13} /> Ajouter une étape
              </button>
            </div>
            {form.programme.length === 0 ? (
              <p className="text-xs text-gray-400 italic">Aucune étape — ajoutez le déroulé de l'événement.</p>
            ) : (
              <div className="space-y-2">
                {form.programme.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input value={item.time}
                      onChange={(e) => update({ programme: form.programme.map((p, j) => j === i ? { ...p, time: e.target.value } : p) })}
                      placeholder="Heure"
                      className="w-24 shrink-0 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                    <input value={item.activity}
                      onChange={(e) => update({ programme: form.programme.map((p, j) => j === i ? { ...p, activity: e.target.value } : p) })}
                      placeholder="Activité"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                    <button type="button" onClick={() => update({ programme: form.programme.filter((_, j) => j !== i) })}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0">
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Places (capacité)</label>
              <input type="number" min={1} value={form.places}
                onChange={(e) => update({ places: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Places max par personne</label>
              <input type="number" min={1} value={form.maxPlacesParPersonne}
                onChange={(e) => update({ maxPlacesParPersonne: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
              <p className="text-xs text-gray-400 mt-1.5">Nombre maximum de places qu'une même personne peut réserver lors de son inscription.</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Inscriptions</label>
            {initial ? (
              <button type="button" onClick={onViewInscrits}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors hover:bg-blue-50"
                style={{ borderColor: "#1A3C6E", color: "#1A3C6E" }}>
                <Users size={15} /> Voir les inscrits ({initial.places - initial.placesLeft}/{initial.places})
              </button>
            ) : (
              <div className="px-3 py-2.5 rounded-lg text-sm text-gray-400 border border-dashed border-gray-200 text-center sm:inline-block sm:w-auto">
                Disponible après création
              </div>
            )}
            <p className="text-xs text-gray-400 mt-1.5">Le statut "Complet" est appliqué automatiquement lorsque toutes les places sont prises.</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Prix</label>
            <div className="flex gap-2 mb-2">
              <button type="button" onClick={() => update({ price: "Gratuit" })}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
                style={!isPaid ? { backgroundColor: "#1A3C6E", color: "white" } : { backgroundColor: "#F1F5F9", color: "#64748B" }}>
                Gratuit
              </button>
              <button type="button" onClick={() => update({ price: form.price === "Gratuit" ? "" : form.price })}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
                style={isPaid ? { backgroundColor: "#1A3C6E", color: "white" } : { backgroundColor: "#F1F5F9", color: "#64748B" }}>
                Payant
              </button>
            </div>
            {isPaid && (
              <input value={form.price} onChange={(e) => update({ price: e.target.value })}
                placeholder="Ex : 5 000 FCFA"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Autorisé pour</label>
            <div className="flex flex-wrap gap-2">
              {ROLES.map((role) => {
                const active = form.audience.includes(role);
                return (
                  <button key={role} type="button"
                    onClick={() => update({
                      audience: active ? form.audience.filter((r) => r !== role) : [...form.audience, role],
                    })}
                    className="px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors"
                    style={active ? { backgroundColor: "#1A3C6E", color: "white" } : { backgroundColor: "#F1F5F9", color: "#64748B" }}>
                    {role}
                  </button>
                );
              })}
            </div>
            {form.audience.length === 0 && <p className="text-xs text-amber-600 mt-1.5">Sélectionnez au moins un public autorisé.</p>}
          </div>

          <div className="flex items-center gap-2 pt-2">
            {onDelete && (
              <button type="button" onClick={onDelete}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 border border-red-100 hover:bg-red-50 transition-colors">
                <Trash2 size={15} /> Supprimer
              </button>
            )}
            <div className="flex-1" />
            <button type="button" onClick={onClose}
              className="px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
              Annuler
            </button>
            <motion.button type="submit" whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "#1A3C6E" }}>
              {initial ? "Enregistrer" : "Créer l'événement"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* ── Modale de confirmation générique ── */
function ConfirmModal({
  title, description, confirmLabel, onConfirm, onCancel,
}: {
  title: string;
  description: React.ReactNode;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onCancel}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center"
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#FEE2E2" }}>
          <Trash2 size={20} style={{ color: "#991B1B" }} />
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-6">{description}</p>
        <div className="flex gap-2">
          <button onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
            Annuler
          </button>
          <motion.button onClick={onConfirm} whileTap={{ scale: 0.97 }}
            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors">
            {confirmLabel}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Modale liste des inscrits ── */
function InscritsModal({
  event, inscrits, onClose, onCancelInscription,
}: {
  event: AdminEvent;
  inscrits: Inscrit[];
  onClose: () => void;
  onCancelInscription: (inscrit: Inscrit) => void;
}) {
  const [confirmCancel, setConfirmCancel] = useState<Inscrit | null>(null);
  const taken = event.places - event.placesLeft;

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-heading text-lg font-bold" style={{ color: "#1A3C6E" }}>
              Inscrits — {event.title}
            </h3>
            <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
              <X size={18} />
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-5">
            <span className="font-semibold" style={{ color: "#1A3C6E" }}>{taken}</span> / {event.places} places prises
            {event.placesLeft > 0 ? ` — ${event.placesLeft} restante${event.placesLeft > 1 ? "s" : ""}` : " — Complet"}
          </p>

          {inscrits.length === 0 ? (
            <p className="text-sm text-gray-400 italic text-center py-10">Aucune inscription pour le moment.</p>
          ) : (
            <div className="space-y-2">
              {inscrits.map((p) => (
                <div key={p.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: "#1A3C6E" }}>
                    {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                    <p className="text-xs text-gray-500 truncate">{p.email} · {p.phone}</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0" style={{ backgroundColor: "#EFF6FF", color: "#1A3C6E" }}>
                    {p.places} place{p.places > 1 ? "s" : ""}
                  </span>
                  <p className="text-xs text-gray-400 shrink-0 hidden sm:block">Inscrit le {p.date}</p>
                  <button type="button" onClick={() => setConfirmCancel(p)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 border border-red-100 hover:bg-red-50 transition-colors shrink-0">
                    <UserX size={13} /> Annuler
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {confirmCancel && (
          <ConfirmModal
            title="Annuler cette inscription ?"
            description={<>L'inscription de <span className="font-medium text-gray-700">{confirmCancel.name}</span> sera annulée et la place sera de nouveau disponible.</>}
            confirmLabel="Annuler l'inscription"
            onConfirm={() => { onCancelInscription(confirmCancel); setConfirmCancel(null); }}
            onCancel={() => setConfirmCancel(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default function AdminEvenementsPage() {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<AdminEvent[]>(() => mockEvents.map((e) => ({ ...e, actif: true, audience: ["Fidèle"] })));
  const [selected, setSelected] = useState<string[]>([]);
  const [editing, setEditing] = useState<AdminEvent | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminEvent | null>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);
  const [inscritsTarget, setInscritsTarget] = useState<AdminEvent | null>(null);
  const [inscritsBySlug, setInscritsBySlug] = useState<Record<string, Inscrit[]>>({});

  const filtered = events.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()));
  const allSelected = filtered.length > 0 && filtered.every((e) => selected.includes(e.slug));

  const toggleSelect = (slug: string) =>
    setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]));
  const toggleSelectAll = () => setSelected(allSelected ? [] : filtered.map((e) => e.slug));

  const toggleActif = (slug: string) =>
    setEvents((es) => es.map((e) => (e.slug === slug ? { ...e, actif: !e.actif } : e)));

  const deleteEvent = (slug: string) => {
    setEvents((es) => es.filter((e) => e.slug !== slug));
    setSelected((s) => s.filter((x) => x !== slug));
  };
  const confirmBulkDelete = () => {
    setEvents((es) => es.filter((e) => !selected.includes(e.slug)));
    setSelected([]);
    setBulkDeleteConfirm(false);
  };
  const bulkToggleActif = () => {
    setEvents((es) => es.map((e) => (selected.includes(e.slug) ? { ...e, actif: !e.actif } : e)));
    setSelected([]);
  };

  const openInscrits = (event: AdminEvent) => {
    setInscritsBySlug((m) => (m[event.slug] ? m : { ...m, [event.slug]: makeInscrits(event.places - event.placesLeft, event.slug) }));
    setInscritsTarget(event);
  };
  const cancelInscription = (slug: string, inscrit: Inscrit) => {
    setInscritsBySlug((m) => ({ ...m, [slug]: (m[slug] ?? []).filter((i) => i.id !== inscrit.id) }));
    setEvents((es) => es.map((e) => {
      if (e.slug !== slug) return e;
      const placesLeft = Math.min(e.places, e.placesLeft + inscrit.places);
      return { ...e, placesLeft, status: deriveStatus(placesLeft) };
    }));
    setInscritsTarget((t) => {
      if (!t || t.slug !== slug) return t;
      const placesLeft = Math.min(t.places, t.placesLeft + inscrit.places);
      return { ...t, placesLeft, status: deriveStatus(placesLeft) };
    });
  };

  const saveEvent = (data: EventFormData, slug?: string) => {
    if (slug) {
      setEvents((es) => es.map((e) => {
        if (e.slug !== slug) return e;
        const placesLeft = Math.min(e.placesLeft, data.places);
        return { ...e, ...data, placesLeft, status: deriveStatus(placesLeft) };
      }));
    } else {
      const newEvent: AdminEvent = {
        slug: `evenement-${Date.now()}`,
        title: data.title,
        category: data.category || "Événement",
        date: data.date,
        time: data.time,
        location: data.location,
        places: data.places,
        placesLeft: data.places,
        status: "ouvert",
        description: data.description,
        banner: "",
        price: data.price,
        maxPlacesParPersonne: data.maxPlacesParPersonne,
        programme: data.programme,
        actif: true,
        audience: data.audience,
      };
      setEvents((es) => [newEvent, ...es]);
    }
  };

  return (
    <div className="p-8 notranslate" translate="no">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold" style={{ color: "#1A3C6E" }}>Événements</h1>
          <p className="text-gray-500 text-sm mt-0.5">{events.length} événements</p>
        </div>
        <motion.button onClick={() => setCreating(true)} whileTap={{ scale: 0.97 }} className="btn-primary">
          <Plus size={15} /> Créer un événement
        </motion.button>
      </div>

      <div className="relative mb-5 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          placeholder="Rechercher un événement..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]"
        />
      </div>

      {/* Barre d'actions groupées */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mb-4 flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: "#EFF6FF" }}>
              <span className="text-sm font-medium" style={{ color: "#1A3C6E" }}>{selected.length} sélectionné(s)</span>
              <button onClick={bulkToggleActif}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white transition-colors" style={{ backgroundColor: "#1A3C6E" }}>
                <Power size={14} /> Activer / Désactiver
              </button>
              <button onClick={() => setBulkDeleteConfirm(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 border border-red-100 hover:bg-red-50 transition-colors">
                <Trash2 size={14} /> Supprimer
              </button>
              <button onClick={() => setSelected([])} className="ml-auto text-sm text-gray-400 hover:text-gray-600 transition-colors">
                Annuler
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead style={{ backgroundColor: "#F8FAFC" }}>
            <tr>
              <th className="px-5 py-3.5 w-10">
                {selected.length > 0 && (
                  <input type="checkbox" checked={allSelected} onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 accent-[#1A3C6E] cursor-pointer" />
                )}
              </th>
              {["Événement", "Date", "Lieu", "Places", "Prix", "Catégorie", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((e) => {
              const past = isEventPast(e.date);
              const actif = past ? false : e.actif;
              const checked = selected.includes(e.slug);
              return (
                <tr key={e.slug} onClick={() => setEditing(e)} className="group hover:bg-gray-50 cursor-pointer transition-colors">
                  <td className="px-5 py-4" onClick={(ev) => ev.stopPropagation()}>
                    <input type="checkbox" checked={checked} onChange={() => toggleSelect(e.slug)}
                      className={`w-4 h-4 rounded border-gray-300 accent-[#1A3C6E] cursor-pointer transition-opacity ${checked ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#EFF6FF" }}>
                        <CalendarDays size={16} style={{ color: "#1A3C6E" }} />
                      </div>
                      <p className="font-medium text-sm text-gray-900">{e.title}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600 whitespace-nowrap">{e.date}</td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin size={12} className="shrink-0" /> {e.location}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700">
                    {e.placesLeft}/{e.places}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${e.price === "Gratuit" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                      {e.price}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="badge badge-primary text-xs">{e.category}</span>
                  </td>
                  <td className="px-5 py-4" onClick={(ev) => ev.stopPropagation()}>
                    <Toggle on={actif} disabled={past} onClick={() => toggleActif(e.slug)}
                      title={past ? "Désactivé automatiquement — la date de l'événement est passée" : actif ? "Désactiver l'événement" : "Activer l'événement"} />
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="text-center py-10 text-sm text-gray-400">Aucun événement trouvé</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modale création / modification */}
      <AnimatePresence>
        {(editing || creating) && (
          <EventModal
            initial={editing}
            onClose={() => { setEditing(null); setCreating(false); }}
            onSave={(data) => { saveEvent(data, editing?.slug); setEditing(null); setCreating(false); }}
            onDelete={editing ? () => { setDeleteTarget(editing); setEditing(null); } : undefined}
            onViewInscrits={editing ? () => { openInscrits(editing); setEditing(null); } : undefined}
          />
        )}
      </AnimatePresence>

      {/* Liste des inscrits */}
      <AnimatePresence>
        {inscritsTarget && (
          <InscritsModal
            event={inscritsTarget}
            inscrits={inscritsBySlug[inscritsTarget.slug] ?? []}
            onClose={() => setInscritsTarget(null)}
            onCancelInscription={(inscrit) => cancelInscription(inscritsTarget.slug, inscrit)}
          />
        )}
      </AnimatePresence>

      {/* Confirmation suppression individuelle */}
      <AnimatePresence>
        {deleteTarget && (
          <ConfirmModal
            title="Supprimer cet événement ?"
            description={<>L'événement <span className="font-medium text-gray-700">{deleteTarget.title}</span> sera définitivement supprimé. Cette action est irréversible.</>}
            confirmLabel="Supprimer"
            onConfirm={() => { deleteEvent(deleteTarget.slug); setDeleteTarget(null); }}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </AnimatePresence>

      {/* Confirmation suppression groupée */}
      <AnimatePresence>
        {bulkDeleteConfirm && (
          <ConfirmModal
            title="Supprimer les événements sélectionnés ?"
            description={<>Les <span className="font-medium text-gray-700">{selected.length}</span> événements sélectionnés seront définitivement supprimés. Cette action est irréversible.</>}
            confirmLabel="Supprimer"
            onConfirm={confirmBulkDelete}
            onCancel={() => setBulkDeleteConfirm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
