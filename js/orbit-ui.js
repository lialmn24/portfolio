"use strict";
/* Adds the pill-nav extras on every page: prev/next arrows, round menu, social dock,
   copyright, and the astronaut "Ready for liftoff?" hero. */
(function () {
  const pages = [["about.html","About Me"],["experience.html","Experience"],["projects.html","Projects"],["links.html","Quick Links"],["contact.html","Say hi"]];
  const file = (location.pathname.split("/").pop() || "index.html");
  const i = pages.findIndex((p) => p[0] === file);
  const header = document.querySelector(".site-header");
  const main = document.querySelector("main");

  /* ---------- Unified dark-space background: animated starfield + aurora glows ----------
     Every page gets the same deep-space backdrop. Pages that already ship their own
     canvas starfield (index, projects) keep it. */
  if (!document.getElementById("sky")) {
    const sky = document.createElement("canvas");
    sky.id = "sky";
    sky.setAttribute("aria-hidden", "true");
    document.body.insertBefore(sky, document.body.firstChild);
    const sx = sky.getContext("2d");
    let sW, sH, sStars = [];
    const sStill = matchMedia("(prefers-reduced-motion: reduce)").matches;
    function sSize() {
      sW = sky.width = innerWidth;
      sH = sky.height = innerHeight;
      sStars = Array.from({ length: Math.round(sW * sH / 9000) }, () => ({
        x: Math.random() * sW, y: Math.random() * sH, r: Math.random() * 1.6 + .3,
        p: Math.random() * 6.28, s: Math.random() * .02 + .005, g: Math.random() < .08,
      }));
    }
    function sDraw() {
      sx.clearRect(0, 0, sW, sH);
      for (const st of sStars) {
        st.p += st.s;
        const a = .45 + .55 * Math.sin(st.p);
        sx.globalAlpha = a;
        sx.fillStyle = st.g ? "#bcd6ff" : "#fff";
        if (st.g) { sx.shadowColor = "#9cc4ff"; sx.shadowBlur = 14; } else sx.shadowBlur = 0;
        sx.beginPath();
        sx.arc(st.x, st.y, st.g ? st.r + 1.6 : st.r, 0, 6.28);
        sx.fill();
      }
      sx.globalAlpha = 1;
      if (!sStill) requestAnimationFrame(sDraw);
    }
    addEventListener("resize", sSize);
    sSize();
    sDraw();
  }
  if (!document.querySelector(".aurora")) {
    const au = document.createElement("div");
    au.className = "aurora";
    au.setAttribute("aria-hidden", "true");
    au.innerHTML = "<i></i><i></i>";
    const skyEl = document.getElementById("sky");
    document.body.insertBefore(au, skyEl ? skyEl.nextSibling : document.body.firstChild);
  }

  // Prev / next arrows under the nav
  if (header && i !== -1) {
    const prev = pages[i - 1], next = pages[i + 1];
    const nav = document.createElement("div");
    nav.className = "pager";
    nav.innerHTML =
      '<a href="' + (prev ? prev[0] : "#") + '" aria-label="' + (prev ? "Previous page: " + prev[1] : "No previous page") + '"' + (prev ? "" : ' aria-disabled="true" tabindex="-1"') + '><i class="fa-solid fa-chevron-left" aria-hidden="true"></i></a>' +
      '<a href="' + (next ? next[0] : "#") + '" aria-label="' + (next ? "Next page: " + next[1] : "No next page") + '"' + (next ? "" : ' aria-disabled="true" tabindex="-1"') + '><i class="fa-solid fa-chevron-right" aria-hidden="true"></i></a>';
    header.appendChild(nav);
  }

  // Round menu (top-left)
  const menu = document.createElement("div");
  menu.className = "orb-menu";
  menu.innerHTML = '<button class="orb-btn" type="button" aria-expanded="false" aria-label="Open page menu">&middot;&middot;&middot;</button><ul class="orb-list">' +
    pages.map((p) => '<li><a href="' + p[0] + '">' + p[1] + "</a></li>").join("") + "</ul>";
  const btn = menu.querySelector(".orb-btn");
  btn.addEventListener("click", () => { const o = menu.classList.toggle("open"); btn.setAttribute("aria-expanded", o); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { menu.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); } });
  document.body.appendChild(menu);

  // Social icons (bottom-left) + copyright (bottom-right)
  const dock = document.createElement("div");
  dock.className = "social-dock";
  dock.innerHTML =
    '<a href="https://github.com/lcct-24-13115" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>' +
    '<a href="https://www.linkedin.com/in/julia-cassandra-alemania-911831444" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>' +
    '<a href="https://www.facebook.com/JCUA24" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>' +
    '<a href="https://www.instagram.com/makethoiu_" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>';
  document.body.appendChild(dock);
  const copy = document.createElement("p");
  copy.className = "copy-dock";
  copy.textContent = "\u00A9 " + new Date().getFullYear() + " Julia Alemania";
  document.body.appendChild(copy);

  // Share button (bottom-right): Facebook / LinkedIn / X / copy link
  const share = document.createElement("div");
  share.className = "share-fab";
  const sUrl = encodeURIComponent(location.href);
  const sTitle = encodeURIComponent(document.title);
  share.innerHTML =
    '<div class="share-panel" role="dialog" aria-label="Share this page" aria-hidden="true">' +
    '<a href="https://www.facebook.com/sharer/sharer.php?u=' + sUrl + '" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i><span>Facebook</span></a>' +
    '<a href="https://www.linkedin.com/sharing/share-offsite/?url=' + sUrl + '" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i><span>LinkedIn</span></a>' +
    '<a href="https://twitter.com/intent/tweet?url=' + sUrl + '&text=' + sTitle + '" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-x-twitter" aria-hidden="true"></i><span>X</span></a>' +
    '<button type="button" class="share-copy"><i class="fa-regular fa-link" aria-hidden="true"></i><span>Copy link</span><em class="share-tip" aria-live="polite">Link copied!</em></button>' +
    "</div>" +
    '<button class="share-btn" type="button" aria-expanded="false" aria-label="Share this page"><i class="fa-solid fa-share-nodes" aria-hidden="true"></i></button>';
  document.body.appendChild(share);
  const sBtn = share.querySelector(".share-btn"), sPanel = share.querySelector(".share-panel");
  function setShare(open) {
    share.classList.toggle("open", open);
    sBtn.setAttribute("aria-expanded", open);
    sPanel.setAttribute("aria-hidden", !open);
  }
  sBtn.addEventListener("click", () => setShare(!share.classList.contains("open")));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setShare(false); });
  document.addEventListener("click", (e) => { if (!share.contains(e.target)) setShare(false); });
  share.querySelector(".share-copy").addEventListener("click", function () {
    const tip = this.querySelector(".share-tip");
    const done = () => { tip.classList.add("show"); setTimeout(() => tip.classList.remove("show"), 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(location.href).then(done, done);
    } else {
      const ta = document.createElement("textarea");
      ta.value = location.href;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (e) { /* ignore */ }
      ta.remove();
      done();
    }
  });

  // Open Graph tags so the link gets a rich preview card on social platforms
  (function () {
    const desc = (document.querySelector('meta[name="description"]') || {}).content || "";
    const tags = [
      ["og:title", document.title],
      ["og:description", desc],
      ["og:url", location.href],
      ["og:image", new URL("images/profile.jpg", location.href).href],
      ["og:image:width", "700"],
      ["og:image:height", "700"],
      ["og:type", "website"],
      ["og:site_name", "Julia Alemania"],
    ];
    for (const pair of tags) {
      const key = pair[0];
      let m = document.querySelector('meta[property="' + key + '"]');
      if (!m) { m = document.createElement("meta"); m.setAttribute("property", key); document.head.appendChild(m); }
      m.setAttribute("content", pair[1]);
    }
  })();

  // Ambient music player (Web Audio API — generated in-browser, no files needed)
  const mus = document.createElement("div");
  mus.className = "mus-fab";
  mus.innerHTML =
    '<button class="mus-btn" type="button" aria-pressed="false" aria-label="Toggle ambient music">' +
    '<i class="fa-solid fa-music" aria-hidden="true"></i>' +
    '<span class="mus-eq" aria-hidden="true"><i></i><i></i><i></i></span>' +
    "</button>";
  document.body.appendChild(mus);
  const mBtn = mus.querySelector(".mus-btn");

  let mCtx, mMaster, mDelay, mOn = false, mTimer = null, mNext = 0, mStep = 0;
  const mBpm = 70, mBeat = 60 / mBpm;
  // Cmaj7 – Am7 – Fmaj7 – G7, one bar each: [root, third, fifth, seventh]
  const mChords = [
    [130.81, 164.81, 196.00, 246.94],
    [110.00, 130.81, 164.81, 196.00],
    [87.31, 110.00, 130.81, 164.81],
    [98.00, 123.47, 146.83, 196.00],
  ];
  const mArp = [0, 2, 1, 3, 2, 0, 3, 1];

  function mEnv(g, t, a, d, peak) {
    g.gain.cancelScheduledValues(t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  }

  function mTone(freq, t, dur, peak, type, send) {
    const o = mCtx.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    const g = mCtx.createGain();
    o.connect(g);
    g.connect(mMaster);
    if (send) g.connect(send);
    mEnv(g, t, 0.4, dur, peak);
    o.start(t);
    o.stop(t + dur + 0.5);
  }

  function mPad(chord, t, dur) {
    chord.forEach(function (f) {
      const o1 = mCtx.createOscillator(), o2 = mCtx.createOscillator();
      o1.type = "sine";
      o1.frequency.value = f;
      o1.detune.value = -6;
      o2.type = "triangle";
      o2.frequency.value = f;
      o2.detune.value = 6;
      const g = mCtx.createGain();
      o1.connect(g);
      o2.connect(g);
      g.connect(mMaster);
      mEnv(g, t, 1.8, dur * 0.9, 0.07);
      o1.start(t);
      o2.start(t);
      o1.stop(t + dur + 0.5);
      o2.stop(t + dur + 0.5);
    });
  }

  function mSched() {
    if (!mCtx) return;
    while (mNext < mCtx.currentTime + 0.12) {
      const chord = mChords[Math.floor(mStep / 8) % 4];
      if (mStep % 8 === 0) {
        mPad(chord, mNext, 8 * mBeat);
        mTone(chord[0] / 2, mNext, 8 * mBeat * 0.9, 0.11, "sine");
      }
      mTone(chord[mArp[mStep % 8]] * 2, mNext, mBeat * 0.45, 0.05, "sine", mDelay);
      mNext += mBeat / 2;
      mStep++;
    }
  }

  function mStart() {
    if (mCtx) return;
    try {
      mCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      return;
    }
    mMaster = mCtx.createGain();
    mMaster.gain.value = 0.4;
    mDelay = mCtx.createDelay();
    mDelay.delayTime.value = mBeat * 0.75;
    const fb = mCtx.createGain();
    fb.gain.value = 0.28;
    mDelay.connect(fb);
    fb.connect(mDelay);
    mDelay.connect(mMaster);
    mMaster.connect(mCtx.destination);
    mNext = mCtx.currentTime + 0.05;
    mTimer = setInterval(mSched, 30);
    mSched();
  }

  function mToggle() {
    if (!mOn) {
      mStart();
      if (mCtx) {
        if (mCtx.state === "suspended") mCtx.resume();
        mOn = true;
      }
    } else {
      if (mTimer) { clearInterval(mTimer); mTimer = null; }
      if (mCtx) mCtx.suspend();
      mCtx = null;
      mOn = false;
    }
    mBtn.setAttribute("aria-pressed", String(mOn));
    mus.classList.toggle("playing", mOn);
  }
  mBtn.addEventListener("click", mToggle);

  // Astronaut hero at the end of each page (replaces the old CTA on Experience)
  if (!main || i === -1 || file === "contact.html") return;
  const old = document.querySelector(".xp-cta");
  if (old) old.remove();
  const sec = document.createElement("section");
  sec.className = "lo-hero";
  sec.setAttribute("aria-labelledby", "lo-title");
  sec.innerHTML =
    '<p class="lo-eyebrow">Ready for liftoff?</p>' +
    '<h2 class="lo-title" id="lo-title">Let&rsquo;s build<span class="lo-grad">something out of this world</span></h2>' +
    '<div class="lo-actions"><a class="lo-btn grad" href="contact.html">Say hi <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a><a class="lo-btn" href="projects.html">See my projects</a></div>' +
    '<svg class="lo-astro" viewBox="0 0 400 300" role="img" aria-label="Astronaut waving while holding a giant pencil">' +
    '<defs><radialGradient id="aS" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#b9c2e0"/></radialGradient>' +
    '<radialGradient id="aV" cx=".3" cy=".25" r=".9"><stop offset="0" stop-color="#3b57d6"/><stop offset="1" stop-color="#0a1250"/></radialGradient>' +
    '<linearGradient id="aP" x1="0" x2="1"><stop offset="0" stop-color="#f2b25c"/><stop offset="1" stop-color="#b9622a"/></linearGradient></defs>' +
    '<g transform="rotate(-32 250 190)"><rect x="150" y="165" width="220" height="50" rx="6" fill="url(#aP)"/><path d="M370 165 L420 190 L370 215 Z" fill="#f4d9b0"/><path d="M402 183 L420 190 L402 197 Z" fill="#222"/></g>' +
    '<path d="M110 300 C110 215 150 185 200 185 C250 185 290 215 290 300 Z" fill="url(#aS)"/>' +
    '<circle cx="200" cy="120" r="78" fill="url(#aS)"/><ellipse cx="200" cy="125" rx="58" ry="50" fill="url(#aV)"/><ellipse cx="178" cy="106" rx="14" ry="9" fill="#fff" fill-opacity=".35"/>' +
    '<rect x="70" y="140" width="36" height="86" rx="18" fill="url(#aS)" transform="rotate(25 88 180)"/><circle cx="72" cy="135" r="20" fill="#fff"/>' +
    '<circle cx="286" cy="215" r="22" fill="#fff"/></svg>';
  main.appendChild(sec);
})();
