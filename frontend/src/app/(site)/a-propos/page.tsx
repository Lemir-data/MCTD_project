"use client";
import { mockPastoral } from "@/lib/mockData";
import { Heart, Users, BookOpen, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FadeIn, StaggerContainer, StaggerItem, HoverCard, TiltCard, AnimatedCounter } from "@/components/ui/animations";

export default function AProposPage() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoError, setGeoError] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError(true);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setGeoError(true)
    );
  }, []);

  return (
    <div>
      {/* Header */}
      <section className="py-20 px-4 text-white overflow-hidden" style={{ background: "linear-gradient(135deg, #1A3C6E, #122a4e)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            className="text-sm font-semibold uppercase tracking-wider inline-block"
            style={{ color: "#C8941A" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            Notre Histoire
          </motion.span>
          <motion.h1
            className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}>
            À Propos du MCTD
          </motion.h1>
          <motion.p
            className="text-blue-200 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}>
            Le Ministère Catholique de Transformation et de Développement accompagne les fidèles d'Abidjan et d'ailleurs à « vivre de la vie de Dieu ».
          </motion.p>
        </div>
      </section>

      {/* Histoire */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right">
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#C8941A" }}>Notre Fondation</span>
            <h2 className="section-title mt-2">Une histoire de foi et de service</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Le Ministère Catholique de Transformation et de Développement a été fondé par Fr. Jean-Baptiste Gervais EHUY, aux côtés de son épouse Clarisse, autour d'un mandat reçu de Dieu : « Faire sortir le peuple de la pauvreté » — spirituelle, personnelle et professionnelle.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Inspiré du mandat biblique d'Exode 3, 7-8, le MCTD s'est donné pour mission de conduire chacun vers la pleine mesure de sa vocation, en lui donnant les moyens de « vivre de la vie de Dieu » au quotidien — dans sa foi, sa famille et son travail.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Aujourd'hui, le MCTD rassemble une communauté grandissante à Abidjan et au-delà, avec des programmes touchant la formation spirituelle, la jeunesse, la famille, l'entrepreneuriat et l'action sociale, et lance sa plateforme digitale intégrée pour rendre ses ressources accessibles à tous, où qu'ils se trouvent.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 gap-4">
            {[
              { icon: Heart, label: "Missions actives", value: "6" },
              { icon: Users, label: "Fidèles actifs", value: "2500+" },
              { icon: BookOpen, label: "Modules de formation", value: "48" },
              { icon: Globe, label: "Présence digitale", value: "2025" },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <TiltCard className="card p-6 text-center h-full">
                  <motion.div whileHover={{ rotate: 15, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                    <item.icon size={28} className="mx-auto mb-2" style={{ color: "#C8941A" }} />
                  </motion.div>
                  <p className="text-2xl font-bold" style={{ color: "#1A3C6E" }}>
                    <AnimatedCounter value={item.value} duration={2} />
                  </p>
                  <p className="text-sm text-gray-500">{item.label}</p>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Vision Mission Valeurs */}
      <section className="py-12 md:py-20 px-4" style={{ backgroundColor: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#C8941A" }}>Nos Engagements</span>
            <h2 className="section-title mt-2">Vision, Mission, Valeurs</h2>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Notre Vision",
                content: "Vivre de la vie de Dieu : voir chaque personne — quelle que soit sa religion ou sa condition sociale — accéder au développement intégral à la lumière de l'Évangile, dans son être, sa famille et son travail.",
                color: "#1A3C6E",
              },
              {
                title: "Notre Mission",
                content: "Faire sortir le peuple de la pauvreté, à l'image du mandat reçu en Exode 3, 7-8 : accompagner chacun vers une transformation spirituelle, personnelle et professionnelle durable.",
                color: "#C8941A",
              },
              {
                title: "Nos Valeurs",
                content: "Foi authentique • Amour fraternel • Excellence spirituelle • Solidarité concrète • Intégrité dans le service • Ouverture et accueil de tous, sans distinction",
                color: "#1A3C6E",
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <HoverCard className="h-full">
                  <div className="card p-8 h-full">
                    <motion.div
                      className="w-2 h-12 rounded-full mb-4"
                      style={{ backgroundColor: item.color }}
                      whileHover={{ height: 56, width: 6 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <h3 className="font-heading text-xl font-bold mb-4" style={{ color: item.color }}>{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.content}</p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Corps Pastoral */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#C8941A" }}>L'Équipe</span>
            <h2 className="section-title mt-2">Notre Corps Pastoral</h2>
            <p className="section-subtitle">Des hommes et femmes dévoués au service de la communauté</p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPastoral.map((member) => (
              <StaggerItem key={member.name} className="h-full">
                <HoverCard className="h-full">
                  <div className="card text-center p-6 h-full flex flex-col">
                    <motion.div
                      className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
                      style={{ backgroundColor: "#1A3C6E" }}
                      whileHover={{ scale: 1.1, backgroundColor: "#C8941A" }}
                      transition={{ type: "spring", stiffness: 300 }}>
                      {member.name.split(" ").pop()?.[0]}
                    </motion.div>
                    <h3 className="font-heading text-lg font-bold text-gray-900">{member.name}</h3>
                    <p className="text-sm font-medium mb-3" style={{ color: "#C8941A" }}>{member.title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Carte */}
      <section id="carte" className="py-12 md:py-20 px-4" style={{ backgroundColor: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-8">
            <h2 className="section-title">Nous Trouver</h2>
            <p className="section-subtitle">Cocody Riviera 3, cité EECI — Abidjan, Côte d'Ivoire</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            {coords ? (
              <div className="card relative h-80 overflow-hidden group cursor-pointer">
                <iframe
                  title="Localisation MCTD"
                  src={`https://www.google.com/maps?q=${coords.lat},${coords.lng}&output=embed`}
                  className="w-full h-full border-0 pointer-events-none"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Ouvrir l'itinéraire dans votre application GPS"
                  className="absolute inset-0 flex items-end justify-center pb-4 bg-black/0 group-hover:bg-black/10 transition-colors"
                >
                  <span className="px-4 py-2 rounded-full text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: "#1A3C6E" }}>
                    Ouvrir l'itinéraire dans votre GPS
                  </span>
                </a>
              </div>
            ) : (
              <div className="card h-80 flex items-center justify-center" style={{ backgroundColor: "#E2E8F0" }}>
                <p className="text-gray-400 text-sm">
                  {geoError ? "Localisation indisponible — autorisez l'accès à votre position" : "Chargement de la carte…"}
                </p>
              </div>
            )}
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
