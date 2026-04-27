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
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem) clamp(3rem, 6vw, 5rem)",
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
