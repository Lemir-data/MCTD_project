"use client";
import { MapPin, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/ui/ui";
import { SuccessCheck } from "@/components/ui/animations";

const focusClass = "focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20";

// Réseaux sociaux : renseigner les URLs réelles pour réactiver l'affichage.
const socials: { label: string; href: string }[] = [
  { label: "Facebook", href: "" },
  { label: "YouTube", href: "" },
  { label: "Instagram", href: "" },
  { label: "LinkedIn", href: "" },
].filter((s) => s.href);

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [sujet, setSujet] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      setError("Veuillez remplir tous les champs obligatoires.");
      e.currentTarget.reportValidity();
      return;
    }
    setError("");
    const body = [`Nom : ${nom}`, `Email : ${email}`, "", message].join("\n");
    window.location.href = `mailto:contact@jbgmctd.org?subject=${encodeURIComponent(
      `[Site MCTD] ${sujet || "Message"} — ${nom}`
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div>
      {/* Header */}
      <PageHeader
        title="Contactez-nous"
        subtitle="Notre église est disponible pour répondre à toutes vos questions"
      />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Formulaire */}
          <div>
            <h2 className="section-title">Envoyer un message</h2>
            {sent ? (
              <div className="card p-8 text-center">
                <div className="mb-4">
                  <SuccessCheck size={64} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Votre message est prêt</h3>
                <p className="text-gray-600 text-sm">
                  Un brouillon vient de s'ouvrir dans votre messagerie : envoyez-le et nous vous répondrons rapidement.
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  Si rien ne s'est ouvert, écrivez-nous directement à{" "}
                  <a href="mailto:contact@jbgmctd.org" className="font-medium hover:underline" style={{ color: "#1A3C6E" }}>
                    contact@jbgmctd.org
                  </a>.
                </p>
                <button type="button" onClick={() => setSent(false)} className="btn-outline mt-4">Écrire un autre message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-nom" className="block text-sm font-medium text-gray-700 mb-1.5">Nom *</label>
                    <input
                      id="contact-nom"
                      required
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Votre nom"
                      className={`px-4 py-3 border border-gray-200 rounded-lg text-sm w-full ${focusClass}`}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className={`px-4 py-3 border border-gray-200 rounded-lg text-sm w-full ${focusClass}`}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-sujet" className="block text-sm font-medium text-gray-700 mb-1.5">Sujet *</label>
                  <select
                    id="contact-sujet"
                    required
                    value={sujet}
                    onChange={(e) => setSujet(e.target.value)}
                    className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 ${focusClass}`}
                  >
                    <option value="">Choisir un sujet</option>
                    <option>Information générale</option>
                    <option>Formations E-Learning</option>
                    <option>Événements</option>
                    <option>Dons et financement</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                  <textarea
                    id="contact-message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Votre message"
                    rows={6}
                    className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-sm resize-none ${focusClass}`}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Une pièce jointe à transmettre ? Envoyez-la directement à{" "}
                  <a href="mailto:contact@jbgmctd.org" className="font-medium hover:underline" style={{ color: "#1A3C6E" }}>
                    contact@jbgmctd.org
                  </a>.
                </p>
                {error && <p role="alert" className="error-in text-sm" style={{ color: "#B91C1C" }}>{error}</p>}
                <button type="submit" className="btn-primary w-full justify-center py-3">
                  Envoyer le message
                </button>
              </form>
            )}
          </div>

          {/* Infos contact */}
          <div className="space-y-6">
            <h2 className="section-title">Nos coordonnées</h2>
            <div className="space-y-4">
              {[
                { icon: MapPin, title: "Adresse", content: "Cocody Riviera 3, cité EECI\nAbidjan, Côte d'Ivoire" },
                { icon: Mail, title: "Emails", content: "contact@jbgmctd.org\npastoral@jbgmctd.org" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 card p-5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#1A3C6E" }}>
                    <item.icon size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    {item.content.split("\n").map((l, i) => <p key={i} className="text-sm text-gray-600">{l}</p>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Horaires */}
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={18} style={{ color: "#C8941A" }} />
                <h3 className="font-semibold text-gray-900">Horaires des Cultes</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                {[
                  ["Mercredi", "18h30 (Chapelet)"],
                  ["Vendredi", "17h00 (Adoration)"],
                  ["Samedi", "09h00 (Catéchèse)"],
                  ["Dimanche", "08h00 et 10h30"],
                ].map(([day, time]) => (
                  <div key={day} className="flex justify-between">
                    <span className="font-medium text-gray-700">{day}</span>
                    <span>{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Réseaux sociaux — affichés uniquement quand les URLs réelles sont renseignées */}
            {socials.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Suivez-nous</h3>
                <div className="flex gap-3">
                  {socials.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Suivez MCTD sur ${label}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors"
                      style={{ borderColor: "#1A3C6E", color: "#1A3C6E" }}>
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Carte */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="card relative h-72 overflow-hidden group cursor-pointer">
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
        </div>
      </section>
    </div>
  );
}
