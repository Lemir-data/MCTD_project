"use client";
import { useState } from "react";
import { Plus, Shield, X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Permission = { id: string; label: string; description: string };

const permissions: Permission[] = [
  { id: "fideles",          label: "Gérer les fidèles",                  description: "Créer, modifier, activer/désactiver et supprimer les comptes des fidèles" },
  { id: "fideles_statut",   label: "Activer / désactiver un fidèle",     description: "Basculer le statut actif/inactif d'un compte de fidèle, individuellement ou en masse" },
  { id: "roles",            label: "Gérer les rôles",                    description: "Créer des rôles et configurer les permissions de chacun" },
  { id: "elearning",        label: "Gérer l'E-Learning",                 description: "Créer et modifier les catégories, modules, cours et contenus" },
  { id: "evenements",       label: "Gérer les événements",               description: "Créer des événements et gérer les inscriptions des participants" },
  { id: "dons",             label: "Gérer les dons et finances",          description: "Consulter et gérer les transactions, dons et rapports financiers" },
  { id: "galerie",          label: "Gérer la galerie",                   description: "Ajouter, modifier, publier ou masquer des médias" },
  { id: "site",             label: "Gérer le site vitrine",              description: "Modifier le contenu des pages publiques (Accueil, À propos, Contact…)" },
  { id: "dashboard",        label: "Voir le tableau de bord",            description: "Accéder aux statistiques et indicateurs de la plateforme" },
  { id: "dash_indicateurs", label: "Voir les indicateurs non financiers", description: "Inscrits, apprenants actifs et événements — regroupés sur le tableau de bord" },
  { id: "logs",             label: "Voir les logs d'activité",           description: "Consulter l'historique des actions effectuées sur la plateforme" },
  { id: "parametres",       label: "Gérer les paramètres",               description: "Modifier la configuration générale de la plateforme" },
];

const emptyPerms = (): Record<string, boolean> =>
  Object.fromEntries(permissions.map((p) => [p.id, false]));

const roleColors: Record<string, string> = {
  "Admin":           "#FEE2E2|#991B1B",
  "Admin Contenu":   "#EFF6FF|#1A3C6E",
  "Admin Financier": "#DCFCE7|#166534",
  "Modérateur":      "#F3E8FF|#6B21A8",
  "Fidèle":          "#F1F5F9|#475569",
};

const initialRoles = [
  { name: "Fidèle", membres: 142, perms: { ...emptyPerms() } },
  { name: "Modérateur", membres: 6, perms: { ...emptyPerms(), fideles: true, fideles_statut: true, evenements: true, galerie: true, dashboard: true, dash_indicateurs: true } },
  { name: "Admin Contenu", membres: 3, perms: { ...emptyPerms(), elearning: true, evenements: true, galerie: true, site: true, dashboard: true, dash_indicateurs: true } },
  { name: "Admin Financier", membres: 2, perms: { ...emptyPerms(), dons: true, dashboard: true, logs: true } },
  { name: "Admin", membres: 2, perms: Object.fromEntries(permissions.map((p) => [p.id, true])) },
];

type Role = typeof initialRoles[number];

function ToggleSwitch({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative rounded-full transition-colors shrink-0 ${on ? "bg-green-500" : "bg-gray-300"}`}
      style={{ width: 40, height: 22 }}>
      <span
        className="absolute top-0.5 bg-white rounded-full shadow transition-all"
        style={{ width: 18, height: 18, left: on ? 20 : 2 }}
      />
    </button>
  );
}

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [perms, setPerms] = useState<Record<string, boolean>>({});
  const [showCreate, setShowCreate] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleteRole, setDeleteRole] = useState<Role | null>(null);
  const [bulkDeleteRoles, setBulkDeleteRoles] = useState(false);

  const toggleSelect = (name: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const clearSelection = () => setSelected(new Set());

  const confirmDeleteRole = () => {
    if (!deleteRole) return;
    setRoles((rs) => rs.filter((r) => r.name !== deleteRole.name));
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(deleteRole.name);
      return next;
    });
    setDeleteRole(null);
  };

  const confirmBulkDeleteRoles = () => {
    setRoles((rs) => rs.filter((r) => !selected.has(r.name)));
    setBulkDeleteRoles(false);
    clearSelection();
  };

  const openRole = (r: Role) => {
    setPerms({ ...r.perms });
    setSelectedRole(r);
  };

  const togglePerm = (id: string) => setPerms((p) => ({ ...p, [id]: !p[id] }));

  const countActive = (p: Record<string, boolean>) => Object.values(p).filter(Boolean).length;

  const saveRolePermissions = () => {
    if (!selectedRole) return;
    setRoles((rs) => rs.map((r) => (r.name === selectedRole.name ? { ...r, perms } : r)));
    setSelectedRole(null);
  };

  const createRole = () => {
    const name = newRoleName.trim();
    if (!name) return;
    setRoles((rs) => [...rs, { name, membres: 0, perms: emptyPerms() }]);
    setNewRoleName("");
    setShowCreate(false);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold" style={{ color: "#1A3C6E" }}>Rôles</h1>
          <p className="text-gray-500 text-sm mt-0.5">{roles.length} rôles définis sur la plateforme</p>
        </div>
        <button className="btn-primary" onClick={() => setShowCreate(true)}>
          <Plus size={15} /> Créer un rôle
        </button>
      </div>

      {/* Barre d'actions groupées */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden">
            <div className="flex flex-wrap items-center gap-3 rounded-xl border px-4 py-3"
              style={{ backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }}>
              <span className="text-sm font-semibold" style={{ color: "#1A3C6E" }}>
                {selected.size} sélectionné{selected.size > 1 ? "s" : ""}
              </span>
              <button onClick={clearSelection} className="text-xs font-medium text-gray-500 hover:text-gray-700 underline underline-offset-2">
                Tout désélectionner
              </button>
              <button onClick={() => setBulkDeleteRoles(true)}
                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 bg-white text-red-600 hover:bg-red-50 transition-colors">
                <Trash2 size={14} /> Supprimer la sélection
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Liste des rôles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((r) => {
          const [bg, fg] = (roleColors[r.name] ?? "#F1F5F9|#475569").split("|");
          const active = countActive(r.perms);
          return (
            <div
              key={r.name}
              onClick={() => openRole(r)}
              className="group card p-5 text-left hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3 mb-5">
                <div onClick={(e) => e.stopPropagation()} className="shrink-0">
                  <input
                    type="checkbox"
                    checked={selected.has(r.name)}
                    onChange={() => toggleSelect(r.name)}
                    className={`w-4 h-4 rounded border-gray-300 cursor-pointer accent-[#1A3C6E] transition-opacity ${
                      selected.has(r.name) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: bg }}>
                  <Shield size={18} style={{ color: fg }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 truncate">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.membres} fidèle{r.membres > 1 ? "s" : ""}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setDeleteRole(r); }}
                  title="Supprimer ce rôle"
                  className="p-1.5 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-colors shrink-0">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Permissions actives</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: bg, color: fg }}>
                  {active}/{permissions.length}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Modale de gestion des permissions ── */}
      <AnimatePresence>
        {selectedRole && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedRole(null)}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh]"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}>

              {/* En-tête */}
              <div className="flex items-center gap-3 p-6 border-b border-gray-100">
                {(() => {
                  const [bg, fg] = (roleColors[selectedRole.name] ?? "#F1F5F9|#475569").split("|");
                  return (
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: bg }}>
                      <Shield size={20} style={{ color: fg }} />
                    </div>
                  );
                })()}
                <div>
                  <p className="font-semibold text-gray-900">{selectedRole.name}</p>
                  <p className="text-xs text-gray-400">Activez ou désactivez ce que ce rôle peut faire et voir</p>
                </div>
                <button onClick={() => setSelectedRole(null)} className="ml-auto p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                  <X size={18} />
                </button>
              </div>

              {/* Liste des permissions */}
              <div className="p-6 overflow-y-auto space-y-1">
                {permissions.map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-4 py-3 border-b border-gray-50 last:border-0">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800">{p.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{p.description}</p>
                    </div>
                    <ToggleSwitch on={!!perms[p.id]} onClick={() => togglePerm(p.id)} />
                  </div>
                ))}
              </div>

              {/* Pied */}
              <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100" style={{ backgroundColor: "#F8FAFC" }}>
                <button onClick={() => setSelectedRole(null)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                  Annuler
                </button>
                <motion.button
                  onClick={saveRolePermissions}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                  style={{ backgroundColor: "#1A3C6E" }}>
                  Enregistrer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modale de création de rôle ── */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowCreate(false)}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}>

              <div className="flex items-center gap-3 p-6 border-b border-gray-100">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#EFF6FF" }}>
                  <Shield size={20} style={{ color: "#1A3C6E" }} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Nouveau rôle</p>
                  <p className="text-xs text-gray-400">Définissez son nom, ses permissions viendront ensuite</p>
                </div>
                <button onClick={() => setShowCreate(false)} className="ml-auto p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                  <X size={18} />
                </button>
              </div>

              <div className="p-6">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Nom du rôle</label>
                <input
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="Ex : Trésorier"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Une fois créé, cliquez sur le rôle dans la liste pour activer ou désactiver ses permissions.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100" style={{ backgroundColor: "#F8FAFC" }}>
                <button onClick={() => setShowCreate(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                  Annuler
                </button>
                <motion.button
                  onClick={createRole}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                  style={{ backgroundColor: "#1A3C6E" }}>
                  Créer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modale de confirmation suppression individuelle ── */}
      <AnimatePresence>
        {deleteRole && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setDeleteRole(null)}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#FEE2E2" }}>
                <Trash2 size={20} style={{ color: "#991B1B" }} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Supprimer ce rôle ?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Le rôle <span className="font-medium text-gray-700">{deleteRole.name}</span> sera définitivement supprimé. Les fidèles qui l'avaient devront se voir attribuer un nouveau rôle. Cette action est irréversible.
              </p>
              <div className="flex gap-2">
                <button onClick={() => setDeleteRole(null)}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <motion.button
                  onClick={confirmDeleteRole}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors">
                  Supprimer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modale de confirmation suppression groupée ── */}
      <AnimatePresence>
        {bulkDeleteRoles && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setBulkDeleteRoles(false)}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#FEE2E2" }}>
                <Trash2 size={20} style={{ color: "#991B1B" }} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Supprimer {selected.size} rôle{selected.size > 1 ? "s" : ""} ?</h3>
              <p className="text-sm text-gray-500 mb-6">
                <span className="font-medium text-gray-700">{selected.size} rôle{selected.size > 1 ? "s" : ""}</span> seront définitivement supprimé{selected.size > 1 ? "s" : ""}. Les fidèles concernés devront se voir attribuer un nouveau rôle. Cette action est irréversible.
              </p>
              <div className="flex gap-2">
                <button onClick={() => setBulkDeleteRoles(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <motion.button
                  onClick={confirmBulkDeleteRoles}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors">
                  Supprimer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
