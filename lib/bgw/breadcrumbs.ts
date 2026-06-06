import { routes } from "@/lib/routes";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function bgwBreadcrumbs(current: BreadcrumbItem): BreadcrumbItem[] {
  return [
    { name: "Home", path: routes.home.path },
    { name: "BGW Construction", path: routes.bgw.path },
    current,
  ];
}
