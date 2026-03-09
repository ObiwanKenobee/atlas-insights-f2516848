import TopBar from "@/components/TopBar";
import InsightHero from "@/components/InsightHero";
import CausalChainPanel from "@/components/CausalChainPanel";
import HumanImpactPanel from "@/components/HumanImpactPanel";
import ScenarioComparator from "@/components/ScenarioComparator";
import RoleToggle from "@/components/RoleToggle";
import EvidenceDrawer from "@/components/EvidenceDrawer";
import AnnotatedMap from "@/components/AnnotatedMap";
import StoryMode from "@/components/StoryMode";
import InflectionTimeline from "@/components/InflectionTimeline";
import AlertPanel from "@/components/AlertPanel";
import ExportBriefing from "@/components/ExportBriefing";
import { useInsight } from "@/hooks/useInsight";
import { Users, HeartPulse, Thermometer, Briefcase, ShieldAlert } from "lucide-react";
import type { ImpactMetric } from "@/components/HumanImpactPanel";
import {
  AlertTriangle,
  TrendingUp,
  Users as UsersIcon,
  Clock,
  Lightbulb,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

const impactMetrics: ImpactMetric[] = [
  {
    icon: Users,
    label: "Households exposed",
    value: "284,000",
    detail: "Concentrated in Mukuru, Mathare, and Kibera informal settlements",
    severity: "critical",
  },
  {
    icon: Thermometer,
    label: "Peak heat anomaly",
    value: "+4.2°C",
    detail: "Above urban baseline in low-canopy corridors",
    severity: "high",
  },
  {
    icon: HeartPulse,
    label: "Clinic burden increase",
    value: "+31%",
    detail: "Projected heat-related visits in exposed wards",
    severity: "high",
  },
  {
    icon: Briefcase,
    label: "Labor productivity loss",
    value: "–18%",
    detail: "Outdoor workers in construction and informal trade",
    severity: "medium",
  },
  {
    icon: ShieldAlert,
    label: "Cooling access gap",
    value: "73%",
    detail: "Of affected households lack any mechanical cooling",
    severity: "critical",
  },
  {
    icon: Users,
    label: "School exposure",
    value: "142 schools",
    detail: "In high-heat zones without adequate ventilation",
    severity: "medium",
  },
];

// Icon name to component mapping
const iconMap: Record<string, React.ElementType> = {
  AlertTriangle,
  TrendingUp,
  Users: UsersIcon,
  Clock,
  Lightbulb,
  ShieldCheck,
  HelpCircle,
};

const Index = () => {
  const { data: insightData, isLoading } = useInsight();

  // Use static data as fallback while loading or if no data
  const insight = insightData?.insight;
  const storySteps = insightData?.storySteps.map((step) => ({
    id: step.step_id,
    phase: step.phase,
    icon: iconMap[step.icon_name] || AlertTriangle,
    headline: step.headline,
    narrative: step.narrative,
    keyFacts: step.key_facts ? (step.key_facts as string[]) : undefined,
    accentColor: step.accent_color,
  }));

  const inflections = insightData?.inflectionPoints.map((inflection) => ({
    date: inflection.event_date,
    label: inflection.label,
    description: inflection.description,
    impact: inflection.impact as "low" | "medium" | "high" | "critical",
    direction: inflection.trend as "up" | "down" | "stable",
    metric: `${inflection.metric_label}: ${inflection.metric_value}`,
  }));

  const scenarios = insightData?.scenarios.map((scenario) => ({
    label: scenario.label,
    description: scenario.description,
    keyMetric: scenario.key_metric,
    metricLabel: scenario.metric_label,
    trend: scenario.trend as "up" | "down" | "stable",
    highlight: scenario.highlight,
  }));

  const evidenceItems = insightData?.evidenceItems.map((item) => ({
    label: item.label,
    source: item.source,
    detail: item.detail,
    confidence: item.confidence as "low" | "medium" | "high",
  }));

  const assumptions = insightData?.assumptions.map((a) => a.assumption_text);
  const blindSpots = insightData?.blindSpots.map((b) => b.blind_spot_text);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background atlas-grid-bg flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4" />
          <p className="font-mono text-sm text-muted-foreground">Loading Atlas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background atlas-grid-bg">
      <TopBar
        location={insight?.location || "Nairobi Metro"}
        timeframe={insight?.timeframe || "Q2 2026 — Q4 2027"}
        scenario={insight?.scenario || "Baseline + Policy Options"}
        systemStatus={insight?.system_status || "elevated"}
      />

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        <InsightHero
          narrative={
            insight?.narrative ||
            "Heat exposure is rising across western Nairobi due to accelerated tree cover loss and urban densification in low-income corridors."
          }
          urgency={insight?.urgency || "high"}
          affected={insight?.affected || "1.2M residents across 3 districts"}
          timeHorizon={insight?.time_horizon || "Next 6–18 months"}
          confidence={insight?.confidence || "medium"}
          recommendedAction={
            insight?.recommended_action ||
            "Prioritize urban canopy restoration in Dagoretti North and Westlands, combined with reflective roofing pilots in Kibera and Mathare."
          }
        />

        <AlertPanel />

        <div className="grid gap-6 lg:grid-cols-2">
          <CausalChainPanel
            drivers={[
              {
                label: "Tree cover loss",
                type: "primary",
                detail: "14% canopy reduction over 3 years in western districts",
              },
              {
                label: "Rapid densification",
                type: "secondary",
                detail: "Impervious surface area up 22% since 2023",
              },
              {
                label: "Low ventilation corridors",
                type: "amplifier",
                detail: "Building density blocks airflow in 4 wards",
              },
              {
                label: "Construction acceleration",
                type: "trigger",
                detail: "3 major developments broke ground in Q1 2026",
              },
            ]}
            chain={[
              "Tree removal",
              "Reduced shade",
              "Surface heating",
              "Heat island effect",
              "Health burden",
              "Productivity loss",
            ]}
          />

          <RoleToggle
            briefings={{
              minister: {
                summary:
                  "Urban heat exposure is emerging as a cross-sector risk affecting public health budgets, labor productivity, and social stability in Nairobi. Without intervention, economic costs are projected to reach KES 4.2B annually by 2028.",
                focusAreas: [
                  "National urban greening mandate for cities above 500K population",
                  "Cross-ministry coordination between Environment, Health, and Housing",
                  "Budget allocation for climate-adaptive infrastructure in 2027 fiscal year",
                  "Diplomatic leverage: align with AU climate resilience framework",
                ],
              },
              mayor: {
                summary:
                  "Three western districts face rising heat stress that will increase clinic visits, reduce outdoor work capacity, and strain city services. Immediate action on tree planting and building codes can limit exposure growth.",
                focusAreas: [
                  "Fast-track urban canopy restoration in Dagoretti North and Westlands",
                  "Enforce reflective roofing standards for new construction",
                  "Expand cooling center access in Kibera and Mathare",
                  "Coordinate with county health teams on heat-illness preparedness",
                ],
              },
              analyst: {
                summary:
                  "Heat anomaly detection based on Landsat 9 thermal bands cross-referenced with VIIRS night-time radiance. Population exposure estimated using WorldPop 2025 constrained layers. Model confidence is medium due to incomplete ground-sensor coverage in northern corridor.",
                focusAreas: [
                  "Landsat 9 thermal + VIIRS radiance fusion methodology",
                  "WorldPop constrained population distribution at 100m resolution",
                  "Urban heat island model: SUHI v3.2 with local calibration",
                  "Confidence degradation: 23% of study area lacks ground sensors",
                ],
              },
              citizen: {
                summary:
                  "Your neighborhood is getting hotter. Trees that used to provide shade are being cut down for construction. This means more uncomfortable days, higher risk of heat sickness especially for children and elderly, and harder conditions for outdoor work.",
                focusAreas: [
                  "Stay hydrated and avoid outdoor work during peak heat (11am–3pm)",
                  "Check on elderly neighbors during hot spells",
                  "Support community tree-planting initiatives in your ward",
                  "Know your nearest cooling center location",
                ],
              },
            }}
          />
        </div>

        {storySteps && storySteps.length > 0 && <StoryMode steps={storySteps} />}

        <AnnotatedMap />

        {inflections && inflections.length > 0 && (
          <InflectionTimeline inflections={inflections} />
        )}

        <HumanImpactPanel
          narrative="Heat stress is likely to reduce outdoor labor capacity by 18% and increase clinic burden by 31% in three wards with low cooling access. The most vulnerable populations are informal settlement residents without mechanical cooling, outdoor laborers, and schoolchildren in poorly ventilated facilities."
          metrics={impactMetrics}
        />

        {scenarios && scenarios.length > 0 && <ScenarioComparator scenarios={scenarios} />}

        <ExportBriefing
          insightId={insight?.id}
          title="Urban Heat Exposure Analysis"
          narrative={insight?.narrative}
          location={insight?.location}
          timeframe={insight?.timeframe}
        />

        {evidenceItems && evidenceItems.length > 0 && (
          <EvidenceDrawer
            items={evidenceItems}
            assumptions={assumptions || []}
            blindSpots={blindSpots || []}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Atlas Human Cognitive Interface v0.1
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            Last updated: {new Date().toISOString().split("T")[0]} UTC
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
