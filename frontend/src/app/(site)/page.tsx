"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Play, ArrowRight, MapPin, Phone, Mail, ChevronRight, BookOpen, CalendarDays, Users } from "lucide-react";
import { mockModules, mockEvents, mockTestimonials, mockNewsBanners } from "@/lib/mockData";
import {
  AnimatedCounter, FadeIn, StaggerContainer, StaggerItem,
  HoverCard, TiltCard, PulseIcon, HeroText, NewsTicker,
} from "@/components/ui/animations";
import { motion, useReducedMotion } from "framer-motion";

const heroImages = [
  { src: "/logos/accueil1.png", size: "100% auto", position: "left top"  },
  { src: "/logos/accueil2.png", size: "auto 90%",  position: "center 5%" },
  { src: "/logos/accueil3.png", size: "auto 90%",  position: "center 5%" },
];

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % heroImages.length), 8000);
    return () => clearInterval(t);
  }, [shouldReduce]);

  return (
    <div>
      {/* ── BANDEAU D'INFORMATIONS ── */}
      <NewsTicker banners={mockNewsBanners} />

      {/* ── HERO ── */}
      <section className="relative flex flex-col text-white overflow-hidden min-h-[150vh]">

        {/* Images de fond — diaporama crossfade */}
        {heroImages.map((img, i) => (
          <div
            key={img.src}
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage: `url(${img.src})`,
              backgroundSize: img.size,
              backgroundPosition: img.position,
              backgroundRepeat: "no-repeat",
              zIndex: i === slide ? 1 : 0,
              opacity: i === slide ? 1 : 0,
              transition: shouldReduce ? "none" : "opacity 1s ease-in-out",
            }}
          />
        ))}

        {/* Overlay — assombrit pour la lisibilité des boutons */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.65) 100%)" }}
        />

        {/* Boutons CTA — en bas du hero */}
        <div className="relative z-20 flex-1 flex items-end justify-center px-4 pb-5 sm:pb-8">
          <div className="text-center">
            <HeroText delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/formations" className="btn-secondary text-base px-8 py-3">
                    <BookOpen size={18} /> Nos Formations
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/a-propos" className="btn-outline text-base px-8 py-3"
                    style={{ borderColor: "white", color: "white" }}>
                    <Play size={18} /> Découvrir MCTD
                  </Link>
                </motion.div>
              </div>
            </HeroText>

            {/* Indicateurs de diaporama */}
            <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Navigation du diaporama">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === slide}
                  aria-label={`Image ${i + 1}`}
                  onClick={() => setSlide(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === slide ? "24px" : "8px",
                    height: "8px",
                    backgroundColor: i === slide ? "white" : "rgba(255,255,255,0.45)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-20 border-t border-white/10"
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 grid grid-cols-3 gap-4 sm:gap-8 text-center">
            {[
              { value: "2500", suffix: "+", label: "Fidèles" },
              { value: "48",   suffix: "",  label: "Modules" },
              { value: "120",  suffix: "+", label: "Événements/an" },
            ].map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight" style={{ color: "#C8941A" }}>
                  <AnimatedCounter value={stat.value + stat.suffix} duration={2.5} />
                </p>
                <p className="text-blue-200 text-[10px] sm:text-xs md:text-sm mt-0.5 leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUI SOMMES-NOUS ── */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right">
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#C8941A" }}>Notre Mandat</span>
            <h2 className="section-title mt-2">Faire sortir le peuple de la pauvreté</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Le Ministère Catholique de Transformation et de Développement (MCTD) est une plateforme d'évangélisation et de développement intégral — spirituel, personnel et professionnel — fondée par Fr. Jean-Baptiste Gervais EHUY et son épouse Clarisse, ouverte à tous sans distinction de religion ou de classe sociale.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Notre vision est d'accompagner chaque personne vers la pleine mesure de sa vocation, en lui donnant les moyens de « vivre de la vie de Dieu » au quotidien.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link href="/a-propos" className="btn-primary">En savoir plus <ArrowRight size={16} /></Link>
            </motion.div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 gap-4">
            {[
              { icon: BookOpen, title: "Formation", desc: "E-Learning théologique et spirituel accessible en ligne" },
              { icon: Users, title: "Communauté", desc: "Une famille unie dans la prière et le service" },
              { icon: CalendarDays, title: "Événements", desc: "Retraites, concerts, conférences tout au long de l'année" },
              { icon: Heart, title: "Solidarité", desc: "Actions sociales et soutien aux plus vulnérables" },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <TiltCard className="card p-5 h-full">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: "#EFF6FF" }}>
                    <item.icon size={20} style={{ color: "#1A3C6E" }} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── FORMATIONS ── */}
      <section className="py-12 md:py-20 px-4" style={{ backgroundColor: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn className="flex justify-between items-end mb-10">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#C8941A" }}>E-Learning</span>
              <h2 className="section-title mt-1">Nos Formations</h2>
              <p className="section-subtitle">Approfondissez votre foi à travers nos modules en ligne</p>
            </div>
            <Link href="/formations" className="hidden sm:flex items-center gap-1 text-sm font-medium" style={{ color: "#1A3C6E" }}>
              Voir tout <ChevronRight size={16} />
            </Link>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockModules.map((module) => (
              <StaggerItem key={module.slug}>
                <HoverCard className="h-full">
                  <Link href={`/formations/${module.slug}`} className="card block h-full group">
                    <div className="h-40 flex items-center justify-center overflow-hidden" style={{ backgroundColor: "#1A3C6E" }}>
                      <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                        <BookOpen size={40} className="text-white/50" />
                      </motion.div>
                    </div>
                    <div className="p-4">
                      <span className="badge badge-primary text-xs">{module.category}</span>
                      <h3 className="font-semibold mt-2 mb-1 text-gray-900 group-hover:text-[#1A3C6E] transition-colors">{module.title}</h3>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{module.description}</p>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{module.lessons} cours</span>
                        <span>{module.duration}</span>
                      </div>
                    </div>
                  </Link>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── ÉVÉNEMENTS ── */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="flex justify-between items-end mb-10">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#C8941A" }}>Agenda</span>
              <h2 className="section-title mt-1">Prochains Événements</h2>
              <p className="section-subtitle">Ne manquez aucune activité de la communauté</p>
            </div>
            <Link href="/evenements" className="hidden sm:flex items-center gap-1 text-sm font-medium" style={{ color: "#1A3C6E" }}>
              Voir tout <ChevronRight size={16} />
            </Link>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEvents.slice(0, 3).map((event) => (
              <StaggerItem key={event.slug}>
                <HoverCard className="h-full">
                  <Link href={`/evenements/${event.slug}`} className="card block h-full group">
                    <div className="h-44 flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: "#122a4e" }}>
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                        <CalendarDays size={48} className="text-white/20" />
                      </motion.div>
                      <div className="absolute top-3 left-3">
                        <span className={`badge text-xs ${event.status === "complet" ? "badge-danger" : "badge-success"}`}>
                          {event.status === "complet" ? "Complet" : "Ouvert"}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <span className="badge badge-primary text-xs">{event.category}</span>
                      <h3 className="font-semibold mt-2 mb-1 text-gray-900 group-hover:text-[#1A3C6E] transition-colors">{event.title}</h3>
                      <div className="space-y-1 text-xs text-gray-500">
                        <p className="flex items-center gap-1"><CalendarDays size={12} /> {event.date} — {event.time}</p>
                        <p className="flex items-center gap-1"><MapPin size={12} /> {event.location}</p>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs">
                        <span className="text-gray-400">{event.price}</span>
                        {event.status !== "complet" && (
                          <span style={{ color: "#1A3C6E" }} className="font-medium">{event.placesLeft} places restantes</span>
                        )}
                      </div>
                    </div>
                  </Link>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section className="py-12 md:py-20 px-4" style={{ backgroundColor: "#1A3C6E" }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#C8941A" }}>Témoignages</span>
            <h2 className="font-heading text-3xl font-bold text-white mt-2">Ce que disent nos fidèles</h2>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {mockTestimonials.map((t) => (
              <StaggerItem key={t.name}>
                <motion.div
                  className="p-6 rounded-xl h-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.14)", y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-blue-100 italic mb-4 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                      style={{ backgroundColor: "#C8941A" }}
                      whileHover={{ scale: 1.15 }}>
                      {t.name[0]}
                    </motion.div>
                    <div>
                      <p className="font-semibold text-white text-sm">{t.name}</p>
                      <p className="text-blue-300 text-xs">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── DON CTA ── */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <PulseIcon className="inline-block mb-4">
              <Heart size={48} style={{ color: "#C8941A" }} />
            </PulseIcon>
            <h2 className="section-title">Soutenez la mission de MCTD</h2>
            <p className="section-subtitle">Votre générosité permet de maintenir les activités pastorales et les formations gratuites.</p>
          </FadeIn>

          <StaggerContainer className="flex flex-wrap gap-3 justify-center mb-6">
            {["1 000 FCFA", "5 000 FCFA", "10 000 FCFA", "25 000 FCFA"].map((amount) => (
              <StaggerItem key={amount}>
                <motion.div whileHover={{ scale: 1.07, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/don" className="px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-all hover:text-white inline-block"
                    style={{ borderColor: "#C8941A", color: "#C8941A" }}>
                    {amount}
                  </Link>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.2}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link href="/don" className="btn-secondary text-base px-8 py-3">
                <Heart size={18} /> Faire un don maintenant
              </Link>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ── CONTACT RAPIDE ── */}
      <section className="py-12 px-4" style={{ backgroundColor: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto">
          <StaggerContainer className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: "Notre adresse", lines: ["Cocody Riviera 3, cité EECI", "Abidjan, Côte d'Ivoire"] },
              { icon: Phone, title: "Téléphone", lines: ["+225 XX XX XX XX XX", "+225 XX XX XX XX XX"] },
              { icon: Mail, title: "Email", lines: ["contact@jbgmctd.org", "pastoral@jbgmctd.org"] },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <HoverCard>
                  <div className="flex items-start gap-4 p-5 card">
                    <motion.div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#1A3C6E" }}
                      whileHover={{ rotate: 10, scale: 1.1 }}>
                      <item.icon size={18} className="text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      {item.lines.map((line, i) => <p key={i} className="text-sm text-gray-500">{line}</p>)}
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
