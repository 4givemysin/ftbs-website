import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  href?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-navy text-white hover:bg-brand-blue focus-visible:ring-brand-blue",
  secondary:
    "bg-brand-blue text-white hover:bg-brand-navy focus-visible:ring-brand-blue",
  outline:
    "border border-brand-navy text-brand-navy hover:bg-surface-alt focus-visible:ring-brand-navy",
};

const baseClasses =
  "inline-flex h-11 min-w-11 items-center justify-center rounded-md px-6 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]";

export function Button({
  variant = "primary",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
