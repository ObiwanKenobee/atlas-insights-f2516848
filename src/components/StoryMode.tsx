import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  TrendingUp,
  Users,
  Clock,
  Lightbulb,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

export interface StoryStep {
  id: string;
  phase: string;
  icon: React.ElementType;
  headline: string;
  narrative: string;
  keyFacts?: string[];
  accentColor: string;
}

export const defaultSteps: StoryStep[] = [
  {
    id: "changed",
    phase: "What Changed",
    icon: AlertTriangle,
    headline: "Urban heat exposure surged in western Nairobi",
    narrative:
      "Over the last 18 months, three western districts experienced a compound shift: accelerated tree removal for construction, rapid densification of built surfaces, and declining ventilation corridors. Satellite thermal data shows a measurable heat anomaly increase across all three zones.",
    keyFacts: [
      "14% canopy reduction in Dagoretti North since 2023",
      "Impervious surface area up 22% across western districts",
      "3 major construction projects broke ground in Q1 2026",
    ],
    accentColor: "var(--urgency-high)",
  },
  {
    id: "why",
    phase: "Why It Happened",
    icon: TrendingUp,
    headline: "Tree loss + densification + blocked airflow",
    narrative:
      "The primary driver is tree cover loss — shade removal directly increases surface temperatures. This is compounded by rapid construction that replaces permeable ground with heat-absorbing surfaces. Low-rise, high-density building patterns have blocked natural ventilation corridors, trapping heat in residential areas.",
    keyFacts: [
      "Primary: 14% canopy loss reduces shade and evapotranspiration",
      "Secondary: impervious surfaces absorb and re-radiate heat",
      "Amplifier: building density blocks wind corridors in 4 wards",
      "Trigger: construction acceleration in Q1 2026",
    ],
    accentColor: "var(--urgency-medium)",
  },
  {
    id: "who",
    phase: "Who's Affected",
    icon: Users,
    headline: "1.2M residents — hardest hit in informal settlements",
    narrative:
      "The most exposed populations are in Kibera, Mathare, and Mukuru informal settlements — areas with minimal canopy cover, no mechanical cooling, and high population density. Outdoor laborers, schoolchildren in poorly ventilated classrooms, and elderly residents face the highest health risks.",
    keyFacts: [
      "284,000 households in direct heat exposure zones",
      "73% of affected households lack mechanical cooling",
      "142 schools in high-heat zones without ventilation",
      "Outdoor labor productivity projected to drop 18%",
    ],
    accentColor: "var(--urgency-critical)",
  },
  {
    id: "next",
    phase: "What Happens Next",
    icon: Clock,
    headline: "Without action: +12% heat exposure by Q4 2027",
    narrative:
      "If current trends continue, heat exposure will intensify by 12% over the next 18 months. Clinic visits for heat-related illness are projected to rise 31%. Economic losses from reduced labor productivity could reach KES 4.2B annually. The burden will fall disproportionately on low-income communities.",
    keyFacts: [
      "Heat exposure: +12% under current trajectory",
      "Clinic burden: +31% heat-related visits projected",
      "Economic cost: KES 4.2B annually by 2028",
      "Social stability risk: rising in 3 wards",
    ],
    accentColor: "var(--urgency-high)",
  },
  {
    id: "options",
    phase: "Options Available",
    icon: Lightbulb,
    headline: "Three intervention pathways with different outcomes",
    narrative:
      "Atlas identifies three viable intervention scenarios. Urban tree restoration alone limits heat growth to +4%. Combined with reflective roofing mandates, the system projects a net 3% reduction. A comprehensive strategy adding cooling centers would further protect the most vulnerable populations.",
    keyFacts: [
      "Option A: Urban tree restoration → heat growth limited to +4%",
      "Option B: Trees + reflective roofing → net 3% heat reduction",
      "Option C: Full package + cooling centers → maximum protection",
      "Implementation window: 6–18 months for measurable impact",
    ],
    accentColor: "var(--confidence-high)",
  },
  {
    id: "recommendation",
    phase: "Recommendation",
    icon: ShieldCheck,
    headline: "Prioritize combined tree + roofing strategy in 3 districts",
    narrative:
      "Atlas recommends Option B as the optimal balance of impact, cost, and implementation speed. Targeted canopy restoration in Dagoretti North and Westlands, combined with reflective roofing mandates for all new construction, delivers the strongest outcome within the 18-month window. Cooling centers should be fast-tracked in Kibera and Mathare as a complementary measure.",
    keyFacts: [
      "50,000 trees across western districts over 18 months",
      "Reflective roofing mandate for new and retrofitted structures",
      "Priority cooling centers in Kibera and Mathare",
      "Estimated cost: KES 2.1B — projected return: KES 6.8B avoided losses",
    ],
    accentColor: "var(--confidence-high)",
  },
  {
    id: "uncertainty",
    phase: "Uncertainty",
    icon: HelpCircle,
    headline: "Medium-high confidence with known gaps",
    narrative:
      "Overall system confidence is medium-high. The primary uncertainty is incomplete ground-sensor coverage in the northern corridor (23% gap), which reduces calibration precision. Informal settlement population estimates may undercount density by 15–20%. Indoor heat exposure is not modeled — all projections are outdoor-only. Tree survival rates in restoration scenarios assume 70%, which may vary.",
    keyFacts: [
      "Sensor coverage gap: 23% in northern corridor",
      "Population uncertainty: ±15–20% in informal settlements",
      "Indoor exposure: not modeled (outdoor-only estimates)",
      "Tree survival assumption: 70% — may vary by species and site",
    ],
    accentColor: "var(--confidence-low)",
  },
];

