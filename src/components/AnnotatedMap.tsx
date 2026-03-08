import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, Thermometer, TreePine, Building2 } from "lucide-react";

interface District {
  id: string;
  name: string;
  path: string;
  heatLevel: "critical" | "high" | "medium" | "low";
  population: string;
  canopyCover: string;
  heatAnomaly: string;
  coolingAccess: string;
  callout?: string;
  calloutPosition: { x: number; y: number };
  labelPosition: { x: number; y: number };
}

const districts: District[] = [
  {
    id: "dagoretti",
    name: "Dagoretti North",
    path: "M 80 120 L 140 90 L 180 120 L 170 180 L 120 190 L 80 160 Z",
    heatLevel: "critical",
    population: "394K",
    canopyCover: "8%",
    heatAnomaly: "+4.8°C",
    coolingAccess: "12%",
    callout: "Highest canopy loss — 22% reduction since 2023",
    calloutPosition: { x: 40, y: 70 },
    labelPosition: { x: 125, y: 145 },
  },
  {
    id: "westlands",
    name: "Westlands",
    path: "M 180 120 L 260 80 L 300 110 L 290 170 L 240 190 L 170 180 Z",
    heatLevel: "high",
    population: "312K",
    canopyCover: "14%",
    heatAnomaly: "+3.6°C",
    coolingAccess: "34%",
    callout: "Rapid densification — impervious surface +28%",
    calloutPosition: { x: 290, y: 60 },
    labelPosition: { x: 235, y: 140 },
  },
  {
    id: "kibera",
    name: "Kibera",
    path: "M 120 190 L 170 180 L 200 210 L 190 260 L 140 270 L 110 240 Z",
    heatLevel: "critical",
    population: "256K",
    canopyCover: "3%",
    heatAnomaly: "+5.1°C",
    coolingAccess: "4%",
    callout: "Lowest cooling access — 96% without mechanical cooling",
    calloutPosition: { x: 30, y: 270 },
    labelPosition: { x: 155, y: 225 },
  },
  {
    id: "mathare",
    name: "Mathare",
    path: "M 300 110 L 370 90 L 400 130 L 390 180 L 340 200 L 290 170 Z",
    heatLevel: "high",
    population: "206K",
    canopyCover: "6%",
    heatAnomaly: "+4.0°C",
    coolingAccess: "8%",
    callout: "High density + low ventilation corridors",
    calloutPosition: { x: 380, y: 70 },
    labelPosition: { x: 345, y: 145 },
  },
  {
    id: "langata",
    name: "Lang'ata",
    path: "M 200 210 L 240 190 L 290 170 L 340 200 L 330 250 L 270 280 L 190 260 Z",
    heatLevel: "medium",
    population: "176K",
    canopyCover: "21%",
    heatAnomaly: "+2.1°C",
    coolingAccess: "45%",
    calloutPosition: { x: 330, y: 260 },
    labelPosition: { x: 265, y: 230 },
  },
  {
    id: "kasarani",
    name: "Kasarani",
    path: "M 260 80 L 320 40 L 400 50 L 400 130 L 370 90 L 300 110 Z",
    heatLevel: "low",
    population: "148K",
    canopyCover: "28%",
    heatAnomaly: "+1.4°C",
    coolingAccess: "52%",
    calloutPosition: { x: 370, y: 20 },
    labelPosition: { x: 345, y: 80 },
  },
];

const heatColors: Record<string, string> = {
  critical: "hsl(var(--urgency-critical))",
  high: "hsl(var(--urgency-high))",
  medium: "hsl(var(--urgency-medium))",
  low: "hsl(var(--urgency-low))",
};

const heatOpacity: Record<string, number> = {
  critical: 0.45,
  high: 0.35,
  medium: 0.2,
  low: 0.12,
};

const heatBadgeClass: Record<string, string> = {
  critical: "bg-urgency-critical/20 text-urgency-critical",
  high: "bg-urgency-high/20 text-urgency-high",
  medium: "bg-urgency-medium/20 text-urgency-medium",
  low: "bg-urgency-low/20 text-urgency-low",
};

