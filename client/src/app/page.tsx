import Image from "next/image";
import Header from "@/components/Header/page";
import Hero from "./_home/Hero";
import Feature from "./_home/Feature";
import Footer from "@/components/Footer/page";

export default function Home() {
  return (
    <div className="layout">
      <div className="main-content">
        <div className="hero-section">
          <Header />
          <Hero />
        </div>
        <div>
          <Feature />
        </div>
      </div>
      <Footer />
    </div>
  );
}
