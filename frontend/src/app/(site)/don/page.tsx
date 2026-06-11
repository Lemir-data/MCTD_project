"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Shield, Smartphone, CreditCard, EyeOff, Eye } from "lucide-react";
import { AnimatedCounter, FadeIn } from "@/components/ui/animations";
import { useAuth } from "@/contexts/AuthContext";

const LogoCarte = () => (
  <svg width="72" height="40" viewBox="0 0 120 67" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="67" rx="6" fill="#1A3C6E"/>
    <rect x="10" y="16" width="46" height="32" rx="4" fill="white" opacity="0.15"/>
    <rect x="10" y="24" width="46" height="8" fill="white" opacity="0.25"/>
    <rect x="14" y="38" width="16" height="4" rx="1.5" fill="white" opacity="0.5"/>
    <text x="65" y="35" fill="white" fontSize="13" fontWeight="800" fontFamily="Arial, sans-serif" opacity="0.9">Visa</text>
    <text x="65" y="51" fill="#C8941A" fontSize="10" fontWeight="600" fontFamily="Arial, sans-serif">Mastercard</text>
  </svg>
);

const presetAmounts = [1000, 2000, 5000, 10000, 25000, 50000];
const donationTypes = ["Général", "Construction", "Missions", "Social", "Éducation"];
const paymentMethods = [
  { id: "wave",   label: "Wave CI",       src: "/logos/wave.jpg",         desc: "Paiement mobile Wave" },
  { id: "orange", label: "Orange Money",  src: "/logos/orange-money.jpg", desc: "Mobile Money Orange" },
  { id: "mtn",    label: "MTN Money",     src: "/logos/mtn-money.jpg",    desc: "Mobile Money MTN" },
  { id: "moov",   label: "Moov Money",    src: "/logos/moov_money.png",   desc: "Mobile Money Moov" },
  { id: "carte",  label: "Carte Bancaire",src: null,                      desc: "Visa / Mastercard" },
];

