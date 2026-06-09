"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Users, BookOpen, CalendarDays, Heart, Image, FileText,
  LogOut, ChevronRight, ExternalLink, Menu, X, Settings, Shield, Database,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdminThemeProvider, useAdminTheme } from "@/contexts/AdminThemeContext";

const navItems = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/utilisateurs", label: "Fidèles", icon: Users },
  { href: "/admin/elearning", label: "E-Learning", icon: BookOpen },
  { href: "/admin/evenements", label: "Événements", icon: CalendarDays },
  { href: "/admin/dons", label: "Dons & Finance", icon: Heart },
  { href: "/admin/galerie", label: "Galerie", icon: Image },
  { href: "/admin/logs", label: "Logs activité", icon: FileText },
  { href: "/admin/roles", label: "Rôles", icon: Shield },
  { href: "/admin/systeme", label: "Système", icon: Database },
  { href: "/admin/parametres", label: "Paramètres", icon: Settings },
];

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [siteLinkHover, setSiteLinkHover] = useState(false);
  const [logsUnseen, setLogsUnseen] = useState(true);
  const { isDark } = useAdminTheme();

  useEffect(() => {
    if (pathname === "/admin/logs") setLogsUnseen(false);
  }, [pathname]);

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    setMobileOpen(false);
    router.push("/");
  };

  const dk = isDark;
  const bg      = dk ? "#111827" : "#F8FAFC";
  const sidebarBg = dk ? "#0d1a2e" : undefined;
  const topbarBg  = dk ? "#1F2937" : "#ffffff";
  const topbarBorder = dk ? "#374151" : "#E5E7EB";
  const textPrimary  = dk ? "#F9FAFB" : "#111827";
  const textMuted    = dk ? "#9CA3AF" : "#6B7280";
  const cardBg       = dk ? "#1F2937" : "#ffffff";
  const cardBorder   = dk ? "#374151" : "#E5E7EB";
  const hoverBg      = dk ? "#374151" : "#F9FAFB";

  return (
    <div className="min-h-screen" style={{ backgroundColor: bg }}>

      {/* ── Sidebar desktop ── */}
      <aside className="admin-sidebar hidden md:flex" style={sidebarBg ? { backgroundColor: sidebarBg } : {}}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/logos/logo_mctd.jpg" alt="MCTD" className="h-10 w-auto object-contain" />
            <div>
              <p className="font-heading text-white text-base font-bold leading-none">MCTD Admin</p>
              <p className="text-blue-300 text-xs mt-0.5">Panneau d'administration</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                  active ? "text-white" : "text-blue-200 hover:text-white hover:bg-white/10"
                }`}
                style={active ? { backgroundColor: "rgba(255,255,255,0.15)" } : {}}>
                <span className="relative inline-flex shrink-0">
                  <item.icon size={16} className={active ? "text-white" : "text-blue-300 group-hover:text-white"} />
                  {item.href === "/admin/logs" && logsUnseen && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2" title="Logs non consultés">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </span>
                  )}
                </span>
                {item.label}
                {active && <ChevronRight size={13} className="ml-auto opacity-70" />}
              </Link>
            );
          })}
        </nav>

        {/* Pied sidebar */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-2" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ backgroundColor: "#C8941A" }}>A</div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">Administrateur</p>
              <p className="text-blue-300 text-xs truncate">admin@jbgmctd.org</p>
            </div>
          </div>
          <button onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-2 px-4 py-2.5 text-blue-200 hover:text-white text-sm rounded-xl hover:bg-white/10 transition-colors w-full text-left">
            <LogOut size={15} /> Se déconnecter
          </button>
        </div>
      </aside>

      {/* ── Drawer mobile ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)} />
            <motion.aside
              className="fixed top-0 left-0 h-full w-64 z-50 flex flex-col md:hidden"
              style={{ backgroundColor: "#1A3C6E" }}
              initial={{ x: -264 }} animate={{ x: 0 }} exit={{ x: -264 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}>
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <p className="font-heading text-white font-bold">MCTD Admin</p>
                <button onClick={() => setMobileOpen(false)} className="text-blue-200 hover:text-white">
                  <X size={18} />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                        active ? "text-white bg-white/15" : "text-blue-200 hover:text-white hover:bg-white/10"
                      }`}>
                      <span className="relative inline-flex shrink-0">
                        <item.icon size={16} />
                        {item.href === "/admin/logs" && logsUnseen && (
                          <span className="absolute -top-1 -right-1 flex h-2 w-2" title="Logs non consultés">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                          </span>
                        )}
                      </span>
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-white/10">
                <button onClick={() => setShowLogoutConfirm(true)}
                  className="flex items-center gap-2 px-4 py-2 text-blue-200 hover:text-white text-sm w-full text-left">
                  <LogOut size={15} /> Se déconnecter
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Colonne contenu ── */}
      <div className="md:ml-[260px] flex flex-col min-h-screen" style={{ backgroundColor: bg }}>

        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-5 py-3"
          style={{ backgroundColor: topbarBg, borderBottom: `1px solid ${topbarBorder}` }}>
          {/* Burger mobile + titre */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: textMuted, backgroundColor: "transparent" }}
              onClick={() => setMobileOpen(true)}>
              <Menu size={18} />
            </button>
            {(() => {
              const current = navItems.find((n) => n.href === pathname);
              return current ? (
                <div className="flex items-center gap-2">
                  <current.icon size={16} style={{ color: "#1A3C6E" }} />
                  <span className="font-semibold text-sm" style={{ color: textPrimary }}>{current.label}</span>
                </div>
              ) : null;
            })()}
          </div>

          {/* Actions droite */}
          <div className="flex items-center gap-2 ml-auto">
            <Link href="/" target="_blank"
              onMouseEnter={() => setSiteLinkHover(true)}
              onMouseLeave={() => setSiteLinkHover(false)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
              style={siteLinkHover
                ? { border: "1px solid #1A3C6E", color: "#1A3C6E", backgroundColor: "rgba(26,60,110,0.08)" }
                : { border: `1px solid ${cardBorder}`, color: textMuted, backgroundColor: hoverBg }}>
              <ExternalLink size={12} /> Voir le site
            </Link>
          </div>
        </header>

        {/* Contenu de la page */}
        <main className="flex-1 overflow-auto notranslate" translate="no">
          {children}
        </main>
      </div>

      {/* ── Modale de confirmation de déconnexion ── */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowLogoutConfirm(false)}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#EFF6FF" }}>
                <LogOut size={20} style={{ color: "#1A3C6E" }} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Se déconnecter ?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Vous serez redirigé vers le site et devrez vous reconnecter pour accéder de nouveau au panneau d'administration.
              </p>
              <div className="flex gap-2">
                <button onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <motion.button
                  onClick={confirmLogout}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors">
                  Se déconnecter
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminThemeProvider>
  );
}
