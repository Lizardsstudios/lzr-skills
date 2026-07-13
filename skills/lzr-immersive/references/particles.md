# Particles & point systems

Particles range from cheap decorative points to full GPU simulations that
morph between shapes and react to input. Pick the lightest approach that hits
the look.

## Tier 1 — simple points (CPU-defined, GPU-drawn)

For starfields, dust, floating specks: one `THREE.Points` with a
`bufferGeometry` of positions and a `pointsMaterial` (or a small shader for
soft round sprites). Thousands of these are fine. Animate by updating a `uTime`
uniform and moving points in the vertex shader (cheap) rather than rewriting
the position buffer on the CPU every frame (expensive).

Give each point stable per-particle attributes (random seed, scale, speed) as
extra buffer attributes and drive motion from them in the vertex shader — this
keeps everything on the GPU.

## Tier 2 — instanced meshes

When particles need real geometry (not flat points) — little cubes, shards,
petals — use `InstancedMesh` (drei `<Instances>`/`<Instance>`). One draw call
for thousands of instances; set per-instance matrices/colors. Good for
"exploding logo", confetti, floating debris.

## Tier 3 — GPGPU / FBO particles (the advanced look)

Morphing particle clouds, flow fields, and millions of reactive particles are
done by simulating state **on the GPU** in textures (FBO ping-pong):

- Store particle positions/velocities in a floating-point texture (a data
  texture where each pixel = one particle).
- A simulation fragment shader reads the current texture and writes the next
  state (apply forces, curl noise, attraction to a target shape) to another
  texture. Swap ("ping-pong") each frame.
- A render pass reads the position texture in its vertex shader to place each
  point.

This is the technique behind particles that flow, form shapes, and dissolve.
Building blocks:
- **Curl noise** for divergence-free, fluid-like motion.
- **Target morphing**: sample target positions (e.g. surface of a model, or
  text) and lerp particle positions toward them by a `uProgress` uniform to
  morph between shapes.
- **Input reactivity**: feed mouse/velocity as a uniform to spawn or push
  particles.

In R3F, drei previously shipped GPGPU helpers and there are small libraries for
this; you can also hand-roll it with Three's `GPUComputationRenderer`. Keep the
simulation resolution (texture size) as the particle-count knob.

## WebGPU note

Large simulations are exactly where **WebGPU compute shaders** shine — they run
the particle update as a compute pass instead of FBO ping-pong, typically much
faster for very high counts. If the project is WebGPU/TSL, do the simulation in
a TSL compute node rather than render-to-texture. For moderate counts on
WebGL2, FBO ping-pong is perfectly fine and far better supported by examples.

## Performance guardrails

- Particle *count* and per-particle *shader cost* are the two dials; profile
  both. A million cheap points can beat 50k expensive ones.
- Disable depth write / use additive blending for glowing particles, but watch
  overdraw on mobile.
- Halve particle count and simulation resolution on mobile (see
  `references/performance.md`).
