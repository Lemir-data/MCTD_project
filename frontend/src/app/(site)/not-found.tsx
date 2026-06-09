import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-7xl font-heading font-bold mb-4" style={{ color: "#1A3C6E" }}>404</p>
        <h1 className="font-heading text-2xl font-bold text-gray-900 mb-3">Page introuvable</h1>
        <p className="text-gray-500 mb-8">
          Cette page n'existe pas ou a été déplacée. Revenez à l'accueil pour continuer votre navigation.
        </p>
        <Link href="/" className="btn-primary">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
