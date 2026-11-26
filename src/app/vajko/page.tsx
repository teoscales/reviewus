import type { Metadata } from "next";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "./vajko.module.css";
import { ScrollFX } from "./ScrollFX";
import { Gallery } from "./Gallery";

// Fonts are bundled with the page (SIL OFL) so the build never depends on Google Fonts.
const display = localFont({
  src: [
    { path: "./fonts/big-shoulders-display-latin-800-normal.woff2", weight: "800", style: "normal" },
    { path: "./fonts/big-shoulders-display-latin-900-normal.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});
const body = localFont({
  src: [
    { path: "./fonts/manrope-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/manrope-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/manrope-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

const PLAY_URL = "https://www.roblox.com/games/118885983629239";

export const metadata: Metadata = {
  metadataBase: new URL("https://reviewus.space"),
  title: { absolute: "Vajko — Nexon Island & Ashford on Roblox" },
  description:
    "Two cities joined by one bridge. Wear the badge, pull the heist, do your time or work your way up. Free on Roblox.",
  openGraph: {
    title: "Vajko — Nexon Island & Ashford",
    description: "Two cities joined by one bridge. Free on Roblox.",
    images: ["/vajko/hero.webp"],
  },
  twitter: { card: "summary_large_image", images: ["/vajko/hero.webp"] },
};

const PLACES = [
  { name: "Ocean Drive", where: "Nexon Island", text: "Neon hotels, palm trees and the loudest strip on the coast.", img: "/vajko/oceandrive.webp" },
  { name: "Harbor Point Bridge", where: "Between the cities", text: "The only road from the island to the mainland. Police know it too.", img: "/vajko/bridge.webp" },
  { name: "Vajko Port", where: "Nexon Island", text: "Container ships, cranes and crates nobody checks too closely.", img: "/vajko/port.webp" },
  { name: "Nexon National Bank", where: "Downtown Nexon", text: "Marble halls, a vault downstairs and guards who don't smile.", img: "/vajko/bank.webp" },
  { name: "Generating Station", where: "Ironworks, Ashford", text: "Badge in, keep the turbines running, get paid when the alarms go off.", img: "/vajko/plant.webp" },
  { name: "State Prison", where: "Prison Island", text: "Three checkpoints, three gangs and one way out that's legal.", img: "/vajko/prison.webp" },
];

const LIVES = [
  {
    title: "Wear the badge",
    text: "Go on duty, clip on the bodycam and take calls across both cities. Shoplifters, highway pileups, shots fired. Make Lieutenant.",
    img: "/vajko/police.webp",
    alt: "Two police interceptors parked outside the station at night",
  },
  {
    title: "Pull the heist",
    text: "Hit the bank or put on a guard's uniform and drive an armored truck into the cash depot. One wrong answer and they walk you to the camera room.",
    img: "/vajko/truck.webp",
    alt: "A green and white armored cash truck parked by the port",
  },
  {
    title: "Do your time",
    text: "Your sentence matches your record. Inside, keep your head down for early release, or trade, fight and pick a gang.",
    img: "/vajko/prison.webp",
    alt: "The prison yard with its basketball court, seen from a guard tower",
  },
  {
    title: "Run the hustle",
    text: "Haul scrap to the recycling yard, take delivery contracts, fuel boats at the marina, fish, flip houses. Cash is cash.",
    img: "/vajko/recycling.webp",
    alt: "Aerial view of the Ashford recycling yard",
  },
];

const GALLERY = [
  { src: "/vajko/hero.webp", alt: "Ocean Drive and the Nexon skyline at dusk", w: 1620, h: 1080 },
  { src: "/vajko/oceandrive.webp", alt: "Neon hotel fronts on Ocean Drive", w: 1620, h: 1080 },
  { src: "/vajko/ashford.webp", alt: "Downtown Ashford from the lakefront at dusk", w: 1620, h: 1080 },
  { src: "/vajko/port.webp", alt: "A container ship at sunset with Harbor Point Bridge behind", w: 1620, h: 1080 },
  { src: "/vajko/police.webp", alt: "Patrol cars outside the police station at night", w: 1620, h: 1080 },
  { src: "/vajko/beach.webp", alt: "The beach and hotel strip after sunset", w: 1620, h: 1080 },
  { src: "/vajko/bank.webp", alt: "Nexon National Bank lit up at night", w: 1620, h: 900 },
  { src: "/vajko/miami.webp", alt: "The Nexon towers seen from the water", w: 1620, h: 1080 },
  { src: "/vajko/bridgeday.webp", alt: "Harbor Point Bridge on a clear evening", w: 1620, h: 1080 },
  { src: "/vajko/plant.webp", alt: "The Ashford Generating Station at dusk", w: 1620, h: 1080 },
  { src: "/vajko/truck.webp", alt: "An armored cash truck parked by the port", w: 1139, h: 792 },
  { src: "/vajko/prison.webp", alt: "The prison yard seen from a guard tower", w: 1620, h: 1080 },
];

function PlayButton({ big = false }: { big?: boolean }) {
  return (
    <a className={big ? styles.playBig : styles.play} href={PLAY_URL} target="_blank" rel="noopener noreferrer">
      <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.playIcon}>
        <path d="M7 4.5v15l13-7.5z" fill="currentColor" />
      </svg>
      Play free on Roblox
    </a>
  );
}

export default function VajkoPage() {
  return (
    <main className={`${styles.root} ${display.variable} ${body.variable}`}>
      <ScrollFX />

      <header className={styles.nav} data-nav>
        <a href="#top" className={styles.navMark}>Vajko</a>
        <nav aria-label="Sections" className={styles.navLinks}>
          <a href="#cities">Cities</a>
          <a href="#places">Places</a>
          <a href="#lives">Lives</a>
          <a href="#gallery">Gallery</a>
        </nav>
        <a className={styles.navPlay} href={PLAY_URL} target="_blank" rel="noopener noreferrer">Play</a>
      </header>

      {/* ---------------- hero (pinned) ---------------- */}
      <section id="top" className={styles.hero} data-pin-section>
        <div className={styles.heroSticky} data-pin>
          <div className={styles.heroImage}>
            <Image src="/vajko/hero.webp" alt="Ocean Drive's neon hotels and the Nexon skyline at dusk" fill priority sizes="100vw" />
          </div>
          <div className={styles.heroShade} />
          <div className={styles.heroBrand}>
            <h1 className={styles.wordmark}>Vajko</h1>
            <p className={styles.heroSub}>Nexon Island &amp; Ashford. An open world on Roblox.</p>
            <PlayButton />
          </div>
          <p className={styles.heroStatement}>
            Two cities. One bridge.
            <br />
            Every job, every heist, every sentence is yours.
          </p>
          <span className={styles.scrollCue} aria-hidden="true" />
        </div>
      </section>

      {/* ---------------- the two cities ---------------- */}
      <section id="cities" className={styles.cities}>
        <article className={styles.chapter}>
          <div className={styles.chapterImage} data-parallax>
            <Image src="/vajko/beach.webp" alt="The beach, the hotel strip and the towers of Nexon Island after sunset" fill sizes="100vw" />
          </div>
          <div className={styles.chapterText} data-reveal>
            <p className={styles.kicker}>The island</p>
            <h2 className={styles.chapterTitle}>Nexon Island</h2>
            <p>
              Beachfront towers wrapped in neon, a working container port, an international airport and a military air base
              you really shouldn&apos;t wander onto. This is where the money is.
            </p>
          </div>
        </article>

        <article className={`${styles.chapter} ${styles.chapterFlip}`}>
          <div className={styles.chapterImage} data-parallax>
            <Image src="/vajko/ashford.webp" alt="Downtown Ashford's towers and brick blocks seen from the lakefront" fill sizes="100vw" />
          </div>
          <div className={styles.chapterText} data-reveal>
            <p className={styles.kicker}>Across the bridge</p>
            <h2 className={styles.chapterTitle}>Ashford</h2>
            <p>
              A Chicago-style city across Harbor Point Bridge: the elevated L, brick walk-ups, factory blocks in Ironworks,
              the suburbs of Maple Heights and an expressway that never empties.
            </p>
          </div>
        </article>
      </section>

      {/* ---------------- places (horizontal on desktop) ---------------- */}
      <section id="places" className={styles.places} data-hscroll-section>
        <div className={styles.placesSticky} data-hscroll-sticky>
          <h2 className={styles.sectionTitle}>Places you&apos;ll end up</h2>
          <div className={styles.track} data-hscroll-track>
            {PLACES.map((p) => (
              <figure key={p.name} className={styles.place}>
                <div className={styles.placeImage}>
                  <Image src={p.img} alt={`${p.name}, ${p.where}`} fill sizes="(max-width: 800px) 85vw, 42vw" />
                </div>
                <figcaption>
                  <span className={styles.placeWhere}>{p.where}</span>
                  <strong>{p.name}</strong>
                  <span className={styles.placeText}>{p.text}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- lives ---------------- */}
      <section id="lives" className={styles.lives}>
        <h2 className={styles.sectionTitle} data-reveal>
          Pick a life. Switch whenever you want.
        </h2>
        <div className={styles.lifeGrid}>
          {LIVES.map((l) => (
            <article key={l.title} className={styles.life} data-reveal>
              <div className={styles.lifeImage}>
                <Image src={l.img} alt={l.alt} fill sizes="(max-width: 800px) 100vw, 50vw" />
              </div>
              <div className={styles.lifeText}>
                <h3>{l.title}</h3>
                <p>{l.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------- gallery ---------------- */}
      <section id="gallery" className={styles.gallerySection}>
        <h2 className={styles.sectionTitle} data-reveal>
          Screenshots
        </h2>
        <Gallery images={GALLERY} />
      </section>

      {/* ---------------- finale ---------------- */}
      <section className={styles.finale}>
        <div className={styles.finaleImage} data-parallax>
          <Image src="/vajko/port.webp" alt="" fill sizes="100vw" />
        </div>
        <div className={styles.finaleInner} data-reveal>
          <h2 className={styles.finaleTitle}>Your city is waiting</h2>
          <p>Free on Roblox for phone, tablet and PC.</p>
          <PlayButton big />
        </div>
      </section>

      <footer className={styles.footer}>
        <p>Vajko is a Roblox experience. Not affiliated with or endorsed by Roblox Corporation.</p>
      </footer>
    </main>
  );
}
