import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Alert = Tables<"alerts">;

export const useAlerts = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["alerts"],
    queryFn: async (): Promise<Alert[]> => {
      const { data, error } = await supabase
        .from("alerts")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel("alerts-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "alerts",
        },
        () => {
          // Invalidate and refetch alerts on any change
          queryClient.invalidateQueries({ queryKey: ["alerts"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const dismissAlert = async (alertId: string) => {
    const { error } = await supabase
      .from("alerts")
      .update({ 
        status: "dismissed", 
        dismissed_at: new Date().toISOString() 
      })
      .eq("id", alertId);

    if (error) throw error;
    queryClient.invalidateQueries({ queryKey: ["alerts"] });
  };

  const resolveAlert = async (alertId: string) => {
    const { error } = await supabase
      .from("alerts")
      .update({ 
        status: "resolved", 
        resolved_at: new Date().toISOString() 
      })
      .eq("id", alertId);

    if (error) throw error;
    queryClient.invalidateQueries({ queryKey: ["alerts"] });
  };

  return {
    ...query,
    dismissAlert,
    resolveAlert,
  };
};
