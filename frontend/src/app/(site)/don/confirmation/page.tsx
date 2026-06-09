import Link from "next/link";
import { CheckCircle, Download, Home, Heart } from "lucide-react";

export default function DonConfirmationPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "#dcfce7" }}>
          <CheckCircle size={40} style={{ color: "#16a34a" }} />
        </div>
        <h1 className="font-heading text-3xl font-bold mb-3" style={{ color: "#1A3C6E" }}>
          Merci pour votre don !
        </h1>
        <p className="text-gray-600 mb-2">
          Votre don de <strong style={{ color: "#C8941A" }}>5 000 FCFA</strong> a bien été reçu.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Un reçu PDF a été envoyé à votre adresse email. Que Dieu vous bénisse pour votre générosité.
        </p>

        <div className="card p-5 mb-6 text-left">
          <h3 className="font-semibold text-gray-900 mb-3">Récapitulatif</h3>
          <div className="space-y-2 text-sm">
            {[
              ["Référence", "TXN-2025-00142"],
              ["Montant", "5 000 FCFA"],
              ["Méthode", "Wave CI"],
              ["Cause", "Général"],
              ["Date", "05 Juin 2025 — 14h32"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button className="btn-secondary justify-center py-3">
            <Download size={18} /> Télécharger le reçu PDF
          </button>
          <Link href="/" className="btn-outline justify-center py-3">
            <Home size={18} /> Retour à l'accueil
          </Link>
          <Link href="/don" className="text-sm" style={{ color: "#1A3C6E" }}>
            <Heart size={14} className="inline mr-1" />
            Faire un autre don
          </Link>
        </div>
      </div>
    </div>
  );
}
