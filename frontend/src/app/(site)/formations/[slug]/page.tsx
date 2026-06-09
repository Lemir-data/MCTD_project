import Link from "next/link";
import { mockModules, mockCourses } from "@/lib/mockData";
import { BookOpen, Clock, Users, CheckCircle, Lock, ChevronLeft, Play, FileText } from "lucide-react";

export default async function ModuleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const module = mockModules.find((m) => m.slug === slug) ?? mockModules[0];

  return (
    <div>
      {/* Header */}
      <section className="py-16 px-4 text-white" style={{ background: "linear-gradient(135deg, #1A3C6E, #122a4e)" }}>
        <div className="max-w-5xl mx-auto">
          <Link href="/formations" className="flex items-center gap-1 text-blue-300 text-sm mb-6 hover:text-white">
            <ChevronLeft size={16} /> Retour aux formations
          </Link>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <span className="badge text-xs mb-3 inline-block" style={{ backgroundColor: "rgba(200,148,26,0.2)", color: "#e0a830" }}>
                {module.category}
              </span>
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">{module.title}</h1>
              <p className="text-blue-200 leading-relaxed mb-6">{module.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-blue-200">
                <span className="flex items-center gap-1.5"><Clock size={15} /> {module.duration}</span>
                <span className="flex items-center gap-1.5"><BookOpen size={15} /> {module.lessons} cours</span>
                <span className="flex items-center gap-1.5"><Users size={15} /> {module.enrolled} apprenants</span>
              </div>
              <p className="text-blue-300 text-sm mt-4">Formateur : <span className="text-white font-medium">{module.instructor}</span></p>
            </div>
            <div className="md:w-72">
              <div className="card p-6">
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold" style={{ color: "#1A3C6E" }}>Gratuit</p>
                  <p className="text-gray-500 text-sm">Inscription requise</p>
                </div>
                <Link href="/auth/inscription" className="btn-secondary w-full justify-center mb-3">
                  S'inscrire à ce module
                </Link>
                <Link href="/auth/connexion" className="btn-outline w-full justify-center">
                  Déjà inscrit ? Continuer
                </Link>
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-500">
                  <p>✓ Accès illimité au contenu</p>
                  <p>✓ Certificat de complétion</p>
                  <p>✓ Support de cours PDF</p>
                  <p>✓ Section questions/réponses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu du module */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="font-heading text-2xl font-bold mb-6" style={{ color: "#1A3C6E" }}>Programme du module</h2>

            {/* Barre de progression */}
            <div className="card p-4 mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progression</span>
                <span style={{ color: "#1A3C6E" }}>2 / {mockCourses.length} cours complétés</span>
              </div>
              <div className="h-2 rounded-full bg-gray-200">
                <div className="h-2 rounded-full" style={{ backgroundColor: "#1A3C6E", width: "33%" }} />
              </div>
            </div>

            {/* Liste des cours */}
            <div className="space-y-2">
              {mockCourses.map((course, i) => (
                <div key={course.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                    course.completed ? "border-green-200 bg-green-50" :
                    course.isPreview ? "border-gray-200 hover:border-[#1A3C6E] cursor-pointer" :
                    "border-gray-100 bg-gray-50"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                    style={{ backgroundColor: course.completed ? "#dcfce7" : "#EFF6FF", color: course.completed ? "#16a34a" : "#1A3C6E" }}>
                    {course.completed ? <CheckCircle size={16} /> : i + 1}
                  </div>
                  <div className="flex-1">
                    <Link
                      href={course.isPreview || course.completed ? `/formations/${slug}/cours/${course.id}` : "#"}
                      className={`font-medium text-sm ${course.isPreview || course.completed ? "hover:text-[#1A3C6E]" : "text-gray-400"}`}
                    >
                      {course.title}
                    </Link>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        {course.type === "video" ? <Play size={10} /> : <FileText size={10} />}
                        {course.type === "video" ? "Vidéo" : "PDF"} — {course.duration}
                      </span>
                      {course.isPreview && <span className="badge badge-success text-xs">Aperçu gratuit</span>}
                    </div>
                  </div>
                  {!course.isPreview && !course.completed && <Lock size={14} className="text-gray-300" />}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 mb-3">À propos du formateur</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: "#1A3C6E" }}>
                  {module.instructor.split(" ").pop()?.[0]}
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-900">{module.instructor}</p>
                  <p className="text-xs text-gray-400">Formateur MCTD</p>
                </div>
              </div>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Ce que vous apprendrez</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2"><CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />Les bases de la foi catholique</li>
                <li className="flex items-start gap-2"><CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />La prière et la méditation</li>
                <li className="flex items-start gap-2"><CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />L'étude des textes bibliques</li>
                <li className="flex items-start gap-2"><CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />Vivre sa foi au quotidien</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
