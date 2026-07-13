# Setup: WebGL in a Next.js App Router project

## Canvas + SSR

React Three Fiber's `<Canvas>` touches the DOM and WebGL context, so it can't
render on the server. Two rules:

- Every module that imports from `@react-three/fiber` / `@react-three/drei`
  starts with `"use client"`.
- If you still see hydration mismatches (common when the canvas wraps or
  overlaps server-rendered content), import the scene with SSR disabled:

```tsx
import dynamic from "next/dynamic";
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });
```

Do this at the boundary component, not inside the R3F tree.

## Recommended structure

Keep the DOM (content, SEO, layout) and the WebGL layer separate but
coordinated:

```
app/
  page.tsx              // server component: real content, headings, links
  layout.tsx
components/
  gl/
    Canvas.tsx          // single shared <Canvas>, fixed/full-screen, behind DOM
    Scene.tsx           // scene graph, "use client"
    materials/          // shader materials
  ui/                   // normal DOM/React components
lib/
  useLenis.ts           // smooth scroll
```

The shared canvas is typically `position: fixed; inset: 0; z-index: -1` (or a
low z-index) so DOM content scrolls over it. Content stays in real HTML for
accessibility and SEO; the canvas reacts to scroll and pointer.

## Canvas defaults worth setting

```tsx
<Canvas
  dpr={[1, 2]}                 // cap pixel ratio — critical for mobile
  gl={{ antialias: true, powerPreference: "high-performance" }}
  camera={{ fov: 35, position: [0, 0, 5] }}
  frameloop="demand"           // see note below
>
```

`frameloop="demand"` only renders when something changes (call
`invalidate()`), which saves battery on mostly-static scenes. Use the default
`"always"` when you have continuous animation (particles, shader time
uniforms). Decide per scene.

## Smooth scroll (Lenis) synced to the render loop

Award-site "weight" in scrolling comes from inertial smooth scroll driven on
the same clock as WebGL. Lenis is the current standard. Pattern:

- Instantiate Lenis once (app-level).
- Drive its `raf` from a single loop — and if using GSAP ScrollTrigger, tie
  Lenis's `scroll` event to `ScrollTrigger.update` and drive `lenis.raf` from
  `gsap.ticker` so scroll, DOM animation, and WebGL share one timeline.
- Read normalized scroll progress inside R3F (`useFrame`) to move the camera or
  feed shader uniforms.

Avoid running Lenis's RAF and R3F's loop as two independent clocks — that
causes jitter. One ticker.

## When you DON'T need a full 3D scene

Many "hero animation" effects are a single full-screen plane with a fragment
shader (gradient flows, cursor distortion, noise fields). That's far cheaper
than a 3D scene and easier to make solid on mobile. Reach for a full scene
graph only when there's real geometry, depth, or camera movement. See
`references/shaders.md` for the full-screen-plane pattern.

## Fallback / progressive enhancement

- Detect capability before mounting heavy WebGL (see `references/performance.md`
  for `navigator.gpu` / WebGL2 detection).
- Provide a static image/video poster underneath so the section is never blank.
- Gate the whole experience on `prefers-reduced-motion` and offer a reduced
  variant (no autoplay motion, no parallax).