export default function DonPage() {
  const [amount, setAmount] = useState<number | string>(5000);
  const [donType, setDonType] = useState("Général");
  const [method, setMethod] = useState("wave");
  const [donorType, setDonorType] = useState<"ponctuel" | "recurrent">("ponctuel");
  const [anonymous, setAnonymous] = useState(false);
  const { isLoggedIn } = useAuth();

  return (
    <div>
      {/* Header */}
      <section className="py-20 px-4 text-white text-center" style={{ background: "linear-gradient(135deg, #1A3C6E, #122a4e)" }}>
        <Heart size={48} className="mx-auto mb-4" style={{ color: "#C8941A" }} />
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Faire un Don</h1>
        <p className="text-blue-200 text-lg max-w-2xl mx-auto mb-10">
          Votre générosité soutient la mission de MCTD : formations gratuites, actions sociales et vie communautaire.
        </p>
        {/* Stats collecte */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-2">
          {[
            { value: "284", suffix: "", label: "Donateurs ce mois" },
            { value: "1240000", suffix: " FCFA", label: "Collectés ce mois" },
            { value: "98", suffix: "%", label: "Transactions réussies" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold" style={{ color: "#C8941A" }}>
                <AnimatedCounter value={s.value + s.suffix} duration={2} />
              </p>
              <p className="text-blue-300 text-sm mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="md:col-span-2 space-y-6">
            {/* Anonymat */}
            <div className="card p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Faire un don anonyme ?</h2>
              <div className="flex gap-3">
                {([false, true] as const).map((v) => (
                  <button
                    key={String(v)}
                    onClick={() => setAnonymous(v)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border-2 transition-colors ${
                      anonymous === v ? "text-white border-transparent" : "text-gray-600 border-gray-200"
                    }`}
                    style={anonymous === v ? { backgroundColor: "#1A3C6E", borderColor: "#1A3C6E" } : {}}
                  >
                    {v ? <EyeOff size={15} /> : <Eye size={15} />}
                    {v ? "Anonyme" : "Non anonyme"}
                  </button>
                ))}
              </div>
              {anonymous && (
                <p className="text-sm text-gray-500 mt-4">
                  {isLoggedIn
                    ? "Vos informations de profil ne seront ni récupérées ni associées à ce don : il sera enregistré de façon anonyme."
                    : "Aucune information personnelle ne vous sera demandée : votre don sera enregistré de façon anonyme."}
                </p>
              )}
            </div>

            {/* Type de don */}
            <div className="card p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Type de don</h2>
              <div className="flex gap-3">
                {(["ponctuel", "recurrent"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setDonorType(t)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium border-2 transition-colors ${
                      donorType === t ? "text-white border-transparent" : "text-gray-600 border-gray-200"
                    }`}
                    style={donorType === t ? { backgroundColor: "#1A3C6E", borderColor: "#1A3C6E" } : {}}
                  >
                    {t === "ponctuel" ? "Don Ponctuel" : "Don Mensuel"}
                  </button>
                ))}
              </div>
            </div>

            {/* Montant */}
            <div className="card p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Choisir le montant (FCFA)</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {presetAmounts.map((a) => (
                  <motion.button
                    key={a}
                    onClick={() => setAmount(a)}
                    whileTap={{ scale: 0.92 }}
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`py-2.5 rounded-lg text-sm font-semibold border-2 ${
                      amount === a ? "text-white border-transparent" : "text-gray-700 border-gray-200"
                    }`}
                    style={amount === a ? { backgroundColor: "#C8941A", borderColor: "#C8941A" } : {}}
                  >
                    {a.toLocaleString()} FCFA
                  </motion.button>
                ))}
              </div>
              <label htmlFor="don-montant-libre" className="sr-only">Autre montant en FCFA</label>
              <input
                id="don-montant-libre"
                type="number"
                placeholder="Autre montant..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* Cause */}
            <div className="card p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Affecter mon don à</h2>
              <div className="flex flex-wrap gap-2">
                {donationTypes.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDonType(d)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-colors ${
                      donType === d ? "text-white border-transparent" : "text-gray-600 border-gray-200"
                    }`}
                    style={donType === d ? { backgroundColor: "#1A3C6E" } : {}}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Infos donateur */}
            <div className="card p-6">
              <h2 className="font-semibold text-gray-900 mb-4">{anonymous || isLoggedIn ? "Message" : "Vos informations"}</h2>
              {!anonymous && !isLoggedIn ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="don-nom" className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                    <input id="don-nom" placeholder="Votre nom" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20" />
                  </div>
                  <div>
                    <label htmlFor="don-prenoms" className="block text-sm font-medium text-gray-700 mb-1">Prénoms *</label>
                    <input id="don-prenoms" placeholder="Vos prénoms" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20" />
                  </div>
                  <div>
                    <label htmlFor="don-tel" className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                    <input id="don-tel" type="tel" placeholder="+225 07 00 00 00 00" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20" />
                  </div>
                  <div>
                    <label htmlFor="don-email" className="block text-sm font-medium text-gray-700 mb-1">Email (optionnel)</label>
                    <input id="don-email" type="email" placeholder="votre@email.com" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="don-message" className="block text-sm font-medium text-gray-700 mb-1">Message (optionnel)</label>
                    <textarea id="don-message" placeholder="Un mot d'encouragement ou une intention de prière…" rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20 resize-none" />
                  </div>
                </div>
              ) : (
                <>
                  {isLoggedIn && !anonymous && (
                    <p className="text-sm text-gray-500 mb-3">Vos informations seront automatiquement récupérées depuis votre profil.</p>
                  )}
                  <label htmlFor="don-message-alt" className="block text-sm font-medium text-gray-700 mb-1">Message (optionnel)</label>
                  <textarea id="don-message-alt" placeholder="Un mot d'encouragement ou une intention de prière…" rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20 resize-none" />
                </>
              )}
              {!isLoggedIn && (
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Déjà inscrit ?{" "}
                  <Link href="/auth/connexion" className="font-medium hover:underline" style={{ color: "#1A3C6E" }}>
                    Se connecter
                  </Link>{" "}
                  pour ne plus avoir à ressaisir vos informations.
                </p>
              )}
            </div>

            {/* Mode de paiement */}
            <div className="card p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Mode de paiement</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {paymentMethods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left ${
                      method === m.id ? "border-[#1A3C6E] bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="shrink-0 flex items-center justify-center rounded-md overflow-hidden"
                      style={{ width: 72, height: 40 }}>
                      {m.src ? (
                        <img
                          src={m.src}
                          alt={m.label}
                          style={{ width: 72, height: 40, objectFit: "contain" }}
                        />
                      ) : (
                        <LogoCarte />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{m.label}</p>
                      <p className="text-xs text-gray-400">{m.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button type="button" className="w-full btn-secondary py-4 text-base justify-center">
              <Heart size={20} /> Confirmer mon don de {Number(amount).toLocaleString()} FCFA
            </button>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3" style={{ color: "#1A3C6E" }}>
                <Shield size={18} />
                <h3 className="font-semibold">Paiement sécurisé</h3>
              </div>
              <p className="text-sm text-gray-500">Vos transactions sont sécurisées par CinetPay, l'agrégateur de confiance en Côte d'Ivoire.</p>
            </div>
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3" style={{ color: "#C8941A" }}>
                <Smartphone size={18} />
                <h3 className="font-semibold">Mobile Money</h3>
              </div>
              <p className="text-sm text-gray-500">Payez avec Wave, Orange Money, MTN Money ou Moov Money. Simple, rapide et sécurisé.</p>
            </div>
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3" style={{ color: "#1A3C6E" }}>
                <CreditCard size={18} />
                <h3 className="font-semibold">Reçu PDF</h3>
              </div>
              <p className="text-sm text-gray-500">Un reçu officiel vous sera envoyé par email après chaque don réussi.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
