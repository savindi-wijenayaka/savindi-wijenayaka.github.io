import type { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import { ComingSoon } from "@/components/shared/coming-soon";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Peer-reviewed research publications by Savindi Wijenayaka in machine learning, deep learning, medical imaging, and bioengineering.",
  openGraph: {
    title: "Publications | Savindi Wijenayaka",
    description:
      "Peer-reviewed research publications by Savindi Wijenayaka in machine learning, deep learning, medical imaging, and bioengineering.",
    url: "https://savindi.com/publications",
  },
  alternates: { canonical: "https://savindi.com/publications" },
};

/**
 * TO POPULATE THIS PAGE:
 * 1. Edit data/publications.ts — add your real publications following the schema
 * 2. Set featured: true on up to 2 publications (shown on home page preview)
 * 3. Replace <ComingSoon> below with <PublicationsList /> (create that component)
 *
 * Schema: { id, title, authors[], venue, year, abstract, doiUrl?, pdfUrl?, featured }
 */
export default function PublicationsPage() {
  return (
    <Box bg="bg.canvas">
      <ComingSoon
        title="Publications"
        description="Peer-reviewed research in machine learning, biomedical image analysis, and deep learning. Publications will be listed here with abstracts and DOI links."
        dataFile="data/publications.ts"
        dataSchema={{
          id: "string — unique slug",
          title: "string — full paper title",
          authors: 'string[] — e.g. ["Wijenayaka S", "Author B"]',
          venue: "string — journal or conference name",
          year: "number — publication year",
          abstract: "string — full abstract",
          doiUrl: "string? — DOI link",
          pdfUrl: "string? — PDF link",
          featured: "boolean — show on home page preview if true",
        }}
        componentToUncomment="PublicationsList"
      />
    </Box>
  );
}