const AnnotatedMap = () => {
  const [selected, setSelected] = useState<string | null>("dagoretti");
  const [hovered, setHovered] = useState<string | null>(null);

  const activeDistrict = districts.find((d) => d.id === selected);
  const comparisonDistrict = districts.find((d) => d.id === "kasarani"); // baseline comparison

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="rounded-lg border border-border bg-card p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground">
            Spatial Heat Exposure
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            District-level heat anomaly with population overlay — click to inspect
          </p>
        </div>
        {/* Legend */}
        <div className="hidden items-center gap-3 sm:flex">
          {(["critical", "high", "medium", "low"] as const).map((level) => (
            <div key={level} className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: heatColors[level], opacity: 0.8 }}
              />
              <span className="font-mono text-[9px] uppercase text-muted-foreground">
                {level}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
        {/* SVG Map */}
        <div className="relative rounded-md border border-border bg-secondary/30 p-4">
          <svg
            viewBox="0 0 460 320"
            className="h-auto w-full"
            style={{ filter: "drop-shadow(0 2px 8px hsl(0 0% 0% / 0.3))" }}
          >
            {/* Grid lines for spatial context */}
            {[80, 160, 240, 320, 400].map((x) => (
              <line
                key={`vl-${x}`}
                x1={x} y1={0} x2={x} y2={320}
                stroke="hsl(220 14% 18%)"
                strokeWidth="0.5"
                strokeDasharray="4 4"
                opacity={0.5}
              />
            ))}
            {[64, 128, 192, 256].map((y) => (
              <line
                key={`hl-${y}`}
                x1={0} y1={y} x2={460} y2={y}
                stroke="hsl(220 14% 18%)"
                strokeWidth="0.5"
                strokeDasharray="4 4"
                opacity={0.5}
              />
            ))}

            {/* District zones */}
            {districts.map((d) => {
              const isActive = selected === d.id;
              const isHovered = hovered === d.id;
              return (
                <g key={d.id}>
                  <path
                    d={d.path}
                    fill={heatColors[d.heatLevel]}
                    fillOpacity={isActive ? heatOpacity[d.heatLevel] + 0.2 : isHovered ? heatOpacity[d.heatLevel] + 0.1 : heatOpacity[d.heatLevel]}
                    stroke={isActive ? "hsl(var(--primary))" : "hsl(var(--border))"}
                    strokeWidth={isActive ? 2 : 1}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setSelected(d.id)}
                    onMouseEnter={() => setHovered(d.id)}
                    onMouseLeave={() => setHovered(null)}
                  />
                  {/* District label */}
                  <text
                    x={d.labelPosition.x}
                    y={d.labelPosition.y}
                    textAnchor="middle"
                    className="pointer-events-none select-none"
                    fill="hsl(210 20% 90%)"
                    fontSize="9"
                    fontFamily="'Space Grotesk', sans-serif"
                    fontWeight={isActive ? 600 : 400}
                    opacity={isActive ? 1 : 0.7}
                  >
                    {d.name}
                  </text>
                  <text
                    x={d.labelPosition.x}
                    y={d.labelPosition.y + 13}
                    textAnchor="middle"
                    className="pointer-events-none select-none"
                    fill={heatColors[d.heatLevel]}
                    fontSize="10"
                    fontFamily="'IBM Plex Mono', monospace"
                    fontWeight={500}
                  >
                    {d.heatAnomaly}
                  </text>
                </g>
              );
            })}

            {/* Callout lines for critical districts */}
            {districts
              .filter((d) => d.callout)
              .map((d) => (
                <g key={`callout-${d.id}`} opacity={selected === d.id ? 1 : 0.3}>
                  <line
                    x1={d.labelPosition.x}
                    y1={d.labelPosition.y - 15}
                    x2={d.calloutPosition.x + 4}
                    y2={d.calloutPosition.y + 6}
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.8"
                    strokeDasharray="3 3"
                    opacity={0.6}
                  />
                  <circle
                    cx={d.calloutPosition.x + 4}
                    cy={d.calloutPosition.y + 6}
                    r="2"
                    fill="hsl(var(--primary))"
                    opacity={0.8}
                  />
                </g>
              ))}

            {/* Callout text boxes */}
            {districts
              .filter((d) => d.callout && selected === d.id)
              .map((d) => (
                <foreignObject
                  key={`callout-text-${d.id}`}
                  x={d.calloutPosition.x}
                  y={d.calloutPosition.y - 12}
                  width="140"
                  height="40"
                  className="pointer-events-none"
                >
                  <div className="rounded border border-primary/30 bg-card/95 px-2 py-1 text-[8px] leading-tight text-primary backdrop-blur-sm">
                    {d.callout}
                  </div>
                </foreignObject>
              ))}
          </svg>

          {/* Population exposure pips */}
          <div className="mt-3 flex flex-wrap gap-2">
            {districts.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelected(d.id)}
                className={`flex items-center gap-1 rounded-md px-2 py-1 font-mono text-[9px] transition-colors ${
                  selected === d.id
                    ? "bg-primary/15 text-primary"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <Users className="h-2.5 w-2.5" />
                {d.population}
              </button>
            ))}
          </div>
        </div>

        {/* District detail + comparison panel */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {activeDistrict && (
              <motion.div
                key={activeDistrict.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <h3 className="font-display text-sm font-semibold text-foreground">
                    {activeDistrict.name}
                  </h3>
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[9px] uppercase ${heatBadgeClass[activeDistrict.heatLevel]}`}
                  >
                    {activeDistrict.heatLevel}
                  </span>
                </div>

                <div className="space-y-2">
                  {[
                    { icon: Thermometer, label: "Heat anomaly", value: activeDistrict.heatAnomaly },
                    { icon: Users, label: "Population", value: activeDistrict.population },
                    { icon: TreePine, label: "Canopy cover", value: activeDistrict.canopyCover },
                    { icon: Building2, label: "Cooling access", value: activeDistrict.coolingAccess },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center justify-between rounded border border-border bg-secondary/30 px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <stat.icon className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{stat.label}</span>
                      </div>
                      <span className="font-mono text-xs font-medium text-foreground">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* District comparison */}
          {activeDistrict && comparisonDistrict && activeDistrict.id !== comparisonDistrict.id && (
            <div className="rounded-md border border-border bg-secondary/20 p-3">
              <span className="mb-2 block font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                vs {comparisonDistrict.name} (baseline)
              </span>
              <div className="space-y-1.5">
                {[
                  {
                    label: "Heat anomaly",
                    active: activeDistrict.heatAnomaly,
                    baseline: comparisonDistrict.heatAnomaly,
                  },
                  {
                    label: "Canopy cover",
                    active: activeDistrict.canopyCover,
                    baseline: comparisonDistrict.canopyCover,
                  },
                  {
                    label: "Cooling access",
                    active: activeDistrict.coolingAccess,
                    baseline: comparisonDistrict.coolingAccess,
                  },
                ].map((cmp) => (
                  <div key={cmp.label} className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">{cmp.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-medium text-foreground">{cmp.active}</span>
                      <span className="text-muted-foreground">vs</span>
                      <span className="font-mono text-muted-foreground">{cmp.baseline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default AnnotatedMap;
