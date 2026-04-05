import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, AlertCircle, CheckCircle, Mail } from "lucide-react";

const MapPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Header */}
          <div className="mb-12">
            <span className="section-label mb-3 block">Legal</span>
            <h1 className="text-3xl font-bold text-foreground mb-3">
              Minimum Advertised Price (MAP) Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 1, 2025 · SolarCore Systems LLC · Boston, MA
            </p>
          </div>

          <div className="border-l-2 border-primary/30 pl-6 mb-10 py-1">
            <p className="text-sm text-muted-foreground leading-relaxed">
              SolarCore Systems LLC operates as an authorized dealer for all brands carried on this
              platform. As a condition of our dealer agreements, we are bound by Minimum Advertised
              Price (MAP) policies established by each brand.
            </p>
          </div>

          {/* Dealer badge */}
          <div className="flex items-start gap-4 p-5 border border-primary/20 bg-primary/5 rounded-sm mb-10">
            <Shield size={20} className="text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">Authorized Dealer Status</p>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                SolarCore Systems is an authorized dealer, which means we purchase directly from
                manufacturers and authorized distributors. All products sold are genuine, covered under
                original manufacturer warranty, and backed by our dealer support.
              </p>
            </div>
          </div>

          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-foreground mb-3">What is MAP?</h2>
              <p>
                MAP (Minimum Advertised Price) is the lowest price at which an authorized dealer is
                permitted to <em>advertise</em> a product publicly. MAP policies are established by
                manufacturers to:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1.5 pl-2">
                <li>Protect the perceived value of their products</li>
                <li>Ensure authorized dealers can operate sustainable businesses</li>
                <li>Prevent race-to-the-bottom pricing that harms the customer experience</li>
                <li>Fund ongoing R&amp;D, warranty service, and technical support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">Our Compliance Commitment</h2>
              <div className="space-y-3">
                {[
                  "All listed prices on SolarCore Systems are at or above MAP for each product.",
                  "We do not advertise prices below MAP on any channel, including social media, email, or marketplaces.",
                  "Promotional discounts, if offered, comply with brand-specific promotional windows and authorization.",
                  "Bundle pricing reflects individual product MAP values and does not undercut MAP for individual items.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle size={13} className="text-primary shrink-0 mt-0.5" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">
                Reporting MAP Violations
              </h2>
              <div className="flex items-start gap-3 p-4 border border-border bg-card rounded-sm">
                <AlertCircle size={15} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p>
                    If you encounter a seller advertising below MAP for any product we carry, we
                    encourage you to report it. Unauthorized sellers may be selling counterfeit
                    products or gray-market inventory without manufacturer warranty coverage.
                  </p>
                  <p className="mt-2">
                    <strong className="text-foreground">Report violations to:</strong>{" "}
                    <a href="mailto:compliance@solarcoresystems.com" className="text-primary hover:underline">
                      compliance@solarcoresystems.com
                    </a>
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">Customer Savings Options</h2>
              <p>
                While we cannot advertise below MAP, we <em>can</em> provide value in other ways:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1.5 pl-2">
                <li>0% APR financing on qualifying orders (subject to credit approval)</li>
                <li>Free residential freight on orders $3,000+</li>
                <li>Expert consultation at no charge before or after purchase</li>
                <li>Volume discounts for commercial purchasers — contact us directly</li>
              </ul>
              <p className="mt-3">
                For volume pricing and commercial quotes:{" "}
                <a href="tel:+16175550199" className="text-primary hover:underline">(617) 555-0199</a>
                {" "}or{" "}
                <a href="mailto:sales@solarcoresystems.com" className="text-primary hover:underline">
                  sales@solarcoresystems.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MapPolicy;
