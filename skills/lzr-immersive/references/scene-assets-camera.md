# Scenes, assets, lighting & camera

## Loading 3D models (glTF)

glTF/GLB is the web-native format. In R3F use drei's `useGLTF`:

- Always compress: run models through **Draco** (geometry) and **KTX2/Basis**
  (textures). This is the single biggest load-time win for 3D sites. Set the
  decoders once and host the decoder files on your own CDN/`public/`:

```ts
useGLTF.preload("/models/scene.glb");
// configure DRACO + KTX2 loaders (drei exposes setDecoderPath / setTranscoderPath)
```

- For repeated instances of the same mesh, use instancing (`<Instances>` /
  `InstancedMesh`) instead of many separate meshes.
- Convert GLB to typed JSX ahead of time with `@react-three/gltfjsx` when you
  need to target specific nodes/materials.

## Materials & lighting look

The "expensive" look is mostly lighting + material choices, not polygon count:

- Prefer `meshStandardMaterial` / `meshPhysicalMaterial` for PBR realism;
  `meshBasicMaterial` (unlit) for stylized/neon flatness.
- Use an **environment map** (drei `<Environment>`) — image-based lighting does
  more for realism than adding lights. An HDRI gives instant reflections and
  soft light.
- Keep real-time lights few (1 key directional + ambient/env is often enough).
  Bake shadows/AO into textures where the scene is static.
- Tone mapping matters: ACES Filmic or AgX gives a filmic, less "gamey" look.
  Set it on the renderer or via the `<ToneMapping>` post effect (keep it last
  in the effect chain).

## Camera

- One camera, moved deliberately. Cinematic feel comes from slow, eased moves
  and subtle FOV, not fast orbits.
- For free exploration/debugging use drei `<OrbitControls>`, but remove or lock
  it for the shipped experience — hand-authored camera paths read as
  intentional.

### Scroll-driven camera (the immersive-site staple)

Map normalized scroll progress (0→1) to camera position/target, then `lerp`
toward it each frame for smoothness:

```tsx
useFrame((state) => {
  const p = scrollProgress.current; // 0..1 from Lenis
  const target = curve.getPointAt(p); // e.g. a CatmullRomCurve3 path
  state.camera.position.lerp(target, 0.08); // easing = the "0.08"
  state.camera.lookAt(lookTarget);
});
```

Patterns:
- Define a `THREE.CatmullRomCurve3` through waypoints and sample it by scroll
  progress for a flythrough.
- Or drive discrete "scenes" and cross-fade between them (see
  `references/transitions-postfx.md` for composite rendering).
- Always `lerp`/damp toward targets rather than snapping; the easing factor is
  what makes it feel high-end. drei's `easing.damp3` is a clean helper.

## Mouse parallax

Subtle camera or group offset from pointer position adds life cheaply:

```tsx
useFrame((state) => {
  group.current.rotation.y = THREE.MathUtils.lerp(
    group.current.rotation.y, state.pointer.x * 0.1, 0.05);
  group.current.rotation.x = THREE.MathUtils.lerp(
    group.current.rotation.x, -state.pointer.y * 0.1, 0.05);
});
```

Keep the magnitude small — parallax is seasoning, not the main course.
