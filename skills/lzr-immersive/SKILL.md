---
name: lzr-immersive
description: >-
  Build immersive, interactive WebGL / 3D experiences in Next.js + TypeScript
  using React Three Fiber (Three.js), custom GLSL shaders, GPU particles,
  scene transitions, and post-processing. Use this skill WHENEVER the user
  wants 3D graphics, WebGL, Three.js, React Three Fiber, shaders, particle
  effects, animated hero sections, scroll-driven 3D, cursor/mouse distortion
  effects, glowing/neon visuals, "cinematic" or "award-winning" web animation,
  or references studios like Active Theory, Lusion, or sites on Awwwards —
  even if they don't name a specific library. Also use for performance,
  SSR/hydration, and mobile-fallback questions specific to WebGL in Next.js.
---

# Immersive WebGL in Next.js

Guidance for building high-end interactive 3D on the web with the **open**
stack — the same techniques award studios use, minus their proprietary
engines. Target stack: **Next.js (App Router) + TypeScript + React Three
Fiber**. This skill is orientation + patterns, not copy-paste templates:
read the relevant reference, then write idiomatic code for the user's project.

## Core principle: progressive enhancement

HTML/CSS is the baseline; WebGL is an enhancement layered on top. Never make
content, SEO, or navigation depend on the canvas rendering. A single shared
`<Canvas>` should persist across routes; the DOM stays the layout source of
truth and the WebGL layer tracks it. If WebGL is unavailable or the device is
weak, the site must still work. Design for this from the first commit — it is
far harder to retrofit.

## The stack (install what the task needs)

| Need | Package |
|---|---|
| Declarative 3D renderer | `three`, `@react-three/fiber` |
| Helpers (loaders, controls, shaders) | `@react-three/drei` |
| Post-processing (bloom/glow) | `@react-three/postprocessing`, `postprocessing` |
| Timeline animation | `gsap` (+ ScrollTrigger) |
| Smooth scroll synced to render | `lenis` |
| GLSL noise helpers | `glsl-noise` (optional) |

### R3F vs plain Three.js

Default to **React Three Fiber** in a Next.js app: it plays with React state,
Suspense, and the component model, and every reference here uses it. Inside an
R3F tree you can always reach for raw `three` objects when an abstraction gets
in the way — that's normal and not a reason to abandon R3F.

Drop to **plain Three.js** (imperative `new THREE.*`, own render loop, no R3F)
only when the situation genuinely fights React:

- A self-contained widget/background that must run **outside the React tree**
  or be embeddable in a non-React context.
- Porting existing vanilla Three.js code, or following a tutorial/demo written
  in vanilla — rewriting to R3F adds risk for no gain.
- You need **absolute control** over the render loop / context lifecycle (e.g.
  a custom multi-pass pipeline that R3F's reconciler complicates), or you're
  squeezing a very tight performance/bundle budget where R3F overhead matters.
- Quick throwaway prototypes where wiring up R3F is more ceremony than the
  effect deserves.

When going vanilla in Next.js, the same non-negotiables still apply: `"use
client"`, mount into a ref'd `<canvas>` in `useEffect`, and **dispose
everything** (geometries, materials, textures, renderer, `cancelAnimationFrame`)
in the cleanup — R3F did this for you; now it's manual. The concepts in every
reference file (shaders, FBO transitions, GPGPU particles, post FX, perf) are
framework-agnostic; only the wiring changes.

## Routing a request → reference file

Read only the file(s) relevant to the task. Each is self-contained.

- **Setting up the canvas, SSR/hydration errors, project structure, smooth
  scroll, "how do I even add 3D to my Next app"** → `references/setup.md`
- **Loading models (glTF), materials, lighting, camera, scroll-driven camera
  moves, environment/lighting look** → `references/scene-assets-camera.md`
- **Custom look via shaders: mouse/cursor distortion, fresnel/rim, animated
  gradients, displacement, dissolve, "how do I write a shader here"** →
  `references/shaders.md`
- **Particles, point clouds, GPU/GPGPU simulation, morphing particle shapes,
  trails** → `references/particles.md`
- **Scene-to-scene / page transitions, render-to-texture, composite
  rendering, bloom/glow/neon, chromatic aberration, vignette, tone mapping** →
  `references/transitions-postfx.md`
- **Frame drops, mobile support, load time, Draco/KTX2 compression, DPR,
  on-demand rendering, feature detection** → `references/performance.md`

Most real "make it look like Active Theory" requests are a *combination*:
scroll-driven camera (scene-assets-camera) + shader material (shaders) +
bloom (transitions-postfx) + a mobile fallback (performance). Read the
handful that apply.

## Non-negotiables for every 3D component in this stack

1. **Client only.** Any file using R3F needs `"use client"`. If hydration
   still complains, load the scene via
   `dynamic(() => import("./Scene"), { ssr: false })`.
2. **One canvas, reused.** Don't mount a new `<Canvas>` per section; share one
   and drive it with scroll/state. Multiple WebGL contexts kill performance.
3. **Dispose + don't remount.** Toggle visibility (`visible={false}`) instead
   of unmounting meshes — remounting recompiles shaders and reallocates
   buffers. Clean up geometries/materials/textures you create manually.
4. **Cap DPR.** Use `dpr={[1, 2]}` on the Canvas; never render at full DPR on a
   4×-density phone.
5. **Respect `prefers-reduced-motion`** and provide a static poster/fallback.

## WebGL vs WebGPU (2026 note)

WebGL 2 is still the safe default and has the most examples. WebGPU is now
broadly supported with automatic WebGL2 fallback, and is the future for
compute-heavy particles and post-processing via TSL (Three Shader Language,
write-once for both backends). For a new project: start on WebGL2 unless the
work is compute-bound (huge particle systems, heavy post FX), in which case
consider `three/webgpu` + TSL. `references/transitions-postfx.md` and
`references/particles.md` note the WebGPU path where it matters.

## Workflow when building

1. Confirm the *effect* concretely (a reference site/clip beats adjectives).
2. Decide WebGL vs WebGPU and whether a full 3D scene is needed or a single
   full-screen shader plane suffices (often the latter for hero backgrounds).
3. Set up the shared canvas + progressive-enhancement fallback first.
4. Build the effect from the relevant reference(s).
5. Add post-processing last (bloom etc.) — it's the finishing layer.
6. Profile on a mid mobile device before calling it done (`references/performance.md`).
