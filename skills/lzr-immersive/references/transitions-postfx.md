# Transitions & post-processing

Two related topics: (1) seamless transitions between scenes/pages via
render-to-texture, and (2) the finishing post-processing layer (bloom, etc.)
that gives the polished, "graded" look.

## Composite rendering & scene transitions

The trick behind seamless page/scene transitions on award sites: instead of
rendering a scene directly to the screen, render it to a **texture** (a render
target / FBO), then composite one or more of these textures on a full-screen
quad and blend between them in a shader. This avoids duplicating scene setup
and lets you cross-fade, wipe, or distort between states.

Approach:
- Create reusable scene classes/components over a shared base (camera,
  renderer, utils) so each scene is cheap to define. A common pattern is a
  `BaseScene` (standard setup) and an `FXScene` that renders into a render
  target.
- Keep persistent elements (e.g. a hero object, the UI layer) in a main scene;
  swap only what changes per route. Don't duplicate shared geometry across
  scenes — reference one and re-render it into the composite.
- Blend between the current and next render targets with a transition shader
  driven by a `uProgress` uniform (fade, displacement wipe, RGB-split reveal).

In R3F you get render targets via `useFBO` (drei) and render a scene into them
with `state.gl.setRenderTarget(...)` inside `useFrame`, then sample the
resulting texture on a full-screen plane. Tie `uProgress` to your route
transition (e.g. GSAP timeline) so DOM and WebGL transition together.

This is more work than a CSS fade but it's what makes 3D content transition
without a hard cut or a full teardown/rebuild.

## Post-processing (the finishing layer)

Add post FX **last**. It runs extra GPU passes over the rendered frame, so it's
the highest-leverage look-upgrade and also a common perf sink.

### WebGL2 (default): pmndrs postprocessing

Use `@react-three/postprocessing` (wraps `postprocessing`). Its
`EffectComposer` merges multiple effects into as few passes as possible.

```tsx
<EffectComposer>
  <Bloom luminanceThreshold={0.9} intensity={0.6} mipmapBlur />
  <ChromaticAberration offset={[0.0006, 0.0006]} />
  <Vignette darkness={0.5} />
  <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
</EffectComposer>
```

Common effects and what they buy you:
- **Bloom** — the glow/neon halo around bright areas. The signature "premium"
  effect. Drive brightness above the `luminanceThreshold` to make things glow.
- **Chromatic aberration** — subtle RGB fringing; adds a lens/analog feel.
- **Vignette** — darkens corners, focuses attention.
- **Depth of field** — cinematic focus falloff (costly; use sparingly).
- **Noise/grain** — breaks up banding, adds texture.
- **Tone mapping** — keep it (ACES Filmic/AgX) and place it **last** in the
  chain, or the grade fights the effects.

Perf: render bloom at half resolution and upscale; bundle effects in one pass;
add SMAA/FXAA as the final AA pass if MSAA isn't enough.

### WebGPU: RenderPipeline + TSL

If the project uses `three/webgpu`, the pmndrs `EffectComposer` doesn't apply —
use Three's node-based post-processing (`RenderPipeline`, formerly
`PostProcessing`) with TSL effect nodes (`bloom()`, `fxaa()`, etc.). You
compose effects as a graph of nodes rather than a linear pass list, and tone
mapping / color space / resize are handled automatically. Same *look*, node
API. This is the forward-looking path; WebGL2 + pmndrs remains the pragmatic
default with the most examples.

## Putting the "award-site look" together

The recognizable high-end aesthetic is usually: dark scene + a few bright
emissive elements + **bloom** + subtle **chromatic aberration** + **film
grain** + filmic **tone mapping**, over content that moves with eased,
scroll-driven camera work. Get the lighting and bloom right before reaching for
exotic effects.
