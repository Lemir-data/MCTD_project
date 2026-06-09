"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Heart, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À Propos" },
  {
    label: "Formations",
    href: "/formations",
    children: [
      { href: "/formations", label: "Tous les modules" },
      { href: "/formations?cat=theologie", label: "Théologie" },
      { href: "/formations?cat=bible", label: "Étude Biblique" },
      { href: "/formations?cat=leadership", label: "Leadership" },
      { href: "/formations?cat=spiritualite", label: "Spiritualité" },
    ],
  },
  { href: "/evenements", label: "Événements" },
  { href: "/galerie", label: "Galerie" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E2E8F0] shadow-sm notranslate" translate="no">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6 xl:gap-10 min-w-0">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <img src="/logos/logo_mctd.jpg" alt="MCTD" className="h-10 w-auto object-contain" />
              <div>
                <span className="font-bold text-lg" style={{ color: "#1A3C6E", fontFamily: "Playfair Display, serif" }}>
                  MCTD
                </span>
                <p className="text-[10px] text-gray-500 leading-tight hidden xl:block">
                  Ministère Catholique de<br />Transformation et de Développement
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative group">
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen}
                      className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                        isActive(link.href)
                          ? "text-[#1A3C6E] bg-blue-50"
                          : "text-gray-600 hover:text-[#1A3C6E] hover:bg-blue-50"
                      }`}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      {link.label}
                      <ChevronDown size={14} />
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-lg shadow-lg border border-gray-100 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#1A3C6E]"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                      isActive(link.href)
                        ? "text-[#1A3C6E] bg-blue-50"
                        : "text-gray-600 hover:text-[#1A3C6E] hover:bg-blue-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 ml-6 lg:ml-16">
            <Link
              href="/don"
              className="btn-nav-don hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white whitespace-nowrap shrink-0"
              style={{ backgroundColor: "#C8941A" }}
            >
              <Heart size={15} />
              Faire un don
            </Link>
            {!isLoggedIn && (
              <>
                <Link
                  href="/auth/inscription"
                  className="btn-nav-inscription hidden lg:block px-4 py-2 rounded-lg text-sm font-medium border-2"
                  style={{ borderColor: "#C8941A" }}
                >
                  Inscription
                </Link>
                <Link
                  href="/auth/connexion"
                  className="btn-nav-connexion hidden lg:block px-4 py-2 rounded-lg text-sm font-medium border-2"
                  style={{ borderColor: "#1A3C6E" }}
                >
                  Connexion
                </Link>
              </>
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
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                isActive(link.href)
                  ? "text-[#1A3C6E] bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/don" onClick={() => setMobileOpen(false)} className="btn-secondary text-center justify-center">
              <Heart size={15} /> Faire un don
            </Link>
            {!isLoggedIn && (
              <>
                <Link href="/auth/inscription" onClick={() => setMobileOpen(false)} className="btn-outline-gold text-center justify-center">
                  Inscription
                </Link>
                <Link href="/auth/connexion" onClick={() => setMobileOpen(false)} className="btn-outline text-center justify-center">
                  Connexion
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
