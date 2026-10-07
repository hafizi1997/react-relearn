"use client";

import { useEffect, useRef } from "react";
import type * as THREE from "three";

export function HeroWau() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    async function mount() {
      const [T, { GLTFLoader }] = await Promise.all([
        import("three"),
        import("three/addons/loaders/GLTFLoader.js"),
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
      const key = new T.DirectionalLight(0xffecd2, 3);
      key.position.set(-3, 5, 7);
      scene.add(key);
      const fill = new T.DirectionalLight(0xe6efff, 1.4);
      fill.position.set(4, 1, 4);
      scene.add(fill);
      let model: THREE.Group | undefined;
      let visible = true;
      let frame = 0;
      const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
      const disposeModel = (group: THREE.Group) => {
        const materials = new Set<THREE.Material>();
        const textures = new Set<THREE.Texture>();
        group.traverse((object) => {
          if (!(object instanceof T.Mesh)) return;
          object.geometry.dispose();
          for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
            materials.add(material);
            for (const value of Object.values(material)) {
              if (value instanceof T.Texture) textures.add(value);
            }
          }
        });
        materials.forEach((m) => m.dispose());
        textures.forEach((t) => t.dispose());
      };
      const draw = (time = 0) => {
        const t = motion.matches ? 0 : time / 1000;
        pivot.rotation.set(-0.08 + Math.sin(t * 0.45) * 0.025, -0.17 + Math.sin(t * 0.32) * 0.07, 0.22 + Math.sin(t * 0.5) * 0.025);
        pivot.position.y = Math.sin(t * 0.65) * 0.065;
        renderer.render(scene, camera);
      };
      const tick = (time: number) => {
        draw(time);
        frame = requestAnimationFrame(tick);
      };
      const syncMotion = () => {
        cancelAnimationFrame(frame);
        if (!model || disposed) return;
        draw();
        if (visible && !document.hidden && !motion.matches) frame = requestAnimationFrame(tick);
      };
      const resize = () => {
        const { width, height } = host.getBoundingClientRect();
        if (!width || !height) return;
        const aspect = width / height;
        const halfHeight = Math.max(2.65, 3.7 / aspect);
        camera.left = -halfHeight * aspect;
        camera.right = halfHeight * aspect;
        camera.top = halfHeight;
        camera.bottom = -halfHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        draw();
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
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
        renderer.domElement.removeEventListener("webglcontextlost", contextLost);
        if (model) disposeModel(model);
        renderer.dispose();
        renderer.domElement.remove();
        delete host.dataset.loaded;
      };
      try {
        const gltf = await new GLTFLoader().loadAsync("/models/wau-bulan.glb");
        if (disposed) { disposeModel(gltf.scene); return; }
        model = gltf.scene;
        const center = new T.Box3().setFromObject(model).getCenter(new T.Vector3());
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
    return () => { disposed = true; cleanup(); };
  }, []);

  return (
    <div className="hero-wau" ref={hostRef} aria-hidden="true">
      {/* A render of the same model stays visible until WebGL is ready. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hero-wau-poster" src="/hero/wau-bulan-flight.webp" alt="" width={1200} height={880} />
    </div>
  );
}
