import type { TechSpec } from "@/lib/products";
import { CheckCircle } from "lucide-react";

interface TechSpecsTableProps {
  specs: TechSpec[];
  productName: string;
}

const TechSpecsTable = ({ specs, productName }: TechSpecsTableProps) => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <span className="section-label">Technical Specifications</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="border border-border rounded-sm overflow-hidden">
        <div className="bg-secondary/60 px-4 py-3 border-b border-border">
          <p className="font-mono text-xs text-muted-foreground tracking-wide">
            {productName} — Full Spec Sheet
          </p>
        </div>

        <table className="w-full text-sm" aria-label={`${productName} specifications`}>
          <tbody>
            {specs.map((spec, i) => (
              <tr
                key={spec.label}
                className={`border-b border-border last:border-0 ${
                  spec.highlight
                    ? "bg-primary/5"
                    : i % 2 === 0
                    ? "bg-card"
                    : "bg-secondary/20"
                }`}
              >
                <td className="px-4 py-3 text-muted-foreground font-medium w-1/2 align-top">
                  {spec.label}
                </td>
                <td className="px-4 py-3 font-mono font-semibold text-foreground w-1/2">
                  <span className="flex items-center gap-2">
                    {spec.highlight && (
                      <CheckCircle size={13} className="text-primary shrink-0" />
                    )}
                    {spec.value}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        * Specifications subject to change. Contact us for the latest datasheet.
      </p>
    </div>
  );
};

export default TechSpecsTable;
