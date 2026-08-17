# LawHub Uganda — Brand Guidelines

> **Classification:** Brand Reference Document  
> **Version:** 1.0.0  
> **Last Updated:** August 2026  
> **Audience:** Designers, developers, content creators, institutional partners

---

## Table of Contents

1. [Brand Identity](#brand-identity)
2. [Logo](#logo)
3. [Typography](#typography)
4. [Colour Palette](#colour-palette)
5. [UI Component Standards](#ui-component-standards)
6. [Iconography](#iconography)
7. [Tone of Voice](#tone-of-voice)
8. [Do's and Don'ts](#dos-and-donts)

---

## Brand Identity

### Mission Statement

*LawHub Uganda empowers law students, lecturers, and legal researchers with verified, accessible, and AI-enhanced tools for Ugandan legal education and research.*

### Brand Attributes

| Attribute | Expression |
|---|---|
| **Authoritative** | Rooted in verified Ugandan statutes, constitutional provisions, and judicial precedents |
| **Scholarly** | Academic rigour in every feature — IRAC method, formal citations, structured analysis |
| **Accessible** | Complex legal concepts explained clearly; platform usable on any modern browser |
| **Modern** | AI-assisted learning, responsive design, dark premium aesthetic |
| **Trustworthy** | Transparent AI governance, citation verification, and educational disclaimers |

### Brand Positioning

LawHub occupies the intersection of **legal scholarship** and **educational technology** — a premium digital companion for Ugandan law students that maintains the gravitas of legal tradition while embracing modern tools.

---

## Logo

### Primary Logo

The LawHub logo combines:
- **Icon:** A judicial/legal emblem rendered in gold on a dark background
- **Wordmark:** "LAW" in standard weight + "HUB" in bold gold, both in the Lexend typeface
- **Subtitle:** "LEGAL EDUCATION" in small caps below the wordmark

### Logo Variations

| Variant | Usage |
|---|---|
| **Full logo** (icon + wordmark + subtitle) | Website header, official documents, presentations |
| **Compact logo** (icon + wordmark) | Mobile header, navigation bar |
| **Icon only** | Favicon, app icon, social media avatar |

### Clear Space

Maintain a minimum clear space equal to the height of the "H" in "HUB" on all sides of the logo. No other elements should intrude into this space.

### Minimum Size

- **Digital:** Icon minimum 32×32px; full logo minimum 120px wide
- **Print:** Icon minimum 10mm; full logo minimum 40mm wide

### Prohibited Usage

- ❌ Do not stretch, rotate, or distort the logo
- ❌ Do not change the logo colours outside the approved palette
- ❌ Do not place the logo on busy or low-contrast backgrounds
- ❌ Do not add drop shadows, outlines, or effects to the logo
- ❌ Do not rearrange the logo components

---

## Typography

### Primary Typeface: Lexend

LawHub uses **Lexend** as its sole typeface — a variable font designed for optimal readability.

| Usage | Weight | Size | Line Height |
|---|---|---|---|
| **Page headings (h1)** | Bold (700) | 2.25rem (38px) | 1.3 |
| **Section headings (h2)** | Bold (700) | 1.75rem (30px) | 1.3 |
| **Subsection headings (h3)** | Bold (700) | 1.35rem (23px) | 1.4 |
| **Body text** | Regular (400) | 1rem (17px) | 1.7 |
| **Labels and captions** | Medium (500) | 0.875rem (15px) | 1.5 |
| **Small text / metadata** | Regular (400) | 0.75rem (13px) | 1.4 |
| **Navigation items** | Semi-Bold (600) | 0.875rem (15px) | 1.5 |
| **Buttons** | Semi-Bold (600) | 1rem (17px) | 1 |

### Font Loading

```html
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

### Heading Style

Headings use `letter-spacing: -0.01em` for a tighter, more authoritative appearance.

---

## Colour Palette

### Primary Colours

| Name | Hex | RGB | Usage |
|---|---|---|---|
| **Judicial Gold** | `#c89d42` | 200, 157, 66 | Primary accent, buttons, active states, links |
| **Gold Light** | `#dfb858` | 223, 184, 88 | Hover states, highlighted text |
| **Gold Dark** | `#a97e29` | 169, 126, 41 | Pressed states, borders |

### Background Colours

| Name | Hex / RGBA | Usage |
|---|---|---|
| **Deep Black** | `#09090b` | Page background, base layer |
| **Navy Dark** | `rgba(18, 18, 22, 0.65)` | Card backgrounds, panels |
| **Navy Surface** | `rgba(24, 24, 28, 0.6)` | Elevated surfaces |
| **Navy Card** | `rgba(18, 18, 22, 0.55)` | Content cards |
| **Navy Card Hover** | `rgba(28, 28, 34, 0.7)` | Card hover state |

### Text Colours

| Name | Hex | Usage |
|---|---|---|
| **Primary Text** | `#f8fafc` | Headings, body text |
| **Muted Text** | `#cbd5e1` | Secondary descriptions |
| **Dim Text** | `#94a3b8` | Metadata, timestamps, placeholders |

### Border Colours

| Name | RGBA | Usage |
|---|---|---|
| **Subtle Border** | `rgba(255, 255, 255, 0.08)` | Card borders, dividers |
| **Gold Border** | `rgba(200, 157, 66, 0.3)` | Active/focused card borders |

### Status Colours

| Status | Colour | Hex |
|---|---|---|
| Published / Active / Approved | Green | `#22c55e` |
| Pending Review | Yellow | `#eab308` |
| Changes Requested | Orange | `#f97316` |
| Rejected / Suspended | Red | `#ef4444` |
| Graded | Blue | `#3b82f6` |
| Draft / Archived | Grey | `#94a3b8` / `#6b7280` |

### Selection Colour

Text selection uses `background: #c89d42` with `color: #09090b` (gold on black inversion).

---

## UI Component Standards

### Glass Cards (`.law-card`)

The signature LawHub card component uses glassmorphism:

```css
.law-card {
  background-color: rgba(18, 18, 22, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.25rem;
  transition: all 0.25s ease-in-out;
}

.law-card:hover {
  border-color: rgba(200, 157, 66, 0.35);
  background-color: rgba(26, 26, 32, 0.7);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.6);
}
```

### Gold-Bordered Cards (`.law-card-gold`)

Used for featured or highlighted content:

```css
.law-card-gold {
  background-color: rgba(20, 20, 26, 0.65);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(200, 157, 66, 0.35);
  border-radius: 1.25rem;
  box-shadow: 0 8px 32px 0 rgba(200, 157, 66, 0.08);
}
```

### Glass Panels (`.law-glass`)

For navigation panels and overlays:

```css
.law-glass {
  background: rgba(14, 14, 18, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

### Scrollbar

Custom gold-toned scrollbar on WebKit browsers:

```css
::-webkit-scrollbar-thumb {
  background: rgba(200, 157, 66, 0.35);
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(200, 157, 66, 0.65);
}
```

### Background Texture

Subtle vertical pinstripe pattern for depth:

```css
.bg-pinstripe {
  background-image: repeating-linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.012) 0px,
    rgba(255, 255, 255, 0.012) 1px,
    transparent 1px,
    transparent 48px
  );
}
```

---

## Iconography

### Icon Library

LawHub uses **Lucide React** for all UI icons — a consistent, open-source SVG icon set.

### Icon Sizing

| Context | Size | Stroke Width |
|---|---|---|
| Navigation | 20px | 2 |
| Card headers | 20px | 2 |
| Inline text | 16px | 2 |
| Hero/feature | 24px | 1.5 |
| Status badges | 14px | 2.5 |

### Icon Colour

- Default: `#94a3b8` (dim text)
- Active/hover: `#c89d42` (gold)
- On gold background: `#09090b` (deep black)

---

## Tone of Voice

### Writing Principles

| Principle | Guideline |
|---|---|
| **Authoritative** | Write with the confidence of a legal textbook — precise, factual, well-cited |
| **Accessible** | Explain complex concepts without oversimplifying — "as simple as possible, but not simpler" |
| **Professional** | Formal register appropriate for academic and judicial audiences |
| **Inclusive** | Gender-neutral language; avoid assumptions about legal traditions |
| **Ugandan-first** | Reference Ugandan authorities before comparative jurisdictions |

### UI Copy Guidelines

| Element | Style |
|---|---|
| **Headings** | Sentence case ("Quick academic navigation" not "Quick Academic Navigation") — except proper nouns |
| **Buttons** | Imperative verb + object ("Submit assignment", "Ask AI", "View details") |
| **Error messages** | Explain what happened + what to do ("Email is required. Please enter your institutional email.") |
| **Success messages** | Confirm the action ("Assignment submitted successfully to faculty.") |
| **Placeholders** | Descriptive hint ("e.g. Explain Section 10 of Contracts Act 2010") |
| **Legal terms** | Use proper Ugandan legal terminology (e.g., "Plaint" not "Complaint", "Advocate" not "Attorney") |

### Terminology Standards

| Use ✅ | Avoid ❌ |
|---|---|
| Advocate | Attorney / Lawyer (informal) |
| Plaint | Complaint |
| Plaintiff | Claimant (unless in UK context) |
| The Constitution of Uganda, 1995 | "The Constitution" (ambiguous) |
| Article 21 | Art. 21 (abbreviated form in body text) |
| Supreme Court of Uganda | Supreme Court (specify jurisdiction) |

---

## Do's and Don'ts

### Design Do's ✅

- Maintain generous spacing — legal content needs breathing room
- Use gold accents sparingly — reserve for interactive and highlighted elements
- Ensure all text passes WCAG AA contrast ratios against dark backgrounds
- Use glassmorphism (backdrop-blur) for elevated surfaces
- Animate transitions smoothly (0.25s ease-in-out)

### Design Don'ts ❌

- Don't use bright/saturated colours on large surfaces — preserve the dark, premium aesthetic
- Don't add decorative elements that distract from legal content
- Don't use more than 2 font weights in a single component
- Don't override the gold accent with other accent colours
- Don't break the glass-card metaphor with flat, borderless containers

---

*These guidelines ensure visual and tonal consistency across all LawHub Uganda touchpoints — from the web platform to institutional presentations and printed materials.*
