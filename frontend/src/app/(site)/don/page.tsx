"use client";
import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Shield, Smartphone, CreditCard, Check, Mail } from "lucide-react";
import { SuccessCheck, PulseIcon } from "@/components/ui/animations";
import { useAuth } from "@/contexts/AuthContext";

const presetAmounts = [1000, 2000, 5000, 10000, 25000, 50000];
const donationTypes = ["Général", "Construction", "Missions", "Social", "Éducation"];
const paymentMethods = [
  { id: "wave",   label: "Wave CI",        src: "/logos/wave.jpg",         desc: "Paiement mobile Wave" },
  { id: "orange", label: "Orange Money",   src: "/logos/orange-money.jpg", desc: "Mobile Money Orange" },
  { id: "mtn",    label: "MTN Money",      src: "/logos/mtn-money.jpg",    desc: "Mobile Money MTN" },
  { id: "moov",   label: "Moov Money",     src: "/logos/moov_money.png",   desc: "Mobile Money Moov" },
  { id: "carte",  label: "Carte Bancaire", src: null,                      desc: "Visa / Mastercard" },
];

const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20";

function DonForm() {
  const searchParams = useSearchParams();
  const prefill = parseInt(searchParams.get("montant") ?? "", 10);
  const [amount, setAmount] = useState<number>(presetAmounts.includes(prefill) ? prefill : 5000);
  const [customAmount, setCustomAmount] = useState<string>(
    !Number.isNaN(prefill) && !presetAmounts.includes(prefill) ? String(prefill) : ""
  );
  const [donType, setDonType] = useState("Général");
  const [method, setMethod] = useState("wave");
  const [donorType, setDonorType] = useState<"ponctuel" | "recurrent">("ponctuel");
  const [anonymous, setAnonymous] = useState(false);
  const [nom, setNom] = useState("");
  const [prenoms, setPrenoms] = useState("");
  const [tel, setTel] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const { isLoggedIn } = useAuth();

  const effectiveAmount = customAmount.trim() !== "" ? parseInt(customAmount, 10) : amount;
  const amountValid = Number.isInteger(effectiveAmount) && effectiveAmount >= 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!amountValid) errs.amount = "Veuillez indiquer un montant valide (minimum 100 FCFA).";
    if (!anonymous && !isLoggedIn) {
      if (!nom.trim()) errs.nom = "Votre nom est requis.";
      if (!prenoms.trim()) errs.prenoms = "Vos prénoms sont requis.";
      if (!tel.trim()) errs.tel = "Votre téléphone est requis pour vous accompagner.";
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const methodLabel = paymentMethods.find((m) => m.id === method)?.label ?? method;
    const lines = [
      `Intention de don — ${effectiveAmount.toLocaleString("fr-FR")} FCFA`,
      `Type : ${donorType === "ponctuel" ? "Don ponctuel" : "Don mensuel"}`,
      `Affectation : ${donType}`,
      `Mode de paiement souhaité : ${methodLabel}`,
      anonymous ? "Don anonyme : oui" : `Nom : ${nom} ${prenoms}\nTéléphone : ${tel}`,
      message.trim() ? `Message : ${message.trim()}` : "",
    ].filter(Boolean);
    const mailto = `mailto:contact@jbgmctd.org?subject=${encodeURIComponent(
      `Intention de don — ${effectiveAmount.toLocaleString("fr-FR")} FCFA`
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = mailto;
    setSent(true);
  };

  if (sent) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="mb-6">
            <SuccessCheck size={80} />
          </div>
          <h2 className="font-heading text-3xl font-bold mb-3" style={{ color: "#1A3C6E" }}>
            Merci pour votre intention de don
          </h2>
          <p className="text-gray-600 mb-2">
            Un brouillon d'email récapitulant votre don de{" "}
            <strong style={{ color: "#A07010" }}>{effectiveAmount.toLocaleString("fr-FR")} FCFA</strong>{" "}
            vient de s'ouvrir dans votre messagerie. Envoyez-le, et notre équipe vous contactera pour finaliser le paiement.
          </p>
          <p className="text-gray-600 text-sm mb-8">
            Si votre messagerie ne s'est pas ouverte, écrivez-nous directement à{" "}
            <a href="mailto:contact@jbgmctd.org" className="font-medium hover:underline" style={{ color: "#1A3C6E" }}>contact@jbgmctd.org</a>.
            Le paiement en ligne sécurisé (CinetPay) sera bientôt disponible.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button type="button" onClick={() => setSent(false)} className="btn-outline justify-center">Modifier mon don</button>
            <Link href="/" className="btn-primary justify-center">Retour à l'accueil</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <form onSubmit={handleSubmit} noValidate className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Montant */}
          <div className="card p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Choisir le montant (FCFA)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {presetAmounts.map((a) => (
                <motion.button
                  key={a}
                  type="button"
                  onClick={() => { setAmount(a); setCustomAmount(""); setErrors((e) => ({ ...e, amount: "" })); }}
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`py-2.5 rounded-lg text-sm font-semibold border-2 ${
                    amount === a && customAmount.trim() === "" ? "text-white border-transparent" : "text-gray-700 border-gray-200"
                  }`}
                  style={amount === a && customAmount.trim() === "" ? { backgroundColor: "#C8941A", borderColor: "#C8941A" } : {}}
                >
                  {a.toLocaleString("fr-FR")} FCFA
                </motion.button>
              ))}
            </div>
            <label htmlFor="don-montant-libre" className="sr-only">Autre montant en FCFA</label>
            <input
              id="don-montant-libre"
              type="number"
              min={100}
              step={100}
              placeholder="Autre montant..."
              value={customAmount}
              className={inputClass}
              aria-invalid={Boolean(errors.amount)}
              aria-describedby={errors.amount ? "don-montant-erreur" : undefined}
              onChange={(e) => { setCustomAmount(e.target.value); setErrors((er) => ({ ...er, amount: "" })); }}
            />
            {errors.amount && (
              <p id="don-montant-erreur" role="alert" className="error-in text-sm mt-2" style={{ color: "#B91C1C" }}>{errors.amount}</p>
            )}

            {/* Périodicité + affectation, repliées dans le même bloc pour limiter les décisions */}
            <div className="mt-5 pt-5 border-t border-gray-100">
              <div className="flex gap-3 mb-4">
                {(["ponctuel", "recurrent"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
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
              <label htmlFor="don-affectation" className="block text-sm font-medium text-gray-700 mb-1">Affecter mon don à</label>
              <select
                id="don-affectation"
                value={donType}
                onChange={(e) => setDonType(e.target.value)}
                className={`${inputClass} text-gray-700`}
              >
                {donationTypes.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Infos donateur */}
          <div className="card p-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="font-semibold text-gray-900">{anonymous || isLoggedIn ? "Message" : "Vos informations"}</h2>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className="w-4 h-4 accent-[#1A3C6E]"
                />
                Don anonyme
              </label>
            </div>
            {anonymous && (
              <p className="text-sm text-gray-600 mb-4">
                {isLoggedIn
                  ? "Vos informations de profil ne seront ni récupérées ni associées à ce don."
                  : "Aucune information personnelle ne vous sera demandée."}
              </p>
            )}
            {!anonymous && !isLoggedIn ? (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="don-nom" className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                  <input id="don-nom" placeholder="Votre nom" value={nom} required
                    aria-invalid={Boolean(errors.nom)}
                    onChange={(e) => { setNom(e.target.value); setErrors((er) => ({ ...er, nom: "" })); }}
                    className={inputClass} />
                  {errors.nom && <p role="alert" className="error-in text-sm mt-1" style={{ color: "#B91C1C" }}>{errors.nom}</p>}
                </div>
                <div>
                  <label htmlFor="don-prenoms" className="block text-sm font-medium text-gray-700 mb-1">Prénoms *</label>
                  <input id="don-prenoms" placeholder="Vos prénoms" value={prenoms} required
                    aria-invalid={Boolean(errors.prenoms)}
                    onChange={(e) => { setPrenoms(e.target.value); setErrors((er) => ({ ...er, prenoms: "" })); }}
                    className={inputClass} />
                  {errors.prenoms && <p role="alert" className="error-in text-sm mt-1" style={{ color: "#B91C1C" }}>{errors.prenoms}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="don-tel" className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                  <input id="don-tel" type="tel" placeholder="+225 07 00 00 00 00" value={tel} required
                    aria-invalid={Boolean(errors.tel)}
                    onChange={(e) => { setTel(e.target.value); setErrors((er) => ({ ...er, tel: "" })); }}
                    className={inputClass} />
                  {errors.tel && <p role="alert" className="error-in text-sm mt-1" style={{ color: "#B91C1C" }}>{errors.tel}</p>}
                </div>
              </div>
            ) : (
              isLoggedIn && !anonymous && (
                <p className="text-sm text-gray-600 mb-3">Vos informations seront automatiquement récupérées depuis votre profil.</p>
              )
            )}
            <div className={!anonymous && !isLoggedIn ? "mt-4" : ""}>
              <label htmlFor="don-message" className="block text-sm font-medium text-gray-700 mb-1">Message (optionnel)</label>
              <textarea id="don-message" placeholder="Un mot d'encouragement ou une intention de prière…" rows={3}
                value={message} onChange={(e) => setMessage(e.target.value)}
                className={`${inputClass} resize-none`} />
            </div>
            {!isLoggedIn && !anonymous && (
              <p className="text-sm text-gray-600 mt-4 text-center">
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
            <h2 className="font-semibold text-gray-900 mb-1">Mode de paiement souhaité</h2>
            <p className="text-sm text-gray-600 mb-4">
              Le paiement en ligne arrive bientôt. En attendant, notre équipe vous contacte pour finaliser le don par le moyen de votre choix.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {paymentMethods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  aria-pressed={method === m.id}
                  className={`relative flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left ${
                    method === m.id ? "border-[#1A3C6E] bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {method === m.id && (
                    <motion.span
                      className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#1A3C6E" }}
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      aria-hidden="true"
                    >
                      <Check size={12} className="text-white" strokeWidth={3} />
                    </motion.span>
                  )}
                  <div className="shrink-0 flex items-center justify-center rounded-md overflow-hidden bg-white"
                    style={{ width: 72, height: 40 }}>
                    {m.src ? (
                      <img
                        src={m.src}
                        alt=""
                        width={72}
                        height={40}
                        style={{ objectFit: "contain" }}
                      />
                    ) : (
                      <CreditCard size={26} style={{ color: "#1A3C6E" }} aria-hidden="true" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-900">{m.label}</p>
                    <p className="text-xs text-gray-600">{m.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="heartbeat-hover w-full btn-secondary py-4 text-base justify-center">
            <PulseIcon className="inline-flex">
              <Heart size={20} />
            </PulseIcon>
            {amountValid
              ? `Confirmer mon don de ${effectiveAmount.toLocaleString("fr-FR")} FCFA`
              : "Confirmer mon don"}
          </button>
        </div>

        {/* Sidebar */}
        <div>
          <div className="card p-5 space-y-5 md:sticky md:top-24">
            <div>
              <div className="flex items-center gap-2 mb-2" style={{ color: "#1A3C6E" }}>
                <Shield size={18} />
                <h3 className="font-semibold">Un accompagnement de confiance</h3>
              </div>
              <p className="text-sm text-gray-600">Chaque intention de don est traitée personnellement par notre équipe, qui vous recontacte pour finaliser le paiement.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2" style={{ color: "#A07010" }}>
                <Smartphone size={18} />
                <h3 className="font-semibold">Mobile Money</h3>
              </div>
              <p className="text-sm text-gray-600">Wave, Orange Money, MTN Money ou Moov Money : indiquez votre préférence, nous nous adaptons.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2" style={{ color: "#1A3C6E" }}>
                <Mail size={18} />
                <h3 className="font-semibold">Une question ?</h3>
              </div>
              <p className="text-sm text-gray-600">
                Écrivez-nous à{" "}
                <a href="mailto:contact@jbgmctd.org" className="font-medium hover:underline" style={{ color: "#1A3C6E" }}>contact@jbgmctd.org</a>.
              </p>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default function DonPage() {
  const shouldReduce = useReducedMotion();

  return (
    <div>
      {/* Header */}
      <section className="relative aspect-[3/2] text-white overflow-hidden" style={{ backgroundColor: "#122a4e" }}>
        <div className={`absolute inset-0${shouldReduce ? "" : " kenburns"}`}>
          <Image
            src="/logos/don.png"
            alt=""
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-[center_60%]"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(18,42,78,0.95) 0%, rgba(18,42,78,0.6) 55%, rgba(18,42,78,0.25) 100%)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-end py-12 md:py-16 px-4">
          <div className="relative w-full max-w-7xl mx-auto text-center mb-2 sm:mb-16 md:mb-40 lg:mb-56 xl:mb-72 -translate-x-2 md:-translate-x-12">
            <PulseIcon className="mb-4 mx-auto w-fit">
              <Heart size={40} className="opacity-90" style={{ color: "#C8941A" }} />
            </PulseIcon>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto drop-shadow-md hidden sm:block">
              Votre générosité soutient la mission de MCTD : formations gratuites, actions sociales et vie communautaire.
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <DonForm />
      </Suspense>
    </div>
  );
}
