import { CheckCircle, XCircle, Minus } from "lucide-react";

interface ComparisonRow {
  feature: string;
  ours: string | boolean;
  retail: string | boolean;
  highlight?: boolean;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: "Battery Chemistry", ours: "LiFePO₄ (LFP)", retail: "NMC / Lead-Acid", highlight: true },
  { feature: "Cycle Life", ours: "6,000+ cycles", retail: "300–800 cycles", highlight: true },
  { feature: "Round-Trip Efficiency", ours: "≥98.5%", retail: "70–85%", highlight: true },
  { feature: "Thermal Runaway Risk", ours: "Minimal (LFP stable)", retail: "High (NMC)", highlight: true },
  { feature: "Operating Temp Range", ours: "-20°C to 55°C", retail: "0°C to 35°C", highlight: false },
  { feature: "Warranty", ours: "5 years battery", retail: "1–2 years", highlight: false },
  { feature: "UL / NEC Certified", ours: true, retail: false, highlight: true },
  { feature: "MPPT Charge Controller", ours: "Built-in 80A", retail: "PWM only / extra cost", highlight: false },
  { feature: "Scalable Stacking", ours: "Up to 30kWh", retail: "Fixed capacity", highlight: false },
  { feature: "Freight Delivery Included", ours: "Residential LTL", retail: "Pickup only / extra", highlight: false },
  { feature: "Expert Setup Support", ours: true, retail: false, highlight: false },
  { feature: "MAP Price Compliance", ours: true, retail: false, highlight: false },
];

function Cell({ val }: { val: string | boolean }) {
  if (typeof val === "boolean") {
    return val ? (
      <CheckCircle size={16} className="text-primary mx-auto" />
    ) : (
      <XCircle size={16} className="text-destructive/70 mx-auto" />
    );
  }
  return <span>{val}</span>;
}

const ComparisonModule = () => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <span className="section-label">Why SolarCore?</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="border border-border rounded-sm overflow-hidden">
        {/* Column headers */}
        <div className="grid grid-cols-3 border-b border-border bg-secondary/60">
          <div className="px-4 py-3 text-xs font-medium text-muted-foreground">Feature</div>
          <div className="px-4 py-3 text-center">
            <p className="font-mono text-sm font-bold text-primary">SolarCore Systems</p>
            <p className="font-mono text-[10px] text-muted-foreground">Authorized Dealer · MAP Compliant</p>
          </div>
          <div className="px-4 py-3 text-center">
            <p className="font-mono text-sm font-semibold text-muted-foreground">Cheap Retail</p>
            <p className="font-mono text-[10px] text-muted-foreground">Amazon / Big Box Stores</p>
          </div>
        </div>

        {/* Rows */}
        {COMPARISON_ROWS.map((row, i) => (
          <div
            key={row.feature}
            className={`grid grid-cols-3 border-b border-border last:border-0 ${
              row.highlight
                ? "bg-primary/5"
                : i % 2 === 0
                ? "bg-card"
                : "bg-secondary/20"
            }`}
          >
            <div className="px-4 py-3 text-sm text-muted-foreground font-medium flex items-center">
              {row.feature}
              {row.highlight && (
                <span className="ml-2 w-1 h-1 rounded-full bg-primary inline-block" />
              )}
            </div>
            <div className="px-4 py-3 text-sm font-mono font-semibold text-foreground text-center flex items-center justify-center">
              <Cell val={row.ours} />
            </div>
            <div className="px-4 py-3 text-sm font-mono text-muted-foreground text-center flex items-center justify-center">
              <Cell val={row.retail} />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Comparison based on publicly available product specifications. Retail category includes
        common Amazon and big-box listings as of 2025.
      </p>
    </div>
  );
};

export default ComparisonModule;
