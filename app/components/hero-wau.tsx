"use client";

import { useEffect, useRef } from "react";
import type * as THREE from "three";
import { HeroWauPerson } from "./hero-wau-person";

export function HeroWau() {
  const hostRef = useRef<HTMLDivElement>(null);
  const gripRef = useRef<HTMLSpanElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const fallbackRopeRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const grip = gripRef.current;
    const path = fallbackRopeRef.current;
    const poster = posterRef.current;
    if (!host || !grip || !path || !poster) return;
    const resize = () => {
      const bounds = host.getBoundingClientRect();
      const hand = grip.getBoundingClientRect();
      const kite = poster.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const x = ((hand.left - bounds.left) / bounds.width) * 100;
      const y = ((hand.top - bounds.top) / bounds.height) * 100;
      const kiteX = ((kite.left + kite.width * 0.5 - bounds.left) / bounds.width) * 100;
      const kiteY = ((kite.top + kite.height * 0.57 - bounds.top) / bounds.height) * 100;
      path.setAttribute("d", `M ${kiteX} ${kiteY} Q ${(kiteX + x) / 2 + 2} ${(kiteY + y) / 2} ${x} ${y}`);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    observer.observe(poster);
    if (grip.parentElement) observer.observe(grip.parentElement);
    resize();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    async function mount() {
      const [
        T,
        { GLTFLoader },
        { WauRope },
        { Line2 },
        { LineGeometry },
        { LineMaterial },
      ] = await Promise.all([
        import("three"),
        import("three/addons/loaders/GLTFLoader.js"),
        import("./wau-rope"),
        import("three/addons/lines/Line2.js"),
        import("three/addons/lines/LineGeometry.js"),
        import("three/addons/lines/LineMaterial.js"),
      ]);
      if (disposed || !host) return;
      const renderer = new T.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = T.SRGBColorSpace;
      renderer.toneMapping = T.ACESFilmicToneMapping;
      const scene = new T.Scene();
      const camera = new T.OrthographicCamera(-4, 4, 3, -3, 0.1, 40);
      camera.position.set(0, 0, 12);
      const pivot = new T.Group();
      scene.add(pivot);
      scene.add(new T.HemisphereLight(0xfff8eb, 0x66754e, 2.2));
      const key = new T.DirectionalLight(0xffe2b5, 3);
      key.position.set(-3, 5, 7);
      scene.add(key);
      const fill = new T.DirectionalLight(0xe6efff, 1.4);
      fill.position.set(4, 1, 4);
      scene.add(fill);
      let model: THREE.Group | undefined;
      let visible = true;
      let frame = 0;
      const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
      const rope = new WauRope();
      const anchor = new T.Vector3();
      const attachment = new T.Vector3();
      const bridleLocal = new T.Vector3(0, 0.05, 0.48);
      const ropeGeometry = new LineGeometry();
      const ropePositions = new Float32Array(32 * 3);
      ropeGeometry.setPositions(ropePositions);
      // Screen-space widths remain visible on high-DPI and mobile displays.
      const ropeMaterial = new LineMaterial({
        color: 0x5d4730,
        linewidth: 1.1,
        worldUnits: false,
      });
      const outlineMaterial = new LineMaterial({
        color: 0xfff5dc,
        linewidth: 2,
        worldUnits: false,
        transparent: true,
        opacity: 0.38,
        depthWrite: false,
      });
      const outline = new Line2(ropeGeometry, outlineMaterial);
      outline.frustumCulled = false;
      outline.renderOrder = 1;
      scene.add(outline);
      const ropeLine = new Line2(ropeGeometry, ropeMaterial);
      ropeLine.renderOrder = 2;
      ropeLine.frustumCulled = false;
      scene.add(ropeLine);
      // Two short cords form a bridle in front of the central bamboo spine.
      const bridleGeometry = new T.BufferGeometry().setFromPoints([
        new T.Vector3(0, 1.15, 0.27),
        bridleLocal,
        new T.Vector3(0, -0.35, 0.27),
      ]);
      const bridleMaterial = new T.LineBasicMaterial({ color: 0x5d4730 });
      pivot.add(new T.Line(bridleGeometry, bridleMaterial));
      let simulationTime = 0;
      let previousTime: number | undefined;
      let accumulator = 0;
      let baseHeight = 0;
      let layoutRight = 4;
      const fixedStep = 1 / 120;
      const positionVelocity = new T.Vector3();
      const rotationVelocity = new T.Vector3();
      const gust = (t: number) =>
        Math.pow(
          Math.max(0, Math.sin(t * 0.43 + 0.4) * Math.sin(t * 0.19 + 1.2)),
          3,
        );
      const pose = (dt: number) => {
        const t = simulationTime;
        // One launch per mount: enter from beyond the right edge, then settle at B.
        // Reduced-motion users see the final position immediately.
        const progress = motion.matches ? 1 : Math.min(1, t / 3);
        const u = progress * progress * (3 - 2 * progress);
        // Include the kite's half-span so the entire object starts out of view.
        const startX = camera.right + 2.2;
        const endX = layoutRight * 0.14;
        const pathX =
          (1 - u) * (1 - u) * startX +
          2 * (1 - u) * u * layoutRight * 0.65 +
          u * u * endX;
        const pathY = T.MathUtils.lerp(-camera.top * 0.25, baseHeight, u);
        pivot.scale.setScalar(T.MathUtils.lerp(0.48, 0.85, u));
        const g = gust(t);
        const wind =
          Math.sin(t * 0.61) * 0.55 + Math.sin(t * 1.13 + 1) * 0.2 + g;
        // Ease from launch into a small continuous breeze, without moving
        // anything for visitors who prefer reduced motion.
        const climbWind = Math.sin(Math.PI * u);
        const breeze = motion.matches ? 0 : u * u;
        const targets = [
          pathX + wind * (0.12 * climbWind + 0.13 * breeze),
          pathY + g * 0.14 * climbWind + Math.sin(t * 0.48) * 0.055 * breeze,
          -2,
        ];
        const angles = [
          0.5 + g * 0.055 * climbWind + Math.sin(t * 0.53) * 0.018 * breeze,
          T.MathUtils.degToRad(-20) + wind * (0.08 * climbWind + 0.035 * breeze),
          0.42 - (wind * 0.07 + 0.16) * climbWind + Math.sin(t * 0.61) * 0.025 * breeze,
        ];
        for (let axis = 0; axis < 3; axis++) {
          const key = (["x", "y", "z"] as const)[axis];
          if (dt === 0) {
            pivot.position[key] = targets[axis];
            pivot.rotation[key] = angles[axis];
            continue;
          }
          positionVelocity[key] +=
            ((targets[axis] - pivot.position[key]) * 6 -
              positionVelocity[key] * 4.8) *
            dt;
          pivot.position[key] += positionVelocity[key] * dt;
          rotationVelocity[key] +=
            ((angles[axis] - pivot.rotation[key]) * 9 -
              rotationVelocity[key] * 5.5) *
            dt;
          pivot.rotation[key] += rotationVelocity[key] * dt;
        }
        pivot.updateMatrixWorld(true);
        attachment.copy(bridleLocal).applyMatrix4(pivot.matrixWorld);
        return wind;
      };
      const settleRope = () => {
        pivot.position.set(0, baseHeight, 0);
        pivot.rotation.set(-0.1, -0.16, 0.22);
        positionVelocity.set(0, 0, 0);
        rotationVelocity.set(0, 0, 0);
        pose(0);
        rope.reset(attachment, anchor, attachment.distanceTo(anchor) + 0.055);
        for (let i = 0; i < 180; i++)
          rope.step(attachment, anchor, fixedStep, 0.2);
      };
      const disposeModel = (group: THREE.Group) => {
        const materials = new Set<THREE.Material>();
        const textures = new Set<THREE.Texture>();
        group.traverse((object) => {
          if (!(object instanceof T.Mesh)) return;
          object.geometry.dispose();
          for (const material of Array.isArray(object.material)
            ? object.material
            : [object.material]) {
            materials.add(material);
            for (const value of Object.values(material)) {
              if (value instanceof T.Texture) textures.add(value);
            }
          }
        });
        materials.forEach((m) => m.dispose());
        textures.forEach((t) => t.dispose());
      };
      const draw = () => {
        rope.points.forEach((point, i) => point.toArray(ropePositions, i * 3));
        const segments = (
          ropeGeometry.attributes
            .instanceStart as THREE.InterleavedBufferAttribute
        ).data;
        const positions = segments.array;
        for (let i = 0; i < 31; i++) {
          for (let axis = 0; axis < 3; axis++) {
            positions[i * 6 + axis] = ropePositions[i * 3 + axis];
            positions[i * 6 + 3 + axis] = ropePositions[(i + 1) * 3 + axis];
          }
        }
        segments.needsUpdate = true;
        renderer.render(scene, camera);
      };
      const tick = (time: number) => {
        if (previousTime !== undefined)
          accumulator += Math.min((time - previousTime) / 1000, 0.05);
        previousTime = time;
        while (accumulator >= fixedStep) {
          simulationTime += fixedStep;
          const wind = pose(fixedStep);
          rope.setLength(attachment.distanceTo(anchor) + 0.055);
          rope.step(attachment, anchor, fixedStep, wind * 0.6);
          accumulator -= fixedStep;
        }
        draw();
        frame = requestAnimationFrame(tick);
      };
      const syncMotion = () => {
        cancelAnimationFrame(frame);
        previousTime = undefined;
        accumulator = 0;
        if (!model || disposed) return;
        if (motion.matches) settleRope();
        draw();
        if (visible && !document.hidden && !motion.matches)
          frame = requestAnimationFrame(tick);
      };
      const resize = () => {
        const hostBounds = host.getBoundingClientRect();
        const { width, height } = hostBounds;
        if (!width || !height) return;
        const aspect = width / height;
        const halfHeight = Math.max(3.8, 3.7 / aspect);
        // Cover the whole hero so the string can reach the left-corner person,
        // while preserving the kite's original camera scale and position.
        const heroBounds = host.parentElement?.getBoundingClientRect() ?? hostBounds;
        const leftExtension = Math.max(0, hostBounds.left - heroBounds.left);
        const rightExtension = Math.max(0, heroBounds.right - hostBounds.right);
        const renderWidth = width + leftExtension + rightExtension;
        layoutRight = halfHeight * aspect;
        camera.left = -layoutRight - leftExtension * ((2 * halfHeight) / height);
        camera.right =
          layoutRight + rightExtension * ((2 * halfHeight) / height);
        renderer.domElement.style.left = `${-leftExtension}px`;
        camera.top = halfHeight;
        camera.bottom = -halfHeight;
        camera.updateProjectionMatrix();
        // Higher in the sky, with clearance for the upper tip at narrow sizes.
        baseHeight = Math.min(halfHeight * 0.48, halfHeight - 2);
        const handBounds = gripRef.current?.getBoundingClientRect();
        if (handBounds) {
          // A marker inside the arm layer keeps the attachment independent
          // of the body crop and provides the anchor for future hand dragging.
          const pinchX = handBounds.left;
          const pinchY = handBounds.top;
          const u = (pinchX - hostBounds.left + leftExtension) / renderWidth;
          const v = (pinchY - hostBounds.top) / height;
          anchor.set(
            camera.left + u * (camera.right - camera.left),
            camera.top - v * (camera.top - camera.bottom),
            0.5,
          );
        }
        settleRope();
        renderer.setSize(renderWidth, height);
        ropeMaterial.resolution.set(renderWidth, height);
        outlineMaterial.resolution.set(renderWidth, height);
        draw();
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      if (host.parentElement) resizeObserver.observe(host.parentElement);
      if (gripRef.current?.parentElement)
        resizeObserver.observe(gripRef.current.parentElement);
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        syncMotion();
      });
      observer.observe(host);
      motion.addEventListener("change", syncMotion);
      document.addEventListener("visibilitychange", syncMotion);
      const contextLost = (event: Event) => {
        event.preventDefault();
        cancelAnimationFrame(frame);
        host.dataset.loaded = "false";
      };
      renderer.domElement.addEventListener("webglcontextlost", contextLost);
      host.appendChild(renderer.domElement);
      cleanup = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        resizeObserver.disconnect();
        motion.removeEventListener("change", syncMotion);
        document.removeEventListener("visibilitychange", syncMotion);
        renderer.domElement.removeEventListener(
          "webglcontextlost",
          contextLost,
        );
        if (model) disposeModel(model);
        ropeGeometry.dispose();
        bridleGeometry.dispose();
        ropeMaterial.dispose();
        outlineMaterial.dispose();
        bridleMaterial.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        delete host.dataset.loaded;
      };
      try {
        const gltf = await new GLTFLoader().loadAsync("/models/wau-bulan.glb");
        if (disposed) {
          disposeModel(gltf.scene);
          return;
        }
        model = gltf.scene;
        const center = new T.Box3()
          .setFromObject(model)
          .getCenter(new T.Vector3());
        model.position.sub(center);
        pivot.add(model);
        resize();
        host.dataset.loaded = "true";
        syncMotion();
      } catch {
        cleanup();
      }
    }

    void mount().catch(() => cleanup());
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div className="hero-wau" ref={hostRef} aria-hidden="true">
      {/* A render of the same model stays visible until WebGL is ready. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={posterRef}
        className="hero-wau-poster"
        src="/hero/wau-bulan-flight.webp"
        alt=""
        width={1200}
        height={880}
      />
      <svg className="hero-wau-fallback-rope" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path ref={fallbackRopeRef} fill="none" stroke="#806744" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
      </svg>
      <HeroWauPerson gripRef={gripRef} />
    </div>
  );
}
