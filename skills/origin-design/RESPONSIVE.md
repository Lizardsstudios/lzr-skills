# Responsive Design

> Load this file when adapting layouts to mobile, defining breakpoint behavior, or designing touch interaction patterns.

Product apps run on devices ranging from 375px phones to 2560px monitors. The interface must work on all of them — not just scale, but adapt: layout changes, navigation patterns change, interaction patterns change.

Mobile-first: write base styles for the smallest screen first, then add complexity as the viewport grows.

---

## Breakpoints

| Name | Range | Primary devices | Strategy |
|---|---|---|---|
| **xs** | 0–479px | Small phones (iPhone SE, budget Android) | Single column, stacked everything, maximum touch target sizes |
| **sm** | 480–767px | Large phones (iPhone 14, Pixel) | Single column, simplified navigation, touch-optimized |
| **md** | 768–1023px | Tablets (iPad, Surface) | 2-column possible, sidebar can appear, hover begins to make sense |
| **lg** | 1024–1439px | Laptops (13"–15" screens) | Multi-column, full navigation, desktop interaction patterns |
| **xl** | 1440px+ | Desktop monitors | Maximum container width, multi-panel layouts |

---

## Mobile-First Implementation

Start from the smallest breakpoint. Add rules as the screen grows.

```css
/* Base styles: mobile (0px and up) */
.container {
  width: 100%;
  padding: var(--s4);  /* 16px */
}

/* Tablet (768px and up) */
@media (min-width: 768px) {
  .container {
    padding: var(--s6);  /* 32px */
  }
}

/* Desktop (1024px and up) */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--s7);  /* 48px */
  }
}
```

---

## Layout Adaptation by Breakpoint

Desktop and mobile are not the same interface scaled. They are different expressions of the same product.

| Element | Mobile (xs–sm) | Tablet (md) | Desktop (lg–xl) |
|---|---|---|---|
| **Navigation** | Bottom bar or hamburger menu | Hamburger or collapsed sidebar | Full sidebar or top navigation |
| **Grid** | Single column | 2 columns max | 3–4 columns |
| **Form fields** | Stacked, full width | Stacked, full width | Side-by-side possible |
| **Data tables** | Card list view | Condensed table or cards | Full table |
| **Modals** | Full screen or bottom sheet | Centered modal | Centered modal |
| **Buttons** | Full width for primary | Full width or auto | Auto width |
| **Sidebar** | Hidden, drawer on demand | Collapsible, icon-only option | Persistent |

---

## Navigation Patterns

Navigation is the highest-impact layout difference between screen sizes.

### Mobile Navigation

**Bottom navigation bar** — for products with 3–5 primary destinations:
- Fixed at bottom
- 5 items maximum
- Active item: icon + label + accent color
- Inactive items: icon only or icon + muted label
- Respects safe area insets on iOS (`padding-bottom: env(safe-area-inset-bottom)`)

**Hamburger menu (drawer)** — for products with many destinations:
- Opens from left (standard) or bottom
- Closes via: X button, swipe back, tap outside, Escape key
- The hamburger icon is insufficient as the sole navigation indicator — pair with a text label or breadcrumb

### Desktop Navigation

**Sidebar** — for platform and service products:
- Persistent (always visible) or collapsible to icon-only mode
- Active item has unambiguous visual state (not just bold — background or accent)
- Grouping with labels when more than 7 items

**Top navigation** — for tool and companion products:
- Works for products with fewer destinations
- Dropdown menus for secondary items

---

## Fluid Typography

Text size scales with the viewport rather than jumping at breakpoints.

```css
/* Fluid h1: 30px on mobile, scales up to 44px on large screens */
h1 {
  font-size: clamp(1.875rem, 2.5vw + 1rem, 2.75rem);
}

/* Fluid body: always readable, never smaller than 14px */
p {
  font-size: clamp(0.875rem, 1vw + 0.75rem, 1rem);
}
```

Clamp syntax: `clamp(minimum, preferred, maximum)`
- Minimum: value at the smallest screen
- Preferred: fluid calculation (viewport units)
- Maximum: value at the largest screen

