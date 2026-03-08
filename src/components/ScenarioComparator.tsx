import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Scenario {
  label: string;
  description: string;
  keyMetric: string;
  metricLabel: string;
  trend: "up" | "down" | "neutral";
  highlight?: boolean;
}

interface ScenarioComparatorProps {
  title?: string;
  scenarios: Scenario[];
}

const trendIcon = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

const trendColor = {
  up: "text-urgency-high",
  down: "text-accent",
  neutral: "text-muted-foreground",
};

const ScenarioComparator = ({ title = "Compare Futures", scenarios }: ScenarioComparatorProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="rounded-lg border border-border bg-card p-6"
    >
      <h2 className="mb-5 font-display text-lg font-semibold text-foreground">{title}</h2>

      <div className="grid gap-3 sm:grid-cols-3">
        {scenarios.map((s, i) => {
          const TrendIcon = trendIcon[s.trend];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className={`relative rounded border p-5 transition-colors ${
                s.highlight
                  ? "border-accent/50 bg-accent/5"
                  : "border-border bg-secondary/30"
              }`}
              style={s.highlight ? { boxShadow: "var(--shadow-glow-accent)" } : {}}
            >
              {s.highlight && (
                <span className="absolute -top-2.5 left-4 rounded bg-accent px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-accent-foreground">
                  Recommended
                </span>
              )}
              <h3 className="mb-2 font-display text-sm font-semibold text-foreground">{s.label}</h3>
              <p className="mb-4 text-xs leading-relaxed text-muted-foreground">{s.description}</p>
              
              <div className="border-t border-border pt-3">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {s.metricLabel}
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <TrendIcon className={`h-4 w-4 ${trendColor[s.trend]}`} />
                  <span className="font-display text-2xl font-bold text-foreground">{s.keyMetric}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default ScenarioComparator;
