# Design System: Expenzez

> Local design reference (intentionally **not** committed). Encodes Expenzez's
> real, established identity: electric purple + lime on warm black (from the
> original design handoff). The generic "no purple" anti-slop rule is
> deliberately overridden — this duo-tone is the brand.

## 1. Visual Theme & Atmosphere
Confident after-dark fintech — a warm near-black canvas lit by electric purple
and acid lime. Asymmetric, left-weighted layouts (copy left, product right).
Ambient motion: drifting mesh light, a slow masked "money in motion" ticker, and
spring-eased reveals. Clinical clarity with a nightlife glow.

- **Density:** Daily-App Balanced (4).
- **Variance:** Offset Asymmetric (7).
- **Motion:** Fluid CSS (6) — `cubic-bezier(0.16, 1, 0.3, 1)`, ambient loops.

## 2. Color Palette & Roles
- **Warm Black** (`#07050C`) — primary canvas. Never `#000000`.
- **Ink Plum** (`#0F0A1A`) — secondary band (stats strip).
- **Card Plum** (`#161122`) — card / surface fill.
- **Card Plum Hi** (`#1B1428`) — raised surface.
- **Hairline** (`rgba(255,255,255,0.06)`) / **Hairline Hi** (`rgba(255,255,255,0.12)`).
- **Moonlight** (`#F4F1FA`) — primary text.
- **Moonlight Dim** (`rgba(244,241,250,0.62)`) — body / secondary.
- **Moonlight Faint** (`rgba(244,241,250,0.38)`) — captions.
- **Electric Purple** (`#9D5BFF`) — primary accent: CTAs, links, focus, glow.
- **Purple Deep** (`#6B2EB8`) — gradient partner.
- **Acid Lime** (`#C5F25C`) — positive values / highlights / the "." accent.
- **Signal Rose** (`#FF6B8A`) — spend / negatives.
- **Sky Cyan** (`#5BC8FF`) — tertiary category (import/CSV).

Purple = brand action; lime = "good news" (income, under budget). Gradients run
`135deg` purple → purple-deep for fills, purple → lime for the headline accent word.

## 3. Typography
- **Display & UI:** `Geist` 500/600, tight tracking (`-2`/`-3` on big display).
- **Body:** `Geist` 400/500, line-height ~1.55, ~65ch, Moonlight Dim.
- **Numbers / metadata:** `Geist Mono`.
- **Accent serif:** `Fraunces` italic — one word per headline, gradient-filled.
- **Banned:** `Inter`, system defaults, generic serifs. Sentence case headings.

## 4. Component Stylings
- **Buttons:** flat fills, tactile `translateY` hover + `scale(0.97)` active; brand
  purple drop-glow on the primary store button. Secondary = card + hairline; tertiary = text link.
- **Pills/badges:** small (`10px`) tinted chips — purple-tinted (default) or lime-tinted (accent).
- **Cards:** radius `24px`/`18px`, Card Plum + hairline. Hover `translateY(-6px)` + brighten + soft shadow.
- **Bento:** 6-col grid; hero tile 4×2, supporting tiles span 2; no orphan tiles; 1-col < 860px.
- **Inputs:** label above, error below, focus ring in Electric Purple.
- **Loaders/empty/error:** skeleton shimmer; composed empty states; inline errors.

## 5. Layout Principles
- Max-width `1240px`, centered, `32px` padding.
- Asymmetric hero: copy left (`max-width: 480px`), device right; never centered.
- CSS Grid over flex math. Single-column collapse < 860px; no horizontal scroll.
- Full-height sections use `min-h-[100dvh]`.
- Background motion masked to the open right zone — never behind text.

## 6. Motion & Interaction
- Easing `cubic-bezier(0.16, 1, 0.3, 1)`; ~0.4–0.65s reveals/hover.
- Reveals: `opacity` + `translate` (hover owns `transform`), staggered 70–120ms, IO once.
- Ambient loops: drifting purple/lime/cyan blobs (22/26/28/32s), masked ticker, slow float.
- `transform`/`opacity` only; grain on a fixed layer; respects `prefers-reduced-motion`.

## 7. Anti-Patterns (Banned)
- No emojis; lucide icons, single stroke weight.
- No `Inter`, no generic serifs, no pure `#000000`.
- No text-fill gradient on full headlines — only the single Fraunces accent word.
- No background motion / ticker text overlapping copy.
- No 3-equal-column "AI feature row" as the primary layout.
- No fabricated metrics, ratings, or fake user counts (honesty / UK compliance).
- No AI copywriting clichés ("Elevate", "Seamless", "Unleash", "Next-Gen").
- No bank-connection / Open-Banking claims — Expenzez is upload-only, private.
