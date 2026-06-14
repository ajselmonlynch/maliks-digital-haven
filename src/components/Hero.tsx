import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#1A1A1A] overflow-hidden pt-24">
      {/* Background texture stripes */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "repeating-linear-gradient(45deg, #F5E642 0px, #F5E642 1px, transparent 1px, transparent 20px)"
      }} />

      {/* Hi-vis accent bar top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-hiviz" />

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Eyebrow */}
        <p className="font-condensed text-hiviz text-sm tracking-[0.3em] uppercase mb-4">
          Foxboro, MA — Built for the Working Class
        </p>

        {/* Main headline */}
        <h1 className="font-display text-[clamp(4rem,15vw,12rem)] leading-none text-white uppercase mb-2">
          Blue Collar
        </h1>
        <h1 className="font-display text-[clamp(4rem,15vw,12rem)] leading-none text-hiviz uppercase mb-8">
          Bodega
        </h1>

        {/* Subheadline */}
        <p className="font-condensed text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12 tracking-wide">
          We show up for the people who show up every day.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="inline-block bg-hiviz text-[#1A1A1A] font-condensed font-bold text-lg tracking-widest uppercase px-10 py-4 hover:bg-white transition-colors"
          >
            Shop the Bodega
          </Link>
          <Link
            to="/products?collection=ajs-snack-shack"
            className="inline-block border-2 border-hiviz text-hiviz font-condensed font-bold text-lg tracking-widest uppercase px-10 py-4 hover:bg-hiviz hover:text-[#1A1A1A] transition-colors"
          >
            AJ's Snack Shack
          </Link>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-bodega-red" />
    </section>
  );
};

export default Hero;
