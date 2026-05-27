import React, { useEffect, useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger offset in ms (applied as transition-delay). */
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

/**
 * Fades + slides its children up the first time they scroll into view.
 *
 * The reveal uses the standalone `translate` + `opacity` properties (not
 * `transform`), so a `.lift` hover on the same subtree can own `transform`
 * without the two transitions clobbering each other.
 *
 * Hydration/SEO notes: the visible state is toggled by adding `is-visible`
 * directly to the DOM node (never via React state), so the server-rendered and
 * client-rendered className always match. scripts/prerender.mjs strips
 * `is-visible` before snapshotting, and index.html ships a <noscript> rule so
 * no-JS visitors still see everything.
 */
const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = "", style, id }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={`reveal ${className}`.trim()}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
    >
      {children}
    </div>
  );
};

export default Reveal;
