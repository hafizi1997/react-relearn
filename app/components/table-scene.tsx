"use client";

import { useEffect, useRef, useState } from "react";
import type * as THREE from "three";
import styles from "../(site)/home.module.css";

export function TableScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("Loading 3D table…");

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
      renderer.outputColorSpace = T.SRGBColorSpace;
      renderer.toneMapping = T.ACESFilmicToneMapping;
      host.appendChild(renderer.domElement);
      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(38, 1, 0.01, 20);
      camera.position.set(0, 1.6, 1.5);
      const target = new T.Vector3(0, 0.18, 0);
      camera.lookAt(target);
      scene.add(new T.HemisphereLight(0xfff5e4, 0x72624e, 2));
      const key = new T.DirectionalLight(0xffe6c6, 3);
      key.position.set(-2, 4, 3); scene.add(key);
      const fill = new T.DirectionalLight(0xffffff, 1.2);
      fill.position.set(3, 2, -2); scene.add(fill);
      const disposeModel = (group: THREE.Object3D) => {
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
        materials.forEach((material) => material.dispose());
        textures.forEach((texture) => texture.dispose());
      };
      const draw = () => { if (!disposed) renderer.render(scene, camera); };
      const bounds = new T.Box3();
      const resize = () => {
        const { width, height } = host.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        if (!bounds.isEmpty()) {
          // Keep world scale intact for future pieces; fit the camera to the table.
          camera.lookAt(target);
          const inverseRotation = camera.quaternion.clone().invert();
          const direction = camera.position.clone().sub(target).normalize();
          const tangent = Math.tan(T.MathUtils.degToRad(camera.fov / 2));
          let distance = 0;
          for (const x of [bounds.min.x, bounds.max.x]) {
            for (const y of [bounds.min.y, bounds.max.y]) {
              for (const z of [bounds.min.z, bounds.max.z]) {
                const corner = new T.Vector3(x, y, z)
                  .sub(target).applyQuaternion(inverseRotation);
                distance = Math.max(distance, corner.z + 0.9 * Math.max(
                  Math.abs(corner.x) / (tangent * camera.aspect),
                  Math.abs(corner.y) / tangent,
                ));
              }
            }
          }
          camera.position.copy(target).addScaledVector(direction, distance);
        }
        camera.updateProjectionMatrix();
        draw();
      };
      const observer = new ResizeObserver(resize);
      observer.observe(host);
      const lost = (event: Event) => {
        event.preventDefault();
        setStatus("The 3D view was interrupted. Reload to try again.");
      };
      renderer.domElement.addEventListener("webglcontextlost", lost);
      cleanup = () => {
        observer.disconnect();
        renderer.domElement.removeEventListener("webglcontextlost", lost);
        disposeModel(scene);
        renderer.dispose();
        renderer.domElement.remove();
      };
      resize();
      const gltf = await new GLTFLoader().loadAsync("/models/wooden-chess-table.glb");
      if (disposed) { disposeModel(gltf.scene); return; }
      const model = gltf.scene;
      scene.add(model);
      bounds.setFromObject(model);
      resize();
      setStatus("");
    }

    void mount().catch(() => {
      cleanup();
      if (!disposed) setStatus("The 3D table could not load. Please reload to try again.");
    });
    return () => { disposed = true; cleanup(); };
  }, []);

  return (
    <div className={styles.tableBackground}>
      <div className={styles.tableCanvas} ref={hostRef} role="img" aria-label="3D wooden chess table with carved legs." />
      {status && <p className="sr-only" role="status">{status}</p>}
    </div>
  );
}
