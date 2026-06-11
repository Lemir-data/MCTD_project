"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, BookOpen, Newspaper, Package, Truck, ShieldCheck, Tag } from "lucide-react";
import { mockBooks, mockMagazines } from "@/lib/mockData";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { PageHeader, FilterPillBar } from "@/components/ui/ui";

type Tab = "tous" | "livres" | "magazines";

function PriceBadge({ price }: { price: number }) {
  if (price === 0)
    return (
      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: "#1A3C6E" }}>
        Gratuit
      </span>
    );
  return (
    <span className="text-sm font-bold" style={{ color: "#C8941A" }}>
      {price.toLocaleString()} FCFA
    </span>
  );
}

function BookCover({ title, author, color }: { title: string; author: string; color: string }) {
  const initials = title
    .split(" ")
    .filter((w) => w.length > 3)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div
      className="w-full aspect-[3/4] rounded-lg flex flex-col items-center justify-center px-3 relative overflow-hidden"
      style={{ backgroundColor: color }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "8px 8px" }}
      />
      <span className="text-white/20 text-7xl font-black absolute top-2 right-2 leading-none select-none">
        {initials}
      </span>
      <div className="relative z-10 text-center px-2">
        <p className="text-white font-bold text-sm leading-tight text-center line-clamp-3">{title}</p>
        <p className="text-white/60 text-[10px] mt-2 line-clamp-2">{author}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
    </div>
  );
}

function MagazineCover({ title, edition, theme, color }: { title: string; edition: string; theme: string; color: string }) {
  return (
    <div
      className="w-full aspect-[3/4] rounded-lg flex flex-col overflow-hidden relative"
      style={{ backgroundColor: color }}
    >
      <div className="flex-1 flex flex-col items-center justify-center p-3 relative">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 30% 40%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}
        />
        <Newspaper size={32} className="text-white/30 mb-2" />
        <p className="text-white font-bold text-xs text-center leading-tight">{title}</p>
        <p className="text-white/70 text-[10px] mt-1 text-center">{edition}</p>
      </div>
      <div className="px-3 py-2" style={{ backgroundColor: "rgba(0,0,0,0.25)" }}>
        <p className="text-white/80 text-[10px] font-medium line-clamp-1 italic">{theme}</p>
      </div>
    </div>
  );
}

