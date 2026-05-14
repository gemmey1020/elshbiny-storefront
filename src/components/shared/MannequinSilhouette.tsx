import { MannequinGlyph } from "@/components/shared/MannequinLoader";

export function MannequinSilhouette({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-full items-center justify-center border border-border-metallic bg-surface-glass ${className}`}>
      <MannequinGlyph className="scale-[1.65] opacity-90" />
    </div>
  );
}
