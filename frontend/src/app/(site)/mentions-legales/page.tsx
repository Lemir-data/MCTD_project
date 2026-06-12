import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/ui";

export const metadata: Metadata = {
  title: "Mentions légales — MCTD",
  description: "Mentions légales du site du Ministère Catholique de Transformation et de Développement (MCTD).",
};

export default function MentionsLegalesPage() {
  return (
    <div>
      <PageHeader title="Mentions légales" />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-10 text-gray-600 leading-relaxed">
          <div>
            <h2 className="section-title">Éditeur du site</h2>
            <p>
              Ministère Catholique de Transformation et de Développement (MCTD)<br />
              Cocody Riviera 3, cité EECI — Abidjan, Côte d'Ivoire<br />
              Email : <a href="mailto:contact@jbgmctd.org" className="font-medium hover:underline" style={{ color: "#1A3C6E" }}>contact@jbgmctd.org</a>
            </p>
          </div>
          <div>
            <h2 className="section-title">Réalisation et hébergement</h2>
            <p>
              Site conçu et hébergé par{" "}
              <a href="https://africadigitalconnect.net/" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline" style={{ color: "#1A3C6E" }}>
                Africa Digital Connect
              </a>.
            </p>
          </div>
          <div>
            <h2 className="section-title">Propriété intellectuelle</h2>
            <p>
              L'ensemble des contenus de ce site (textes, images, logos, vidéos) est la propriété du MCTD, sauf mention contraire. Toute reproduction ou diffusion sans autorisation préalable est interdite.
            </p>
          </div>
          <div>
            <h2 className="section-title">Contact</h2>
            <p>
              Pour toute question relative au site ou à ses contenus, écrivez-nous à{" "}
              <a href="mailto:contact@jbgmctd.org" className="font-medium hover:underline" style={{ color: "#1A3C6E" }}>contact@jbgmctd.org</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
