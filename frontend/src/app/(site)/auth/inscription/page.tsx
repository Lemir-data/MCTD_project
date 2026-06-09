"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function InscriptionPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ nom: "", prenoms: "", email: "", tel: "", password: "", confirm: "" });
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { nom, prenoms, email, tel, password, confirm } = form;
    if (!nom || !prenoms || !email || !tel || !password || !confirm) {
      setError("Tous les champs obligatoires doivent être remplis.");
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (!accepted) {
      setError("Vous devez accepter les conditions d'utilisation.");
      return;
    }
    setLoading(true);
    setError("");
    login();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20" style={{ backgroundColor: "#F8FAFC" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#C8941A" }}>
            <UserPlus size={24} className="text-white" />
          </div>
          <h1 className="font-heading text-3xl font-bold" style={{ color: "#1A3C6E" }}>Créer un compte</h1>
          <p className="text-gray-500 text-sm mt-1">Rejoignez la communauté MCTD en ligne</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {error && (
              <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
                {error}
              </p>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="inscription-nom" className="block text-sm font-medium text-gray-700 mb-1.5">Nom *</label>
                <input
                  id="inscription-nom"
                  placeholder="Koné"
                  value={form.nom}
                  onChange={set("nom")}
                  autoComplete="family-name"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20"
                />
              </div>
              <div>
                <label htmlFor="inscription-prenoms" className="block text-sm font-medium text-gray-700 mb-1.5">Prénoms *</label>
                <input
                  id="inscription-prenoms"
                  placeholder="Adja Marie"
                  value={form.prenoms}
                  onChange={set("prenoms")}
                  autoComplete="given-name"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20"
                />
              </div>
            </div>
            <div>
              <label htmlFor="inscription-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
              <input
                id="inscription-email"
                type="email"
                placeholder="votre@email.com"
                value={form.email}
                onChange={set("email")}
                autoComplete="email"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20"
              />
            </div>
            <div>
              <label htmlFor="inscription-tel" className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone *</label>
              <input
                id="inscription-tel"
                type="tel"
                placeholder="+225 07 00 00 00 00"
                value={form.tel}
                onChange={set("tel")}
                autoComplete="tel"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20"
              />
            </div>
            <div>
              <label htmlFor="inscription-password" className="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe *</label>
              <input
                id="inscription-password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={set("password")}
                autoComplete="new-password"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20"
              />
            </div>
            <div>
              <label htmlFor="inscription-confirm" className="block text-sm font-medium text-gray-700 mb-1.5">Confirmer le mot de passe *</label>
              <input
                id="inscription-confirm"
                type="password"
                placeholder="••••••••"
                value={form.confirm}
                onChange={set("confirm")}
                autoComplete="new-password"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20"
              />
            </div>
            <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <span>J'accepte les conditions d'utilisation et la politique de confidentialité</span>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 text-center disabled:opacity-60"
            >
              <UserPlus size={18} />
              {loading ? "Création…" : "Créer mon compte"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Déjà un compte ?{" "}
              <Link href="/auth/connexion" className="font-semibold" style={{ color: "#1A3C6E" }}>
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
