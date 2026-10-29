# Sumaiya — Registered Midwife Portfolio

A responsive, accessible static portfolio for Sumaiya, a Registered Midwife in Bangladesh. Hosted on GitHub Pages with no build step or backend.

## Project structure

```text
.
├── index.html                 # Home page and professional introduction
├── about.html                 # Professional background, values and education
├── portfolio.html             # Academic work and professional development
├── cv.html                    # Print-ready CV page
├── assets/
│   ├── css/
│   │   ├── base.css            # Design tokens, reset, typography and global header
│   │   ├── hero.css            # Hero, navigation actions and button styles
│   │   ├── sections.css        # Shared sections, cards, contact panel and CV
│   │   └── responsive.css      # Breakpoints, reduced motion and print rules
│   ├── js/
│   │   └── main.js             # Mobile navigation, current year and CV printing
│   └── images/
│       └── favicon.svg         # Baby-pink brand favicon
├── robots.txt                  # Crawler instructions
├── sitemap.xml                 # Public page URLs for search engines
├── .editorconfig               # Consistent editor formatting
└── googlef12f9ebc2646e25e.html # Search Console verification file
```

## Design and implementation

- Baby-pink brand colour: `#F4C2C2`, with shared CSS design tokens.
- Semantic HTML, keyboard focus states, responsive navigation and reduced-motion support.
- CSS is split by responsibility; keep stylesheet links in the same order in every page.
- JavaScript is dependency-free and progressively enhances the static pages.
- Root-level HTML files keep existing public URLs stable for SEO and existing links.
- Canonical URLs, metadata, sitemap and robots directives support search discovery.

## Pages

- **Home:** `/`
- **About:** `/about.html`
- **Portfolio:** `/portfolio.html`
- **CV:** `/cv.html` — use **Print or save as PDF** in the browser.

## Deployment

Push changes to the configured GitHub Pages publishing branch. No package manager, compilation or build command is required.

## Content maintenance and privacy

Before using the CV for applications, verify all education dates and details. Add only genuine experience, training and certificates. Publish portfolio materials only when ready to share. Never publish patient-identifying information or confidential clinical records.

## Search engine maintenance

The sitemap at `/sitemap.xml` lists all four public pages. Submit or re-submit it in Google Search Console after publishing; sitemap submission does not guarantee indexing.
