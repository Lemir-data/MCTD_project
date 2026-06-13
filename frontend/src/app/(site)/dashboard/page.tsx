"use client";
import Link from "next/link";
import { BookOpen, CalendarDays, Heart, TrendingUp, ChevronRight, Play, CheckCircle } from "lucide-react";
import { mockModules, mockCourses, mockEvents } from "@/lib/mockData";
import { AnimatedCounter, StaggerContainer, StaggerItem, HoverCard } from "@/components/ui/animations";

const stats = [
  { label: "Formations en cours", value: "2", icon: BookOpen, color: "#1A3C6E" },
  { label: "Cours complétés", value: "8", icon: CheckCircle, color: "#16a34a" },
  { label: "Événements à venir", value: "3", icon: CalendarDays, color: "#C8941A" },
  { label: "Total dons (FCFA)", value: "25000", icon: Heart, color: "#EF4444" },
];

export default function DashboardPage() {
  return (
    <div className="py-10 px-4" style={{ backgroundColor: "#F8FAFC", minHeight: "80vh" }}>
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-bold" style={{ color: "#1A3C6E" }}>
            Bonjour, Jean-Baptiste 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">Bienvenue sur votre espace personnel MCTD</p>
        </div>

        {/* Stats */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <HoverCard>
                <div className="card p-5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${s.color}15` }}>
                    <s.icon size={20} style={{ color: s.color }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      <AnimatedCounter value={s.value} duration={1.5} />
                    </p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                  </div>
                </div>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Formations en cours */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Formations en cours</h2>
                <Link href="/formations" className="text-sm font-medium flex items-center gap-1" style={{ color: "#1A3C6E" }}>
                  Voir tout <ChevronRight size={14} />
                </Link>
              </div>
              <div className="space-y-4">
                {mockModules.slice(0, 2).map((mod) => (
                  <div key={mod.slug} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#EFF6FF" }}>
                      <BookOpen size={20} style={{ color: "#1A3C6E" }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{mod.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{mod.instructor}</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progression</span>
                          <span style={{ color: "#1A3C6E" }}>33%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-gray-200">
                          <div className="h-1.5 rounded-full" style={{ backgroundColor: "#1A3C6E", width: "33%" }} />
                        </div>
                      </div>
                    </div>
                    <Link href={`/formations/${mod.slug}/cours/${mockCourses[0].id}`}
                      className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg shrink-0 transition-colors"
                      style={{ backgroundColor: "#EFF6FF", color: "#1A3C6E" }}>
                      <Play size={12} /> Reprendre
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Dernier cours consulté */}
            <div className="card p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Dernière activité</h2>
              <div className="space-y-3">
                {mockCourses.slice(0, 3).map((course, i) => (
                  <div key={course.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${course.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                      {course.completed ? <CheckCircle size={13} /> : i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{course.title}</p>
                      <p className="text-xs text-gray-500">{course.duration}</p>
                    </div>
                    {course.completed && <span className="text-xs text-green-600 font-medium">Complété</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profil rapide */}
            <div className="card p-6 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold text-white"
                style={{ backgroundColor: "#1A3C6E" }}>
                JB
              </div>
              <p className="font-semibold text-gray-900">Kouassi Jean-Baptiste</p>
              <p className="text-xs text-gray-500 mt-0.5">jean@email.com</p>
              <p className="text-xs mt-2 px-3 py-1 rounded-full inline-block" style={{ backgroundColor: "#EFF6FF", color: "#1A3C6E" }}>
                Membre actif
              </p>
              <Link href="/dashboard/profil" className="btn-outline w-full justify-center mt-4 text-sm py-2">
                Modifier le profil
              </Link>
            </div>

            {/* Prochains événements */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm text-gray-900">Mes inscriptions</h3>
                <Link href="/dashboard/inscriptions" className="text-xs" style={{ color: "#1A3C6E" }}>Voir tout</Link>
              </div>
              <div className="space-y-3">
                {mockEvents.slice(0, 2).map((event) => (
                  <div key={event.slug} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#FEF3C7" }}>
                      <CalendarDays size={14} style={{ color: "#C8941A" }} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-800 leading-snug">{event.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions rapides */}
            <div className="card p-5">
              <h3 className="font-semibold text-sm text-gray-900 mb-3">Actions rapides</h3>
              <div className="space-y-2">
                {[
                  { label: "Faire un don", href: "/don", icon: Heart },
                  { label: "Voir les événements", href: "/evenements", icon: CalendarDays },
                  { label: "Explorer les formations", href: "/formations", icon: BookOpen },
                ].map((item) => (
                  <Link key={item.href} href={item.href}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700">
                    <item.icon size={15} style={{ color: "#1A3C6E" }} />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
