import Link from "next/link";

type LogoProps = {
  href?: string;
  showTagline?: boolean;
  variant?: "default" | "light";
  className?: string;
};

export function Logo({
  href = "/",
  showTagline = true,
  variant = "default",
  className = "",
}: LogoProps) {
  const titleClass =
    variant === "light" ? "text-white" : "text-brand-navy";
  const taglineClass =
    variant === "light" ? "text-zinc-300" : "text-zinc-600";
  const content = (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        aria-hidden
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-navy shadow-sm"
      >
        <svg viewBox="0 0 40 40" className="h-7 w-7" aria-hidden="true">
          <rect x="4" y="4" width="14" height="14" rx="2" fill="#b8860b" />
          <rect x="22" y="4" width="14" height="14" rx="2" fill="#2e5a8b" />
          <rect x="4" y="22" width="14" height="14" rx="2" fill="#2e5a8b" />
          <rect x="22" y="22" width="14" height="14" rx="2" fill="#ffffff" opacity="0.9" />
        </svg>
      </div>
      <div className="leading-tight">
        <span className={`block text-lg font-bold tracking-tight ${titleClass}`}>
          FTBS
        </span>
        {showTagline ? (
          <span className={`hidden text-xs sm:block ${taglineClass}`}>
            Finesse Technology Business Solutions
          </span>
        ) : null}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2">
        {content}
      </Link>
    );
  }

  return content;
}
