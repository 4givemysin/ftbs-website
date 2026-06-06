type BgwBadgeProps = {
  className?: string;
  size?: "sm" | "md";
};

/**
 * BGW Construction division badge placeholder.
 */
export function BgwBadge({ className = "", size = "sm" }: BgwBadgeProps) {
  const sizeClasses = size === "md" ? "px-3 py-1.5 text-xs" : "px-2 py-1 text-[10px]";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-bgw-green/30 bg-bgw-green/10 font-semibold uppercase tracking-wide text-bgw-earth ${sizeClasses} ${className}`}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-bgw-green" />
      BGW Construction
    </span>
  );
}
