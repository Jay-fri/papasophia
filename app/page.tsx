"use client";

import Image from "next/image";
import { MouseEvent, useEffect, useRef, useState } from "react";

const archive = [
  { video: "/video-previews/v1-preview.mp4", poster: "/video-posters/v1.jpg", code: "01 / FOOTAGE FILE", title: "MATCH // 01" },
  { video: "/video-previews/v2-preview.mp4", poster: "/video-posters/v2.jpg", code: "02 / FOOTAGE FILE", title: "MATCH // 02" },
  { video: "/video-previews/v3-preview.mp4", poster: "/video-posters/v3.jpg", code: "03 / FOOTAGE FILE", title: "MATCH // 03" },
  { video: "/video-previews/v4-preview.mp4", poster: "/video-posters/v4.jpg", code: "04 / FOOTAGE FILE", title: "MATCH // 04" }
];

const tiktokUrl = "https://www.tiktok.com/@papasophiagaming";

function ArchiveClip({ clip, index, onCursor }: { clip: typeof archive[number]; index: number; onCursor: (label: string) => () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReady(true);
        if (ready) element.play().catch(() => undefined);
      } else {
        element.pause();
      }
    }, { rootMargin: "700px 0px", threshold: .06 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ready]);

  useEffect(() => {
    const element = video.current;
    if (!element || !ready) return;
    element.load();
    element.play().catch(() => undefined);
  }, [ready]);

  function toggleSound() {
    const element = video.current;
    if (!element) return;
    const nextMuted = !muted;
    element.muted = nextMuted;
    setMuted(nextMuted);
    element.play().catch(() => undefined);
  }

  return <article className={`archive-item item-${index + 1} reveal`} onMouseEnter={onCursor("WATCH")} onMouseLeave={onCursor("")}>
    <a className="clip-link" href={tiktokUrl} target="_blank" rel="noreferrer" aria-label={`Watch ${clip.title} on Papa Sophia's TikTok, opens in a new tab`}>
      <div className="clip-image"><video ref={video} poster={clip.poster} muted={muted} loop playsInline preload="metadata" aria-hidden="true">{ready && <source src={clip.video} type="video/mp4" />}</video><span className="clip-watch" aria-hidden="true">WATCH <b>↗</b></span></div>
      <div className="clip-copy"><span>{clip.code}</span><h3>{clip.title}</h3><span className="play">TIKTOK <b>↗</b></span></div>
    </a>
    <button className="sound-toggle" type="button" onClick={toggleSound} aria-pressed={!muted} aria-label={muted ? `Turn sound on for ${clip.title}` : `Mute ${clip.title}`}>{muted ? "SOUND ON" : "MUTE"}</button>
  </article>;
}

