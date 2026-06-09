"use client";
import { useState } from "react";
import { Moon, Sun, Lock, Eye, EyeOff, Check, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminTheme } from "@/contexts/AdminThemeContext";

export default function ParametresPage() {
  /* ── Dark mode via contexte partagé ── */
  const { isDark: darkMode, toggle: toggleDark } = useAdminTheme();

  /* ── Changement de mot de passe ── */
  const [form, setForm] = useState({ actuel: "", nouveau: "", confirmer: "" });
  const [show, setShow]   = useState({ actuel: false, nouveau: false, confirmer: false });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const toggleShow = (field: keyof typeof show) =>
    setShow(prev => ({ ...prev, [field]: !prev[field] }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setStatus("idle");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.actuel || !form.nouveau || !form.confirmer) {
      setErrMsg("Tous les champs sont obligatoires."); setStatus("error"); return;
    }
    if (form.nouveau.length < 8) {
      setErrMsg("Le nouveau mot de passe doit contenir au moins 8 caractères."); setStatus("error"); return;
    }
    if (form.nouveau !== form.confirmer) {
      setErrMsg("Les mots de passe ne correspondent pas."); setStatus("error"); return;
    }
    /* Appel API backend à brancher ici */
    setStatus("success");
    setForm({ actuel: "", nouveau: "", confirmer: "" });
  };

  const inputCls = "w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] pr-11 bg-white";

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <motion.div className="mb-8" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-bold" style={{ color: "#1A3C6E" }}>Paramètres</h1>
        <p className="text-gray-500 text-sm mt-1">Personnalisation et sécurité du compte administrateur</p>
      </motion.div>

      {/* ── Apparence ── */}
      <motion.div
        className="card p-6 mb-6"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#EFF6FF" }}>
            {darkMode ? <Moon size={18} style={{ color: "#1A3C6E" }} /> : <Sun size={18} style={{ color: "#C8941A" }} />}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Apparence</h2>
            <p className="text-xs text-gray-400">Choisissez le thème de l'interface admin</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
              {darkMode
                ? <Moon size={18} className="text-blue-300" />
                : <Sun size={18} className="text-yellow-500" />}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{darkMode ? "Mode sombre" : "Mode clair"}</p>
              <p className="text-xs text-gray-400">{darkMode ? "Interface en thème sombre" : "Interface en thème clair"}</p>
            </div>
          </div>

          {/* Toggle switch */}
          <button
            onClick={toggleDark}
            className="relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none"
            style={{ backgroundColor: darkMode ? "#1A3C6E" : "#CBD5E1" }}
            aria-label="Basculer le thème">
            <motion.span
              className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow"
              animate={{ left: darkMode ? "26px" : "2px" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
      </motion.div>

      {/* ── Sécurité ── */}
      <motion.div
        className="card p-6"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#FEE2E2" }}>
            <Lock size={18} style={{ color: "#991B1B" }} />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Sécurité</h2>
            <p className="text-xs text-gray-400">Modification du mot de passe administrateur</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mot de passe actuel */}
          {(["actuel", "nouveau", "confirmer"] as const).map((field) => {
            const labels: Record<string, string> = {
              actuel: "Mot de passe actuel",
              nouveau: "Nouveau mot de passe",
              confirmer: "Confirmer le nouveau mot de passe",
            };
            return (
              <div key={field}>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">{labels[field]}</label>
                <div className="relative">
                  <input
                    type={show[field] ? "text" : "password"}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={inputCls}
                  />
                  <button
                    type="button"
                    onClick={() => toggleShow(field)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {show[field] ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            );
          })}

          <p className="text-xs text-gray-400">Le mot de passe doit contenir au moins 8 caractères.</p>

          <AnimatePresence>
            {status === "error" && (
              <motion.p
                className="text-xs text-red-600 bg-red-50 px-4 py-3 rounded-lg border border-red-100"
                initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {errMsg}
              </motion.p>
            )}
            {status === "success" && (
              <motion.p
                className="flex items-center gap-2 text-xs text-green-700 bg-green-50 px-4 py-3 rounded-lg border border-green-100"
                initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <Check size={14} /> Mot de passe modifié avec succès.
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity"
            style={{ backgroundColor: "#1A3C6E" }}
            whileHover={{ opacity: 0.88 }}
            whileTap={{ scale: 0.97 }}>
            <ShieldCheck size={15} /> Enregistrer le nouveau mot de passe
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
