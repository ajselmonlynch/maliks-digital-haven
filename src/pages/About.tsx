import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#1A1A1A]">
      <Navigation />
      <main className="flex-1 pt-24">
        {/* Header */}
        <section className="bg-[#2A2A2A] py-20 border-b border-[#333]">
          <div className="container mx-auto px-6 max-w-4xl">
            <p className="font-condensed text-hiviz text-sm tracking-[0.3em] uppercase mb-4">Who We Are</p>
            <h1 className="font-display text-6xl md:text-8xl text-white leading-none mb-6">
              Blue Collar<br /><span className="text-hiviz">Bodega</span>
            </h1>
            <p className="font-condensed text-xl text-white/60 tracking-wide">
              Foxboro, MA — Built for the Working Class
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="w-16 h-1 bg-hiviz mb-12" />
            <p className="font-sans text-white/80 text-lg leading-relaxed mb-8">
              Blue Collar Bodega is the house. It's where the gear lives, where the snacks come from, and where the culture gets built. We're not a corporate brand. We don't have a marketing department. We have a mission: show up for the people who show up every day.
            </p>
            <p className="font-sans text-white/80 text-lg leading-relaxed mb-8">
              AJ's Snack Shack is the legend that lives inside the Bodega. It started on job sites — construction sites, union halls, the places you can only get into with a card in your wallet. It sells exotic international snacks to tradespeople who deserve better than a vending machine. It's community first. Always.
            </p>
            <p className="font-sans text-white/80 text-lg leading-relaxed mb-16">
              The apparel came from the same place. Real phrases. Real people. No corporate speak, no forced inspiration. Just the things you actually say on a job site, printed on gear that holds up to the work.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#2A2A2A] pt-16">
              {[
                { label: "The House", value: "Blue Collar Bodega" },
                { label: "The Legend", value: "AJ's Snack Shack" },
                { label: "The Base", value: "Foxboro, MA" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-condensed text-xs tracking-[0.3em] uppercase text-white/40 mb-2">{item.label}</p>
                  <p className="font-display text-2xl text-hiviz">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-hiviz py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-5xl text-[#1A1A1A] mb-6">little shack. BIG IMPACT.</h2>
            <Link
              to="/products"
              className="inline-block bg-[#1A1A1A] text-hiviz font-condensed font-bold text-lg tracking-widest uppercase px-10 py-4 hover:bg-[#2A2A2A] transition-colors"
            >
              Shop the Bodega
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
