"use client";

import Image from "next/image";
import Link from "next/link";

type BrandMarkProps = {
  className?: string;
  imageSize?: "sm" | "md" | "lg";
  showText?: boolean;
};

const imageSizeClasses = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

export function BrandMark({ className = "", imageSize = "md", showText = true }: BrandMarkProps) {
  return (
    <Link href="/" dir="ltr" className={`inline-flex items-center gap-3 text-left ${className}`}>
      <span
        className={`${imageSizeClasses[imageSize]} relative shrink-0 overflow-hidden rounded-md border border-white/45 bg-white shadow-[0_18px_45px_rgba(255,255,255,0.12)]`}
      >
        <Image
          src="/brand/elshbiny-logo.jpg"
          alt="Elshbiny logo"
          fill
          priority={imageSize !== "lg"}
          sizes={imageSize === "lg" ? "64px" : "48px"}
          className="object-cover"
        />
      </span>
      {showText ? (
        <span className="grid gap-0.5">
          <span className="font-headline text-xl font-bold uppercase leading-none text-white">ELSHBINY</span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-platinum">
            Display Studio
          </span>
        </span>
      ) : null}
    </Link>
  );
}
