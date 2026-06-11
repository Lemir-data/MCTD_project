"use client";
import { ReactNode } from "react";
import { motion, LayoutGroup, useReducedMotion } from "framer-motion";

// ── Page Banner Header ────────────────────────────────────────────────────────
// Section gradient utilisée en haut de chaque page du site.
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  icon,
  children,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`py-20 px-4 text-white${className ? ` ${className}` : ""}`}
      style={{ background: "linear-gradient(135deg, #1A3C6E, #122a4e)" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {eyebrow && (
          <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#C8941A" }}>
            {eyebrow}
          </span>
        )}
        {icon}
        <h1 className={`font-heading text-display font-bold mb-4${eyebrow ? " mt-3" : ""}`}>
          {title}
        </h1>
        {subtitle && <p className="text-blue-200 text-lg">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

// ── Animated Filter Pill Bar ──────────────────────────────────────────────────
// Barre d'onglets avec indicateur pill animé (LayoutGroup + motion.span).
export function FilterPillBar({
  tabs,
  active,
  onChange,
  layoutId,
  ariaLabel,
  className,
}: {
  tabs: { id: string; label: ReactNode }[];
  active: string;
  onChange: (id: string) => void;
  layoutId: string;
  ariaLabel?: string;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <LayoutGroup id={layoutId}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={`flex gap-1 overflow-x-clip${className ? ` ${className}` : ""}`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap min-h-[44px] ${
              active === tab.id ? "text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {active === tab.id && (
              shouldReduce ? (
                <span className="absolute inset-0 rounded-full" style={{ backgroundColor: "#1A3C6E" }} />
              ) : (
                <motion.span
                  layoutId={`${layoutId}-pill`}
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: "#1A3C6E" }}
                  transition={{ type: "tween", duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                />
              )
            )}
            <span className="relative z-10 flex items-center gap-1.5">{tab.label}</span>
          </button>
        ))}
      </div>
    </LayoutGroup>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────
// Affichage zéro résultat pour les listes filtrées.
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`text-center py-20${className ? ` ${className}` : ""}`}>
      <div className="flex justify-center mb-3 opacity-50 text-gray-400">{icon}</div>
      <p className="font-medium text-gray-500 mb-1">{title}</p>
      {description && <p className="text-sm text-gray-400">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
