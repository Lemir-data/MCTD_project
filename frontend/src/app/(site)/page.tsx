"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight, MapPin, Mail, CalendarDays, ChevronRight, BookOpen, Users } from "lucide-react";
import { mockModules, mockEvents, mockTestimonials, mockNewsBanners } from "@/lib/mockData";
import {
  FadeIn, StaggerContainer, StaggerItem,
  HoverCard, HeroText, NewsTicker, PulseIcon,
} from "@/components/ui/animations";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const heroImages = [
  { src: "/logos/accueil1.webp", alt: "La communauté MCTD rassemblée en célébration" },
  { src: "/logos/accueil2.webp", alt: "Affiche d'événement du ministère MCTD" },
  { src: "/logos/accueil3.webp", alt: "Affiche d'événement du ministère MCTD" },
];

const engagements = [
  { icon: BookOpen, title: "Formation", desc: "E-Learning théologique et spirituel accessible en ligne" },
  { icon: Users, title: "Communauté", desc: "Une famille unie dans la prière et le service" },
  { icon: CalendarDays, title: "Événements", desc: "Retraites, concerts, conférences tout au long de l'année" },
  { icon: Heart, title: "Solidarité", desc: "Actions sociales et soutien aux plus vulnérables" },
];

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % heroImages.length), 18000);
    return () => clearInterval(t);
  }, [shouldReduce]);

  return (
    <div>
      {/* ── BANDEAU D'INFORMATIONS ── */}
      <NewsTicker banners={mockNewsBanners} />

      {/* ── HERO ── */}
      <section
        className="relative flex flex-col justify-end text-white overflow-hidden"
        style={{ minHeight: "min(98svh, 980px)", backgroundColor: "#122a4e" }}
      >
        {/* Images de fond — diaporama crossfade + Ken Burns lent sur l'image active */}
        {heroImages.map((img, i) => (
          <div
            key={img.src}
            className={`absolute inset-y-0 overflow-hidden ${i === 0 ? "inset-x-0" : "right-0 left-0 sm:left-[42%] lg:left-1/2"}`}
            style={{
              zIndex: i === slide ? 1 : 0,
              opacity: i === slide ? 1 : 0,
              transition: shouldReduce ? "none" : "opacity 1s ease-in-out",
            }}
          >
            <div className={`absolute inset-0${i === slide && !shouldReduce ? " kenburns" : ""}`}>
              <Image
                src={img.src}
                alt={i === slide ? img.alt : ""}
                fill
                priority={i === 0}
                sizes={i === 0 ? "100vw" : "(min-width: 1024px) 58vw, 100vw"}
                className={`object-cover ${i === 0 ? "object-[center_27%]" : "object-center"}`}
              />
            </div>
          </div>
        ))}

        {/* Overlay — lisibilité du titre et des boutons */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(13,28,53,0.45) 0%, rgba(13,28,53,0.25) 45%, rgba(13,28,53,0.85) 100%)" }}
        />

        {/* Rideau qui tombe à gauche — images 2 et 3, image visible sur la droite */}
        <AnimatePresence>
          {slide !== 0 && (
            <motion.div
              key={`curtain-${slide}`}
              className="absolute inset-y-0 left-0 z-10 w-full sm:w-[58%] lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-16 origin-top"
              style={{
                background: "linear-gradient(160deg, rgba(26,60,110,0.97) 0%, rgba(18,42,78,0.97) 100%)",
              }}
              initial={shouldReduce ? false : { scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={shouldReduce ? undefined : { scaleY: 0, opacity: 0 }}
              transition={{ duration: shouldReduce ? 0 : 1.4, ease: [0.65, 0, 0.35, 1] }}
            >
              {/* Texte affiché uniquement sur les images 2 et 3 du diaporama */}
              <motion.div
                initial={shouldReduce ? false : { opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduce ? undefined : { opacity: 0, y: -40 }}
                transition={{ duration: shouldReduce ? 0 : 1, delay: shouldReduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-semibold tracking-wide text-sm sm:text-base" style={{ color: "#E0A830" }}>
                  Ministère Catholique de Transformation et de Développement
                </p>
                <h1 className="font-heading font-bold text-display mt-2 max-w-3xl">
                  Vivre de la vie de Dieu
                </h1>
                {/* Soulignement or — se trace après l'apparition du titre */}
                <motion.div
                  className="h-[3px] w-20 rounded-full mt-4 origin-left"
                  style={{ backgroundColor: "#C8941A" }}
                  initial={shouldReduce ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={shouldReduce ? undefined : { scaleX: 0 }}
                  transition={{ duration: 1, delay: shouldReduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
                <p className="text-blue-100 text-base sm:text-lg mt-3 max-w-xl">
                  Faire sortir le peuple de la pauvreté — spirituelle, personnelle et professionnelle. Une communauté ouverte à tous, à Abidjan et au-delà.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contenu — CTA et indicateurs, toujours visibles */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 pt-44">
          {/* Boutons CTA — toujours visibles */}
          <HeroText delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-3 mt-24 justify-center">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/formations" className="btn-secondary text-base px-8 py-3">
                  <BookOpen size={18} /> Nos Formations
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/a-propos" className="btn-outline text-base px-8 py-3"
                  style={{ borderColor: "white", color: "white" }}>
                  Découvrir MCTD <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </HeroText>

          {/* Indicateurs de diaporama — toujours visibles */}
          <div className="flex gap-2 mt-8 justify-center" role="tablist" aria-label="Navigation du diaporama">
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
      </section>

      {/* ── QUI SOMMES-NOUS ── */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right">
            <h2 className="section-title">Faire sortir le peuple de la pauvreté</h2>
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
            {engagements.map((item) => (
              <StaggerItem key={item.title}>
                <HoverCard className="h-full">
                  <div className="card h-full p-5">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mb-3" style={{ backgroundColor: "#EFF6FF" }}>
                      <item.icon size={20} style={{ color: "#1A3C6E" }} />
                    </div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-0.5">{item.desc}</p>
                  </div>
                </HoverCard>
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
              <h2 className="section-title">Nos Formations</h2>
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
                    <div className="h-36 px-5 flex items-end pb-4 overflow-hidden" style={{ backgroundColor: "#1A3C6E" }}>
                      <span className="font-heading text-2xl font-semibold text-white/90 leading-tight" aria-hidden="true">
                        {module.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1 text-gray-900 group-hover:text-[#1A3C6E] transition-colors">{module.title}</h3>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{module.description}</p>
                      <div className="flex justify-between text-xs text-gray-500">
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
              <h2 className="section-title">Prochains Événements</h2>
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
                    <div className="p-4 flex items-start gap-4">
                      <div className="shrink-0 w-16 rounded-lg overflow-hidden text-center" style={{ backgroundColor: "#1A3C6E" }}>
                        <p className="font-heading text-2xl font-bold text-white pt-2 leading-none">{event.date.split(" ")[0]}</p>
                        <p className="text-[11px] uppercase font-semibold text-blue-200 pb-2 pt-1">{event.date.split(" ")[1]}</p>
                      </div>
                      <div className="min-w-0">
                        <span className={`badge text-xs ${event.status === "complet" ? "badge-danger" : "badge-success"}`}>
                          {event.status === "complet" ? "Complet" : "Inscriptions ouvertes"}
                        </span>
                        <h3 className="font-semibold mt-1.5 mb-1 text-gray-900 group-hover:text-[#1A3C6E] transition-colors">{event.title}</h3>
                        <div className="space-y-1 text-xs text-gray-600">
                          <p className="flex items-center gap-1"><CalendarDays size={12} /> {event.date} — {event.time}</p>
                          <p className="flex items-center gap-1"><MapPin size={12} /> {event.location}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mx-4 mb-4 pt-3 border-t border-gray-100 flex justify-between text-xs">
                      <span className="text-gray-600">{event.price}</span>
                      {event.status !== "complet" && (
                        <span style={{ color: "#1A3C6E" }} className="font-medium">{event.placesLeft} places restantes</span>
                      )}
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
          <FadeIn className="mb-12">
            <h2 className="font-heading text-3xl font-bold text-white">Ce que disent nos fidèles</h2>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {mockTestimonials.map((t) => (
              <StaggerItem key={t.name}>
                <motion.figure
                  className="p-6 rounded-xl h-full flex flex-col"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.14)", y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="font-heading text-5xl leading-none select-none" style={{ color: "#C8941A" }} aria-hidden="true">«</span>
                  <blockquote className="text-blue-100 italic mb-4 mt-1 leading-relaxed flex-1">{t.text}</blockquote>
                  <figcaption>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-blue-200 text-xs">{t.role}</p>
                  </figcaption>
                </motion.figure>
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
            {[1000, 5000, 10000, 25000].map((amount) => (
              <StaggerItem key={amount}>
                <motion.div whileHover={{ scale: 1.07, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link href={`/don?montant=${amount}`} className="px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-all hover:text-white inline-block"
                    style={{ borderColor: "#C8941A", color: "#A07010" }}>
                    {amount.toLocaleString("fr-FR")} FCFA
                  </Link>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.2}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link href="/don" className="btn-secondary heartbeat-hover text-base px-8 py-3">
                <PulseIcon className="inline-flex">
                  <Heart size={18} />
                </PulseIcon>
                Faire un don maintenant
              </Link>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ── CONTACT RAPIDE ── */}
      <section className="py-12 px-4" style={{ backgroundColor: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn className="card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="shrink-0 mt-0.5" style={{ color: "#1A3C6E" }} />
              <p className="text-sm text-gray-700">Cocody Riviera 3, cité EECI<br />Abidjan, Côte d'Ivoire</p>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={18} className="shrink-0 mt-0.5" style={{ color: "#1A3C6E" }} />
              <p className="text-sm text-gray-700">
                <a href="mailto:contact@jbgmctd.org" className="hover:underline">contact@jbgmctd.org</a><br />
                <a href="mailto:pastoral@jbgmctd.org" className="hover:underline">pastoral@jbgmctd.org</a>
              </p>
            </div>
            <div className="sm:ml-auto">
              <Link href="/contact" className="btn-outline">Nous contacter <ArrowRight size={16} /></Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
