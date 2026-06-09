"use client";
import Link from "next/link";
import { use, useState } from "react";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { mockEvents } from "@/lib/mockData";

const steps = ["Informations", "Récapitulatif", "Confirmation"];

export default function InscriptionEvenementPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const event = mockEvents.find((e) => e.slug === slug) ?? mockEvents[0];
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-[80vh] py-12 px-4" style={{ backgroundColor: "#F8FAFC" }}>
      <div className="max-w-xl mx-auto">
        <Link href={`/evenements/${slug}`} className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#1A3C6E] mb-6">
          <ChevronLeft size={16} /> Retour à l'événement
        </Link>

        <h1 className="font-heading text-2xl font-bold mb-2" style={{ color: "#1A3C6E" }}>Inscription</h1>
        <p className="text-gray-500 text-sm mb-6">{event.title}</p>

        {/* Stepper */}
        <div className="flex items-center mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                  i < step ? "text-white border-transparent" :
                  i === step ? "text-white border-transparent" :
                  "text-gray-300 border-gray-200"
                }`}
                  style={i <= step ? { backgroundColor: "#1A3C6E" } : {}}>
                  {i < step ? <CheckCircle size={16} /> : i + 1}
                </div>
                <span className={`text-xs mt-1 font-medium ${i === step ? "text-[#1A3C6E]" : "text-gray-400"}`}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 mt-[-14px]" style={{ backgroundColor: i < step ? "#1A3C6E" : "#E2E8F0" }} />
              )}
            </div>
          ))}
        </div>

        <div className="card p-6">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-gray-900 mb-4">Vos informations</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom *</label>
                  <input placeholder="Kouassi" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Prénoms *</label>
                  <input placeholder="Jean-Baptiste" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone *</label>
                <input placeholder="+225 07 00 00 00 00" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                <input type="email" placeholder="jean@email.com" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre de places *</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]">
                  {Array.from({ length: event.maxPlacesParPersonne }, (_, i) => i + 1).map(n => <option key={n}>{n} place{n > 1 ? "s" : ""}</option>)}
                </select>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="font-semibold text-gray-900 mb-4">Récapitulatif</h2>
              <div className="space-y-3 text-sm">
                {[
                  ["Événement", event.title],
                  ["Date", event.date],
                  ["Lieu", event.location],
                  ["Nom", "Kouassi Jean-Baptiste"],
                  ["Téléphone", "+225 07 00 00 00 00"],
                  ["Email", "jean@email.com"],
                  ["Places", "1 place"],
                  ["Tarif", event.price],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-medium text-gray-900 text-right max-w-[60%]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#dcfce7" }}>
                <CheckCircle size={32} style={{ color: "#16a34a" }} />
              </div>
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-2">Inscription confirmée !</h2>
              <p className="text-gray-500 text-sm mb-4">
                Un email de confirmation avec votre QR Code a été envoyé à jean@email.com
              </p>
              <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto flex items-center justify-center mb-4">
                <p className="text-xs text-gray-400">QR Code</p>
              </div>
              <div className="flex flex-col gap-3 mt-4">
                <button className="btn-primary justify-center">Télécharger ma convocation</button>
                <Link href="/evenements" className="btn-outline justify-center">Voir d'autres événements</Link>
              </div>
            </div>
          )}

          {step < 2 && (
            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="btn-outline">
                  <ChevronLeft size={16} /> Retour
                </button>
              )}
              <button
                onClick={() => setStep(step + 1)}
                className="btn-primary flex-1 justify-center"
              >
                {step === 1 ? "Confirmer l'inscription" : "Continuer"} <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
