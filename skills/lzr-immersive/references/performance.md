# Performance & mobile

WebGL sites live or die on performance. Budget from the start; retrofitting is
painful.

## Load time

- **Compress meshes and textures.** Draco (geometry) + KTX2/Basis (GPU
  textures) is the biggest win — GPU-native compressed textures also use less
  VRAM, which matters on mobile. Host decoder files locally/CDN.
- **Meshopt** is an alternative to Draco with faster decompression.
- **Lazy-load** heavy assets and defer offscreen scenes; preload only what the
  first view needs (`useGLTF.preload`, route-level code splitting).
- Keep the first meaningful paint in real DOM — the canvas can stream in after.

## Runtime frame rate

- **Cap DPR**: `dpr={[1, 2]}`. Full DPR on a 3–4× phone quadruples fragment
  work for no visible gain.
- **Draw calls**: merge geometry, use `InstancedMesh` for repeats, share
  materials. Fewer draw calls > lower poly counts in most web scenes.
- **LOD**: swap high-poly for low-poly at distance (drei `<Detailed>`).
- **On-demand rendering**: `frameloop="demand"` + `invalidate()` for scenes
  that are static most of the time. Keep `"always"` only where something
  animates every frame.
- **Don't remount** meshes to hide them — toggle `visible`. Remounting
  recompiles shaders and reallocates buffers (visible stalls).
- **Post FX cost**: each pass is a full-screen redraw. Half-res bloom, merged
  effect passes, and cheap AA (SMAA/FXAA) keep it affordable.
- **Bake** what's static: lightmaps, AO, shadows into textures instead of
  computing them live.

## Feature detection & fallback

Detect capability before mounting the heavy experience and degrade gracefully:

```ts
// WebGPU?
const hasWebGPU = "gpu" in navigator &&
  !!(await (navigator as any).gpu?.requestAdapter?.());

// WebGL2?
const hasWebGL2 = !!document.createElement("canvas").getContext("webgl2");
```

Tiers:
- No WebGL2 → show the static poster/video fallback, skip the canvas entirely.
- Weak/mobile GPU → reduce particle counts, simulation resolution, disable
  expensive post FX (DoF, SSR), lower DPR ceiling.
- `prefers-reduced-motion` → static or minimal-motion variant.

## Mobile specifics

- Halve particle counts and FBO/simulation texture sizes.
- Prefer unlit/`meshBasic` or baked lighting over many real-time lights.
- Watch overdraw from additive/transparent particles — it's a top mobile
  bottleneck.
- Test on a real mid-range Android, not just desktop throttling; GPU behavior
  differs.

## Profiling

- `stats-gl` / drei `<Stats>` for FPS + draw calls; `renderer.info` for
  geometry/texture/call counts.
- Spector.js to inspect individual frames and find expensive passes.
- Profile *before* optimizing — the bottleneck is often one effect or one
  unbatched mesh, not "the scene is too big".
