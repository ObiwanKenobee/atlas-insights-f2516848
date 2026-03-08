import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface Driver {
  label: string;
  type: "primary" | "secondary" | "amplifier" | "trigger";
  detail?: string;
}

interface CausalChainPanelProps {
  title?: string;
  drivers: Driver[];
  chain?: string[];
}

const typeStyles: Record<Driver["type"], { label: string; dot: string; border: string }> = {
  primary: { label: "PRIMARY DRIVER", dot: "bg-primary", border: "border-primary/30" },
  secondary: { label: "SECONDARY", dot: "bg-accent", border: "border-accent/30" },
  amplifier: { label: "AMPLIFIER", dot: "bg-urgency-medium", border: "border-urgency-medium/30" },
  trigger: { label: "TRIGGER", dot: "bg-urgency-high", border: "border-urgency-high/30" },
};

const CausalChainPanel = ({ title = "Why This Is Happening", drivers, chain }: CausalChainPanelProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-lg border border-border bg-card p-6"
    >
      <h2 className="mb-5 font-display text-lg font-semibold text-foreground">{title}</h2>

      {/* Driver cards */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        {drivers.map((d, i) => {
          const style = typeStyles[d.type];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`rounded border ${style.border} bg-secondary/50 p-4`}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {style.label}
                </span>
              </div>
              <p className="font-display text-sm font-medium text-foreground">{d.label}</p>
              {d.detail && <p className="mt-1 text-xs text-muted-foreground">{d.detail}</p>}
            </motion.div>
          );
        })}
      </div>

      {/* Causal chain flow */}
      {chain && chain.length > 0 && (
        <div>
          <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Causal chain
          </span>
          <div className="flex flex-wrap items-center gap-1">
            {chain.map((node, i) => (
              <div key={i} className="flex items-center gap-1">
                <span className="rounded bg-secondary px-3 py-1.5 font-mono text-xs text-foreground">
                  {node}
                </span>
                {i < chain.length - 1 && (
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default CausalChainPanel;
