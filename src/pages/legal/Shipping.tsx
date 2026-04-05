import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Truck, Package, AlertTriangle, Phone, Clock, MapPin } from "lucide-react";

const Section = ({ title, icon: Icon, children }: {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}) => (
  <section className="mb-10">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-primary/10 rounded-sm shrink-0">
        <Icon size={15} className="text-primary" />
      </div>
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
    </div>
    <div className="pl-10 text-sm text-muted-foreground leading-relaxed space-y-3">
      {children}
    </div>
  </section>
);

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Header */}
          <div className="mb-12">
            <span className="section-label mb-3 block">Legal</span>
            <h1 className="text-3xl font-bold text-foreground mb-3">Shipping & Freight Policy</h1>
            <p className="text-muted-foreground">
              Last updated: January 1, 2025 · SolarCore Systems LLC · Boston, MA
            </p>
          </div>

          <div className="border-l-2 border-primary/30 pl-6 mb-10 py-1">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Because we sell high-weight, commercial-grade equipment — including LFP battery systems,
              solar panels, and grow infrastructure — our shipping process differs from standard
              parcel carriers. Please read this policy in full before placing your order.
            </p>
          </div>

          <Section title="Freight & LTL Shipping" icon={Truck}>
            <p>
              Most items weighing over 150 lbs ship via <strong className="text-foreground">LTL (Less-Than-Truckload)
              freight</strong>. This includes all battery systems, inverter/charger combos, solar panel
              pallets, and complete bundles.
            </p>
            <p>
              LTL delivery timelines are typically <strong className="text-foreground">5–10 business days</strong> after
              shipment. We work with regional freight carriers across New England to minimize transit time.
            </p>
            <p>
              <strong className="text-foreground">Residential delivery:</strong> A liftgate fee applies to residential
              deliveries unless otherwise stated. Orders over $3,000 include complimentary residential
              curbside liftgate delivery. You will receive a scheduling call from the freight carrier before
              delivery.
            </p>
          </Section>

          <Section title="Free Freight Threshold" icon={Package}>
            <p>
              Orders with a subtotal of <strong className="text-foreground">$3,000 or more</strong> qualify
              for free residential curbside freight delivery within the contiguous United States.
            </p>
            <p>
              Orders below $3,000 will receive a freight shipping quote at checkout based on weight,
              dimensions, and delivery ZIP code.
            </p>
            <p>
              <strong className="text-foreground">Alaska, Hawaii, and US Territories</strong> require
              custom freight quotes and are not eligible for free freight.
            </p>
          </Section>

          <Section title="Hazardous Materials (LFP Batteries)" icon={AlertTriangle}>
            <p>
              Lithium Iron Phosphate (LFP) battery systems are classified as hazardous materials for
              shipping purposes. All batteries are shipped in UN-approved, hazmat-compliant packaging
              and labeled accordingly.
            </p>
            <p>
              By law, LFP batteries cannot be shipped via air freight. All battery orders ship via
              ground LTL only. This applies to all battery modules, battery bundles, and systems
              containing battery storage.
            </p>
            <p>
              <strong className="text-foreground">Important:</strong> Recipient must be an adult (18+)
              to sign for hazmat shipments. No unattended delivery for battery systems.
            </p>
          </Section>

          <Section title="Order Processing Timeline" icon={Clock}>
            <p>Orders are processed Monday through Friday, 9 AM – 5 PM EST (excluding holidays).</p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>In-stock items: Ships within <strong className="text-foreground">3–5 business days</strong></li>
              <li>Made-to-order or configured systems: Ships within <strong className="text-foreground">7–14 business days</strong></li>
              <li>Battery pre-orders: Estimated ship dates communicated at time of order</li>
            </ul>
          </Section>

          <Section title="Delivery & Inspection" icon={MapPin}>
            <p>
              Upon delivery, <strong className="text-foreground">inspect all packages immediately</strong> before
              signing the freight bill. If any damage is visible:
            </p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Note the damage on the freight bill before signing</li>
              <li>Take photos of the damaged packaging and product</li>
              <li>Contact us within <strong className="text-foreground">48 hours</strong> at
                &nbsp;<a href="tel:+16175550199" className="text-primary hover:underline">(617) 555-0199</a>
              </li>
            </ul>
            <p>
              Failure to document damage at delivery may void your freight damage claim.
            </p>
          </Section>

          <Section title="Contact & Questions" icon={Phone}>
            <p>For freight quotes, delivery scheduling, or shipping questions:</p>
            <ul className="list-none space-y-1.5">
              <li>📞 <a href="tel:+16175550199" className="text-primary hover:underline">(617) 555-0199</a></li>
              <li>✉️ <a href="mailto:shipping@solarcoresystems.com" className="text-primary hover:underline">shipping@solarcoresystems.com</a></li>
              <li>📍 123 Industrial Way, Suite 4B · Boston, MA 02101</li>
            </ul>
          </Section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
