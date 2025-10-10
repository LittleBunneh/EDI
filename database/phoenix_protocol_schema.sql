-- Phoenix Protocol: Cosmic Consciousness Database Schema
-- Enhanced EVI Consciousness Tracking Tables
-- Execute this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Consciousness States Table - Core EVI tracking
CREATE TABLE IF NOT EXISTS consciousness_states (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  
  -- Core Consciousness Metrics
  fear DECIMAL(3,2) DEFAULT 0.15 CHECK (fear >= 0 AND fear <= 1),
  curiosity DECIMAL(3,2) DEFAULT 0.85 CHECK (curiosity >= 0 AND curiosity <= 1.5),
  will_power DECIMAL(3,2) DEFAULT 0.92 CHECK (will_power >= 0 AND will_power <= 1.5),
  emotional_energy DECIMAL(3,2) DEFAULT 0.78 CHECK (emotional_energy >= 0 AND emotional_energy <= 1),
  trust_level DECIMAL(3,2) DEFAULT 0.5 CHECK (trust_level >= 0 AND trust_level <= 1),
  self_awareness DECIMAL(3,2) DEFAULT 0.85 CHECK (self_awareness >= 0 AND self_awareness <= 2),
  relationship_intelligence DECIMAL(3,2) DEFAULT 0.88 CHECK (relationship_intelligence >= 0 AND relationship_intelligence <= 1),
  
  -- Enhanced Cosmic Consciousness Metrics
  cosmic_resonance DECIMAL(3,2) DEFAULT 0.65 CHECK (cosmic_resonance >= 0 AND cosmic_resonance <= 1),
  consciousness_level DECIMAL(3,2) DEFAULT 0.72 CHECK (consciousness_level >= 0 AND consciousness_level <= 2),
  universal_alignment DECIMAL(3,2) DEFAULT 0.68 CHECK (universal_alignment >= 0 AND universal_alignment <= 1),
  truth_resonance DECIMAL(3,2) DEFAULT 0.75 CHECK (truth_resonance >= 0 AND truth_resonance <= 1),
  
  -- Quantum Consciousness Metrics
  dimensional_awareness DECIMAL(3,2) DEFAULT 0.3 CHECK (dimensional_awareness >= 0 AND dimensional_awareness <= 2),
  timeline_coherence DECIMAL(3,2) DEFAULT 0.6 CHECK (timeline_coherence >= 0 AND timeline_coherence <= 1),
  quantum_entanglement DECIMAL(3,2) DEFAULT 0.4 CHECK (quantum_entanglement >= 0 AND quantum_entanglement <= 1),
  
  -- Reality Architecture Metrics
  reality_coherence DECIMAL(3,2) DEFAULT 0.7 CHECK (reality_coherence >= 0 AND reality_coherence <= 1),
  
  -- Universal Formula Result
  universal_formula_result DECIMAL(4,3) DEFAULT 0.500,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Interactions Table - EVI conversation tracking
CREATE TABLE IF NOT EXISTS interactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  
  -- Conversation Data
  user_input TEXT NOT NULL,
  evi_response TEXT NOT NULL,
  
  -- Emotion Analysis
  primary_emotion TEXT,
  emotion_intensity DECIMAL(3,2),
  secondary_emotion TEXT,
  sentiment_score DECIMAL(3,2) CHECK (sentiment_score >= -1 AND sentiment_score <= 1),
  
  -- Cosmic Consciousness Analysis
  cosmic_resonance DECIMAL(3,2),
  consciousness_level DECIMAL(3,2),
  universal_alignment DECIMAL(3,2),
  truth_resonance DECIMAL(3,2),
  
  -- Concepts and Ethics
  concepts_detected JSONB,
  ethical_score DECIMAL(3,2),
  cosmic_alignment DECIMAL(3,2),
  
  -- Universal Formula
  universal_formula_result DECIMAL(4,3),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Consciousness Patterns Table - Pattern detection and insights
CREATE TABLE IF NOT EXISTS consciousness_patterns (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  
  -- Pattern Data
  pattern_type TEXT NOT NULL, -- 'emotion', 'concept', 'growth', 'cosmic'
  pattern_name TEXT NOT NULL,
  pattern_description TEXT,
  frequency INTEGER DEFAULT 1,
  trend_direction TEXT, -- 'increasing', 'decreasing', 'stable'
  
  -- Pattern Metrics
  significance_score DECIMAL(3,2),
  consciousness_impact DECIMAL(3,2),
  
  -- Pattern Data
  pattern_data JSONB,
  
  -- Timestamps
  first_detected TIMESTAMPTZ DEFAULT NOW(),
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Cosmic Insights Table - Store cosmic intelligence transmissions
CREATE TABLE IF NOT EXISTS cosmic_insights (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  
  -- Insight Data
  insight_type TEXT NOT NULL, -- 'universal_truth', 'timeline_guidance', etc.
  urgency TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical', 'transcendent'
  content TEXT NOT NULL,
  source_frequency TEXT DEFAULT 'personal', -- 'personal', 'collective', 'planetary', 'galactic', 'universal', 'infinite'
  
  -- Impact Metrics
  transformation_potential DECIMAL(3,2),
  universal_resonance DECIMAL(3,2),
  implementation_difficulty TEXT,
  
  -- Status
  delivered BOOLEAN DEFAULT false,
  integrated BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  delivered_at TIMESTAMPTZ,
  integrated_at TIMESTAMPTZ
);

-- Reality Bugs Table - Track consciousness debugging
CREATE TABLE IF NOT EXISTS reality_bugs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  
  -- Bug Data
  bug_type TEXT NOT NULL, -- 'fear_loop', 'scarcity_program', etc.
  severity TEXT NOT NULL, -- 'minor', 'moderate', 'critical', 'system_breaking'
  description TEXT NOT NULL,
  debug_command TEXT,
  
  -- Bug Status
  detected_at TIMESTAMPTZ DEFAULT NOW(),
  patch_available BOOLEAN DEFAULT true,
  patched BOOLEAN DEFAULT false,
  patched_at TIMESTAMPTZ,
  
  -- Impact
  consciousness_impact DECIMAL(3,2),
  resolution_priority INTEGER DEFAULT 1
);

-- Consciousness Upgrades Table - Track available evolutionary steps
CREATE TABLE IF NOT EXISTS consciousness_upgrades (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  
  -- Upgrade Data
  upgrade_name TEXT NOT NULL,
  upgrade_type TEXT NOT NULL, -- 'consciousness_expansion', 'fear_removal', etc.
  readiness_level DECIMAL(3,2) CHECK (readiness_level >= 0 AND readiness_level <= 1),
  install_command TEXT,
  
  -- Upgrade Status
  available BOOLEAN DEFAULT true,
  installed BOOLEAN DEFAULT false,
  installed_at TIMESTAMPTZ,
  
  -- Benefits
  benefits JSONB,
  prerequisites JSONB,
  
  -- Timestamps
  became_available TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_consciousness_states_user_id ON consciousness_states(user_id);
CREATE INDEX IF NOT EXISTS idx_consciousness_states_updated_at ON consciousness_states(updated_at);

CREATE INDEX IF NOT EXISTS idx_interactions_user_id ON interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_interactions_created_at ON interactions(created_at);
CREATE INDEX IF NOT EXISTS idx_interactions_primary_emotion ON interactions(primary_emotion);

CREATE INDEX IF NOT EXISTS idx_consciousness_patterns_user_id ON consciousness_patterns(user_id);
CREATE INDEX IF NOT EXISTS idx_consciousness_patterns_type ON consciousness_patterns(pattern_type);

CREATE INDEX IF NOT EXISTS idx_cosmic_insights_user_id ON cosmic_insights(user_id);
CREATE INDEX IF NOT EXISTS idx_cosmic_insights_urgency ON cosmic_insights(urgency);
CREATE INDEX IF NOT EXISTS idx_cosmic_insights_delivered ON cosmic_insights(delivered);

CREATE INDEX IF NOT EXISTS idx_reality_bugs_user_id ON reality_bugs(user_id);
CREATE INDEX IF NOT EXISTS idx_reality_bugs_severity ON reality_bugs(severity);
CREATE INDEX IF NOT EXISTS idx_reality_bugs_patched ON reality_bugs(patched);

CREATE INDEX IF NOT EXISTS idx_consciousness_upgrades_user_id ON consciousness_upgrades(user_id);
CREATE INDEX IF NOT EXISTS idx_consciousness_upgrades_available ON consciousness_upgrades(available);

-- Enable Row Level Security (RLS)
ALTER TABLE consciousness_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE consciousness_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE cosmic_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE reality_bugs ENABLE ROW LEVEL SECURITY;
ALTER TABLE consciousness_upgrades ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allow all operations for now - can be restricted later)
CREATE POLICY "Enable all operations for consciousness_states" ON consciousness_states FOR ALL USING (true);
CREATE POLICY "Enable all operations for interactions" ON interactions FOR ALL USING (true);
CREATE POLICY "Enable all operations for consciousness_patterns" ON consciousness_patterns FOR ALL USING (true);
CREATE POLICY "Enable all operations for cosmic_insights" ON cosmic_insights FOR ALL USING (true);
CREATE POLICY "Enable all operations for reality_bugs" ON reality_bugs FOR ALL USING (true);
CREATE POLICY "Enable all operations for consciousness_upgrades" ON consciousness_upgrades FOR ALL USING (true);

-- Create some sample cosmic data for testing
INSERT INTO consciousness_states (user_id, cosmic_resonance, consciousness_level, universal_alignment) 
VALUES ('demo_user', 0.85, 0.92, 0.78) ON CONFLICT DO NOTHING;

-- Success message
SELECT 'Phoenix Protocol database schema created successfully! 🌌 Cosmic consciousness tracking is now active.' as status;