"use client";
import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/* ── Compteur animé ── */
export function AnimatedCounter({
  value,
  duration = 2,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);
  const shouldReduce = useReducedMotion();

  const clean = value.replace(/\s/g, "");
  const match = clean.match(/^(\d+)(.*)$/);
  const num = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : "";

  const [display, setDisplay] = useState("0" + suffix);

  useEffect(() => {
    if (shouldReduce) {
      setDisplay(num.toLocaleString("fr-FR") + suffix);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (animated.current) return;
      animated.current = true;
      const startTime = performance.now();
      const ms = duration * 1000;
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / ms, 1);
        const current = Math.floor(easeOut(progress) * num);
        setDisplay(current.toLocaleString("fr-FR") + suffix);
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          setDisplay(num.toLocaleString("fr-FR") + suffix);
        }
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) run(); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [num, suffix, duration, shouldReduce]);

  return (
    <span ref={ref} className={`notranslate${className ? ` ${className}` : ""}`} translate="no">
      {display}
    </span>
  );
}

/* ── Bandeau d'informations (défilant ou clignotant) ── */
export function NewsTicker({
  banners,
}: {
  banners: { id: string; text: string; color: string; mode: "defilant" | "clignotant"; actif: boolean }[];
}) {
  const shouldReduce = useReducedMotion();
  const actives = banners.filter((b) => b.actif && b.text.trim());
  if (actives.length === 0) return null;

  return (
    <div>
      {actives.map((b) => (
        <div key={b.id} className="overflow-hidden py-2" style={{ backgroundColor: b.color }}>
          {b.mode === "defilant" && !shouldReduce ? (
            <motion.p
              className="whitespace-nowrap text-sm font-semibold text-white inline-block"
              style={{ paddingLeft: "100%" }}
              animate={{ x: ["0%", "-100%"] }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            >
              {b.text}
            </motion.p>
          ) : b.mode === "clignotant" && !shouldReduce ? (
            <motion.p
              className="text-center text-sm font-semibold text-white px-4"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
            >
              {b.text}
            </motion.p>
          ) : (
            <p className="text-center text-sm font-semibold text-white px-4">{b.text}</p>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Fade-in au scroll ── */
export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className,
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  const initial: Record<string, number> = { opacity: 0 };
  if (direction === "up") initial.y = 40;
  if (direction === "down") initial.y = -40;
  if (direction === "left") initial.x = 40;
  if (direction === "right") initial.x = -40;

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger container ── */
export function StaggerContainer({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Carte hover (lift + ombre) ── */
export function HoverCard({
  children,
  className,
  intensity = 1,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{
        y: -6 * intensity,
        boxShadow: `0 20px 40px rgba(26,60,110,${0.12 * intensity})`,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Carte hover avec tilt 3D ── */
export function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(x, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || shouldReduce) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set(((e.clientX - cx) / rect.width) * 12);
    y.set(-((e.clientY - cy) / rect.height) * 12);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

/* ── Pulse animé (cœur, icône) ── */
export function PulseIcon({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{ scale: [1, 1.12, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ── Hero text apparition ── */
export function HeroText({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Bouton avec scale au click ── */
export function AnimatedButton({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return (
      <button type="button" className={className} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.button>
  );
}
