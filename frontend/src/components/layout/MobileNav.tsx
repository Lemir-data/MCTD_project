"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, GraduationCap, Heart, CalendarDays, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function MobileNav() {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();

  const tabs = [
    { href: "/", icon: Home, label: "Accueil" },
    { href: "/formations", icon: GraduationCap, label: "Formations" },
    { href: "/don", icon: Heart, label: "Donner", center: true },
    { href: "/evenements", icon: CalendarDays, label: "Événements" },
    { href: isLoggedIn ? "/dashboard" : "/auth/connexion", icon: User, label: "Mon Compte" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden notranslate"
      translate="no"
      style={{
        height: "calc(64px + env(safe-area-inset-bottom, 0px))",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        backgroundColor: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <div className="flex items-center justify-around h-full px-2">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          const Icon = tab.icon;

          if (tab.center) {
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex flex-col items-center justify-center relative"
                style={{ marginTop: "-20px" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    backgroundColor: "#C8941A",
                    boxShadow: "0 4px 16px rgba(200,148,26,0.4)",
                  }}
                >
                  <Icon size={22} color="white" />
                </div>
                <span className="text-[10px] mt-1 font-semibold" style={{ color: "#C8941A" }}>
                  {tab.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1 relative"
            >
              <Icon
                size={20}
                color={active ? "#1A3C6E" : "#94A3B8"}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span
                className="text-[10px] font-medium"
                style={{ color: active ? "#1A3C6E" : "#94A3B8" }}
              >
                {tab.label}
              </span>
              <AnimatePresence>
                {active && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute bottom-0 w-8 h-0.5 rounded-full"
                    style={{ backgroundColor: "#1A3C6E" }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
