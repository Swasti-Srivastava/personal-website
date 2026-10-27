# Savi Srivastava — Portfolio

Single-page personal portfolio built with React, TypeScript, Vite, and Tailwind CSS.

## Scripts

```sh
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check and build for production into dist/
npm run preview  # serve the production build locally
npm run lint     # lint with oxlint
```

## Structure

```
src/
  main.tsx                app entry point
  App.tsx                 the five sections, in page order
  config/sections.ts      section ids, nav labels, and time-of-day phase
  lib/sky.ts              computes each section's gradient variables from its neighbors
  styles/index.css        design tokens (@theme), base styles, decorative + motion classes
  components/
    Section.tsx           <section> wrapper that paints its slice of the sky
    Container.tsx         shared content width and side margins
    Navigation.tsx        letterhead-style nav at the top of Home (not sticky)
    SectionHeading.tsx    number, title, handwritten note, divider
    Divider.tsx           fine hand-drawn rule
    Flourish.tsx          small printer's ornament
    HandNote.tsx          Caveat handwritten accent
    Reveal.tsx            fade-and-rise on scroll
  hooks/
    useReveal.ts                  IntersectionObserver for Reveal
    usePrefersReducedMotion.ts    for future JS-driven motion
  sections/               Home (with About), Projects, Experience, Skills, Contact
  assets/                 images and other imported assets
```

## Day-to-night palette

Each section is assigned a phase (`morning`, `golden`, `dusk`, `blue`, `night`)
in `config/sections.ts`. Colors for each phase are `--color-<phase>-*` tokens in
`styles/index.css`; change a token and every gradient that uses it updates.
