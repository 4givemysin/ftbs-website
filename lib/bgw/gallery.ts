export type GalleryCategory = "infrastructure" | "commercial" | "residential";

export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  category: GalleryCategory;
  location: string;
  year: string;
  /** Sample placeholder until approved photography is provided */
  isSample: true;
};

export const galleryCategories: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "commercial", label: "Commercial" },
  { id: "residential", label: "Residential" },
];

export const bgwGalleryItems: GalleryItem[] = [
  {
    id: "sample-corridor",
    title: "Regional Transportation Corridor",
    caption:
      "Sample gallery item: phased roadway rehabilitation and safety upgrades for a public agency partner.",
    category: "infrastructure",
    location: "Southeastern United States",
    year: "2024",
    isSample: true,
  },
  {
    id: "sample-public-building",
    title: "Public Facility Modernization",
    caption:
      "Sample gallery item: facility upgrades with compliance checkpoints and structured agency reporting.",
    category: "infrastructure",
    location: "Sample Municipal Program",
    year: "2023",
    isSample: true,
  },
  {
    id: "sample-commercial-campus",
    title: "Commercial Campus Expansion",
    caption:
      "Sample gallery item: multi-building commercial expansion with schedule-controlled phased delivery.",
    category: "commercial",
    location: "Sample Regional Market",
    year: "2024",
    isSample: true,
  },
  {
    id: "sample-retail-buildout",
    title: "Retail & Service Facility Buildout",
    caption:
      "Sample gallery item: commercial interior and systems coordination for a national service account.",
    category: "commercial",
    location: "Multi-state Program",
    year: "2022",
    isSample: true,
  },
  {
    id: "sample-housing",
    title: "Residential Community Development",
    caption:
      "Sample gallery item: housing program supporting community growth and long-term occupancy standards.",
    category: "residential",
    location: "Sample Development Area",
    year: "2023",
    isSample: true,
  },
  {
    id: "sample-mixed-use",
    title: "Mixed-Use Housing Block",
    caption:
      "Sample gallery item: residential and community infrastructure integrated into a phased development plan.",
    category: "residential",
    location: "Sample Urban Infill",
    year: "2024",
    isSample: true,
  },
];

export function getGalleryByCategory(category: GalleryCategory | "all"): GalleryItem[] {
  if (category === "all") return bgwGalleryItems;
  return bgwGalleryItems.filter((item) => item.category === category);
}

export function getCategoryLabel(category: GalleryCategory): string {
  return galleryCategories.find((c) => c.id === category)?.label ?? category;
}
