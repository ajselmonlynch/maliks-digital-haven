import { Link } from "react-router-dom";
import { Shirt, UtensilsCrossed, Zap } from "lucide-react";

const categories = [
  {
    icon: Shirt,
    title: "AJ's Snack Shack",
    subtitle: "The Job Site Legend",
    description: "Apparel built for the trades. Every shirt tells the story of the people who show up every day.",
    link: "/products?collection=ajs-snack-shack",
    cta: "Shop the Shack",
    accent: "#F5E642",
  },
  {
    icon: Zap,
    title: "The Sayings",
    subtitle: "Job Site Phrases",
    description: "\"It Is What It Is.\" \"Chaos Is Cash.\" \"Make It Make Sense.\" Real talk on heavy hoodies.",
    link: "/products?collection=sayings",
    cta: "Shop the Sayings",
    accent: "#FF6B00",
  },
  {
    icon: UtensilsCrossed,
    title: "Exotic Snacks",
    subtitle: "International Flavors",
    description: "Hard-to-find snacks from around the world. Straight to the site. No gas station taquitos.",
    link: "/products?collection=snacks",
    cta: "Shop the Snacks",
    accent: "#C8102E",
  },
];

const FeaturedSection = () => {
  return (
    <>
      {/* Category Blocks */}
      <section className="bg-[#1A1A1A] py-24 border-t border-[#2A2A2A]">
        <div className="container mx-auto px-6">
          <p className="font-condensed text-hiviz text-sm tracking-[0.3em] uppercase text-center mb-2">What We Carry</p>
          <h2 className="font-display text-5xl md:text-7xl text-white text-center mb-16">The Bodega</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className="bg-[#2A2A2A] border border-[#333] p-8 flex flex-col group hover:border-hiviz transition-colors"
              >
                <cat.icon
                  className="w-10 h-10 mb-6"
                  style={{ color: cat.accent }}
                />
                <p className="font-condensed text-xs tracking-[0.3em] uppercase mb-1" style={{ color: cat.accent }}>
                  {cat.subtitle}
                </p>
                <h3 className="font-display text-3xl text-white mb-4">{cat.title}</h3>
                <p className="font-sans text-white/60 text-sm leading-relaxed mb-8 flex-1">
                  {cat.description}
                </p>
                <Link
                  to={cat.link}
                  className="font-condensed font-bold text-sm tracking-widest uppercase border-2 text-center py-3 px-6 transition-colors"
                  style={{ borderColor: cat.accent, color: cat.accent }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = cat.accent;
                    (e.currentTarget as HTMLAnchorElement).style.color = "#1A1A1A";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.color = cat.accent;
                  }}
                >
                  {cat.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Block */}
      <section className="bg-[#2A2A2A] py-24">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="w-16 h-1 bg-hiviz mx-auto mb-8" />
          <h2 className="font-display text-5xl md:text-7xl text-white mb-8">
            Built for the People<br />
            <span className="text-hiviz">Who Build Everything</span>
          </h2>
          <p className="font-sans text-white/70 text-lg leading-relaxed mb-4">
            Blue Collar Bodega is the house. AJ's Snack Shack is the legend that lives inside it. We're not a corporate brand. We're a neighborhood store for working people — tradespeople, union workers, the ones who show up before the sun does and leave after it's gone.
          </p>
          <p className="font-sans text-white/70 text-lg leading-relaxed mb-12">
            No fluff. No corporate speak. Just real gear, real snacks, and real respect for the trades.
          </p>
          <Link
            to="/about"
            className="font-condensed font-bold text-sm tracking-widest uppercase border-2 border-white/40 text-white/70 py-3 px-8 hover:border-hiviz hover:text-hiviz transition-colors"
          >
            Our Story
          </Link>
        </div>
      </section>

      {/* AJ's Snack Shack Feature Banner */}
      <section className="bg-hiviz py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-condensed text-[#1A1A1A] text-sm tracking-[0.3em] uppercase mb-2">little shack. BIG IMPACT.</p>
            <h2 className="font-display text-4xl md:text-6xl text-[#1A1A1A]">AJ's Snack Shack</h2>
            <p className="font-sans text-[#1A1A1A]/70 text-base mt-2">The snack shack that shows up for the people who show up every day.</p>
          </div>
          <Link
            to="/products?collection=ajs-snack-shack"
            className="shrink-0 bg-[#1A1A1A] text-hiviz font-condensed font-bold text-lg tracking-widest uppercase px-10 py-4 hover:bg-[#2A2A2A] transition-colors"
          >
            Shop AJ's
          </Link>
        </div>
      </section>
    </>
  );
};

export default FeaturedSection;
