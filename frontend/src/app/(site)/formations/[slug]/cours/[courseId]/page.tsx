import Link from "next/link";
import { mockCourses } from "@/lib/mockData";
import { ChevronLeft, ChevronRight, CheckCircle, Play, FileText, MessageSquare } from "lucide-react";

export default async function CoursPage({ params }: { params: Promise<{ slug: string; courseId: string }> }) {
  const { slug, courseId } = await params;
  const courseIndex = mockCourses.findIndex((c) => c.id === courseId);
  const course = mockCourses[courseIndex] ?? mockCourses[0];
  const prev = mockCourses[courseIndex - 1];
  const next = mockCourses[courseIndex + 1];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8FAFC" }}>
      {/* Top bar */}
      <div className="sticky top-16 z-20 bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link href={`/formations/${slug}`} className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#1A3C6E]">
            <ChevronLeft size={16} /> Retour au module
          </Link>
          <div className="flex-1 max-w-xs">
            <div className="h-1.5 rounded-full bg-gray-200">
              <div className="h-1.5 rounded-full" style={{ backgroundColor: "#1A3C6E", width: `${((courseIndex + 1) / mockCourses.length) * 100}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-1 text-center">{courseIndex + 1} / {mockCourses.length}</p>
          </div>
          <button className="btn-primary py-2 text-sm">
            <CheckCircle size={15} /> Marquer comme vu
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        {/* Lecteur principal */}
        <div className="lg:col-span-2">
          {/* Lecteur vidéo */}
          <div className="rounded-xl overflow-hidden mb-6 flex items-center justify-center aspect-video"
            style={{ backgroundColor: "#0F172A" }}>
            <div className="text-center text-white">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: "rgba(200,148,26,0.8)" }}>
                <Play size={28} />
              </div>
              <p className="text-sm text-gray-300">Lecteur vidéo MinIO</p>
              <p className="text-xs text-gray-500 mt-1">{course.duration}</p>
            </div>
          </div>

          <h1 className="font-heading text-2xl font-bold mb-2" style={{ color: "#1A3C6E" }}>{course.title}</h1>
          <p className="text-gray-500 text-sm mb-6 flex items-center gap-2">
            {course.type === "video" ? <Play size={14} /> : <FileText size={14} />}
            {course.type === "video" ? "Vidéo" : "Document PDF"} — {course.duration}
          </p>

          {/* Tabs contenu */}
          <div className="card">
            <div className="flex border-b border-gray-100">
              {["Contenu", "Notes", "Questions"].map((tab, i) => (
                <button key={tab} className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${i === 0 ? "border-[#1A3C6E] text-[#1A3C6E]" : "border-transparent text-gray-500"}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6">
              <p className="text-gray-600 leading-relaxed text-sm">
                Dans ce cours, nous explorons les fondements essentiels de ce sujet en nous appuyant sur l'enseignement de l'Église catholique et les textes bibliques. Vous découvrirez comment appliquer ces principes dans votre vie quotidienne.
              </p>
              <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: "#F8FAFC" }}>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Points clés</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />Comprendre le contexte théologique</li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />Appliquer les principes dans la vie quotidienne</li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />Approfondir sa relation avec Dieu</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section commentaires */}
          <div className="card mt-6 p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={18} style={{ color: "#1A3C6E" }} />
              <h3 className="font-semibold text-gray-900">Questions et Commentaires</h3>
            </div>
            <textarea
              placeholder="Posez votre question ou partagez vos réflexions..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:border-[#1A3C6E]"
            />
            <button className="btn-primary mt-2 py-2">Envoyer</button>
          </div>
        </div>

        {/* Sidebar — liste des cours */}
        <div>
          <div className="card p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Cours du module</h3>
            <div className="space-y-2">
              {mockCourses.map((c, i) => (
                <Link
                  key={c.id}
                  href={`/formations/${slug}/cours/${c.id}`}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    c.id === courseId
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    c.completed ? "bg-green-100 text-green-600" : c.id === courseId ? "text-white" : "bg-gray-100 text-gray-500"
                  }`}
                    style={c.id === courseId ? { backgroundColor: "#1A3C6E" } : {}}>
                    {c.completed ? <CheckCircle size={12} /> : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${c.id === courseId ? "text-[#1A3C6E]" : "text-gray-700"}`}>{c.title}</p>
                    <p className="text-xs text-gray-400">{c.duration}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation bas */}
      <div className="border-t border-gray-200 bg-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between">
          {prev ? (
            <Link href={`/formations/${slug}/cours/${prev.id}`} className="btn-outline">
              <ChevronLeft size={16} /> Cours précédent
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/formations/${slug}/cours/${next.id}`} className="btn-primary">
              Cours suivant <ChevronRight size={16} />
            </Link>
          ) : (
            <button className="btn-secondary">
              <CheckCircle size={16} /> Terminer le module
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
