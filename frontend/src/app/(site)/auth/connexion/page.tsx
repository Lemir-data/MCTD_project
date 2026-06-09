"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function ConnexionPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
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
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#1A3C6E" }}>
            <Lock size={24} className="text-white" />
          </div>
          <h1 className="font-heading text-3xl font-bold" style={{ color: "#1A3C6E" }}>Connexion</h1>
          <p className="text-gray-500 text-sm mt-1">Accédez à votre espace personnel MCTD</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {error && (
              <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
                {error}
              </p>
            )}
            <div>
              <label htmlFor="connexion-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="connexion-email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20"
                />
              </div>
            </div>
            <div>
              <label htmlFor="connexion-password" className="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="connexion-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs hover:underline"
                style={{ color: "#1A3C6E" }}
                aria-label="Réinitialiser le mot de passe — fonctionnalité à venir"
              >
                Mot de passe oublié ?
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 text-center disabled:opacity-60"
            >
              {loading ? "Connexion…" : "Se connecter"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Pas encore de compte ?{" "}
              <Link href="/auth/inscription" className="font-semibold" style={{ color: "#1A3C6E" }}>
                Créer un compte
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          En vous connectant, vous acceptez nos conditions d'utilisation.
        </p>
      </div>
    </div>
  );
}
