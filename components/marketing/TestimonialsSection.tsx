import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { routes } from "@/lib/routes";
import {
  getFeaturedTestimonials,
  type Testimonial,
} from "@/lib/testimonials";

type TestimonialsSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  limit?: number;
  testimonials?: Testimonial[];
  alt?: boolean;
  showViewAll?: boolean;
};

export function TestimonialsSection({
  eyebrow = "Client Perspectives",
  title = "What partners expect from professional delivery",
  description = "Representative sample feedback illustrating the communication, accountability, and reporting standards FTBS brings to construction and technology engagements.",
  limit = 3,
  testimonials = getFeaturedTestimonials().slice(0, limit),
  alt = false,
  showViewAll = true,
}: TestimonialsSectionProps) {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className={`py-16 lg:py-24 ${alt ? "bg-surface-alt" : "bg-white"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-blue">
              {eyebrow}
            </p>
          ) : null}
          <h2
            id="testimonials-heading"
            className="mt-3 text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-relaxed text-zinc-600">
              {description}
            </p>
          ) : null}
        </div>

        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <li key={item.id}>
              <Card className="flex h-full flex-col">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Sample</Badge>
                  <Badge variant="technology">{item.industry}</Badge>
                </div>
                <blockquote className="mt-4 flex-1 border-l-2 border-brand-gold-accent pl-4 text-sm leading-relaxed text-zinc-700">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <footer className="mt-6 border-t border-border pt-4">
                  <p className="text-sm font-semibold text-brand-navy">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {item.title}, {item.organization}
                  </p>
                </footer>
              </Card>
            </li>
          ))}
        </ul>

        {showViewAll ? (
          <div className="mt-10">
            <Button href={routes.testimonials.path} variant="outline">
              View All Testimonials
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
