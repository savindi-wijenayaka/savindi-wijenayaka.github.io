import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NeuralCanvas from "@/components/ui/NeuralCanvas";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div style={{ opacity: 0.25 }}>
        <NeuralCanvas />
      </div>
      <Navbar />
      <main
        className="rail-safe-x"
        style={{
          maxWidth: 800,
          margin: "0 auto",
          paddingTop: "clamp(5rem, 10vw, 8rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
