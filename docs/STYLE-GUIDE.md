# Style Guide

Basehan: about, experience, links, contact. Lahat ng page ay gagamit ng `css/site.css`.

## CSS load order (bawat page)

```html
<link rel="stylesheet" href="css/julia-style.css?v=3">
<link rel="stylesheet" href="css/space-theme.css?v=3">
<link rel="stylesheet" href="css/about-plus.css?v=3">
<link rel="stylesheet" href="css/pages.css?v=3">
<!-- page-specific css here (experience-plus, links, contact-plus) -->
<link rel="stylesheet" href="css/orbit-ui.css?v=1">
<link rel="stylesheet" href="css/site.css?v=1">
```

Ang `site.css` ang pinakahuli para ito ang mananaig. Kapag tapos na ang Phase 5, puwede nang paliitin ang mga lumang file.

## Tokens

| Token | Value | Galing sa |
|---|---|---|
| `--brand` / `--brand-deep` | #2d3cdb / #1a22a0 | julia-style.css |
| `--sun` | #ffc24b (accent) | julia-style.css |
| `--blush` | #ffdde8 | julia-style.css |
| `--ink` | #12163a | julia-style.css |
| `--bg`, `--bg-alt`, `--surface` | light: #f8f7fc, #eeedfa, #fff. dark: #04050d, #0a0c22, #181c45 | julia-style.css |
| `--text`, `--text-muted`, `--border` | light/dark pairs | julia-style.css |
| `--chip-bg`, `--chip-text` | light/dark pairs | julia-style.css |
| `--nebula-violet/rose/cyan` | #8f7bff, #ff8ac0, #7ff0ff | space-theme.css, orbit-ui.css |
| `--font-display` | Bricolage Grotesque | julia-style.css |
| `--font-body` | Poppins | julia-style.css |
| `--fs-h1`, `--fs-h2`, `--fs-lead`, `--fs-base`, `--fs-sm` | type scale | about-plus.css, julia-style.css |
| `--space-1` hanggang `--space-7` | 0.25rem hanggang 5.5rem | julia-style.css |
| `--radius` / `--radius-sm` / `--radius-pill` | 18px / 8px / 999px | julia-style.css |
| `--header-h` | 68px | julia-style.css |
| `--wide` / `--narrow` | 1500px / 960px | julia-style.css |

Mga lumang pangalan (`--display`, `--radius`) ay buhay pa para hindi masira ang lumang CSS.

## Reusable classes

| Class | Gamit |
|---|---|
| `.container`, `.container.narrow` | Lapad ng content |
| `.section`, `.section.alt` | Bawat seksyon ng page |
| `.section-head` + `h2` | Pamagat ng seksyon (may gradient na guhit sa ilalim) |
| `.eyebrow` | Maliit na label sa itaas ng pamagat |
| `.grid`, `.grid-2`, `.grid-3` | Layout ng cards |
| `.card` | Glass card na may hover glow |
| `.btn` + `.btn-primary` / `.btn-ghost` / `.btn-outline` | Buttons |
| `.btn-row` | Hilera ng buttons |
| `.chips`, `.chips.small` | Tags |
| `.icon-btn` | Round icon button (theme, menu) |
| `.page-top` | Padding sa itaas ng page na walang hero |

## Standard na header

Kopyahin sa bawat page. Palitan lang kung aling link ang may `aria-current="page"`.

```html
<a class="skip-link" href="#main">Skip to main content</a>

<header class="site-header" id="top">
  <div class="header-inner">
    <a class="brand" href="index.html" aria-label="Julia Cassandra Alemania, back to the top">Julia Alemania</a>

    <button class="icon-btn nav-toggle" id="navToggle" type="button" aria-expanded="false" aria-controls="siteNav" aria-label="Open menu">
      <span class="glyph" aria-hidden="true">&#9776;</span>
    </button>

    <nav class="site-nav" id="siteNav" aria-label="Main navigation">
      <ul>
        <li><a href="about.html">About Me</a></li>
        <li><a href="experience.html">Experience</a></li>
        <li><a href="projects.html">Projects</a></li>
        <li><a href="links.html">Links</a></li>
        <li class="nav-cta"><a href="contact.html">Say hi &#128075;</a></li>
      </ul>
    </nav>

    <button class="icon-btn fs-toggle" id="fsToggle" type="button" aria-label="Enter full screen" title="Enter full screen" hidden>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/></svg>
    </button>

    <button class="icon-btn theme-toggle" id="themeToggle" type="button" aria-label="Switch to dark mode" title="Switch to dark mode">
      <span class="glyph" aria-hidden="true">&#9790;</span>
    </button>
  </div>
</header>
```

## Standard na footer

```html
<footer class="site-footer">
  <div class="container footer-inner">
    <p>&copy; <span id="year">2026</span> Julia Cassandra U. Alemania. Built with HTML, CSS and JavaScript. Thanks for visiting my corner of the universe.</p>
    <a href="#top">Back to top <i class="fa-solid fa-arrow-up" aria-hidden="true"></i></a>
  </div>
</footer>
```

## Scripts (bawat page)

```html
<script src="js/julia-main.js?v=3" defer></script>
<script src="js/space-loader.js?v=3" defer></script>
<script src="js/cursor.js?v=3" defer></script>
<script src="js/orbit-ui.js?v=1" defer></script>
```

Dagdag lang ang page-specific na script (hal. `experience-plus.js`, `links.js`).

## Mga bagay na dapat bantayan sa susunod na phase

- Ang `orbit-ui.css` ay may sariling desktop nav (dark pill, uppercase) at floating menu, share at music buttons. Sa Phase 2 hanggang 5, ikukumpara muna ito sa `site.css` bago ilipat ang final na itsura ng nav.
- Ang desktop pill nav ay nasa `orbit-ui.css` (mula 861px), at ang mobile dropdown ay hanggang 760px. May puwang sa 761 hanggang 860px. Susuriin ito sa Phase 5.
- Ang `index.html` at `projects.html` ay may sariling inline `<style>` at Gloock/Montserrat. Aalisin ito sa Phase 2 at 3.
