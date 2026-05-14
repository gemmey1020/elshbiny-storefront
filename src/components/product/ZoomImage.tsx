"use client";

import Image from "next/image";
import { type MouseEvent, useState } from "react";
import { MannequinSilhouette } from "@/components/shared/MannequinSilhouette";

type ZoomImageProps = {
  catalogUrl?: string | null;
  zoomUrl?: string | null;
  alt: string;
};

export function ZoomImage({ catalogUrl, zoomUrl, alt }: ZoomImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const activeZoomUrl = zoomUrl ?? catalogUrl;

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    setPosition({ x, y });
  }

  return (
    <div
      className="glass-panel relative aspect-[3/4] overflow-hidden rounded-md bg-black/20"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      {catalogUrl ? (
        <Image
          src={catalogUrl}
          alt={alt}
          fill
          priority
          unoptimized
          sizes="(min-width: 1024px) 48vw, 100vw"
          className={`object-cover transition duration-300 ${isZoomed && activeZoomUrl ? "opacity-0" : "opacity-100"}`}
        />
      ) : (
        <MannequinSilhouette />
      )}

      {isZoomed && activeZoomUrl ? (
        <div
          aria-hidden
          className="absolute inset-0 z-10 bg-no-repeat"
          style={{
            backgroundImage: `url(${activeZoomUrl})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundSize: "250%",
          }}
        />
      ) : null}
    </div>
  );
}
