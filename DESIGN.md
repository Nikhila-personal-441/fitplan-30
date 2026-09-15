# Design Brief: Premium 30-Day Fitness Companion

## Tone & Purpose
High-end fitness app (Peloton/Apple Fitness+ aesthetic). Energetic yet refined. Progress-focused, achievement-driven. Motivational without being loud. Modern health-tech—accessible across mobile/desktop.

## Palette
| Token | OKLCH | Purpose |
|-------|-------|---------|
| primary | 0.71 0.19 158 | Vibrant emerald—health, active state, progress |
| secondary | 0.60 0.20 25 | Warm coral—difficulty indicators, intensity |
| accent | 0.76 0.12 80 | Gold—milestones, highlights, celebrations |
| muted | 0.94 0.01 0 | Neutral grey—subtle backgrounds, metadata |
| destructive | 0.55 0.22 25 | Red—warnings, skip/stop actions |

## Typography
| Role | Font | Usage |
|------|------|-------|
| display | GeneralSans | Day numbers, headers, titles (36px/28px mobile) |
| body | Inter (DMSans) | Exercise names, diet items, descriptions (16px/14px) |
| mono | JetBrainsMono | Reps/sets/duration, nutrition data (12px/11px) |

## Structural Zones
| Zone | Treatment |
|------|-----------|
| Header | Sticky, solid primary bg, white text, subtle border-bottom |
| Grid Container | bg-background, card-based layout, 16px gap |
| Day Tiles | bg-card with shadow-card, 16px radius; states: active (gradient border + glow), completed (checkmark), locked (grayscale) |
| Milestone Badge | Days 7/14/21/30: accent bg with pulse-glow animation |
| Exercise Cards | Name bold (16px), difficulty badge (color-coded), mono metadata |
| Diet Cards | Meal name, nutrition micro-badges (kCal, protein, carbs in mono) |
| Footer | Minimal or omitted |

## Shadow Hierarchy
- **card**: 0 4px 12px (default card depth)
- **card-hover**: 0 12px 28px (tile hover state)
- **card-active**: 0 0 24px + inset glow (active/today tile)
- **elevated**: 0 20px 40px (premium panels)

## Motion & Interaction
- **Tile hover**: scale(1.05) + shadow-card-hover, 0.3s smooth
- **Tile active**: Gradient border (primary), box-shadow glow, persistent
- **Milestone**: pulse-glow animation (2s infinite)
- **Exercise reveal**: fade-in + scale-in 0.2s
- **Success pop**: 0.4s cubic bounce (0.34, 1.56, 0.64, 1)
- **All transitions**: cubic-bezier(0.4, 0, 0.2, 1) for snappy, refined feel

## Premium Details
- **Completed tiles**: Green checkmark overlay, subtle primary highlight
- **Locked tiles**: Grayscale + lock icon overlay, reduced opacity
- **Diet badge**: Mono font, small kCal/protein/carbs pills, bg-muted
- **Difficulty badges**: Easy (primary tint 15%), Moderate (accent 20%), Hard (destructive 18%)
- **Completion toast**: Animated success-pop, celebratory but restrained

## Responsive
| Device | Grid | Font |
|--------|------|------|
| Mobile (375px) | 1 col | 14px body, 28px titles |
| Tablet (768px) | 2 cols | 14px body, 28px titles |
| Desktop (1920px) | 3 cols | 16px body, 36px titles |

## Dark Mode
- bg-background: 0.12 0 0 (near black)
- bg-card: 0.16 0 0 (subtle lift)
- text-foreground: 0.95 0 0 (high contrast)
- primary: 0.78 0.18 158 (lifted for dark)
- Shadow adjustments for depth on dark bg

## Differentiation
Premium fitness experience through **layered depth** (shadow hierarchy), **celebratory milestones** (pulse glow), **state clarity** (active tile glow, completed checkmark, locked grayscale), and **refined motion** (smooth curves, no jarring transitions). Every element reinforces progress and consistency.
