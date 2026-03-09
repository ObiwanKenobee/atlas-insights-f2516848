import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Check, AlertTriangle, Info, AlertCircle } from "lucide-react";
import { useAlerts, type Alert } from "@/hooks/useAlerts";

const severityConfig = {
  critical: {
    icon: AlertCircle,
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    text: "text-destructive",
    badge: "bg-destructive text-destructive-foreground",
  },
  high: {
    icon: AlertTriangle,
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    text: "text-orange-500",
    badge: "bg-orange-500 text-white",
  },
  medium: {
    icon: Info,
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    text: "text-yellow-500",
    badge: "bg-yellow-500 text-black",
  },
  low: {
    icon: Info,
    bg: "bg-muted",
    border: "border-border",
    text: "text-muted-foreground",
    badge: "bg-muted text-muted-foreground",
  },
};

interface AlertItemProps {
  alert: Alert;
  onDismiss: (id: string) => void;
  onResolve: (id: string) => void;
}

const AlertItem = ({ alert, onDismiss, onResolve }: AlertItemProps) => {
  const config = severityConfig[alert.severity] || severityConfig.medium;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0, y: -10 }}
      animate={{ opacity: 1, height: "auto", y: 0 }}
      exit={{ opacity: 0, height: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`rounded-lg border ${config.border} ${config.bg} p-3 sm:p-4`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 shrink-0 ${config.text}`}>
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span
              className={`shrink-0 rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${config.badge}`}
            >
              {alert.severity}
            </span>
            <span className="font-mono text-[9px] text-muted-foreground">
              {alert.alert_type}
            </span>
          </div>
          <h4 className="text-sm font-medium text-foreground">{alert.title}</h4>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {alert.message}
          </p>
        </div>
        <div className="flex shrink-0 gap-1">
          <button
            onClick={() => onResolve(alert.id)}
            className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            title="Mark as resolved"
          >
            <Check className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onDismiss(alert.id)}
            className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            title="Dismiss"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const AlertPanel = () => {
  const { data: alerts = [], isLoading, dismissAlert, resolveAlert } = useAlerts();
  const [isExpanded, setIsExpanded] = useState(true);

  const activeCount = alerts.length;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-lg border border-border bg-card overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4 text-left hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="h-5 w-5 text-foreground" />
            {activeCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                {activeCount}
              </span>
            )}
          </div>
          <div>
            <h2 className="font-display text-base font-semibold text-foreground">
              Active Alerts
            </h2>
            <p className="text-xs text-muted-foreground">
              {isLoading
                ? "Loading..."
                : activeCount === 0
                ? "No active alerts"
                : `${activeCount} alert${activeCount !== 1 ? "s" : ""} requiring attention`}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            className="h-5 w-5 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </button>

      {/* Alert List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 px-4 pb-4">
              <AnimatePresence mode="popLayout">
                {alerts.map((alert) => (
                  <AlertItem
                    key={alert.id}
                    alert={alert}
                    onDismiss={dismissAlert}
                    onResolve={resolveAlert}
                  />
                ))}
              </AnimatePresence>
              {activeCount === 0 && !isLoading && (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  All clear — no active alerts at this time.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default AlertPanel;
