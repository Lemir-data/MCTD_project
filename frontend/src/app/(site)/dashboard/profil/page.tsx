"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Camera } from "lucide-react";

const focusClass = "focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20";

export default function ProfilPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    nom: "Kouassi",
    prenoms: "Jean-Baptiste",
    email: "jean@email.com",
    tel: "+225 07 00 00 00 00",
  });

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaved(false);
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  return (
    <div className="py-10 px-4" style={{ backgroundColor: "#F8FAFC", minHeight: "80vh" }}>
      <div className="max-w-2xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-500 mb-6 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Retour au tableau de bord
        </Link>

        <h1 className="font-heading text-2xl font-bold mb-6" style={{ color: "#1A3C6E" }}>
          Mon profil
        </h1>

        <form
          onSubmit={(e) => { e.preventDefault(); setSaved(true); }}
          className="space-y-6"
        >
          {/* Avatar */}
          <div className="card p-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shrink-0"
                  style={{ backgroundColor: "#1A3C6E" }}
                  aria-label="Avatar — initiales JB"
                >
                  JB
                </div>
                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: "#C8941A" }}
                  aria-label="Modifier la photo de profil"
                >
                  <Camera size={12} />
                </button>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{form.prenoms} {form.nom}</p>
                <p className="text-sm text-gray-400">{form.email}</p>
                <p className="text-xs mt-1.5 px-3 py-1 rounded-full inline-block" style={{ backgroundColor: "#EFF6FF", color: "#1A3C6E" }}>
                  Membre actif
                </p>
              </div>
            </div>
          </div>

          {/* Informations */}
          <div className="card p-6 space-y-4">
            <h2 className="font-semibold text-gray-900 mb-2">Informations personnelles</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="profil-nom" className="block text-sm font-medium text-gray-700 mb-1.5">Nom</label>
                <input
                  id="profil-nom"
                  value={form.nom}
                  onChange={set("nom")}
                  autoComplete="family-name"
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-sm ${focusClass}`}
                />
              </div>
              <div>
                <label htmlFor="profil-prenoms" className="block text-sm font-medium text-gray-700 mb-1.5">Prénoms</label>
                <input
                  id="profil-prenoms"
                  value={form.prenoms}
                  onChange={set("prenoms")}
                  autoComplete="given-name"
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-sm ${focusClass}`}
                />
              </div>
            </div>
            <div>
              <label htmlFor="profil-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                id="profil-email"
                type="email"
                value={form.email}
                onChange={set("email")}
                autoComplete="email"
                className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-sm ${focusClass}`}
              />
            </div>
            <div>
              <label htmlFor="profil-tel" className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone</label>
              <input
                id="profil-tel"
                type="tel"
                value={form.tel}
                onChange={set("tel")}
                autoComplete="tel"
                className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-sm ${focusClass}`}
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div className="card p-6 space-y-4">
            <h2 className="font-semibold text-gray-900 mb-2">Changer le mot de passe</h2>
            <div>
              <label htmlFor="profil-pwd-actuel" className="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe actuel</label>
              <input
                id="profil-pwd-actuel"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-sm ${focusClass}`}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="profil-pwd-new" className="block text-sm font-medium text-gray-700 mb-1.5">Nouveau mot de passe</label>
                <input
                  id="profil-pwd-new"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-sm ${focusClass}`}
                />
              </div>
              <div>
                <label htmlFor="profil-pwd-confirm" className="block text-sm font-medium text-gray-700 mb-1.5">Confirmer</label>
                <input
                  id="profil-pwd-confirm"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-sm ${focusClass}`}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {saved && (
              <p role="status" className="text-sm text-green-600 font-medium">
                Modifications enregistrées.
              </p>
            )}
            <button
              type="submit"
              className="btn-primary ml-auto"
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
