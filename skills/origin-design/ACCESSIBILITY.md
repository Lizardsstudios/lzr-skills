# Accessibility

> Load this file when verifying keyboard navigation, screen reader compatibility, ARIA patterns, or contrast ratios.

Accessibility is not a feature to add at the end. It is a quality standard that determines whether a product works for the full range of people who use it. WCAG 2.1 AA is the minimum — it is also the legal baseline in most jurisdictions.

---

## Principle: POUR

Every accessibility decision traces back to one of four principles:

- **Perceivable** — Every user can receive all information the interface presents
- **Operable** — Every user can operate all interactive elements
- **Understandable** — Every user can understand what the interface does and what will happen
- **Robust** — The interface works with the full range of assistive technologies

When an accessibility question has no clear answer, run it through POUR. The answer becomes clear.

---

## Contrast Requirements

| Content type | Minimum ratio | Standard |
|---|---|---|
| Body text (14px+) | 4.5:1 | WCAG AA |
| Large text (18pt / 24px or 14pt / ~19px bold) | 3:1 | WCAG AA |
| UI components (borders, icons, controls) | 3:1 | WCAG AA |
| Placeholder text | 4.5:1 | WCAG AA (it guides action) |
| Disabled text | 3:1 | Exception for non-interactive |
| Primary text (recommended) | 7:1 | WCAG AAA — target this |

Critical rule: `--text-muted` (typically ~3:1 contrast) is decorative only. It is never used for text the user must read to understand or act. Labels, errors, statuses, and any text tied to an action use `--text-secondary` (4.5:1 minimum) or `--text-primary`.

**Verify:** use the browser's accessibility panel or webaim.org/resources/contrastchecker/ before finalizing any color pair.

---

## Focus States

Every interactive element — button, link, input, checkbox, radio, toggle, tab, dropdown trigger — must have a visible focus state.

**Specification:**
```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--accent);
  border-color: var(--accent);
}
```

The 3px ring must achieve 3:1 contrast against the element's background. If `--accent` does not pass against a specific background, use a two-color ring:

```css
:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
  /* The 2px gap creates a white separator visible on both light and dark backgrounds */
}
```

**What is never acceptable:**
```css
:focus { outline: none; }         /* removes the only keyboard navigation cue */
:focus { outline: none; }         /* even with :focus-visible replacing it */
/* Without a visible replacement, this makes the app inaccessible */
```

---

## Keyboard Navigation

Every user action available with a mouse must be reachable and executable with a keyboard alone.

**Tab order** follows reading order: left to right, top to bottom. If the visual layout creates a tab order that does not match reading order, the layout has a structural problem.

**Key behavior must be consistent:**

| Key | Expected behavior |
|---|---|
| `Tab` | Move focus forward through interactive elements |
| `Shift + Tab` | Move focus backward |
| `Enter` | Activate a button or link |
| `Space` | Toggle a checkbox, activate a button (but not submit a form) |
| `Escape` | Close a modal, dropdown, tooltip, or popover |
| `Arrow keys` | Navigate within a group: menu items, tabs, radio buttons, select options |
| `Home` / `End` | Jump to first/last item in a navigable group |

**Modal focus trap:**
When a modal opens, keyboard focus moves into it. While the modal is open, `Tab` and `Shift+Tab` cycle only within the modal. When the modal closes, focus returns to the element that triggered it.

A focus trap that does not return focus to the trigger is a keyboard navigation failure — the user's cursor is now lost in the page.

---

## ARIA Patterns

Use ARIA to communicate state and purpose to screen readers when native HTML elements cannot do it alone.

**Principle:** native HTML first. ARIA is for when native HTML runs out.

```html
<!-- Use <button>, not <div role="button"> — button handles keyboard, focus, and activation natively -->
<button type="button">Save changes</button>

<!-- Use <a href>, not <div role="link"> -->
<a href="/settings">Settings</a>
```

**Required ARIA patterns:**

```html
<!-- Button with icon and no visible text — aria-label is required -->
<button aria-label="Close dialog">
  <XIcon aria-hidden="true" />
</button>

<!-- Decorative icons — hide from screen readers -->
<FileIcon aria-hidden="true" />
<span>Invoice.pdf</span>

<!-- Expandable trigger — aria-expanded communicates the current state -->
<button aria-expanded="false" aria-controls="nav-menu">Menu</button>
<nav id="nav-menu" hidden>...</nav>

<!-- Live region — screen reader announces changes automatically -->
<div role="status" aria-live="polite">
  {/* Success messages, loading completion notices */}
  File saved successfully
</div>

<div role="alert" aria-live="assertive">
  {/* Errors, warnings requiring immediate attention */}
  Connection lost. Retrying...
</div>

<!-- Modal — requires dialog role, labelledby, and modal attribute -->
<dialog
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <h2 id="modal-title">Delete Account</h2>
  ...
</dialog>

<!-- Form field with error -->
<label for="email">Email address</label>
<input
  id="email"
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<p id="email-error" role="alert">
  Enter a valid email address.
</p>
```

