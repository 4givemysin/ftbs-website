import { type ReactNode } from "react";
import { ContentContainer } from "@/components/ui/ContentContainer";
import { SectionHeader } from "@/components/marketing/SectionHeader";

type ContentSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  alt?: boolean;
  id?: string;
  headerAlign?: "left" | "center";
};

/**
 * Reusable section pattern: header + content block.
 * Used on Home, About, Services, and future phase pages.
 */
export function ContentSection({
  eyebrow,
  title,
  description,
  children,
  alt = false,
  id,
  headerAlign = "left",
}: ContentSectionProps) {
  const headerId = id ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headerId}
      className={`py-16 lg:py-24 ${alt ? "bg-surface-alt" : "bg-white"}`}
    >
      <ContentContainer>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          align={headerAlign}
        />
        <div className="mt-10">{children}</div>
      </ContentContainer>
    </section>
  );
}
