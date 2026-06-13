"use client";
import Image from "next/image";
import { mockPastoral } from "@/lib/mockData";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { FadeIn, StaggerContainer, StaggerItem, HoverCard, TiltCard, AnimatedCounter } from "@/components/ui/animations";

export default function AProposPage() {
  const shouldReduce = useReducedMotion();
  return (
    <div>
      {/* Header */}
      <section className="relative aspect-video text-white overflow-hidden" style={{ backgroundColor: "#122a4e" }}>
        <div className={`absolute inset-0${shouldReduce ? "" : " kenburns"}`}>
          <Image
            src="/logos/apropos.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(18,42,78,0.9) 0%, rgba(18,42,78,0.35) 55%, rgba(18,42,78,0.05) 100%)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-end py-12 md:py-16 px-4">
        <div className="relative w-full max-w-7xl mx-auto text-right ml-auto">
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
            className="text-blue-200 text-lg max-w-2xl ml-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}>
            Le Ministère Catholique de Transformation et de Développement accompagne les fidèles d'Abidjan et d'ailleurs à « vivre de la vie de Dieu ».
          </motion.p>
        </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right">
            <h2 className="section-title">Une histoire de foi et de service</h2>
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

          <FadeIn delay={0.15}>
            <figure className="rounded-xl p-8 md:p-10" style={{ backgroundColor: "#1A3C6E" }}>
              <span className="font-heading text-6xl leading-none select-none" style={{ color: "#C8941A" }} aria-hidden="true">«</span>
              <blockquote className="font-heading text-xl md:text-2xl text-white leading-relaxed mt-2">
                J'ai vu la misère de mon peuple… et je suis descendu pour le délivrer, et pour le faire monter de ce pays vers un bon et vaste pays, vers un pays où coulent le lait et le miel.
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold tracking-wide" style={{ color: "#E0A830" }}>
                Exode 3, 7-8 — le mandat fondateur du MCTD
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </section>

      {/* Vision Mission Valeurs */}
      <section className="py-12 md:py-20 px-4" style={{ backgroundColor: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="section-title">Vision, Mission, Valeurs</h2>
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
                color: "#A07010",
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
            <h2 className="section-title">Notre Corps Pastoral</h2>
            <p className="section-subtitle">Des hommes et femmes dévoués au service de la communauté</p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPastoral.map((member) => (
              <StaggerItem key={member.name} className="h-full">
                <HoverCard className="h-full">
                  <div className="card text-center p-6 h-full flex flex-col">
                    <div
                      className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold font-heading"
                      style={{ backgroundColor: "#1A3C6E" }}
                      aria-hidden="true">
                      {member.name.split(" ").pop()?.[0]}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-gray-900">{member.name}</h3>
                    <p className="text-sm font-medium mb-3" style={{ color: "#A07010" }}>{member.title}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
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
            <div className="card relative h-80 overflow-hidden group cursor-pointer">
              <iframe
                title="Localisation MCTD — Cocody Riviera 3, cité EECI, Abidjan"
                src="https://www.google.com/maps?q=Cocody+Riviera+3+cit%C3%A9+EECI+Abidjan+C%C3%B4te+d%27Ivoire&output=embed"
                className="w-full h-full border-0 pointer-events-none"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Cocody+Riviera+3+EECI+Abidjan"
                target="_blank"
                rel="noopener noreferrer"
                title="Obtenir l'itinéraire vers MCTD"
                className="absolute inset-0 flex items-end justify-center pb-4 bg-black/0 group-hover:bg-black/10 transition-colors"
              >
                <span className="px-4 py-2 rounded-full text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: "#1A3C6E" }}>
                  Obtenir l'itinéraire vers MCTD
                </span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
