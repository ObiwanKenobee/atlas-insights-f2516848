import { motion } from "framer-motion";
import { Activity, MapPin, Clock, Shield } from "lucide-react";

interface TopBarProps {
  location: string;
  timeframe: string;
  scenario: string;
  systemStatus: "nominal" | "elevated" | "critical";
}

const statusConfig = {
  nominal: { label: "NOMINAL", className: "text-accent" },
  elevated: { label: "ELEVATED", className: "text-urgency-medium" },
  critical: { label: "CRITICAL", className: "text-urgency-critical animate-pulse-slow" },
};

const TopBar = ({ location, timeframe, scenario, systemStatus }: TopBarProps) => {
  const status = statusConfig[systemStatus];

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card/80 px-6 py-3 backdrop-blur-sm"
    >
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-primary/10">
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <span className="font-display text-sm font-bold tracking-wide text-foreground">ATLAS</span>
        </div>

        <div className="hidden h-4 w-px bg-border sm:block" />

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3" />
            <span className="font-mono">{location}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            <span className="font-mono">{timeframe}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="h-3 w-3" />
            <span className="font-mono">{scenario}</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className={`font-mono text-[10px] font-medium uppercase tracking-widest ${status.className}`}>
          ● {status.label}
        </span>
      </div>
    </motion.header>
  );
};

export default TopBar;
