import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ConsultationCTA from "@/components/ConsultationCTA";
import { Button } from "@/components/ui/button";
import { CreditCard, CheckCircle, ArrowRight, Phone, Shield, Info } from "lucide-react";
import { getSEOMeta } from "@/lib/seo";

const PLANS = [
  {
    name: "Klarna",
    tagline: "Buy Now, Pay Later",
    options: ["Pay in 4 (0% interest)", "6-month financing", "12-month financing (0% promo)"],
    minOrder: 500,
    badge: "Most Popular",
  },
  {
    name: "Affirm",
    tagline: "Monthly Installment Loans",
    options: ["12–60 month terms", "Rates from 0% APR", "Soft credit check to apply"],
    minOrder: 1000,
    badge: null,
  },
  {
    name: "Commercial Lease",
    tagline: "For Businesses & Cultivators",
    options: ["$0 down options available", "Section 179 tax deduction eligible", "24–60 month terms"],
    minOrder: 5000,
    badge: "Best for Commercial",
  },
];

const FAQS = [
  {
    q: "Does applying affect my credit score?",
    a: "No. Checking your rate with Klarna or Affirm uses a soft credit inquiry that does not impact your credit score. A hard pull only occurs if you proceed to finalize financing.",
  },
  {
    q: "What is the minimum order for financing?",
    a: "Klarna's Pay in 4 is available on orders from $500. Affirm monthly plans start at $1,000. Commercial lease financing requires a minimum of $5,000.",
  },
  {
    q: "Can I pay off early?",
    a: "Yes. Both Klarna and Affirm allow early payoff with no prepayment penalty.",
  },
  {
    q: "Is my purchase eligible for tax credits?",
    a: "Solar energy equipment may qualify for the Federal Investment Tax Credit (ITC) and Massachusetts state solar incentives. Commercial equipment may qualify for Section 179 deduction. Consult your tax professional for specifics.",
  },
];

const Financing = () => {
  useEffect(() => {
    const meta = getSEOMeta("financing");
    document.title = meta.title;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ConsultationCTA />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <span className="section-label mb-3 block">Financing</span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              0% Financing Available
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Don't let upfront cost stand between you and energy independence.
              Flexible payment options available for orders $500 and up.
            </p>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="relative flex flex-col p-6 border border-border bg-card rounded-sm"
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-4 font-mono text-[10px] uppercase px-2 py-0.5 bg-primary text-primary-foreground">
                    {plan.badge}
                  </span>
                )}
                <p className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">
                  {plan.tagline}
                </p>
                <h3 className="text-xl font-bold text-foreground mb-4">{plan.name}</h3>
                <ul className="space-y-2 flex-1">
                  {plan.options.map((opt) => (
                    <li key={opt} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle size={13} className="text-primary shrink-0 mt-0.5" />
                      {opt}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">
                  Min. order: <span className="font-mono font-semibold text-foreground">${plan.minOrder.toLocaleString()}</span>
                </p>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="mb-14">
            <span className="section-label mb-6 block">How It Works</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Add to Cart", desc: "Build your system and proceed to checkout." },
                { step: "02", title: "Select Financing", desc: "Choose Klarna or Affirm at checkout. Soft check only." },
                { step: "03", title: "Instant Decision", desc: "Receive approval in seconds. System ships same week." },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-4">
                  <span className="font-mono text-2xl font-bold text-primary/40 shrink-0">{s.step}</span>
                  <div>
                    <p className="font-semibold text-foreground">{s.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-14">
            <span className="section-label mb-6 block">FAQ</span>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div key={faq.q} className="border border-border rounded-sm p-5 bg-card">
                  <p className="font-semibold text-foreground mb-2">{faq.q}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 items-center p-8 border border-border bg-card rounded-sm">
            <CreditCard size={24} className="text-primary shrink-0" />
            <div className="flex-1 text-center sm:text-left">
              <p className="font-semibold text-foreground">Ready to check your rate?</p>
              <p className="text-sm text-muted-foreground mt-0.5">No credit impact · Instant decision · 0% APR options</p>
            </div>
            <div className="flex gap-3">
              <Button className="btn-primary-glow font-semibold" asChild>
                <Link to="/products">
                  Shop Now <ArrowRight className="ml-2" size={14} />
                </Link>
              </Button>
              <Button variant="outline" className="border-border hover:border-primary hover:text-primary" asChild>
                <a href="tel:+16175550199">
                  <Phone size={13} className="mr-2" />
                  Call Us
                </a>
              </Button>
            </div>
          </div>

          <p className="mt-6 text-xs text-muted-foreground flex items-start gap-1.5 leading-relaxed">
            <Info size={11} className="shrink-0 mt-0.5" />
            Financing subject to credit approval. Rates and terms vary by lender and creditworthiness.
            0% APR offers available for qualifying applicants during promotional periods only.
            SolarCore Systems LLC does not provide financial advice.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Financing;
