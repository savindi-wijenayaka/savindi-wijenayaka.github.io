/**
 * TO POPULATE THIS SECTION:
 * Add your real publications to the array below.
 *
 * Schema fields:
 *   id           — unique slug (e.g. "cardiac-segmentation-2023")
 *   title        — full paper title (clear, do not abbreviate)
 *   authors      — author list as strings, e.g. ["Wijenayaka S", "Author B"]
 *   venue        — journal name or conference name
 *   year         — publication year (number)
 *   abstract     — full abstract or summary
 *   doiUrl       — DOI link (e.g. "https://doi.org/10.xxxx/...")
 *   pdfUrl       — link to PDF (optional)
 *   featured     — set true on up to 2 publications to show on the home page preview
 *
 * Once populated, replace <ComingSoon> in app/publications/page.tsx with <PublicationsList>.
 */

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  abstract: string;
  doiUrl?: string;
  pdfUrl?: string;
  featured: boolean;
}

const Publications: Publication[] = [
  // Add your publications here. Example structure:
  // {
  //   id: "your-paper-slug",
  //   title: "Your Paper Title",
  //   authors: ["Wijenayaka S", "Co-Author A", "Co-Author B"],
  //   venue: "Journal of Biomedical Engineering",
  //   year: 2024,
  //   abstract: "Full abstract text...",
  //   doiUrl: "https://doi.org/10.xxxx/xxxxxx",
  //   featured: true,
  // },
];

export default Publications;
