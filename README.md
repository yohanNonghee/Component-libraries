# Yohan UI — Component Library

A reusable UI component library with an interactive, Storybook-style showcase inspired by the structure and visual style of the [Yohan Porsche website](https://yohannonghee.github.io/Yohan/). Explore component variants and states directly in the browser without a build step.

## Project Files

- `index.html` — Showcase structure, component previews, and the inline SVG icon sprite.
- `styles.css` — CSS design tokens, component styles, layouts, and responsive rules.
- `script.js` — Variant switching, image selection, code snippet updates, copy buttons, and active navigation behavior.

## Design Tokens

CSS custom properties are defined under `:root` in `styles.css`. They cover:

- **Colors:** Backgrounds, surfaces, text, Porsche Red, Sky Blue, and status colors.
- **Typography:** Prompt, Roboto, and monospace font families, with sizes from `--text-xs` to `--text-2xl`.
- **Spacing:** A 4px-based scale from `--space-1` to `--space-12`.
- **Other values:** Border radii, card shadows, and sidebar width.

## Components

- **Buttons:** Primary, Secondary, Outline, and Disabled variants.
- **Icons:** Inline SVG icons for cars, ratings, performance, search, favorites, and status feedback.
- **Pictures:** Image-only and caption-overlay variants, with selectable sample images.
- **Cards:** Standard, Featured, and Compact variants.
- **Alerts and Badges:** Info, Success, Warning, and Error states.

Use the showcase controls to switch variants. Each component preview also displays a markup snippet that can be copied and adapted.

## Getting Started

Open `index.html` in a web browser, or use the VS Code Live Server extension to serve it locally.

Fonts and sample images are loaded from external URLs, so an internet connection is needed for the complete visual experience.
