import Link from "next/link";
import { CheckCircle, Home, Heart, Mail } from "lucide-react";

export default function DonConfirmationPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "#dcfce7" }}>
          <CheckCircle size={40} style={{ color: "#16a34a" }} />
        </div>
        <h1 className="font-heading text-3xl font-bold mb-3" style={{ color: "#1A3C6E" }}>
          Merci pour votre générosité
        </h1>
        <p className="text-gray-600 mb-2">
          Votre intention de don a bien été transmise. Notre équipe vous contactera très prochainement pour finaliser le paiement.
        </p>
        <p className="text-gray-600 text-sm mb-8">
          Que Dieu vous bénisse. Pour toute question, écrivez-nous à{" "}
          <a href="mailto:contact@jbgmctd.org" className="font-medium hover:underline" style={{ color: "#1A3C6E" }}>
            contact@jbgmctd.org
          </a>.
        </p>

        <div className="flex flex-col gap-3">
          <a href="mailto:contact@jbgmctd.org" className="btn-outline justify-center py-3">
            <Mail size={18} /> Nous écrire
          </a>
          <Link href="/" className="btn-primary justify-center py-3">
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
