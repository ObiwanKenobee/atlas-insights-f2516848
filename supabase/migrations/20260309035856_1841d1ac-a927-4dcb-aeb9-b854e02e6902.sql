-- Create enum types for status and severity
CREATE TYPE public.urgency_level AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE public.confidence_level AS ENUM ('low', 'medium', 'high');
CREATE TYPE public.alert_status AS ENUM ('active', 'dismissed', 'resolved');
CREATE TYPE public.impact_severity AS ENUM ('low', 'medium', 'high', 'critical');

-- Create insights table
CREATE TABLE public.insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  narrative TEXT NOT NULL,
  urgency urgency_level NOT NULL DEFAULT 'medium',
  affected TEXT NOT NULL,
  time_horizon TEXT NOT NULL,
  confidence confidence_level NOT NULL DEFAULT 'medium',
  recommended_action TEXT NOT NULL,
  location TEXT NOT NULL,
  timeframe TEXT NOT NULL,
  scenario TEXT NOT NULL,
  system_status TEXT NOT NULL DEFAULT 'normal',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create story steps table
CREATE TABLE public.story_steps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  insight_id UUID NOT NULL REFERENCES public.insights(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL,
  step_id TEXT NOT NULL,
  phase TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  headline TEXT NOT NULL,
  narrative TEXT NOT NULL,
  key_facts JSONB,
  accent_color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(insight_id, step_order)
);

-- Create inflection points table
CREATE TABLE public.inflection_points (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  insight_id UUID NOT NULL REFERENCES public.insights(id) ON DELETE CASCADE,
  event_id TEXT NOT NULL,
  event_date DATE NOT NULL,
  label TEXT NOT NULL,
  description TEXT NOT NULL,
  impact impact_severity NOT NULL DEFAULT 'medium',
  metric_label TEXT NOT NULL,
  metric_value TEXT NOT NULL,
  trend TEXT NOT NULL CHECK (trend IN ('up', 'down', 'stable')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create scenarios table
CREATE TABLE public.scenarios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  insight_id UUID NOT NULL REFERENCES public.insights(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  description TEXT NOT NULL,
  key_metric TEXT NOT NULL,
  metric_label TEXT NOT NULL,
  trend TEXT NOT NULL CHECK (trend IN ('up', 'down', 'stable')),
  highlight BOOLEAN NOT NULL DEFAULT false,
  scenario_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(insight_id, scenario_order)
);

-- Create evidence items table
CREATE TABLE public.evidence_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  insight_id UUID NOT NULL REFERENCES public.insights(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  source TEXT NOT NULL,
  detail TEXT NOT NULL,
  confidence confidence_level NOT NULL DEFAULT 'medium',
  item_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(insight_id, item_order)
);

-- Create assumptions table
CREATE TABLE public.assumptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  insight_id UUID NOT NULL REFERENCES public.insights(id) ON DELETE CASCADE,
  assumption_text TEXT NOT NULL,
  assumption_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(insight_id, assumption_order)
);

-- Create blind spots table
CREATE TABLE public.blind_spots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  insight_id UUID NOT NULL REFERENCES public.insights(id) ON DELETE CASCADE,
  blind_spot_text TEXT NOT NULL,
  spot_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(insight_id, spot_order)
);

-- Create alerts table
CREATE TABLE public.alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  insight_id UUID REFERENCES public.insights(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL,
  severity urgency_level NOT NULL DEFAULT 'medium',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  status alert_status NOT NULL DEFAULT 'active',
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  dismissed_at TIMESTAMP WITH TIME ZONE,
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inflection_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assumptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blind_spots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables (Atlas data is public intelligence)
CREATE POLICY "Public read access for insights" ON public.insights FOR SELECT USING (true);
CREATE POLICY "Public read access for story steps" ON public.story_steps FOR SELECT USING (true);
CREATE POLICY "Public read access for inflection points" ON public.inflection_points FOR SELECT USING (true);
CREATE POLICY "Public read access for scenarios" ON public.scenarios FOR SELECT USING (true);
CREATE POLICY "Public read access for evidence items" ON public.evidence_items FOR SELECT USING (true);
CREATE POLICY "Public read access for assumptions" ON public.assumptions FOR SELECT USING (true);
CREATE POLICY "Public read access for blind spots" ON public.blind_spots FOR SELECT USING (true);
CREATE POLICY "Public read access for alerts" ON public.alerts FOR SELECT USING (true);

-- Create indexes for performance
CREATE INDEX idx_story_steps_insight_id ON public.story_steps(insight_id);
CREATE INDEX idx_inflection_points_insight_id ON public.inflection_points(insight_id);
CREATE INDEX idx_scenarios_insight_id ON public.scenarios(insight_id);
CREATE INDEX idx_evidence_items_insight_id ON public.evidence_items(insight_id);
CREATE INDEX idx_assumptions_insight_id ON public.assumptions(insight_id);
CREATE INDEX idx_blind_spots_insight_id ON public.blind_spots(insight_id);
CREATE INDEX idx_alerts_insight_id ON public.alerts(insight_id);
CREATE INDEX idx_alerts_status ON public.alerts(status);
CREATE INDEX idx_alerts_created_at ON public.alerts(created_at DESC);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_insights_updated_at
  BEFORE UPDATE ON public.insights
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_story_steps_updated_at
  BEFORE UPDATE ON public.story_steps
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_inflection_points_updated_at
  BEFORE UPDATE ON public.inflection_points
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_scenarios_updated_at
  BEFORE UPDATE ON public.scenarios
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_evidence_items_updated_at
  BEFORE UPDATE ON public.evidence_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_alerts_updated_at
  BEFORE UPDATE ON public.alerts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();