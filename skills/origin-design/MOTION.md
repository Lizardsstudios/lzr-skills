# Motion Specification

> Load this file when designing animations, hover transitions, page transitions, or any timed interaction.

Motion in product apps has one job: communicate what just happened or what is about to happen. It is never decoration.

---

## Principle: Motion Must Earn Its Place

Before adding any animation, answer: does this motion help the user understand the interface better? If the answer is anything other than yes, remove it.

Three legitimate reasons for motion:
1. **Orientation** — showing where content came from or where it went (slide-in from right = navigated forward)
2. **Feedback** — confirming an action registered (button press → brief scale)
3. **State change** — revealing that something in the system changed (new item appearing, error arriving)

Decorative motion — animations that exist to look impressive — adds cognitive load without adding value.

---

## Easing Curves

| Curve | CSS value | Use for |
|---|---|---|
| **Ease-out** | `cubic-bezier(0.0, 0.0, 0.2, 1)` | Elements entering the screen (decelerate to rest) |
| **Ease-in** | `cubic-bezier(0.4, 0.0, 1, 1)` | Elements leaving the screen (accelerate to exit) |
| **Ease-in-out** | `cubic-bezier(0.4, 0.0, 0.2, 1)` | State changes that stay on screen (both phases) |
| **Spring** | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Playful confirmation moments, toggle snaps |
| **Linear** | `linear` | Spinners, progress bars, continuous loops only |

Never use the default CSS `ease` curve for UI interactions. It was designed for decorative motion, not interface feedback.

---

## Duration by Element Weight

Duration communicates physical weight. Lightweight elements move fast. Heavy elements move slowly.

| Category | Duration | Examples |
|---|---|---|
| **Micro** | 100ms | Button press state, checkbox tick, icon swap |
| **Lightweight** | 150ms | Badge update, tooltip appear/disappear, hover color change |
| **Standard** | 300ms | Card appear, dropdown open, tab switch, list item enter |
| **Weighty** | 500ms | Modal open/close, page transition, panel slide |
| **Deliberate** | 600–800ms | Onboarding reveals, success celebrations, large data loads |

Rule: interactions the user triggered should feel immediate (100–200ms). System-initiated changes (notifications arriving, data updating) can be slower (300–500ms) to call attention without startling.

---

## Duration by Interaction Type

| Interaction | Duration | Easing |
|---|---|---|
| Button press | 100ms | ease-in-out |
| Hover state color change | 150ms | ease-out |
| Tooltip appear | 200ms | ease-out |
| Tab switch | 250ms | ease-in-out |
| Dropdown open | 200ms | ease-out |
| Dropdown close | 150ms | ease-in |
| Modal open | 300ms | ease-out |
| Modal close | 200ms | ease-in |
| Page transition | 400ms | ease-in-out |
| Toast appear | 300ms | ease-out |
| Toast dismiss | 200ms | ease-in |

The close/exit duration is always shorter than the open/enter duration. Exits should be fast — the user already made their decision.

---

## Standard Motion Patterns

### Fade + Translate (elements entering the screen)

Content arriving from outside the viewport slides in from the direction it logically came from and fades in simultaneously.

```css
/* Element entering from below (modal, bottom sheet) */
@keyframes enter-from-below {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Element entering from the right (navigating forward) */
@keyframes enter-from-right {
  from {
    opacity: 0;
    transform: translateX(24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### Stagger (lists and grids loading)

When multiple items load simultaneously, staggering their appearance creates a reading sequence and avoids a jarring simultaneous pop.

```css
/* First item: no delay. Each subsequent item: 60ms later */
.list-item:nth-child(1) { animation-delay: 0ms; }
.list-item:nth-child(2) { animation-delay: 60ms; }
.list-item:nth-child(3) { animation-delay: 120ms; }
/* Cap at 5 items. Beyond 5, the stagger becomes a wait */
```

Stagger cap: do not stagger more than 5–6 items. Beyond that, the last items appear so late that the animation becomes a loading delay, not a presentation.

### State Change (data updating in place)

When a value changes without a full re-render, a brief flash of the changed element orients the user to what changed.

```css
@keyframes value-update {
  0%   { background-color: transparent; }
  30%  { background-color: var(--accent-bg); }  /* brief highlight */
  100% { background-color: transparent; }
}
/* Duration: 600ms — slow enough to notice, fast enough to not interrupt */
```

---

## Performance Rules

Animate only these two CSS properties. Everything else is not GPU-accelerated and will cause frame drops on low-end devices.

**Allowed:** `transform`, `opacity`

**Never animate directly:** `width`, `height`, `top`, `left`, `padding`, `margin`, `border-width`, `background-color` (use opacity overlay instead), `box-shadow`

When layout change is unavoidable, use `transform: scaleX()` and `transform: scaleY()` instead of animating `width`/`height` directly.

---

## Reduced Motion

This is not optional. Users with vestibular disorders can experience nausea and disorientation from motion. The `prefers-reduced-motion` media query is the product's responsibility.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

This overrides all animations globally. The product must remain fully functional with all animations disabled — if any interaction depends on animation to communicate completion, that is a design failure independent of reduced motion.

---

## Anti-Patterns in Motion

❌ **Animating layout properties (width, height, margin, padding)**
Causes reflow on every frame. Drops to below 60fps on most devices. Use transform instead.

❌ **Hover animations that delay the interaction**
If the user must wait for a hover animation to complete before clicking, the animation is blocking the product. Hover effects must be additive, not gating.

❌ **Page transitions longer than 400ms**
The user navigated intentionally. They are waiting. Every millisecond beyond 400 is friction, not polish.

❌ **Staggered lists with more than 6 items**
Beyond 6 items, the stagger reads as slowness, not sequencing.

❌ **Motion that communicates state (success, error) without also using color, icon, and text**
Some users turn off animations. Motion can reinforce state communication but never be the only carrier of it.

❌ **Looping animations on critical interface areas**
A subtle looping animation on a background is acceptable. A looping animation near a call-to-action competes with it for attention.
