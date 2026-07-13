# Custom shaders (GLSL) in React Three Fiber

Shaders are where most distinctive "how did they do that" looks come from:
cursor distortion, animated gradients, dissolve, fresnel rim light, flowing
noise. In R3F you attach a `shaderMaterial` (or a custom material) to a mesh.

## The full-screen shader plane (hero backgrounds)

For a 2D effect covering the viewport (gradient flows, cursor ripple, noise
field), you don't need a 3D scene — one plane + a fragment shader:

- A plane sized to the viewport (or a fullscreen triangle for efficiency).
- Uniforms for `uTime`, `uMouse` (normalized 0..1), `uResolution`.
- Update uniforms in `useFrame` from `clock.elapsedTime` and `state.pointer`.

Skeleton of the material + update loop:

```tsx
const uniforms = useMemo(() => ({
  uTime: { value: 0 },
  uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  uResolution: { value: new THREE.Vector2(1, 1) },
}), []);

useFrame(({ clock, pointer, size }) => {
  uniforms.uTime.value = clock.elapsedTime;
  uniforms.uMouse.value.set(pointer.x * 0.5 + 0.5, pointer.y * 0.5 + 0.5);
  uniforms.uResolution.value.set(size.width, size.height);
});
```

```glsl
// fragment — cursor ripple over an animated gradient
uniform float uTime;
uniform vec2  uMouse;
varying vec2  vUv;
void main() {
  vec2 uv = vUv;
  float d = distance(uv, uMouse);
  uv += 0.03 * sin(d * 30.0 - uTime * 2.0);       // ripple following cursor
  vec3 col = 0.5 + 0.5 * cos(uTime + uv.xyx + vec3(0.0, 2.0, 4.0));
  gl_FragColor = vec4(col, 1.0);
}
```

The vertex shader just passes `uv` to `vUv` and outputs
`projectionMatrix * modelViewMatrix * vec4(position, 1.0)`.

## Core GLSL building blocks

- **Noise**: import `glsl-noise` (simplex/perlin) or paste a known snippet.
  Noise drives organic motion — flow fields, clouds, displacement.
- **Fresnel / rim light**: `pow(1.0 - dot(normal, viewDir), power)` — bright
  edges, "energy shield" and holographic looks. Needs normal + view direction
  passed from the vertex shader.
- **Displacement**: offset vertex `position` along its normal by
  `noise(position + uTime)` in the vertex shader for wobbling/breathing
  geometry.
- **Dissolve/reveal**: threshold a noise texture against a `uProgress` uniform
  and `discard` fragments below it for a burn-away transition.
- **Gradient mapping**: sample a 1D gradient by some scalar (height, fresnel,
  noise) for stylized coloring.

## Extending built-in materials

When you want PBR lighting *and* a custom tweak (e.g. vertex displacement on a
`meshStandardMaterial`), don't rewrite lighting from scratch — patch the
existing material:

- `onBeforeCompile` to inject GLSL into Three's shader chunks, or
- drei's `CustomShaderMaterial` (wraps a base material and lets you override
  specific stages) — cleaner and the usual choice in R3F.

## TypeScript / R3F notes

- Declare the material with drei's `shaderMaterial` helper + `extend()` so it's
  usable as a JSX element with typed props, or use a plain
  `<shaderMaterial args={[{ uniforms, vertexShader, fragmentShader }]} />`.
- Keep GLSL in `.glsl`/`.vert`/`.frag` files (with a loader) or template
  strings; template strings are simplest to start.
- Mutate `uniforms.x.value` in `useFrame` — don't recreate the uniforms object
  each frame (memoize it once).

## WebGPU / TSL

If the project targets `three/webgpu`, author shaders in **TSL** (JavaScript
node functions) instead of GLSL strings — it compiles to both WGSL and GLSL, so
one shader runs on WebGPU and the WebGL2 fallback. Same mental model
(uniforms, varyings) expressed as composable JS nodes.
