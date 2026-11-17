"use client";

import { useEffect } from "react";

/**
 * One scroll loop for the whole page. It only writes CSS custom properties / data attributes;
 * every visual effect lives in vajko.module.css so the page still reads fine without JavaScript.
 *   [data-pin-section] > [data-pin]        --pin: 0..1 while the section scrolls past its sticky child
 *   [data-parallax]                         --py: -1..1 as the element crosses the viewport
 *   [data-hscroll-section] ... [data-hscroll-track]   --hs: px to shift the track left (desktop only)
 *   [data-reveal]                           data-in="true" once it has entered the viewport
 *   [data-nav]                              data-solid="true" after the first 40px of scroll
 */
export function ScrollFX() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pins = Array.from(document.querySelectorAll<HTMLElement>("[data-pin-section]"));
    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const hsections = Array.from(document.querySelectorAll<HTMLElement>("[data-hscroll-section]"));
    const nav = document.querySelector<HTMLElement>("[data-nav]");

    // reveal on enter
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.in = "true";
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => io.observe(el));

    // horizontal sections: give the section enough height to scroll the whole track
    const sizeHScroll = () => {
      for (const s of hsections) {
        const track = s.querySelector<HTMLElement>("[data-hscroll-track]");
        if (!track) continue;
        const desktop = window.innerWidth > 800 && !reduce;
        const extra = Math.max(0, track.scrollWidth - track.clientWidth);
        s.dataset.active = desktop ? "true" : "false";
        s.style.setProperty("--hs-max", `${extra}px`);
        s.style.height = desktop ? `${window.innerHeight + extra}px` : "";
      }
    };

    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      for (const s of pins) {
        const r = s.getBoundingClientRect();
        const span = Math.max(1, r.height - vh);
        const p = Math.min(1, Math.max(0, -r.top / span));
        s.style.setProperty("--pin", p.toFixed(4));
      }
      if (!reduce) {
        for (const el of parallax) {
          const r = el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) continue;
          const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
          el.style.setProperty("--py", Math.max(-1, Math.min(1, p)).toFixed(4));
        }
      }
      for (const s of hsections) {
        if (s.dataset.active !== "true") continue;
        const r = s.getBoundingClientRect();
        const span = Math.max(1, r.height - vh);
        const p = Math.min(1, Math.max(0, -r.top / span));
        s.style.setProperty("--hs-p", p.toFixed(4));
      }
      if (nav) nav.dataset.solid = window.scrollY > 40 ? "true" : "false";
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    const onResize = () => {
      sizeHScroll();
      update();
    };

    sizeHScroll();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // fonts/images can change the track width after first paint
    const late = window.setTimeout(onResize, 800);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(late);
    };
  }, []);

  return null;
}
