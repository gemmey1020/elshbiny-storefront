import Link from "next/link";
import type { ComponentPropsWithoutRef, ComponentType, ReactNode } from "react";
import type { LucideProps } from "lucide-react";

type ButtonVariant = "primary" | "glass";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  icon?: ComponentType<LucideProps>;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "type" | "children">;

const baseClass =
  "inline-flex h-12 items-center justify-center gap-3 border px-6 text-sm font-semibold uppercase transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-white disabled:cursor-not-allowed disabled:opacity-40";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "border-white bg-white text-background-obsidian hover:border-accent-white hover:bg-accent-white hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
  glass:
    "border-border-metallic bg-surface-glass-deep text-text-primary backdrop-blur-[40px] hover:border-white hover:bg-white/10",
};

export function Button({
  children,
  href,
  icon: Icon,
  variant = "primary",
  type = "button",
  className,
  ...buttonProps
}: ButtonProps) {
  const buttonClassName = `${baseClass} ${variantClass[variant]} ${className ?? ""}`;
  const content = (
    <>
      {Icon ? <Icon aria-hidden className="h-4 w-4" strokeWidth={1.8} /> : null}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={buttonClassName} {...buttonProps}>
      {content}
    </button>
  );
}