---

## Semantic HTML Structure

Screen readers use document structure to navigate. Incorrect structure makes content unreachable.

```html
<!-- Page structure — these landmarks are how screen readers navigate -->
<header>
  <nav aria-label="Main navigation">...</nav>
</header>

<main>
  <h1>Page Title</h1>
  <section aria-labelledby="section-heading">
    <h2 id="section-heading">Section Name</h2>
    ...
  </section>
</main>

<footer>...</footer>
```

**Heading hierarchy — never skip levels:**

Correct:
```html
<h1>Page title</h1>
  <h2>Section</h2>
    <h3>Subsection</h3>
```

Wrong (skips h2):
```html
<h1>Page title</h1>
  <h3>Subsection</h3>   ← jumps over h2
```

Screen reader users navigate by heading level. A skipped level breaks the outline they rely on to understand page structure.

---

## Touch Targets

Every interactive element must have a minimum touch target of 44×44px. This is WCAG 2.5.5 (Level AAA, but a practical requirement for mobile).

The visual size of the element does not need to be 44px — the tap area must be.

```html
<!-- Checkbox: 16px visual, 44px tap area via the label -->
<label class="min-h-[44px] min-w-[44px] flex items-center gap-2">
  <input type="checkbox" class="w-4 h-4" />
  <span>Remember me</span>
</label>

<!-- Small icon button: visually 24px, tap area 44px -->
<button class="min-h-[44px] min-w-[44px] flex items-center justify-center">
  <EditIcon class="w-4 h-4" />
</button>
```

---

## Color Independence

8% of men and 0.5% of women have some form of color blindness (deuteranopia most common — inability to distinguish red from green).

**Rule:** no information is conveyed by color alone.

Every status indicator, validation state, and data categorization must combine color with at least one non-color signal:

| ✅ Correct | ❌ Wrong |
|---|---|
| Green background + checkmark icon + "Paid" text | Green background only |
| Red border + error icon + "Invalid email" text | Red border only |
| Amber badge + warning icon + "Pending" label | Amber badge color only |
| Chart bars with patterns + colors + data labels | Chart bars with colors only |

---

## Screen Reader Content Management

```html
<!-- Visible to screen readers, invisible visually (sr-only) -->
<span class="sr-only">Additional context for screen reader users</span>

<!-- Skip navigation — appears on first Tab press, invisible otherwise -->
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
>
  Skip to main content
</a>
```

Skip links are required on every page that has navigation before the main content. Without them, keyboard users tab through the full navigation on every page load.

---

## Accessibility Checklist

Before any interface is considered complete:

**Keyboard**
- [ ] Tab through the entire interface without a mouse — every action is reachable
- [ ] No keyboard trap (focus does not get stuck anywhere except intentional modals)
- [ ] Tab order matches the visual reading order
- [ ] Modal focus trap active when open, released and returned on close

**Focus**
- [ ] Visible focus ring on every interactive element
- [ ] Focus ring achieves 3:1 contrast against its background
- [ ] No `outline: none` without a visible replacement

**Contrast**
- [ ] Body text: 4.5:1 minimum
- [ ] Large text: 3:1 minimum
- [ ] UI components (borders, icons): 3:1 minimum
- [ ] Placeholder text: 4.5:1 (it guides action)
- [ ] `--text-muted` is not used on any interactive or functional text

**Semantics**
- [ ] Heading hierarchy is sequential — no skipped levels
- [ ] `<button>` for actions, `<a>` for navigation — never `<div>` with click handlers
- [ ] Form inputs have associated `<label>` elements
- [ ] Images have `alt` text — descriptive for meaningful images, empty `alt=""` for decorative ones

**ARIA**
- [ ] Icon-only buttons have `aria-label`
- [ ] Decorative icons have `aria-hidden="true"`
- [ ] Expandable elements have `aria-expanded`
- [ ] Live regions present for dynamic content (status messages, errors)
- [ ] Modals have `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`

**Color independence**
- [ ] No status communicated by color alone (always color + icon + text)
- [ ] Charts and data visualizations use pattern/texture in addition to color

**Touch**
- [ ] All interactive elements have 44×44px minimum touch target
- [ ] Adequate spacing between adjacent touch targets (minimum 8px)

**Motion**
- [ ] `prefers-reduced-motion` media query respected
- [ ] Interface fully functional with all animations disabled
