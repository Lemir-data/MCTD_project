"use client";
import { MapPin, Phone, Mail, Clock, Facebook, Youtube, Instagram, Linkedin, MessageSquare, Upload, Paperclip } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const focusClass = "focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/20";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.files?.[0]?.name ?? null);
  };
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
      <section className="py-20 px-4 text-white" style={{ background: "linear-gradient(135deg, #1A3C6E, #122a4e)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#C8941A" }}>Nous Contacter</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-4">Contactez-nous</h1>
          <p className="text-blue-200 text-lg">Notre église est disponible pour répondre à toutes vos questions</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Formulaire */}
          <div>
            <h2 className="section-title">Envoyer un message</h2>
            {sent ? (
              <div className="card p-8 text-center">
                <MessageSquare size={40} className="mx-auto mb-4" style={{ color: "#C8941A" }} />
                <h3 className="font-semibold text-gray-900 mb-2">Message envoyé !</h3>
                <p className="text-gray-500 text-sm">Nous vous répondrons dans les 24 heures.</p>
                <button type="button" onClick={() => setSent(false)} className="btn-outline mt-4">Envoyer un autre message</button>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="space-y-4"
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-nom" className="block text-sm font-medium text-gray-700 mb-1.5">Nom *</label>
                    <input
                      id="contact-nom"
                      required
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
                    className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-600 ${focusClass}`}
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
                    placeholder="Votre message"
                    rows={6}
                    className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-sm resize-none ${focusClass}`}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-2 block">Pièce jointe (optionnel)</label>
                  <input ref={fileInputRef} type="file" className="hidden" id="contact-file" onChange={handleFileChange} />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center gap-2.5 px-4 py-3 rounded-lg border-2 border-dashed text-sm transition-colors cursor-pointer hover:border-[#1A3C6E] hover:text-[#1A3C6E]"
                    style={{ borderColor: fileName ? "#1A3C6E" : "#E2E8F0", color: fileName ? "#1A3C6E" : "#9CA3AF" }}
                    aria-label={fileName ? `Fichier joint : ${fileName}` : "Joindre un fichier"}
                  >
                    {fileName ? <Paperclip size={16} className="shrink-0" /> : <Upload size={16} className="shrink-0" />}
                    <span className="truncate">{fileName ?? "Cliquez ici pour joindre un fichier"}</span>
                  </button>
                </div>
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
                { icon: Phone, title: "Téléphones", content: "+225 XX XX XX XX XX\n+225 XX XX XX XX XX" },
                { icon: Mail, title: "Emails", content: "contact@jbgmctd.org\npastoral@jbgmctd.org" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 card p-5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#1A3C6E" }}>
                    <item.icon size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    {item.content.split("\n").map((l, i) => <p key={i} className="text-sm text-gray-500">{l}</p>)}
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
              <div className="space-y-2 text-sm text-gray-500">
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

            {/* Réseaux sociaux */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Suivez-nous</h3>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Youtube, label: "YouTube" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Linkedin, label: "LinkedIn" },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={`Suivez MCTD sur ${label}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors"
                    style={{ borderColor: "#1A3C6E", color: "#1A3C6E" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1A3C6E"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#1A3C6E"; }}>
                    <Icon size={16} /> {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carte */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          {coords ? (
            <div className="card relative h-72 overflow-hidden group cursor-pointer">
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
            <div className="card h-72 flex items-center justify-center" style={{ backgroundColor: "#E2E8F0" }}>
              <p className="text-gray-400 text-sm">
                {geoError ? "Localisation indisponible — autorisez l'accès à votre position" : "Chargement de la carte…"}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
