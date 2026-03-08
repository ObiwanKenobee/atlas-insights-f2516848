import { motion } from "framer-motion";
import { Users, HeartPulse, Thermometer, Briefcase, ShieldAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ImpactMetric {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
  severity: "critical" | "high" | "medium" | "low";
}

interface HumanImpactPanelProps {
  narrative: string;
  metrics: ImpactMetric[];
}

const severityBorder: Record<string, string> = {
  critical: "border-l-urgency-critical",
  high: "border-l-urgency-high",
  medium: "border-l-urgency-medium",
  low: "border-l-urgency-low",
};

const HumanImpactPanel = ({ narrative, metrics }: HumanImpactPanelProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-lg border border-border bg-card p-6"
    >
      <h2 className="mb-2 font-display text-lg font-semibold text-foreground">Human Impact</h2>
      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{narrative}</p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className={`rounded border border-border border-l-2 ${severityBorder[m.severity]} bg-secondary/40 p-4`}
            >
              <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                <Icon className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-widest">{m.label}</span>
              </div>
              <p className="font-display text-xl font-semibold text-foreground">{m.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{m.detail}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export { HumanImpactPanel };
export type { ImpactMetric };
export { Users, HeartPulse, Thermometer, Briefcase, ShieldAlert };
export default HumanImpactPanel;