export default function BoutiquePage() {
  const [activeTab, setActiveTab] = useState<Tab>("tous");
  const [cart, setCart] = useState<string[]>([]);

  const addToCart = (id: string) => setCart((c) => (c.includes(id) ? c : [...c, id]));

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "tous",      label: "Tous les articles", icon: <Package size={15} /> },
    { id: "livres",    label: "Livres",             icon: <BookOpen size={15} /> },
    { id: "magazines", label: "Magazines",          icon: <Newspaper size={15} /> },
  ];

  const books    = mockBooks.map((b) => ({ ...b, type: "livre"    as const }));
  const magazines = mockMagazines.map((m) => ({ ...m, type: "magazine" as const }));

  const allItems =
    activeTab === "livres"    ? books :
    activeTab === "magazines" ? magazines :
    [...books, ...magazines];

  return (
    <div>
      {/* Header */}
      <PageHeader
        eyebrow="Ressources MCTD"
        title="Boutique"
        subtitle={
          <span className="max-w-2xl mx-auto block">
            Livres, magazines et cahiers de formation pour approfondir votre foi et enrichir votre vie spirituelle.
          </span>
        }
      >
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-blue-200">
          <span className="flex items-center gap-1.5"><Truck size={15} className="text-[#C8941A]" /> Livraison dans Abidjan</span>
          <span className="flex items-center gap-1.5"><ShieldCheck size={15} className="text-[#C8941A]" /> Paiement sécurisé</span>
          <span className="flex items-center gap-1.5"><Tag size={15} className="text-[#C8941A]" /> Prix en FCFA</span>
        </div>
      </PageHeader>

      {/* Tabs */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-200 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3">
          <FilterPillBar
            tabs={tabs.map((t) => ({ id: t.id, label: <>{t.icon}{t.label}</> }))}
            active={activeTab}
            onChange={(id) => setActiveTab(id as Tab)}
            layoutId="boutique"
            ariaLabel="Catégories boutique"
          />

          <AnimatePresence>
            {cart.length > 0 && (
              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: "#C8941A" }}
              >
                <ShoppingCart size={16} />
                Panier
                <motion.span
                  key={cart.length}
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white text-xs font-bold flex items-center justify-center"
                  style={{ color: "#C8941A" }}
                >
                  {cart.length}
                </motion.span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Grille */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-400 mb-6">{allItems.length} article{allItems.length > 1 ? "s" : ""}</p>

          <StaggerContainer key={activeTab} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {allItems.map((item) => {
              const inCart = cart.includes(item.id);
              const isBook = item.type === "livre";
              const book = isBook ? (item as typeof books[0]) : null;
              const mag  = !isBook ? (item as typeof magazines[0]) : null;

              return (
                <StaggerItem key={item.id}>
                  <div className="flex flex-col h-full group">
                    {/* Couverture */}
                    <div className="relative mb-3">
                      {isBook && book ? (
                        <BookCover title={book.title} author={book.author} color={book.color} />
                      ) : mag ? (
                        <MagazineCover title={mag.title} edition={mag.edition} theme={mag.theme} color={mag.color} />
                      ) : null}

                      {!item.inStock && (
                        <span className="absolute top-2 right-2 text-xs font-bold text-gray-600 bg-white px-2 py-0.5 rounded-full shadow-sm z-10">
                          Épuisé
                        </span>
                      )}

                      {/* Badge type */}
                      <span
                        className="absolute top-2 left-2 text-[10px] font-semibold px-1.5 py-0.5 rounded text-white"
                        style={{ backgroundColor: isBook ? "#1A3C6E" : "#C8941A" }}
                      >
                        {isBook ? "Livre" : "Magazine"}
                      </span>
                    </div>

                    {/* Infos */}
                    <div className="flex flex-col flex-1 gap-1.5">
                      <p className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2">
                        {item.title}
                      </p>
                      {isBook && book && (
                        <p className="text-xs text-gray-500 line-clamp-1">{book.author}</p>
                      )}
                      {!isBook && mag && (
                        <p className="text-xs text-gray-500 line-clamp-1">{mag.edition}</p>
                      )}

                      <div className="mt-auto pt-2 flex items-center justify-between gap-2">
                        <PriceBadge price={item.price} />
                        {isBook && book && (
                          <span className="text-[10px] text-gray-400">{book.pages} p.</span>
                        )}
                      </div>

                      <motion.button
                        type="button"
                        disabled={!item.inStock}
                        onClick={() => addToCart(item.id)}
                        whileTap={item.inStock && !inCart ? { scale: 0.93 } : {}}
                        whileHover={item.inStock && !inCart ? { scale: 1.03 } : {}}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className={`w-full py-2 rounded-lg text-xs font-semibold mt-1 ${
                          !item.inStock
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "text-white"
                        }`}
                        style={
                          item.inStock
                            ? { backgroundColor: inCart ? "#16a34a" : "#1A3C6E" }
                            : {}
                        }
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                            key={inCart ? "added" : "add"}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18 }}
                            className="block"
                          >
                            {!item.inStock ? "Épuisé" : inCart ? "✓ Ajouté" : "Commander"}
                          </motion.span>
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Infos livraison */}
      <FadeIn>
        <section className="py-10 px-4" style={{ backgroundColor: "#F8FAFC" }}>
          <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: Truck,       title: "Livraison Abidjan",   desc: "Livraison à domicile ou en point de retrait dans les 48h ouvrées." },
              { icon: ShieldCheck, title: "Paiement sécurisé",   desc: "Règlement par Mobile Money (Wave, Orange, MTN, Moov) ou carte bancaire." },
              { icon: BookOpen,    title: "Ressources de qualité", desc: "Tous les ouvrages sont produits et validés par l'équipe pastorale du MCTD." },
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <item.icon size={28} className="mx-auto mb-3" style={{ color: "#C8941A" }} />
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
