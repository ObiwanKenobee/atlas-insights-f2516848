import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, TrendingUp, TrendingDown, AlertTriangle, Minus } from "lucide-react";

interface InflectionPoint {
  date: string;
  label: string;
  description: string;
  impact: "critical" | "high" | "medium" | "low";
  direction: "up" | "down" | "stable";
  metric?: string;
}

const inflections: InflectionPoint[] = [
  {
    date: "Mar 2023",
    label: "Baseline canopy assessment",
    description:
      "Satellite assessment establishes 22% average canopy cover across western Nairobi districts. This becomes the reference point for subsequent loss tracking.",
    impact: "low",
    direction: "stable",
    metric: "22% canopy cover",
  },
  {
    date: "Aug 2023",
    label: "Construction permits surge",
    description:
      "County issues 340% more construction permits in Dagoretti North and Westlands compared to the previous quarter. This signals the start of rapid densification.",
    impact: "medium",
    direction: "up",
    metric: "+340% permits",
  },
  {
    date: "Jan 2024",
    label: "First heat anomaly detected",
    description:
      "Landsat 9 thermal bands detect a +2.1°C anomaly in Dagoretti North — the first statistically significant deviation from the 5-year urban baseline.",
    impact: "high",
    direction: "up",
    metric: "+2.1°C anomaly",
  },
  {
    date: "Jun 2024",
    label: "Canopy loss accelerates",
    description:
      "Tree cover in western districts drops below 15% for the first time. Loss rate doubles compared to 2023, driven by construction clearing and inadequate replanting.",
    impact: "high",
    direction: "down",
    metric: "15% → below threshold",
  },
  {
    date: "Nov 2024",
    label: "Clinic burden begins rising",
    description:
      "Nairobi County health data shows a 14% increase in heat-related clinic visits in Kibera and Mathare wards. Pattern correlates with thermal anomaly expansion.",
    impact: "high",
    direction: "up",
    metric: "+14% heat-related visits",
  },
  {
    date: "Mar 2025",
    label: "Ventilation corridors blocked",
    description:
      "Urban morphology analysis reveals 4 wards where building density has effectively eliminated natural airflow corridors. Heat trapping effect measured at +0.8°C additional anomaly.",
    impact: "medium",
    direction: "up",
    metric: "+0.8°C from blockage",
  },
  {
    date: "Jan 2026",
    label: "Major developments break ground",
    description:
      "Three large-scale construction projects begin in Q1 2026, triggering the most recent acceleration. Combined footprint removes an estimated 12,000 trees.",
    impact: "critical",
    direction: "up",
    metric: "12,000 trees removed",
  },
  {
    date: "Mar 2026",
    label: "Current state — compound heat crisis",
    description:
      "Heat anomaly reaches +4.2°C in low-canopy corridors. 1.2M residents affected. System flags this as a compound risk requiring multi-sector intervention.",
    impact: "critical",
    direction: "up",
    metric: "+4.2°C peak anomaly",
  },
];

const impactColors: Record<string, string> = {
  critical: "var(--urgency-critical)",
  high: "var(--urgency-high)",
  medium: "var(--urgency-medium)",
  low: "var(--urgency-low)",
};

const impactBadgeClass: Record<string, string> = {
  critical: "bg-urgency-critical/20 text-urgency-critical",
  high: "bg-urgency-high/20 text-urgency-high",
  medium: "bg-urgency-medium/20 text-urgency-medium",
  low: "bg-urgency-low/20 text-urgency-low",
};

const DirectionIcon = ({ direction }: { direction: string }) => {
  if (direction === "up") return <TrendingUp className="h-3.5 w-3.5" />;
  if (direction === "down") return <TrendingDown className="h-3.5 w-3.5" />;
  return <Minus className="h-3.5 w-3.5" />;
};

const InflectionTimeline = () => {
  const [selected, setSelected] = useState<number>(inflections.length - 1);
  const point = inflections[selected];

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="rounded-lg border border-border bg-card p-6"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground">
            System Inflection Timeline
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Key events that shifted heat exposure trajectory — click to inspect
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span className="font-mono">Mar 2023 — Mar 2026</span>
        </div>
      </div>

      {/* Timeline track */}
      <div className="relative mb-6">
        {/* Line */}
        <div className="absolute left-0 right-0 top-3 h-px bg-border" />

        {/* Points */}
        <div className="relative flex justify-between">
          {inflections.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="group relative flex flex-col items-center"
              style={{ flex: "1 1 0" }}
            >
              {/* Dot */}
              <motion.div
                className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors"
                style={{
                  borderColor:
                    i === selected
                      ? `hsl(${impactColors[p.impact]})`
                      : "hsl(var(--border))",
                  backgroundColor:
                    i === selected
                      ? `hsl(${impactColors[p.impact]} / 0.2)`
                      : "hsl(var(--card))",
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                {p.impact === "critical" && (
                  <AlertTriangle
                    className="h-2.5 w-2.5"
                    style={{ color: `hsl(${impactColors[p.impact]})` }}
                  />
                )}
                {p.impact !== "critical" && (
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor:
                        i <= selected
                          ? `hsl(${impactColors[p.impact]})`
                          : "hsl(var(--muted-foreground))",
                      opacity: i <= selected ? 1 : 0.3,
                    }}
                  />
                )}
              </motion.div>

              {/* Date label */}
              <span
                className={`mt-2 font-mono text-[8px] transition-colors sm:text-[9px] ${
                  i === selected
                    ? "text-foreground"
                    : "text-muted-foreground/60"
                }`}
              >
                {p.date}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="rounded-md border border-border bg-secondary/30 p-4"
        >
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className={`rounded px-1.5 py-0.5 font-mono text-[9px] uppercase ${impactBadgeClass[point.impact]}`}
            >
              {point.impact}
            </span>
            <div
              className="flex items-center gap-1 font-mono text-[10px]"
              style={{ color: `hsl(${impactColors[point.impact]})` }}
            >
              <DirectionIcon direction={point.direction} />
              {point.metric}
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">
              {point.date}
            </span>
          </div>

          <h3 className="mb-2 font-display text-sm font-semibold text-foreground">
            {point.label}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {point.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
};

export default InflectionTimeline;
