"use client";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { Check } from "lucide-react";
import { motion, LayoutGroup, useReducedMotion } from "framer-motion";

const benefits = [
  "Formations théologiques et spirituelles gratuites",
  "Inscription simplifiée aux événements et retraites",
  "Vos informations pré-remplies pour les dons",
];

// Écrin commun des pages connexion / inscription : panneau de bienvenue
// avec la photo de la communauté + bascule claire entre les deux modes.
export function AuthShell({ mode, children }: { mode: "connexion" | "inscription"; children: ReactNode }) {
  const isConnexion = mode === "connexion";
  const shouldReduce = useReducedMotion();

  const fadeUp = (delay: number) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <div className="grid lg:grid-cols-2 lg:h-[calc(100vh-4rem)]">
      {/* Panneau de bienvenue — photo de la communauté, fixe pendant le scroll du formulaire */}
      <div className="relative overflow-hidden flex items-end lg:h-full" style={{ backgroundColor: "#122a4e" }}>
        <Image
          src="/logos/accueil1.webp"
          alt=""
          fill
          quality={100}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[4%_top] scale-[1.07] origin-top"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(13,28,53,0.92) 0%, rgba(13,28,53,0.55) 60%, rgba(13,28,53,0.35) 100%)" }}
        />
        <div className="relative z-10 w-full max-w-md ml-auto px-6 sm:px-10 pt-12 pb-7 lg:pt-20 lg:pb-11 text-white text-right">
          <motion.div {...fadeUp(0)}>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold leading-tight">
              {isConnexion ? "Bon retour parmi nous" : "Rejoignez la communauté"}
            </h1>
            <motion.div
              className="h-[3px] w-16 rounded-full mt-4 origin-right ml-auto"
              style={{ backgroundColor: "#C8941A" }}
              initial={shouldReduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
          <motion.div {...fadeUp(0.15)}>
            {isConnexion ? (
              <p className="text-blue-100 text-sm mt-5 max-w-md ml-auto leading-relaxed">
                Retrouvez vos formations, vos inscriptions aux événements et la vie de la communauté MCTD.
              </p>
            ) : (
              <ul className="mt-6 space-y-3 max-w-md ml-auto text-sm">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-blue-100">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: "#C8941A" }}
                      aria-hidden="true"
                    >
                      <Check size={12} className="text-white" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
            <p className="font-heading italic text-sm mt-7" style={{ color: "#E0A830" }}>
              « Vivre de la vie de Dieu »
            </p>
          </motion.div>
        </div>
      </div>

      {/* Formulaire — défile dans son propre conteneur sans déplacer le panneau image */}
      <div className="flex items-center justify-center lg:items-start px-4 py-12 lg:py-16 lg:h-full lg:overflow-y-auto" style={{ backgroundColor: "#F8FAFC" }}>
        <div className="w-full max-w-md">
          {/* Bascule connexion / inscription */}
          <LayoutGroup id="auth-tabs">
            <nav className="flex rounded-xl p-1 mb-6 bg-white border border-gray-200" aria-label="Connexion ou inscription">
              {[
                { href: "/auth/connexion", label: "Connexion", active: isConnexion },
                { href: "/auth/inscription", label: "Créer un compte", active: !isConnexion },
              ].map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  aria-current={tab.active ? "page" : undefined}
                  className={`relative flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    tab.active ? "text-white" : "text-gray-600 hover:text-[#1A3C6E]"
                  }`}
                >
                  {tab.active && (
                    shouldReduce ? (
                      <span className="absolute inset-0 rounded-lg" style={{ backgroundColor: "#1A3C6E" }} />
                    ) : (
                      <motion.span
                        layoutId="auth-tabs-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{ backgroundColor: "#1A3C6E" }}
                        transition={{ type: "tween", duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </Link>
              ))}
            </nav>
          </LayoutGroup>

          <div className="card p-8 bg-white">{children}</div>

          <p className="text-center text-xs text-gray-500 mt-6">
            En continuant, vous acceptez nos{" "}
            <Link href="/confidentialite" className="hover:underline font-medium" style={{ color: "#1A3C6E" }}>
              règles de confidentialité
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
