import { type ReactNode } from "react";

type ContentContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
};

/**
 * Primary content width constraint for all page sections.
 * Mobile-first: full width with responsive horizontal padding.
 */
export function ContentContainer({
  children,
  className = "",
  as: Component = "div",
}: ContentContainerProps) {
  return (
    <Component
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </Component>
  );
}

/** @deprecated Use ContentContainer — kept for backward compatibility */
export const Container = ContentContainer;
