"use client";
import Link from "next/link";
import { useState } from "react";
import { MapPin, Mail, Clock, Send } from "lucide-react";

const IconFacebook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const IconYoutube = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
  </svg>
);
const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
const IconLinkedin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.34 18v-7.5H5.67V18zM7 9.5a1.56 1.56 0 1 0 0-3.12a1.56 1.56 0 0 0 0 3.12M18.34 18v-4.12c0-2.2-1.18-3.23-2.75-3.23a2.37 2.37 0 0 0-2.15 1.18h-.03V10.5h-2.56c.03.7 0 7.5 0 7.5h2.56v-4.19c0-.22.02-.45.08-.61a1.33 1.33 0 0 1 1.25-.89c.88 0 1.23.67 1.23 1.65V18z" />
  </svg>
);

// Réseaux sociaux : renseigner les URLs réelles des comptes MCTD.
const socialLinks = [
  { label: "Facebook", href: "#", icon: IconFacebook },
  { label: "YouTube", href: "#", icon: IconYoutube },
  { label: "Instagram", href: "#", icon: IconInstagram },
  { label: "LinkedIn", href: "#", icon: IconLinkedin },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer style={{ backgroundColor: "#1A3C6E" }} className="text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 lg:-ml-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center rounded-lg bg-white p-1">
                <img src="/logos/logo_mctd.jpg" alt="MCTD" className="h-9 w-auto object-contain" />
              </span>
              <div>
                <p className="font-bold text-lg font-heading">MCTD</p>
                <p className="text-xs text-blue-200">Ministère Catholique de Transformation et de Développement</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              « Vivre de la vie de Dieu » — Faire sortir le peuple de la pauvreté. Une communauté engagée dans la transformation spirituelle, personnelle et professionnelle, à Abidjan et au-delà.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex gap-3 mt-4">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`MCTD sur ${label}`}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C8941A] flex items-center justify-center transition-colors">
                    <Icon />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Horaires */}
          <div>
            <h3 className="font-semibold text-[#C8941A] mb-4 uppercase text-xs tracking-wider">Programme des Cultes</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li className="flex items-start gap-2">
                <Clock size={14} className="mt-0.5 shrink-0 text-[#C8941A]" />
                <span>Mercredi : 18h30 (Chapelet)</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="mt-0.5 shrink-0 text-[#C8941A]" />
                <span>Vendredi : 17h00 (Adoration)</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="mt-0.5 shrink-0 text-[#C8941A]" />
                <span>Samedi : 09h00 (Catéchèse)</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="mt-0.5 shrink-0 text-[#C8941A]" />
                <span>Dimanche : 08h00 et 10h30</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-[#C8941A] mb-4 uppercase text-xs tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm text-blue-200">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[#C8941A]" />
                <Link href="/a-propos#carte" className="hover:text-white transition-colors">
                  Cocody Riviera 3, cité EECI<br />Abidjan, Côte d'Ivoire
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0 text-[#C8941A]" />
                <a href="mailto:contact@jbgmctd.org" className="hover:text-white">contact@jbgmctd.org</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0 text-[#C8941A]" />
                <a href="mailto:pastoral@jbgmctd.org" className="hover:text-white">pastoral@jbgmctd.org</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2 lg:ml-8">
            <h3 className="font-semibold text-[#C8941A] mb-4 uppercase text-xs tracking-wider">Newsletter</h3>
            <p className="text-blue-200 text-sm leading-relaxed mb-4">
              Recevez nos actualités, formations et événements directement par e-mail.
            </p>
            {subscribed ? (
              <p className="text-sm font-medium" style={{ color: "#C8941A" }}>
                Merci ! Votre inscription a bien été prise en compte.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  aria-label="Votre adresse e-mail"
                  placeholder="Votre adresse e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-white flex-1 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.25)" }}
                />
                <button
                  type="submit"
                  aria-label="S'abonner à la newsletter"
                  className="flex items-center justify-center px-4 py-2.5 rounded-lg text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#C8941A" }}
                >
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-blue-300">
          <p>© 2026 MCTD. Par <a href="https://africadigitalconnect.net/" target="_blank" rel="noopener noreferrer" style={{ color: "#C8941A" }} className="hover:underline">Africa Digital Connect</a>.</p>
          <div className="flex gap-4">
            <Link href="/confidentialite" className="hover:text-white">Confidentialité</Link>
            <Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
