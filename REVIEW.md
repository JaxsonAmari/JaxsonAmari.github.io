# Guide review

Reviewed accessibility, layout, typography, color, writing, and general UI against the supplied article. Findings are consolidated by cause. This is a static information page; no fetch, form, video, carousel, pricing table, or nested rounded controls exist.

## Findings fixed

| Severity | Location and original evidence | Change |
| --- | --- | --- |
| Medium | index.html introduction: "or something more challenging" | Named actual work: tone, band music, and audition preparation. |
| Medium | styles.css `.lesson`: `background: var(--surface)` across both complete lesson rows | Moved pink to the level headings. Reading columns use the neutral page surface, keeping the palette from overwhelming the content. |
| Medium | index.html introduction ended with description only | Added the specific, working "Compare lesson options" anchor, with hover, active, and keyboard focus states. |
| Medium | styles.css `.lesson`: `1fr 1.6fr` with a 56px gap and no intermediate breakpoint | Added minmax(0, ...) columns and a tablet breakpoint; navigation and footer can wrap. Screenshot verification is still required. |
| Low | styles.css section rules used the same strong navy as text | Added a navy-derived translucent rule token for supporting dividers. |

## Six review domains

- Accessibility: English language, sibling header/main/footer landmarks, a skip link, sequential headings, native anchors, visible 2px focus indicators, 44px minimum navigation targets. No autoplay, motion, or custom control semantics are needed. Contrast checked numerically; keyboard and screen-reader behavior need browser verification.
- Layout: left-aligned content, two lesson rows with colored identification areas, different section spacing, mobile and tablet rules. No three-card template, 100vh, shadows, arbitrary stacking indices, or nested radius problem.
- Typography: Manrope plus contrasting Geist Mono labels; shared type tokens; upright weights 400–700; balanced headings and pretty paragraphs; no manual line breaks.
- Color: owner-requested navy/pink/yellow palette retained intentionally despite the article's general advice against blue. Flat surfaces and one yellow accent. Navy text on both pink surfaces clears 4.5:1. Texture is unnecessary for this text-led page.
- Writing: specific lesson topics and age groups, sentence case, outcome-specific navigation, no hype, em dashes, fabricated rates, testimonials, credentials, or business name.
- UI: all navigation uses real section targets. Hover, active, focus, and text selection states exist. Async loading/error/empty states are inapplicable because the page has no data requests or forms. Booking remains honestly marked as coming soon until the owner supplies details.

## Verification limits

Local HTTP response and source checks completed. The browser tool returned "No browser is available", so desktop/mobile screenshots, font rendering, and interactive keyboard testing could not be completed. No visual approval is claimed.

The guide's lists of third-party tools were treated as references, not dependencies to install. No imagery, texture, animation, or additional interactive features were added merely to exercise their rules.

Subsequent simplification: replaced detailed homepage lesson rows with concise plan summaries and Explore rates links. Added beginner-rates.html and advanced-rates.html with honest unannounced pricing states. The earlier audit describes the prior layout; the current homepage uses two aligned plan panels.
