export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          alert_type: string
          created_at: string
          dismissed_at: string | null
          id: string
          insight_id: string | null
          message: string
          metadata: Json | null
          resolved_at: string | null
          severity: Database["public"]["Enums"]["urgency_level"]
          status: Database["public"]["Enums"]["alert_status"]
          title: string
          updated_at: string
        }
        Insert: {
          alert_type: string
          created_at?: string
          dismissed_at?: string | null
          id?: string
          insight_id?: string | null
          message: string
          metadata?: Json | null
          resolved_at?: string | null
          severity?: Database["public"]["Enums"]["urgency_level"]
          status?: Database["public"]["Enums"]["alert_status"]
          title: string
          updated_at?: string
        }
        Update: {
          alert_type?: string
          created_at?: string
          dismissed_at?: string | null
          id?: string
          insight_id?: string | null
          message?: string
          metadata?: Json | null
          resolved_at?: string | null
          severity?: Database["public"]["Enums"]["urgency_level"]
          status?: Database["public"]["Enums"]["alert_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_insight_id_fkey"
            columns: ["insight_id"]
            isOneToOne: false
            referencedRelation: "insights"
            referencedColumns: ["id"]
          },
        ]
      }
      assumptions: {
        Row: {
          assumption_order: number
          assumption_text: string
          created_at: string
          id: string
          insight_id: string
        }
        Insert: {
          assumption_order: number
          assumption_text: string
          created_at?: string
          id?: string
          insight_id: string
        }
        Update: {
          assumption_order?: number
          assumption_text?: string
          created_at?: string
          id?: string
          insight_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assumptions_insight_id_fkey"
            columns: ["insight_id"]
            isOneToOne: false
            referencedRelation: "insights"
            referencedColumns: ["id"]
          },
        ]
      }
      blind_spots: {
        Row: {
          blind_spot_text: string
          created_at: string
          id: string
          insight_id: string
          spot_order: number
        }
        Insert: {
          blind_spot_text: string
          created_at?: string
          id?: string
          insight_id: string
          spot_order: number
        }
        Update: {
          blind_spot_text?: string
          created_at?: string
          id?: string
          insight_id?: string
          spot_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "blind_spots_insight_id_fkey"
            columns: ["insight_id"]
            isOneToOne: false
            referencedRelation: "insights"
            referencedColumns: ["id"]
          },
        ]
      }
      evidence_items: {
        Row: {
          confidence: Database["public"]["Enums"]["confidence_level"]
          created_at: string
          detail: string
          id: string
          insight_id: string
          item_order: number
          label: string
          source: string
          updated_at: string
        }
        Insert: {
          confidence?: Database["public"]["Enums"]["confidence_level"]
          created_at?: string
          detail: string
          id?: string
          insight_id: string
          item_order: number
          label: string
          source: string
          updated_at?: string
        }
        Update: {
          confidence?: Database["public"]["Enums"]["confidence_level"]
          created_at?: string
          detail?: string
          id?: string
          insight_id?: string
          item_order?: number
          label?: string
          source?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidence_items_insight_id_fkey"
            columns: ["insight_id"]
            isOneToOne: false
            referencedRelation: "insights"
            referencedColumns: ["id"]
          },
        ]
      }
      inflection_points: {
        Row: {
          created_at: string
          description: string
          event_date: string
          event_id: string
          id: string
          impact: Database["public"]["Enums"]["impact_severity"]
          insight_id: string
          label: string
          metric_label: string
          metric_value: string
          trend: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          event_date: string
          event_id: string
          id?: string
          impact?: Database["public"]["Enums"]["impact_severity"]
          insight_id: string
          label: string
          metric_label: string
          metric_value: string
          trend: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          event_date?: string
          event_id?: string
          id?: string
          impact?: Database["public"]["Enums"]["impact_severity"]
          insight_id?: string
          label?: string
          metric_label?: string
          metric_value?: string
          trend?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inflection_points_insight_id_fkey"
            columns: ["insight_id"]
            isOneToOne: false
            referencedRelation: "insights"
            referencedColumns: ["id"]
          },
        ]
      }
      insights: {
        Row: {
          affected: string
          confidence: Database["public"]["Enums"]["confidence_level"]
          created_at: string
          id: string
          location: string
          narrative: string
          recommended_action: string
          scenario: string
          system_status: string
          time_horizon: string
          timeframe: string
          updated_at: string
          urgency: Database["public"]["Enums"]["urgency_level"]
        }
        Insert: {
          affected: string
          confidence?: Database["public"]["Enums"]["confidence_level"]
          created_at?: string
          id?: string
          location: string
          narrative: string
          recommended_action: string
          scenario: string
          system_status?: string
          time_horizon: string
          timeframe: string
          updated_at?: string
          urgency?: Database["public"]["Enums"]["urgency_level"]
        }
        Update: {
          affected?: string
          confidence?: Database["public"]["Enums"]["confidence_level"]
          created_at?: string
          id?: string
          location?: string
          narrative?: string
          recommended_action?: string
          scenario?: string
          system_status?: string
          time_horizon?: string
          timeframe?: string
          updated_at?: string
          urgency?: Database["public"]["Enums"]["urgency_level"]
        }
        Relationships: []
      }
      scenarios: {
        Row: {
          created_at: string
          description: string
          highlight: boolean
          id: string
          insight_id: string
          key_metric: string
          label: string
          metric_label: string
          scenario_order: number
          trend: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          highlight?: boolean
          id?: string
          insight_id: string
          key_metric: string
          label: string
          metric_label: string
          scenario_order: number
          trend: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          highlight?: boolean
          id?: string
          insight_id?: string
          key_metric?: string
          label?: string
          metric_label?: string
          scenario_order?: number
          trend?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "scenarios_insight_id_fkey"
            columns: ["insight_id"]
            isOneToOne: false
            referencedRelation: "insights"
            referencedColumns: ["id"]
          },
        ]
      }
      story_steps: {
        Row: {
          accent_color: string
          created_at: string
          headline: string
          icon_name: string
          id: string
          insight_id: string
          key_facts: Json | null
          narrative: string
          phase: string
          step_id: string
          step_order: number
          updated_at: string
        }
        Insert: {
          accent_color: string
          created_at?: string
          headline: string
          icon_name: string
          id?: string
          insight_id: string
          key_facts?: Json | null
          narrative: string
          phase: string
          step_id: string
          step_order: number
          updated_at?: string
        }
        Update: {
          accent_color?: string
          created_at?: string
          headline?: string
          icon_name?: string
          id?: string
          insight_id?: string
          key_facts?: Json | null
          narrative?: string
          phase?: string
          step_id?: string
          step_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_steps_insight_id_fkey"
            columns: ["insight_id"]
            isOneToOne: false
            referencedRelation: "insights"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      alert_status: "active" | "dismissed" | "resolved"
      confidence_level: "low" | "medium" | "high"
      impact_severity: "low" | "medium" | "high" | "critical"
      urgency_level: "low" | "medium" | "high" | "critical"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      alert_status: ["active", "dismissed", "resolved"],
      confidence_level: ["low", "medium", "high"],
      impact_severity: ["low", "medium", "high", "critical"],
      urgency_level: ["low", "medium", "high", "critical"],
    },
  },
} as const
