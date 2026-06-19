"use client";

import dynamic from "next/dynamic";

const Background3D = dynamic(
  () => import("@/components/Background3D").then((mod) => mod.Background3D),
  { ssr: false },
);

export function SiteBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
      aria-hidden="true"
    >
      <Background3D />
    </div>
  );
}
