import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/ui";

export const metadata: Metadata = {
  title: "Politique de confidentialité — MCTD",
  description: "Politique de confidentialité du site du Ministère Catholique de Transformation et de Développement (MCTD).",
};

export default function ConfidentialitePage() {
  return (
    <div>
      <PageHeader title="Politique de confidentialité" />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-10 text-gray-600 leading-relaxed">
          <div>
            <h2 className="section-title">Données collectées</h2>
            <p>
              Les informations que vous renseignez sur ce site (formulaires de contact, d'inscription, d'intention de don) servent uniquement à traiter votre demande et à vous recontacter. Elles ne sont ni vendues ni transmises à des tiers.
            </p>
          </div>
          <div>
            <h2 className="section-title">Dons anonymes</h2>
            <p>
              Lorsque vous choisissez l'option « don anonyme », aucune information personnelle ne vous est demandée et votre don n'est associé à aucun profil.
            </p>
          </div>
          <div>
            <h2 className="section-title">Cookies et mesure d'audience</h2>
            <p>
              Ce site n'utilise pas de cookies publicitaires. Les éventuels cookies techniques servent uniquement au bon fonctionnement du site (session, préférences).
            </p>
          </div>
          <div>
            <h2 className="section-title">Vos droits</h2>
            <p>
              Vous pouvez à tout moment demander l'accès, la rectification ou la suppression de vos données en écrivant à{" "}
              <a href="mailto:contact@jbgmctd.org" className="font-medium hover:underline" style={{ color: "#1A3C6E" }}>contact@jbgmctd.org</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
