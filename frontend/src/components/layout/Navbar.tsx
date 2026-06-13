"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { ScrollProgress } from "@/components/ui/animations";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À Propos" },
  { href: "/formations", label: "Formations" },
  { href: "/evenements", label: "Événements" },
  { href: "/galerie", label: "Galerie" },
  { href: "/boutique", label: "Boutique" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
    <ScrollProgress />
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E2E8F0] notranslate transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}
      translate="no"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src="/logos/logo_mctd.jpg" alt="MCTD" className="h-10 w-auto object-contain" />
            <div>
              <span className="font-bold text-lg font-heading" style={{ color: "#1A3C6E" }}>
                MCTD
              </span>
              <p className="text-[10px] text-gray-500 leading-tight hidden lg:block">
                Ministère Catholique de<br />Transformation et de Développement
              </p>
            </div>
          </Link>

          {/* Desktop Nav — flex-1 + justify-end pour coller vers la droite */}
          <nav className="hidden lg:flex flex-1 items-center justify-end gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive(link.href)
                    ? "text-[#1A3C6E] bg-blue-100"
                    : "text-gray-600 hover:text-[#1A3C6E] hover:bg-blue-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 ml-auto lg:ml-0 shrink-0">
            <Link
              href="/don"
              className="btn-nav-don heartbeat-hover hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white whitespace-nowrap shrink-0"
              style={{ backgroundColor: "#C8941A" }}
            >
              <motion.span
                className="inline-flex"
                animate={shouldReduce ? {} : { scale: [1, 1.22, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart size={15} />
              </motion.span>
              Faire un don
            </Link>
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="btn-nav-connexion hidden lg:block px-4 py-2 rounded-lg text-sm font-medium border-2"
                style={{ borderColor: "#1A3C6E" }}
              >
                Mon Espace
              </Link>
            ) : (
              <Link
                href="/auth/connexion"
                className="btn-nav-connexion hidden lg:block px-4 py-2 rounded-lg text-sm font-medium border-2"
                style={{ borderColor: "#1A3C6E" }}
              >
                Connexion
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
      {mobileOpen && (
        <motion.div
          className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1"
          initial={shouldReduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                isActive(link.href)
                  ? "text-[#1A3C6E] bg-blue-100"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/don" onClick={() => setMobileOpen(false)} className="btn-secondary heartbeat-hover text-center justify-center">
              <Heart size={15} /> Faire un don
            </Link>
            {isLoggedIn ? (
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="btn-outline text-center justify-center">
                Mon Espace
              </Link>
            ) : (
              <Link href="/auth/connexion" onClick={() => setMobileOpen(false)} className="btn-outline text-center justify-center">
                Connexion
              </Link>
            )}
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
    </>
  );
}