interface StoryModeProps {
  steps?: StoryStep[];
}

const StoryMode = ({ steps = defaultSteps }: StoryModeProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const step = steps[currentStep];
  const Icon = step.icon;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const goNext = useCallback(() => {
    setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
  }, [steps.length]);

  const goPrev = useCallback(() => {
    setCurrentStep((s) => Math.max(0, s - 1));
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      }
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("keydown", handleKey);
      return () => el.removeEventListener("keydown", handleKey);
    }
  }, [goNext, goPrev]);

  return (
    <motion.section
      ref={containerRef}
      tabIndex={0}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="rounded-lg border border-border bg-card overflow-hidden outline-none focus:ring-2 focus:ring-primary/30"
    >
      {/* Progress bar */}
      <div className="h-1 w-full bg-secondary">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Mission Briefing
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Step {currentStep + 1} of {steps.length} — guided intelligence walkthrough
            </p>
          </div>

          {/* Step indicators */}
          <div className="hidden items-center gap-1 sm:flex">
            {steps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrentStep(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentStep
                    ? "w-6 bg-primary"
                    : i < currentStep
                    ? "w-2 bg-primary/40"
                    : "w-2 bg-secondary"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Phase labels — scrollable on mobile */}
        <div className="mb-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(i)}
              className={`shrink-0 rounded-md px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider transition-colors ${
                i === currentStep
                  ? "bg-primary/15 text-primary"
                  : i < currentStep
                  ? "bg-secondary text-muted-foreground"
                  : "bg-secondary/50 text-muted-foreground/50"
              }`}
            >
              {s.phase}
            </button>
          ))}
        </div>

        {/* Content — swipeable */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_e, info) => {
              if (info.offset.x < -50) goNext();
              else if (info.offset.x > 50) goPrev();
            }}
            style={{ touchAction: "pan-y" }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `hsl(${step.accentColor} / 0.15)` }}
              >
                <Icon
                  className="h-5 w-5"
                  style={{ color: `hsl(${step.accentColor})` }}
                />
              </div>
              <h3 className="font-display text-sm sm:text-base font-semibold text-foreground">
                {step.headline}
              </h3>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-foreground/85">
              {step.narrative}
            </p>

            {step.keyFacts && (
              <div className="space-y-2 rounded-md border border-border bg-secondary/30 p-3 sm:p-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  Key facts
                </span>
                {step.keyFacts.map((fact, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: `hsl(${step.accentColor})` }}
                    />
                    <span className="text-xs sm:text-sm text-muted-foreground">{fact}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={goPrev}
            disabled={currentStep === 0}
            className="flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Previous
          </button>

          <span className="hidden sm:inline font-mono text-[10px] text-muted-foreground">
            {step.phase}
          </span>

          <button
            onClick={goNext}
            disabled={currentStep === steps.length - 1}
            className="flex items-center gap-1.5 rounded-md bg-primary/10 px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/20 disabled:opacity-30 disabled:hover:bg-primary/10"
          >
            Next
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Keyboard hint */}
        <p className="mt-3 hidden sm:block text-center font-mono text-[9px] text-muted-foreground/50">
          Use ← → arrow keys to navigate
        </p>
      </div>
    </motion.section>
  );
};

export default StoryMode;
