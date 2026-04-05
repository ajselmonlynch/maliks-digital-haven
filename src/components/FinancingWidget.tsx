import { useState } from "react";
import { Link } from "react-router-dom";
import { CreditCard, CheckCircle, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/products";

interface FinancingWidgetProps {
  price: number;
  productName: string;
}

const TERMS = [
  { months: 12, apr: 0, label: "12 months", badge: "0% APR" },
  { months: 24, apr: 0, label: "24 months", badge: "0% APR" },
  { months: 36, apr: 5.99, label: "36 months", badge: "5.99% APR" },
  { months: 60, apr: 7.99, label: "60 months", badge: "7.99% APR" },
];

function calcMonthly(price: number, months: number, apr: number): number {
  if (apr === 0) return price / months;
  const r = apr / 12 / 100;
  return price * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

const FinancingWidget = ({ price, productName }: FinancingWidgetProps) => {
  const [selectedTerm, setSelectedTerm] = useState(0);

  if (price < 2000) return null;

  const term = TERMS[selectedTerm];
  const monthly = calcMonthly(price, term.months, term.apr);
  const totalCost = monthly * term.months;
  const interestPaid = totalCost - price;

  return (
    <div className="border border-border rounded-sm overflow-hidden">
      {/* Header */}
      <div className="bg-secondary/60 px-5 py-3.5 border-b border-border flex items-center gap-3">
        <CreditCard size={15} className="text-primary shrink-0" />
        <div>
          <p className="text-sm font-semibold text-foreground">Financing Available</p>
          <p className="text-xs text-muted-foreground">
            Subject to credit approval · Powered by Klarna &amp; Affirm
          </p>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Term selector */}
        <div>
          <p className="text-xs text-muted-foreground mb-3 font-medium">Select a payment term:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TERMS.map((t, i) => (
              <button
                key={t.months}
                onClick={() => setSelectedTerm(i)}
                className={`py-2.5 px-3 border rounded-sm text-center transition-all ${
                  selectedTerm === i
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40"
                }`}
              >
                <span className="block font-mono text-xs font-semibold">{t.label}</span>
                <span
                  className={`block font-mono text-[10px] mt-0.5 ${
                    t.apr === 0 ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {t.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Monthly payment display */}
        <div className="bg-secondary/40 rounded-sm px-5 py-4 flex items-baseline justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Monthly payment</p>
            <p className="font-mono text-3xl font-bold text-foreground mt-0.5">
              {formatPrice(monthly)}
              <span className="text-sm text-muted-foreground font-normal">/mo</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Over {term.months} months</p>
            {interestPaid > 0 && (
              <p className="font-mono text-xs text-muted-foreground mt-0.5">
                Total: {formatPrice(totalCost)}
              </p>
            )}
            {interestPaid === 0 && (
              <p className="font-mono text-xs text-primary mt-0.5 flex items-center gap-1 justify-end">
                <CheckCircle size={10} />
                No interest
              </p>
            )}
          </div>
        </div>

        {/* Benefits */}
        <ul className="space-y-1.5">
          {[
            "No hard credit pull to check your rate",
            "Instant approval decisions",
            "Pay off early with no penalty",
          ].map((b) => (
            <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle size={11} className="text-primary shrink-0" />
              {b}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          className="w-full btn-primary-glow font-semibold tracking-wide"
          asChild
        >
          <Link to="/financing">
            Check My Rate — No Credit Impact <ArrowRight className="ml-2" size={14} />
          </Link>
        </Button>

        <p className="flex items-start gap-1.5 text-[10px] text-muted-foreground leading-relaxed">
          <Info size={10} className="shrink-0 mt-0.5" />
          Rates shown are estimates. Actual APR depends on creditworthiness. {productName} financing
          available through Klarna and Affirm at checkout.
        </p>
      </div>
    </div>
  );
};

export default FinancingWidget;
