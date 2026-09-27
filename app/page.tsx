"use client";

import Image from "next/image";
import { MouseEvent, useEffect, useRef, useState } from "react";

const archive = [
  { image: "/images/action-codm.jpeg", code: "01 / LIVE DROP", title: "CODM ENERGY", position: "50% 42%" },
  { image: "/images/headset.jpeg", code: "02 / AFTER HOURS", title: "HEADSET ON", position: "50% 50%" },
  { image: "/images/joker-moment.jpeg", code: "03 / CHARACTER STUDY", title: "THE JOKER MOMENT", position: "50% 50%" },
  { image: "/images/face-fragment.jpeg", code: "04 / NOISE TEST", title: "FACE / FRAGMENT", position: "50% 50%" }
];

function ScrollLink({ children, to }: { children: React.ReactNode; to: string }) {
  function scroll(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    document.querySelector(to)?.scrollIntoView({ behavior: "smooth" });
  }
  return <a href={to} onClick={scroll}>{children}</a>;
}

export default function Home() {
  const [cursor, setCursor] = useState({ x: -100, y: -100, label: "" });
  const [menu, setMenu] = useState(false);
  const page = useRef<HTMLElement>(null);
  const heroArt = useRef<HTMLDivElement>(null);
  const closeupArt = useRef<HTMLDivElement>(null);
  const closeupCopy = useRef<HTMLDivElement>(null);
  const cutoutArt = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: 0.13 });
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const updateArtwork = () => {
      frame = 0;
      const viewport = window.innerHeight;
      if (heroArt.current) heroArt.current.style.transform = `translate3d(0, ${Math.min(window.scrollY * 0.1, 54)}px, 0)`;
      if (closeupArt.current) {
        const box = closeupArt.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (viewport - box.top) / (viewport + box.height * 0.35)));
        closeupArt.current.style.transform = `scale(${0.85 + progress * 0.15})`;
        if (closeupCopy.current) closeupCopy.current.style.transform = `translate3d(0, ${Math.round((1 - progress) * 32)}px, 0)`;
      }
      if (cutoutArt.current) {
        const box = cutoutArt.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (viewport - box.top) / (viewport + box.height)));
        cutoutArt.current.style.transform = `translate3d(0, ${Math.round((.5 - progress) * 35)}px, 0)`;
      }
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateArtwork); };
    updateArtwork();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, []);

  function moveCursor(e: MouseEvent<HTMLElement>) {
    setCursor((current) => ({ ...current, x: e.clientX, y: e.clientY }));
  }

  function cursorLabel(label: string) {
    return () => setCursor((current) => ({ ...current, label }));
  }

  return (
    <main ref={page} onMouseMove={moveCursor} onMouseLeave={cursorLabel("")}>
      <div className="grain" aria-hidden="true" />
      <div className="cursor" style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}><span>{cursor.label}</span></div>

      <nav className="nav">
        <ScrollLink to="#top"><span className="nav-mark">PS</span><span>PAPA SOPHIA</span></ScrollLink>
        <div className="desktop-links"><ScrollLink to="#archive">ARCHIVE</ScrollLink><ScrollLink to="#signal">SIGNAL</ScrollLink><ScrollLink to="#contact">CONTACT</ScrollLink></div>
        <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Toggle navigation"><i /><i /></button>
        {menu && <div className="mobile-menu"><ScrollLink to="#archive">ARCHIVE</ScrollLink><ScrollLink to="#signal">SIGNAL</ScrollLink><ScrollLink to="#contact">CONTACT</ScrollLink></div>}
      </nav>

      <section id="top" className="hero section-dark">
        <div className="hero-index hero-signal-detected">SIGNAL DETECTED <i /></div>
        <div className="hero-coordinates" aria-hidden="true">06° 27&apos; 12.7&quot; N<br />003° 23&apos; 42.1&quot; E</div>
        <div className="hero-copy">
          <p className="eyebrow">CALL OF DUTY MOBILE<br />CREATOR / STREAMER</p>
          <h1><span className="hero-word"><b>PAPA</b></span><span className="hero-word hero-word-outline"><b>SOPHIA</b></span></h1>
          <div className="hero-foot"><span>32.1K <small>FOLLOWERS</small></span><span>1.1M <small>LIKES</small></span></div>
        </div>
        <div className="hero-image-wrap" ref={heroArt}><Image src="/images/hero.jpeg" alt="Papa Sophia portrait" fill priority sizes="(max-width: 700px) 100vw, 60vw" className="hero-image" /><span className="hero-bracket hero-bracket-a" /><span className="hero-bracket hero-bracket-b" /></div>
        <div className="hero-scan">LIVE // ONLINE</div>
        <div className="hero-raw">LESS EDITS.<br />MORE RAW.</div>
        <ScrollLink to="#archive"><span className="scroll-cue">SCROLL TO ENTER <b>↓</b></span></ScrollLink>
      </section>

      <section className="ticker" aria-label="Creator tags"><div>CALL OF DUTY MOBILE <i>✳</i> LESS EDITS. MORE RAW. <i>✳</i> CALL OF DUTY MOBILE <i>✳</i> LESS EDITS. MORE RAW. <i>✳</i></div></section>

      <section className="numbers section-dark reveal">
        <div className="section-kicker">002 / THE NUMBERS</div>
        <div className="metric"><strong>32.1K</strong><span>TIKTOK<br />FOLLOWERS</span></div>
        <div className="metric"><strong>1.1M</strong><span>TIKTOK<br />LIKES</span></div>
        <p className="numbers-note">BUILT IN PUBLIC.<br />ON THE FRONTLINE.</p>
      </section>

      <section id="archive" className="archive">
        <div className="archive-head reveal"><div><span className="section-kicker">003 / THE ARCHIVE</span><h2>SELECTED<br /><em>NOISE</em></h2></div><p>RECORDED IN THE MOMENT.<br />NO CLEAN VERSION.</p></div>
        <div className="archive-list">
          {archive.map((clip, index) => <article className={`archive-item item-${index + 1} reveal`} key={clip.code} onMouseEnter={cursorLabel("WATCH")} onMouseLeave={cursorLabel("")}>
            <div className="clip-image"><Image src={clip.image} alt={clip.title} fill sizes="(max-width: 700px) 78vw, 42vw" style={{ objectPosition: clip.position }} /></div>
            <div className="clip-copy"><span>{clip.code}</span><h3>{clip.title}</h3><span className="play">PLAY <b>↗</b></span></div>
          </article>)}
        </div>
        <div className="archive-bottom"><span>VIEW DATA / —</span><span>SCROLL / 04 FILES</span></div>
      </section>

      <section id="signal" className="stream-section section-dark">
        <div className="stream-image reveal"><Image src="/images/headset.jpeg" alt="Papa Sophia streaming" fill sizes="100vw" /></div>
        <div className="stream-copy reveal"><span className="section-kicker">004 / BROADCAST</span><h2>WHEN THE<br />MIC <em>OPENS.</em></h2><p>NO SCRIPT. NO SOFT CUT.<br />JUST THE MATCH.</p><a href="#contact" onMouseEnter={cursorLabel("OPEN")} onMouseLeave={cursorLabel("")} className="under-link">TUNE IN <b>↗</b></a></div>
        <div className="stream-status"><span /><span>SIGNAL // ACTIVE</span><span>CODM / LIVE</span></div>
      </section>

      <section className="portrait-section">
        <div className="portrait-copy reveal"><span className="section-kicker">005 / PORTRAIT STUDY</span><h2>KEEP YOUR<br /><em>HEAD IN IT.</em></h2><p>THE GAME ISN&apos;T A CHARACTER.<br />THE CHARACTER IS THE GAME.</p></div>
        <div className="portrait-canvas"><Image className="portrait-full reveal" src="/images/full-body.jpeg" alt="Full body portrait of Papa Sophia" fill sizes="(max-width: 700px) 100vw, 55vw" /><div className="portrait-stamp">PAPA SOPHIA<br />EST. IN THE LOBBY</div></div>
        <div className="portrait-word" aria-hidden="true">UNFILTERED</div>
      </section>

      <section className="loadout section-dark">
        <div className="loadout-image reveal"><Image src="/images/face-fragment.jpeg" alt="Fragmented face artwork" fill sizes="(max-width: 700px) 100vw, 45vw" /></div>
        <div className="loadout-copy reveal"><span className="section-kicker">006 / THE LOADOUT</span><h2>CREATOR<br /><em>IDENTITY</em></h2><dl><div><dt>GAME</dt><dd>CALL OF DUTY MOBILE</dd></div><div><dt>FORMAT</dt><dd>LIVE / SHORT FORM</dd></div><div><dt>MODE</dt><dd>ACTIVE</dd></div><div><dt>LOCATION</dt><dd>EVERYWHERE</dd></div></dl></div>
      </section>

      <footer id="contact" className="footer section-dark">
        <span className="section-kicker">007 / LAST CALL</span><h2>ENTER THE<br /><em>LOBBY.</em></h2><a className="footer-action" href="https://www.tiktok.com" target="_blank" rel="noreferrer" onMouseEnter={cursorLabel("OPEN")} onMouseLeave={cursorLabel("")}>TIKTOK <b>↗</b></a>
        <div className="footer-bottom"><span>© 2025 PAPA SOPHIA</span><span>CALL OF DUTY MOBILE CREATOR</span><span>ALL SIGNALS RESERVED</span></div>
      </footer>
    </main>
  );
}