---

## Touch Interaction Patterns

Touch devices have different constraints from pointer devices.

**Minimum touch target:** 44×44px for all interactive elements (iOS HIG and WCAG 2.5.5).

**Tap vs. hover:**
- Mobile has no hover state — any interaction designed only for hover is invisible on touch.
- Hover-revealed actions (table row actions, card overlays) must have a visible alternative on touch devices.

**Common mobile pattern for row actions:**
```
Desktop: actions appear on row hover
Mobile: actions in a swipe gesture left/right, OR a ... menu button always visible
```

**Swipe gestures:**
- Swipe right on a list item: primary action (typically archive, complete)
- Swipe left on a list item: destructive action (typically delete)
- Both require a visual reveal during the swipe and a confirmation state after

**Tap delay prevention:**
```css
button, a, [role="button"] {
  touch-action: manipulation; /* eliminates 300ms tap delay on mobile browsers */
}
```

---

## Responsive Images

Images that do not adapt to screen size waste bandwidth and slow load times on mobile.

```html
<!-- Responsive image with multiple sizes -->
<img
  srcset="
    /image-400w.jpg  400w,
    /image-800w.jpg  800w,
    /image-1200w.jpg 1200w
  "
  sizes="
    (max-width: 640px)  100vw,
    (max-width: 1024px) 50vw,
    33vw
  "
  src="/image-800w.jpg"
  alt="[descriptive text]"
  loading="lazy"
/>
```

The `loading="lazy"` attribute defers loading until the image is near the viewport. Use `loading="eager"` only for above-the-fold images that the user will see immediately.

---

## Safe Area Insets (iOS / Notch Devices)

On devices with notches, home indicators, or camera cutouts, content can be obscured by the device hardware.

```css
/* Apply to fixed bottom elements (navigation bars, CTAs) */
.bottom-nav {
  padding-bottom: env(safe-area-inset-bottom);
}

/* Apply to fixed top elements (headers) */
.header {
  padding-top: env(safe-area-inset-top);
}
```

---

## Breakpoint Testing Reference

Test at these specific widths before considering a layout complete:

| Width | Represents |
|---|---|
| 375px | iPhone SE, minimum phone support |
| 390px | iPhone 14 standard |
| 430px | iPhone 14 Plus / Pro Max |
| 768px | iPad portrait, tablet minimum |
| 1024px | iPad landscape, laptop minimum |
| 1280px | Standard laptop |
| 1440px | Large laptop / small desktop |
| 1920px | Full HD desktop |

Do not test only at standard breakpoints. Bugs hide at the in-between widths (500px, 900px, 1100px).

---

## Responsive Checklist

Before considering any layout complete:

**Layout**
- [ ] Single-column layout works at 375px without horizontal scroll
- [ ] No content is clipped or hidden at any tested width
- [ ] Maximum container width set and centered at xl breakpoints
- [ ] Grid collapses correctly at each breakpoint transition

**Navigation**
- [ ] Mobile navigation is accessible without hover
- [ ] Desktop navigation is not present on mobile (hamburger or bottom bar replaces it)
- [ ] Active navigation state is visible on both mobile and desktop

**Touch**
- [ ] All interactive elements have 44×44px minimum touch target
- [ ] Hover-only interactions have touch alternatives
- [ ] Bottom navigation respects safe area insets on iOS
- [ ] Fixed headers respect safe area insets on iOS
- [ ] Tap delay eliminated on interactive elements

**Typography**
- [ ] Body text is never smaller than 14px (0.875rem) at any breakpoint
- [ ] Line length is 60–75 characters at medium and large breakpoints
- [ ] Type scale reduces appropriately at small breakpoints (20–30% smaller)

**Tables and Data**
- [ ] Data tables collapse to card view on mobile
- [ ] No horizontal scroll on mobile caused by table overflow

**Images**
- [ ] Images use responsive srcset or equivalent
- [ ] Above-the-fold images are not lazy-loaded
- [ ] Below-the-fold images use lazy loading
