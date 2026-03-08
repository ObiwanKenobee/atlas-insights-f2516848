import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";

interface EvidenceItem {
  label: string;
  source: string;
  detail: string;
  confidence: "high" | "medium" | "low";
}

interface EvidenceDrawerProps {
  items: EvidenceItem[];
  assumptions?: string[];
  blindSpots?: string[];
}

const confBadge: Record<string, string> = {
  high: "bg-confidence-high/20 text-confidence-high",
  medium: "bg-confidence-medium/20 text-confidence-medium",
  low: "bg-confidence-low/20 text-confidence-low",
};

const EvidenceDrawer = ({ items, assumptions, blindSpots }: EvidenceDrawerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="rounded-lg border border-border bg-card"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-secondary/30"
      >
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground">Evidence & Uncertainty</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {items.length} sources · {assumptions?.length ?? 0} assumptions · {blindSpots?.length ?? 0} blind spots
          </p>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-6 border-t border-border px-6 pb-6 pt-4">
              {/* Sources */}
              <div>
                <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Data sources
                </span>
                <div className="space-y-2">
                  {items.map((item, i) => (
                    <div key={i} className="flex items-start justify-between rounded border border-border bg-secondary/30 p-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{item.label}</span>
                          <span className={`rounded px-1.5 py-0.5 font-mono text-[9px] uppercase ${confBadge[item.confidence]}`}>
                            {item.confidence}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                      </div>
                      <div className="ml-3 flex items-center gap-1 text-xs text-muted-foreground">
                        <ExternalLink className="h-3 w-3" />
                        <span className="font-mono">{item.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assumptions */}
              {assumptions && assumptions.length > 0 && (
                <div>
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Assumptions
                  </span>
                  <ul className="space-y-1">
                    {assumptions.map((a, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="mt-1 text-urgency-medium">⚠</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Blind spots */}
              {blindSpots && blindSpots.length > 0 && (
                <div>
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Blind spots
                  </span>
                  <ul className="space-y-1">
                    {blindSpots.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="mt-1 text-urgency-critical">●</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default EvidenceDrawer;
