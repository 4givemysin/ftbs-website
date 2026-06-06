type BgwBadgeProps = {
  className?: string;
  size?: "sm" | "md";
  variant?: "default" | "onDark";
};

/**
 * BGW Construction division badge placeholder.
 */
export function BgwBadge({
  className = "",
  size = "sm",
  variant = "default",
}: BgwBadgeProps) {
  const sizeClasses = size === "md" ? "px-3 py-1.5 text-xs" : "px-2 py-1 text-[10px]";
  const variantClasses =
    variant === "onDark"
      ? "border-white/25 bg-white/10 text-zinc-100"
      : "border-bgw-green/30 bg-bgw-green/10 text-bgw-earth";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold uppercase tracking-wide ${variantClasses} ${sizeClasses} ${className}`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${variant === "onDark" ? "bg-brand-gold-light" : "bg-bgw-green"}`}
      />
      BGW Construction
    </span>
  );
}
