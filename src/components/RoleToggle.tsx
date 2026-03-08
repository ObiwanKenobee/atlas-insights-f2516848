import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Role = "minister" | "mayor" | "analyst" | "citizen";

interface RoleBriefing {
  summary: string;
  focusAreas: string[];
}

interface RoleToggleProps {
  briefings: Record<Role, RoleBriefing>;
}

const roleLabels: Record<Role, { label: string; subtitle: string }> = {
  minister: { label: "Minister", subtitle: "National strategy" },
  mayor: { label: "Mayor", subtitle: "City operations" },
  analyst: { label: "Analyst", subtitle: "Data & methods" },
  citizen: { label: "Citizen", subtitle: "Daily life impact" },
};

const roles: Role[] = ["minister", "mayor", "analyst", "citizen"];

const RoleToggle = ({ briefings }: RoleToggleProps) => {
  const [active, setActive] = useState<Role>("mayor");
  const briefing = briefings[active];

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="rounded-lg border border-border bg-card p-6"
    >
      <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Adaptive Briefing</h2>

      {/* Role selector */}
      <div className="mb-5 flex gap-1 rounded-lg bg-secondary p-1">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setActive(role)}
            className={`relative flex-1 rounded-md px-3 py-2 text-center transition-colors ${
              active === role ? "" : "hover:bg-surface-elevated"
            }`}
          >
            {active === role && (
              <motion.div
                layoutId="activeRole"
                className="absolute inset-0 rounded-md bg-surface-elevated"
                transition={{ type: "spring", duration: 0.4 }}
              />
            )}
            <span className="relative z-10 block font-display text-xs font-medium text-foreground">
              {roleLabels[role].label}
            </span>
            <span className="relative z-10 block font-mono text-[9px] text-muted-foreground">
              {roleLabels[role].subtitle}
            </span>
          </button>
        ))}
      </div>

      {/* Briefing content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <p className="mb-4 text-sm leading-relaxed text-foreground">{briefing.summary}</p>
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Focus areas
            </span>
            {briefing.focusAreas.map((area, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">{area}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
};

export default RoleToggle;
