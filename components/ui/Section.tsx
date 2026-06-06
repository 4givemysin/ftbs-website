import { type ReactNode } from "react";
import { ContentContainer } from "./ContentContainer";

type SectionProps = {
  children: ReactNode;
  className?: string;
  alt?: boolean;
  id?: string;
  ariaLabelledby?: string;
};

/**
 * Standard vertical section pattern: alternating backgrounds, consistent rhythm.
 */
export function Section({
  children,
  className = "",
  alt = false,
  id,
  ariaLabelledby,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`py-16 lg:py-24 ${alt ? "bg-surface-alt" : "bg-white"} ${className}`}
    >
      <ContentContainer>{children}</ContentContainer>
    </section>
  );
}
