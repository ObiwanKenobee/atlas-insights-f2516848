import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Insight = Tables<"insights">;
export type StoryStep = Tables<"story_steps">;
export type InflectionPoint = Tables<"inflection_points">;
export type Scenario = Tables<"scenarios">;
export type EvidenceItem = Tables<"evidence_items">;
export type Assumption = Tables<"assumptions">;
export type BlindSpot = Tables<"blind_spots">;

export interface FullInsight {
  insight: Insight;
  storySteps: StoryStep[];
  inflectionPoints: InflectionPoint[];
  scenarios: Scenario[];
  evidenceItems: EvidenceItem[];
  assumptions: Assumption[];
  blindSpots: BlindSpot[];
}

export const useInsight = (insightId?: string) => {
  return useQuery({
    queryKey: ["insight", insightId],
    queryFn: async (): Promise<FullInsight | null> => {
      // If no ID provided, get the first/latest insight
      let id = insightId;
      
      if (!id) {
        const { data: insights, error: insightsError } = await supabase
          .from("insights")
          .select("id")
          .order("created_at", { ascending: false })
          .limit(1);
        
        if (insightsError) throw insightsError;
        if (!insights || insights.length === 0) return null;
        id = insights[0].id;
      }

      // Fetch all related data in parallel
      const [
        insightResult,
        stepsResult,
        inflectionsResult,
        scenariosResult,
        evidenceResult,
        assumptionsResult,
        blindSpotsResult,
      ] = await Promise.all([
        supabase.from("insights").select("*").eq("id", id).single(),
        supabase.from("story_steps").select("*").eq("insight_id", id).order("step_order"),
        supabase.from("inflection_points").select("*").eq("insight_id", id).order("event_date"),
        supabase.from("scenarios").select("*").eq("insight_id", id).order("scenario_order"),
        supabase.from("evidence_items").select("*").eq("insight_id", id).order("item_order"),
        supabase.from("assumptions").select("*").eq("insight_id", id).order("assumption_order"),
        supabase.from("blind_spots").select("*").eq("insight_id", id).order("spot_order"),
      ]);

      if (insightResult.error) throw insightResult.error;
      if (!insightResult.data) return null;

      return {
        insight: insightResult.data,
        storySteps: stepsResult.data || [],
        inflectionPoints: inflectionsResult.data || [],
        scenarios: scenariosResult.data || [],
        evidenceItems: evidenceResult.data || [],
        assumptions: assumptionsResult.data || [],
        blindSpots: blindSpotsResult.data || [],
      };
    },
  });
};
