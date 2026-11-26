"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./vajko.module.css";

type Shot = { src: string; alt: string; w: number; h: number };

export function Gallery({ images }: { images: Shot[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const show = (i: number, el: HTMLButtonElement) => {
    lastTrigger.current = el;
    setOpen(i);
  };
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + images.length) % images.length)), [images.length]);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (open !== null && !dlg.open) dlg.showModal();
    if (open === null && dlg.open) {
      dlg.close();
      lastTrigger.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const cur = open === null ? null : images[open];

  return (
    <>
      <div className={styles.gallery}>
        {images.map((img, i) => (
          <button key={img.src} type="button" className={styles.shot} onClick={(e) => show(i, e.currentTarget)} aria-label={`Open screenshot: ${img.alt}`}>
            <Image src={img.src} alt={img.alt} width={img.w} height={img.h} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
          </button>
        ))}
      </div>

      <dialog ref={dialogRef} className={styles.lightbox} onClose={close} onClick={(e) => e.target === e.currentTarget && close()} aria-label="Screenshot viewer">
        {cur && (
          <figure className={styles.lightboxFigure}>
            <Image src={cur.src} alt={cur.alt} width={cur.w} height={cur.h} sizes="92vw" />
            <figcaption>
              {cur.alt} <span>{(open ?? 0) + 1} / {images.length}</span>
            </figcaption>
          </figure>
        )}
        <button type="button" className={styles.lbClose} onClick={close} aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
        </button>
        <button type="button" className={styles.lbPrev} onClick={() => step(-1)} aria-label="Previous screenshot">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button type="button" className={styles.lbNext} onClick={() => step(1)} aria-label="Next screenshot">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </dialog>
    </>
  );
}
