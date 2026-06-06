import { type ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
};

/** Reusable card surface — used across services, about, contact, future portfolio */
export function Card({ children, className = "", as: Component = "div" }: CardProps) {
  return (
    <Component
      className={`rounded-lg border border-border bg-white p-6 shadow-sm ${className}`}
    >
      {children}
    </Component>
  );
}
