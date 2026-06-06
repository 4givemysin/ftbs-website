import { type ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "bgw" | "construction" | "technology";
  className?: string;
};

const variantClasses = {
  default: "bg-surface-alt text-brand-navy",
  bgw: "bg-brand-navy/10 text-brand-navy",
  construction: "bg-surface-alt text-brand-blue",
  technology: "bg-brand-blue/10 text-brand-blue",
};

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
