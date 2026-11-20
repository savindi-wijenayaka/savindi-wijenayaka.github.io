import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main
        className="rail-safe-x"
        style={{
          maxWidth: 800,
          margin: "0 auto",
          paddingTop: "clamp(2.5rem, 6vw, 4.5rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
