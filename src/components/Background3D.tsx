"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createDotTexture() {
  const size = 96;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const center = size / 2;
  const gradient = ctx.createRadialGradient(
    center,
    center,
    0,
    center,
    center,
    center,
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.18, "rgba(255,255,255,0.92)");
  gradient.addColorStop(0.42, "rgba(255,255,255,0.4)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

interface ParticlesProps {
  count: number;
  spread: number;
  pointSize: number;
  opacity: number;
  texture: THREE.Texture;
  rotationSpeed: number;
  palette: [string, string, string];
  mouseStrength: number;
}

function Particles({
  count,
  spread,
  pointSize,
  opacity,
  texture,
  rotationSpeed,
  palette,
  mouseStrength,
  smoothMouse,
}: ParticlesProps & {
  smoothMouse: RefObject<{ x: number; y: number }>;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const basePositions = useRef<Float32Array | null>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorA = new THREE.Color(palette[0]);
    const colorB = new THREE.Color(palette[1]);
    const colorC = new THREE.Color(palette[2]);

    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.75;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5;

      const t = Math.random();
      const color =
        t < 0.4
          ? colorA.clone().lerp(colorB, t / 0.4)
          : colorB.clone().lerp(colorC, (t - 0.4) / 0.6);

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    basePositions.current = positions.slice();
    return { positions, colors };
  }, [count, spread, palette]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const elapsed = state.clock.elapsedTime;
    const mouse = smoothMouse.current ?? { x: 0, y: 0 };

    pointsRef.current.rotation.y =
      elapsed * rotationSpeed + mouse.x * 0.35 * mouseStrength;
    pointsRef.current.rotation.x =
      Math.sin(elapsed * 0.1) * 0.05 + mouse.y * 0.25 * mouseStrength;
    pointsRef.current.position.x = mouse.x * 0.8 * mouseStrength;
    pointsRef.current.position.y = mouse.y * 0.55 * mouseStrength;

    const geometry = pointsRef.current.geometry;
    const positionAttr = geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    const base = basePositions.current;
    if (!base) return;

    const influence = mouseStrength * 0.35;
    for (let i = 0; i < count; i += 1) {
      const ix = i * 3;
      const bx = base[ix];
      const by = base[ix + 1];
      const dist = Math.hypot(bx - mouse.x * 10, by - mouse.y * 7);
      const force = Math.max(0, 1 - dist / 8) * influence;

      positionAttr.array[ix] = bx + mouse.x * force * 2.5;
      positionAttr.array[ix + 1] = by + mouse.y * force * 2.5;
      positionAttr.array[ix + 2] =
        base[ix + 2] + Math.sin(elapsed + i * 0.05) * 0.04;
    }
    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={pointSize}
        vertexColors
        transparent
        opacity={opacity}
        alphaTest={0.01}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

function CameraRig({
  mouseTarget,
  smoothMouse,
}: {
  mouseTarget: RefObject<{ x: number; y: number }>;
  smoothMouse: RefObject<{ x: number; y: number }>;
}) {
  useFrame((state) => {
    const target = mouseTarget.current ?? { x: 0, y: 0 };
    const smooth = smoothMouse.current;
    if (!smooth) return;

    smooth.x += (target.x - smooth.x) * 0.06;
    smooth.y += (target.y - smooth.y) * 0.06;

    state.camera.position.x = smooth.x * 0.7;
    state.camera.position.y = smooth.y * 0.5;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

function Scene({
  texture,
  mouseTarget,
  smoothMouse,
}: {
  texture: THREE.Texture;
  mouseTarget: RefObject<{ x: number; y: number }>;
  smoothMouse: RefObject<{ x: number; y: number }>;
}) {
  return (
    <>
      <CameraRig mouseTarget={mouseTarget} smoothMouse={smoothMouse} />
      <ambientLight intensity={0.6} />
      <Particles
        count={240}
        spread={24}
        pointSize={0.32}
        opacity={0.92}
        texture={texture}
        rotationSpeed={0.016}
        mouseStrength={1}
        smoothMouse={smoothMouse}
        palette={["#6366f1", "#8b5cf6", "#ec4899"]}
      />
      <Particles
        count={120}
        spread={18}
        pointSize={0.22}
        opacity={0.65}
        texture={texture}
        rotationSpeed={0.01}
        mouseStrength={0.75}
        smoothMouse={smoothMouse}
        palette={["#818cf8", "#a78bfa", "#60a5fa"]}
      />
    </>
  );
}

export function Background3D() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setTexture(createDotTexture());
  }, []);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      mouseTarget.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!texture) {
    return <div className="h-full w-full" aria-hidden="true" />;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <Scene
        texture={texture}
        mouseTarget={mouseTarget}
        smoothMouse={smoothMouse}
      />
    </Canvas>
  );
}
