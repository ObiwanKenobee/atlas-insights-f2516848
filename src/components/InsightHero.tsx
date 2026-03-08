import { motion } from "framer-motion";

type UrgencyLevel = "critical" | "high" | "medium" | "low";
type ConfidenceLevel = "high" | "medium" | "low";

interface InsightHeroProps {
  narrative: string;
  urgency: UrgencyLevel;
  affected: string;
  timeHorizon: string;
  confidence: ConfidenceLevel;
  recommendedAction?: string;
}

const urgencyConfig: Record<UrgencyLevel, { label: string; className: string }> = {
  critical: { label: "CRITICAL", className: "bg-urgency-critical/20 text-urgency-critical border-urgency-critical/40" },
  high: { label: "HIGH", className: "bg-urgency-high/20 text-urgency-high border-urgency-high/40" },
  medium: { label: "MEDIUM", className: "bg-urgency-medium/20 text-urgency-medium border-urgency-medium/40" },
  low: { label: "LOW", className: "bg-urgency-low/20 text-urgency-low border-urgency-low/40" },
};

const confidenceConfig: Record<ConfidenceLevel, { label: string; className: string; width: string }> = {
  high: { label: "High confidence", className: "bg-confidence-high", width: "w-4/5" },
  medium: { label: "Medium confidence", className: "bg-confidence-medium", width: "w-3/5" },
  low: { label: "Low confidence", className: "bg-confidence-low", width: "w-2/5" },
};

const InsightHero = ({ narrative, urgency, affected, timeHorizon, confidence, recommendedAction }: InsightHeroProps) => {
  const urg = urgencyConfig[urgency];
  const conf = confidenceConfig[confidence];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-lg border border-border bg-card p-8"
      style={{ boxShadow: "var(--shadow-glow-primary)" }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 opacity-50" style={{ background: "var(--gradient-urgency)" }} />
      
      <div className="relative z-10">
        {/* Top bar: urgency + confidence + time */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1 font-mono text-xs font-medium tracking-wider ${urg.className}`}>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-current animate-pulse-slow" />
            {urg.label}
          </span>
          <span className="font-mono text-xs text-muted-foreground">{timeHorizon}</span>
          <span className="ml-auto font-mono text-xs text-muted-foreground">{conf.label}</span>
        </div>

        {/* Main narrative */}
        <h1 className="mb-4 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {narrative}
        </h1>

        {/* Affected + confidence bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">Affects</span>
            <span className="mt-1 block font-display text-lg font-medium text-foreground">{affected}</span>
          </div>
          <div className="w-full max-w-[200px]">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Confidence</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.3 }}
                className={`h-full rounded-full ${conf.width} ${conf.className}`}
                style={{ maxWidth: conf.width === "w-4/5" ? "80%" : conf.width === "w-3/5" ? "60%" : "40%" }}
              />
            </div>
          </div>
        </div>

        {/* Recommended action */}
        {recommendedAction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="rounded border border-primary/20 bg-primary/5 px-4 py-3"
          >
            <span className="mr-2 font-mono text-[10px] uppercase tracking-widest text-primary">Recommended action</span>
            <p className="mt-1 text-sm text-foreground">{recommendedAction}</p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default InsightHero;