function ScrollLink({ children, to, onNavigate }: { children: React.ReactNode; to: string; onNavigate?: () => void }) {
  function scroll(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    document.querySelector(to)?.scrollIntoView({ behavior: "smooth" });
    onNavigate?.();
  }
  return <a href={to} onClick={scroll}>{children}</a>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [stats, setStats] = useState({ followers: 32.1, likes: 1.1 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const heroArt = useRef<HTMLDivElement>(null);
  const heroCopy = useRef<HTMLDivElement>(null);
  const closeupArt = useRef<HTMLDivElement>(null);
  const closeupCopy = useRef<HTMLDivElement>(null);
  const rawSection = useRef<HTMLElement>(null);
  const rawArt = useRef<HTMLDivElement>(null);
  const streamArt = useRef<HTMLDivElement>(null);
  const cutoutArt = useRef<HTMLDivElement>(null);
  const marquee = useRef<HTMLDivElement>(null);
  const progressLine = useRef<HTMLSpanElement>(null);
  const progressLabel = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: 0.13 });
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = document.querySelector<HTMLElement>(".numbers");
    if (!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let complete = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || complete) return;
      complete = true;
      setStats({ followers: 30.7, likes: 1.03 });
      const start = performance.now();
      const duration = 620;
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setStats({ followers: 30.7 + (32.1 - 30.7) * eased, likes: 1.03 + (1.1 - 1.03) * eased });
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: .45 });
    observer.observe(target);
    return () => { observer.disconnect(); if (frame) cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce), (hover: none), (pointer: coarse)").matches) return;
    let frame = 0;
    let lastY = window.scrollY;
    let lastTime = performance.now();
    const updateArtwork = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const scrollY = window.scrollY;
      const now = performance.now();
      const velocity = Math.min(1, Math.abs(scrollY - lastY) / Math.max(1, now - lastTime) / 1.7);
      lastY = scrollY;
      lastTime = now;
      const heroProgress = Math.min(1, scrollY / (viewport * .9));
      if (heroArt.current) heroArt.current.style.transform = `translate3d(${Math.round(heroProgress * 18)}px, ${Math.round(scrollY * .09)}px, 0) scale(${1 + heroProgress * .055})`;
      if (heroCopy.current) heroCopy.current.style.transform = `translate3d(${Math.round(heroProgress * -28)}px, ${Math.round(scrollY * -.055)}px, 0)`;
      if (heroArt.current) heroArt.current.style.setProperty("--hero-dark", String(heroProgress * .28));
      if (marquee.current) marquee.current.style.setProperty("--marquee-rate", String(1 + velocity * .45));
      if (progressLine.current) progressLine.current.style.transform = `scaleY(${Math.max(.012, scrollY / Math.max(1, document.documentElement.scrollHeight - viewport))})`;
      if (progressLabel.current) progressLabel.current.textContent = `0${Math.min(9, Math.floor((scrollY / Math.max(1, document.documentElement.scrollHeight - viewport)) * 9) + 1)} / 09`;
      if (closeupArt.current) {
        const box = closeupArt.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (viewport - box.top) / (viewport + box.height * 0.35)));
        closeupArt.current.style.transform = `scale(${0.85 + progress * 0.15})`;
        if (closeupCopy.current) closeupCopy.current.style.transform = `translate3d(0, ${Math.round((1 - progress) * 32)}px, 0)`;
      }
      if (cutoutArt.current) {
        const box = cutoutArt.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (viewport - box.top) / (viewport + box.height)));
        cutoutArt.current.style.transform = `translate3d(var(--cutout-x, 0px), calc(${Math.round((.5 - progress) * 35)}px + var(--cutout-y, 0px)), 0)`;
      }
      if (streamArt.current) {
        const box = streamArt.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (viewport - box.top) / (viewport + box.height)));
        streamArt.current.style.transform = `translate3d(0, ${Math.round((.5 - progress) * 24)}px, 0) scale(1.045)`;
      }
      if (rawSection.current && rawArt.current) {
        const box = rawSection.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (viewport - box.top) / (viewport + box.height * .35)));
        rawArt.current.style.clipPath = `inset(${Math.round((1 - progress) * 34)}% 0 0 0)`;
        rawArt.current.style.transform = `scale(${.96 + progress * .08})`;
      }
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateArtwork); };
    updateArtwork();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, []);

  function moveCursor(e: MouseEvent<HTMLElement>) {
    if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    if (cutoutArt.current && window.innerWidth > 700) {
      const box = cutoutArt.current.getBoundingClientRect();
      const x = Math.max(-5, Math.min(5, ((e.clientX - box.left) / box.width - .5) * 10));
      const y = Math.max(-4, Math.min(4, ((e.clientY - box.top) / box.height - .5) * 8));
      cutoutArt.current.style.setProperty("--cutout-x", `${x}px`);
      cutoutArt.current.style.setProperty("--cutout-y", `${y}px`);
    }
  }

  function cursorLabel(label: string) {
    return () => cursorRef.current?.setAttribute("data-label", label);
  }

  return (
    <main onMouseMove={moveCursor} onMouseLeave={cursorLabel("")}>
      <a className="skip-link" href="#archive">Skip to archive</a>
      <div className="grain" aria-hidden="true" />
      <div className="cursor" ref={cursorRef} data-label="" aria-hidden="true" />
      <div className="page-progress" aria-hidden="true"><span ref={progressLabel}>01 / 09</span><i><b ref={progressLine} /></i></div>

      <nav className="nav">
        <ScrollLink to="#top"><span className="nav-mark">PS</span><span>PAPA SOPHIA</span></ScrollLink>
        <div className="desktop-links"><ScrollLink to="#archive">ARCHIVE</ScrollLink><ScrollLink to="#signal">SIGNAL</ScrollLink><ScrollLink to="#contact">CONTACT</ScrollLink></div>
        <button className="menu-toggle" type="button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="mobile-navigation" aria-label="Toggle navigation"><i /><i /></button>
        {menu && <div className="mobile-menu" id="mobile-navigation"><ScrollLink to="#archive" onNavigate={() => setMenu(false)}>ARCHIVE</ScrollLink><ScrollLink to="#signal" onNavigate={() => setMenu(false)}>SIGNAL</ScrollLink><ScrollLink to="#contact" onNavigate={() => setMenu(false)}>CONTACT</ScrollLink></div>}
      </nav>

      <section id="top" className="hero section-dark">
        <div className="hero-index hero-signal-detected">SIGNAL DETECTED <i /></div>
        <div className="hero-coordinates" aria-hidden="true">06° 27&apos; 12.7&quot; N<br />003° 23&apos; 42.1&quot; E</div>
        <div className="hero-copy" ref={heroCopy}>
          <p className="eyebrow">CALL OF DUTY MOBILE<br />CREATOR / STREAMER</p>
          <h1><span className="hero-word"><b>PAPA</b></span><span className="hero-word hero-word-outline"><b>SOPHIA</b></span></h1>
          <div className="hero-foot"><span>32.1K <small>FOLLOWERS</small></span><span>1.1M <small>LIKES</small></span></div>
        </div>
        <div className="hero-image-wrap" ref={heroArt} onMouseEnter={cursorLabel("VIEW")} onMouseLeave={cursorLabel("")}><Image src="/images/hero.jpeg" alt="Papa Sophia portrait" fill priority sizes="(max-width: 700px) 100vw, 60vw" className="hero-image" /><span className="hero-bracket hero-bracket-a" /><span className="hero-bracket hero-bracket-b" /></div>
        <div className="hero-scan">LIVE // ONLINE</div>
        <div className="hero-raw">LESS EDITS.<br />MORE RAW.</div>
        <ScrollLink to="#archive"><span className="scroll-cue">SCROLL TO ENTER <b>↓</b></span></ScrollLink>
      </section>

      <section className="ticker" aria-label="Creator tags"><div ref={marquee}>CALL OF DUTY MOBILE <i>✳</i> PAPA SOPHIA <i>✳</i> LIVE <i>✳</i> THE ARCHIVE <i>✳</i> LESS EDITS. MORE RAW. <i>✳</i> CALL OF DUTY MOBILE <i>✳</i> PAPA SOPHIA <i>✳</i> LIVE <i>✳</i> THE ARCHIVE <i>✳</i> LESS EDITS. MORE RAW. <i>✳</i></div></section>

      <section className="numbers section-dark reveal">
        <div className="section-kicker">002 / THE NUMBERS</div>
        <div className="metric"><strong>{stats.followers.toFixed(1)}K</strong><span>TIKTOK<br />FOLLOWERS</span></div>
        <div className="metric"><strong>{stats.likes.toFixed(1)}M</strong><span>TIKTOK<br />LIKES</span></div>
        <p className="numbers-note">BUILT IN PUBLIC.<br />ON THE FRONTLINE.</p>
      </section>

      <section id="archive" className="archive">
        <div className="archive-head reveal"><div><span className="section-kicker">003 / THE ARCHIVE</span><h2>SELECTED<br /><em>NOISE</em></h2></div><p>RECORDED IN THE MOMENT.<br />NO CLEAN VERSION.</p></div>
        <div className="archive-list">
          {archive.map((clip, index) => <ArchiveClip clip={clip} index={index} key={clip.code} onCursor={cursorLabel} />)}
        </div>
        <div className="archive-bottom"><span>VIEW DATA / —</span><span>SCROLL / 04 FILES</span></div>
      </section>

      <section className="closeup-section section-dark">
        <div className="closeup-rule" />
        <div className="closeup-copy reveal" ref={closeupCopy}><span className="section-kicker">004 / CLOSE RANGE</span><h2>NO<br /><em>SECOND</em><br />TAKE.</h2><p>THE FEED STAYS ON.<br />SO DOES THE FACE.</p></div>
        <div className="closeup-frame"><div className="closeup-art" ref={closeupArt}><Image src="/images/hero-closeup.jpeg" alt="Close-up portrait of Papa Sophia" fill sizes="(max-width: 700px) 100vw, 54vw" /></div></div>
        <span className="closeup-caption">RAW // 001 &nbsp;&nbsp; NO FILTER</span>
      </section>

      <section id="signal" className="stream-section section-dark">
        <div className="stream-action" ref={streamArt} aria-hidden="true"><Image src="/images/action-codm.jpeg" alt="" fill sizes="100vw" /></div>
        <div className="stream-person reveal"><Image src="/images/headset.jpeg" alt="Papa Sophia streaming" fill sizes="(max-width: 700px) 92vw, 60vw" /></div>
        <div className="stream-copy reveal"><span className="section-kicker">005 / THE SIGNAL</span><h2>WHEN THE<br />MIC <em>OPENS.</em></h2><p>THE PERSON BEHIND<br />THE MATCH.</p><a href="#contact" onMouseEnter={cursorLabel("OPEN")} onMouseLeave={cursorLabel("")} className="under-link">TUNE IN <b>↗</b></a></div>
        <div className="stream-status"><span /><span>SIGNAL // ACTIVE</span><span>MATCH // CODM</span></div>
      </section>

      <section className="raw-section" ref={rawSection}>
        <div className="raw-image reveal" ref={rawArt}><Image src="/images/joker-moment.jpeg" alt="Psychological portrait of Papa Sophia" fill sizes="(max-width: 700px) 100vw, 66vw" /></div>
        <div className="raw-copy reveal"><span className="section-kicker">006 / RAW // 001</span><h2>LESS<br />EDITS.<br /><em>MORE RAW.</em></h2><p>NO SCRIPT.<br />NO APOLOGY.</p></div>
        <div className="raw-marker" aria-hidden="true">[ PS // UNFILTERED ]</div>
      </section>

      <section className="cutout-section">
        <div className="cutout-copy reveal"><span className="section-kicker">007 / PORTRAIT STUDY</span><h2>KEEP YOUR<br /><em>HEAD IN IT.</em></h2><p>THE GAME ISN&apos;T A CHARACTER.<br />THE CHARACTER IS THE GAME.</p></div>
        <div className="cutout-canvas"><div className="cutout-float" ref={cutoutArt} onMouseEnter={cursorLabel("VIEW")} onMouseLeave={cursorLabel("")}><Image className="portrait-full reveal" src="/images/full-body.png" alt="Full body portrait of Papa Sophia" fill sizes="(max-width: 700px) 100vw, 55vw" /></div><div className="portrait-stamp">PAPA SOPHIA<br />EST. IN THE LOBBY</div></div>
        <div className="portrait-word" aria-hidden="true">UNFILTERED</div>
      </section>

      <section className="loadout section-dark">
        <div className="loadout-image reveal"><Image src="/images/face-fragment.jpeg" alt="Fragmented face artwork" fill sizes="(max-width: 700px) 100vw, 45vw" /></div>
        <div className="loadout-copy reveal"><span className="section-kicker">008 / THE LOADOUT</span><h2>CREATOR<br /><em>IDENTITY</em></h2><dl><div><dt>GAME</dt><dd>CALL OF DUTY MOBILE</dd></div><div><dt>FORMAT</dt><dd>LIVE / SHORT FORM</dd></div><div><dt>STATUS</dt><dd>ACTIVE</dd></div><div><dt>LOCATION</dt><dd>EVERYWHERE</dd></div></dl></div>
      </section>

      <footer id="contact" className="footer section-dark">
        <span className="section-kicker">009 / LAST CALL</span><h2>STILL<br /><em>HERE?</em></h2><a className="footer-action" href="https://www.tiktok.com/@papasophiagaming" target="_blank" rel="noreferrer" aria-label="Watch Papa Sophia live on TikTok, opens in a new tab" onMouseEnter={cursorLabel("OPEN")} onMouseLeave={cursorLabel("")}>WATCH PAPA SOPHIA LIVE <b>↗</b></a>
        <div className="footer-bottom"><span>© 2025 PAPA SOPHIA</span><span>CALL OF DUTY MOBILE CREATOR</span><span>ALL SIGNALS RESERVED</span></div>
      </footer>
    </main>
  );
}
