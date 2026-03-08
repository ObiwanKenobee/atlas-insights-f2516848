import TopBar from "@/components/TopBar";
import InsightHero from "@/components/InsightHero";
import CausalChainPanel from "@/components/CausalChainPanel";
import HumanImpactPanel from "@/components/HumanImpactPanel";
import ScenarioComparator from "@/components/ScenarioComparator";
import RoleToggle from "@/components/RoleToggle";
import EvidenceDrawer from "@/components/EvidenceDrawer";
import AnnotatedMap from "@/components/AnnotatedMap";
import { Users, HeartPulse, Thermometer, Briefcase, ShieldAlert } from "lucide-react";
import type { ImpactMetric } from "@/components/HumanImpactPanel";

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

const Index = () => {
  return (
    <div className="min-h-screen bg-background atlas-grid-bg">
      <TopBar
        location="Nairobi Metro"
        timeframe="Q2 2026 — Q4 2027"
        scenario="Baseline + Policy Options"
        systemStatus="elevated"
      />

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        <InsightHero
          narrative="Heat exposure is rising across western Nairobi due to accelerated tree cover loss and urban densification in low-income corridors."
          urgency="high"
          affected="1.2M residents across 3 districts"
          timeHorizon="Next 6–18 months"
          confidence="medium"
          recommendedAction="Prioritize urban canopy restoration in Dagoretti North and Westlands, combined with reflective roofing pilots in Kibera and Mathare."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <CausalChainPanel
            drivers={[
              { label: "Tree cover loss", type: "primary", detail: "14% canopy reduction over 3 years in western districts" },
              { label: "Rapid densification", type: "secondary", detail: "Impervious surface area up 22% since 2023" },
              { label: "Low ventilation corridors", type: "amplifier", detail: "Building density blocks airflow in 4 wards" },
              { label: "Construction acceleration", type: "trigger", detail: "3 major developments broke ground in Q1 2026" },
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
                summary: "Urban heat exposure is emerging as a cross-sector risk affecting public health budgets, labor productivity, and social stability in Nairobi. Without intervention, economic costs are projected to reach KES 4.2B annually by 2028.",
                focusAreas: [
                  "National urban greening mandate for cities above 500K population",
                  "Cross-ministry coordination between Environment, Health, and Housing",
                  "Budget allocation for climate-adaptive infrastructure in 2027 fiscal year",
                  "Diplomatic leverage: align with AU climate resilience framework",
                ],
              },
              mayor: {
                summary: "Three western districts face rising heat stress that will increase clinic visits, reduce outdoor work capacity, and strain city services. Immediate action on tree planting and building codes can limit exposure growth.",
                focusAreas: [
                  "Fast-track urban canopy restoration in Dagoretti North and Westlands",
                  "Enforce reflective roofing standards for new construction",
                  "Expand cooling center access in Kibera and Mathare",
                  "Coordinate with county health teams on heat-illness preparedness",
                ],
              },
              analyst: {
                summary: "Heat anomaly detection based on Landsat 9 thermal bands cross-referenced with VIIRS night-time radiance. Population exposure estimated using WorldPop 2025 constrained layers. Model confidence is medium due to incomplete ground-sensor coverage in northern corridor.",
                focusAreas: [
                  "Landsat 9 thermal + VIIRS radiance fusion methodology",
                  "WorldPop constrained population distribution at 100m resolution",
                  "Urban heat island model: SUHI v3.2 with local calibration",
                  "Confidence degradation: 23% of study area lacks ground sensors",
                ],
              },
              citizen: {
                summary: "Your neighborhood is getting hotter. Trees that used to provide shade are being cut down for construction. This means more uncomfortable days, higher risk of heat sickness especially for children and elderly, and harder conditions for outdoor work.",
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

        <AnnotatedMap />

        <HumanImpactPanel
          narrative="Heat stress is likely to reduce outdoor labor capacity by 18% and increase clinic burden by 31% in three wards with low cooling access. The most vulnerable populations are informal settlement residents without mechanical cooling, outdoor laborers, and schoolchildren in poorly ventilated facilities."
          metrics={impactMetrics}
        />

        <ScenarioComparator
          scenarios={[
            {
              label: "No Intervention",
              description: "Current trajectory continues. Tree cover loss accelerates, new construction proceeds without thermal standards.",
              keyMetric: "+12%",
              metricLabel: "Heat exposure change",
              trend: "up",
            },
            {
              label: "Urban Tree Restoration",
              description: "Targeted canopy restoration in highest-impact corridors. 50,000 trees over 18 months in western districts.",
              keyMetric: "+4%",
              metricLabel: "Heat exposure change",
              trend: "up",
            },
            {
              label: "Trees + Reflective Roofing",
              description: "Combined strategy: canopy restoration plus reflective roofing mandate for all new and retrofitted structures.",
              keyMetric: "–3%",
              metricLabel: "Heat exposure change",
              trend: "down",
              highlight: true,
            },
          ]}
        />

        <EvidenceDrawer
          items={[
            { label: "Landsat 9 Thermal Imagery", source: "USGS", detail: "30m resolution thermal bands, monthly composites 2023–2026", confidence: "high" },
            { label: "VIIRS Night-time Radiance", source: "NASA", detail: "500m nocturnal heat signature data", confidence: "high" },
            { label: "WorldPop Population Grid", source: "WorldPop", detail: "Constrained 100m population estimates, 2025 release", confidence: "medium" },
            { label: "County Ground Sensors", source: "Nairobi Met", detail: "47 stations across metro area, 23% coverage gap in north", confidence: "low" },
            { label: "Urban Heat Island Model", source: "SUHI v3.2", detail: "Locally calibrated with 2024 ground-truth campaign", confidence: "medium" },
          ]}
          assumptions={[
            "Construction growth rate remains consistent with 2024–2025 trends",
            "No major policy changes in current urban development framework",
            "Population distribution follows WorldPop constrained model",
            "Tree survival rate of 70% assumed for restoration scenario",
          ]}
          blindSpots={[
            "Incomplete sensor coverage in northern corridor reduces confidence",
            "Informal settlement population counts may underestimate density by 15–20%",
            "Indoor heat exposure not modeled — outdoor-only estimates",
          ]}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Atlas Human Cognitive Interface v0.1
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            Last updated: 2026-03-08 14:32 UTC
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
