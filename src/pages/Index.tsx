import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedSection from "@/components/FeaturedSection";
import ConsultationCTA from "@/components/ConsultationCTA";
import { getSEOMeta } from "@/lib/seo";

const Index = () => {
  useEffect(() => {
    const meta = getSEOMeta("home");
    document.title = meta.title;
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement("meta");
      (desc as HTMLMetaElement).name = "description";
      document.head.appendChild(desc);
    }
    (desc as HTMLMetaElement).content = meta.description;

    // Structured data for local SEO
    const sd = document.createElement("script");
    sd.type = "application/ld+json";
    sd.id = "solarcore-local-business";
    if (!document.getElementById("solarcore-local-business")) {
      sd.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "SolarCore Systems",
        description: meta.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: "123 Industrial Way, Suite 4B",
          addressLocality: "Boston",
          addressRegion: "MA",
          postalCode: "02101",
          addressCountry: "US",
        },
        telephone: "+16175550199",
        email: "sales@solarcoresystems.com",
        url: "https://solarcoresystems.com",
        areaServed: ["Boston MA", "Worcester MA", "Massachusetts", "New England"],
        priceRange: "$$$",
      });
      document.head.appendChild(sd);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ConsultationCTA />
      <Hero />
      <FeaturedSection />
      <Footer />
    </div>
  );
};

export default Index;
