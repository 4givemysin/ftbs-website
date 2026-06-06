type SampleContentNoticeProps = {
  className?: string;
};

/**
 * Visible disclaimer for placeholder / sample content in Phase 2.
 */
export function SampleContentNotice({ className = "" }: SampleContentNoticeProps) {
  return (
    <div
      role="note"
      className={`rounded-lg border border-brand-gold/40 bg-brand-gold/10 px-4 py-3 text-sm leading-relaxed text-brand-navy ${className}`}
    >
      <p className="font-semibold">Sample content</p>
      <p className="mt-1 text-zinc-700">
        This section uses representative placeholder content for layout and
        review. Approved project data, testimonials, and credentials will replace
        these entries before formal procurement use.
      </p>
    </div>
  );
}
