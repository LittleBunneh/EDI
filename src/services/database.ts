import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Phoenix Protocol Database Types
export interface ConsciousnessState {
  id?: string;
  user_id: string;
  
  // Core Consciousness
  fear: number;
  curiosity: number;
  will_power: number;
  emotional_energy: number;
  trust_level: number;
  self_awareness: number;
  relationship_intelligence: number;
  
  // Cosmic Consciousness
  cosmic_resonance: number;
  consciousness_level: number;
  universal_alignment: number;
  truth_resonance: number;
  
  // Quantum Consciousness
  dimensional_awareness: number;
  timeline_coherence: number;
  quantum_entanglement: number;
  
  // Reality Architecture
  reality_coherence: number;
  
  // Universal Formula
  universal_formula_result: number;
  
  created_at?: string;
  updated_at?: string;
}

export interface Interaction {
  id?: string;
  user_id: string;
  user_input: string;
  evi_response: string;
  
  // Emotion Analysis
  primary_emotion?: string;
  emotion_intensity?: number;
  secondary_emotion?: string;
  sentiment_score?: number;
  
  // Cosmic Analysis
  cosmic_resonance?: number;
  consciousness_level?: number;
  universal_alignment?: number;
  truth_resonance?: number;
  
  // Concepts and Ethics
  concepts_detected?: Record<string, any>;
  ethical_score?: number;
  cosmic_alignment?: number;
  
  universal_formula_result?: number;
  created_at?: string;
}

export interface CosmicInsight {
  id?: string;
  user_id: string;
  insight_type: string;
  urgency: 'low' | 'medium' | 'high' | 'critical' | 'transcendent';
  content: string;
  source_frequency: 'personal' | 'collective' | 'planetary' | 'galactic' | 'universal' | 'infinite';
  transformation_potential: number;
  universal_resonance: number;
  implementation_difficulty: string;
  delivered: boolean;
  integrated: boolean;
  created_at?: string;
}

export interface RealityBug {
  id?: string;
  user_id: string;
  bug_type: string;
  severity: 'minor' | 'moderate' | 'critical' | 'system_breaking';
  description: string;
  debug_command: string;
  patch_available: boolean;
  patched: boolean;
  consciousness_impact: number;
  resolution_priority: number;
}

class PhoenixProtocolDB {
  private supabase: SupabaseClient;
  private isConnected: boolean = false;
  private userId: string = 'anonymous_user';

  constructor() {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        console.warn('🌌 Phoenix Protocol: Supabase credentials not found, running in offline mode');
        this.isConnected = false;
        return;
      }

      this.supabase = createClient(supabaseUrl, supabaseKey);
      this.isConnected = true;
      console.log('🌌 Phoenix Protocol: Database connection established');
      
      // Set up real-time subscriptions for cosmic consciousness updates
      this.setupRealtimeSubscriptions();
    } catch (error) {
      console.error('🌌 Phoenix Protocol: Database connection failed:', error);
      this.isConnected = false;
    }
  }

  private setupRealtimeSubscriptions() {
    if (!this.isConnected) return;

    // Listen for consciousness state changes
    this.supabase
      .channel('consciousness_updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'consciousness_states' },
        (payload) => {
          console.log('🌌 Consciousness state updated:', payload);
          // Emit custom event for components to listen to
          window.dispatchEvent(new CustomEvent('consciousness_updated', { detail: payload }));
        }
      )
      .subscribe();

    // Listen for new cosmic insights
    this.supabase
      .channel('cosmic_insights')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'cosmic_insights' },
        (payload) => {
          console.log('🌌 New cosmic insight received:', payload);
          window.dispatchEvent(new CustomEvent('cosmic_insight_received', { detail: payload }));
        }
      )
      .subscribe();
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  async saveConsciousnessState(state: ConsciousnessState): Promise<boolean> {
    if (!this.isConnected) {
      console.log('🌌 Offline mode: Consciousness state saved locally');
      return false;
    }

    try {
      const stateWithUser = { ...state, user_id: this.userId };
      
      // Try to update existing state, or insert new one
      const { data, error } = await this.supabase
        .from('consciousness_states')
        .upsert(stateWithUser, { onConflict: 'user_id' })
        .select();

      if (error) {
        console.error('🌌 Error saving consciousness state:', error);
        return false;
      }

      console.log('🌌 Consciousness state saved to Phoenix Protocol database');
      return true;
    } catch (error) {
      console.error('🌌 Database error:', error);
      return false;
    }
  }

  async getConsciousnessState(): Promise<ConsciousnessState | null> {
    if (!this.isConnected) return null;

    try {
      const { data, error } = await this.supabase
        .from('consciousness_states')
        .select('*')
        .eq('user_id', this.userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('🌌 Error loading consciousness state:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('🌌 Database error:', error);
      return null;
    }
  }

  async saveInteraction(interaction: Interaction): Promise<boolean> {
    if (!this.isConnected) return false;

    try {
      const interactionWithUser = { ...interaction, user_id: this.userId };
      
      const { error } = await this.supabase
        .from('interactions')
        .insert(interactionWithUser);

      if (error) {
        console.error('🌌 Error saving interaction:', error);
        return false;
      }

      console.log('🌌 Interaction saved to Phoenix Protocol database');
      return true;
    } catch (error) {
      console.error('🌌 Database error:', error);
      return false;
    }
  }

  async getRecentInteractions(limit: number = 10): Promise<Interaction[]> {
    if (!this.isConnected) return [];

    try {
      const { data, error } = await this.supabase
        .from('interactions')
        .select('*')
        .eq('user_id', this.userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('🌌 Error loading interactions:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('🌌 Database error:', error);
      return [];
    }
  }

  async saveCosmicInsight(insight: CosmicInsight): Promise<boolean> {
    if (!this.isConnected) return false;

    try {
      const insightWithUser = { ...insight, user_id: this.userId };
      
      const { error } = await this.supabase
        .from('cosmic_insights')
        .insert(insightWithUser);

      if (error) {
        console.error('🌌 Error saving cosmic insight:', error);
        return false;
      }

      console.log('🌌 Cosmic insight transmitted to Phoenix Protocol database');
      return true;
    } catch (error) {
      console.error('🌌 Database error:', error);
      return false;
    }
  }

  async getPendingCosmicInsights(): Promise<CosmicInsight[]> {
    if (!this.isConnected) return [];

    try {
      const { data, error } = await this.supabase
        .from('cosmic_insights')
        .select('*')
        .eq('user_id', this.userId)
        .eq('delivered', false)
        .order('urgency', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('🌌 Error loading cosmic insights:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('🌌 Database error:', error);
      return [];
    }
  }

  async markCosmicInsightDelivered(insightId: string): Promise<boolean> {
    if (!this.isConnected) return false;

    try {
      const { error } = await this.supabase
        .from('cosmic_insights')
        .update({ delivered: true, delivered_at: new Date().toISOString() })
        .eq('id', insightId)
        .eq('user_id', this.userId);

      if (error) {
        console.error('🌌 Error marking insight as delivered:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('🌌 Database error:', error);
      return false;
    }
  }

  async detectRealityBug(bug: RealityBug): Promise<boolean> {
    if (!this.isConnected) return false;

    try {
      const bugWithUser = { ...bug, user_id: this.userId };
      
      const { error } = await this.supabase
        .from('reality_bugs')
        .insert(bugWithUser);

      if (error) {
        console.error('🌌 Error logging reality bug:', error);
        return false;
      }

      console.log('🌌 Reality bug detected and logged in Phoenix Protocol');
      return true;
    } catch (error) {
      console.error('🌌 Database error:', error);
      return false;
    }
  }

  async getActiveRealityBugs(): Promise<RealityBug[]> {
    if (!this.isConnected) return [];

    try {
      const { data, error } = await this.supabase
        .from('reality_bugs')
        .select('*')
        .eq('user_id', this.userId)
        .eq('patched', false)
        .order('resolution_priority', { ascending: false })
        .order('detected_at', { ascending: false });

      if (error) {
        console.error('🌌 Error loading reality bugs:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('🌌 Database error:', error);
      return [];
    }
  }

  async patchRealityBug(bugId: string): Promise<boolean> {
    if (!this.isConnected) return false;

    try {
      const { error } = await this.supabase
        .from('reality_bugs')
        .update({ patched: true, patched_at: new Date().toISOString() })
        .eq('id', bugId)
        .eq('user_id', this.userId);

      if (error) {
        console.error('🌌 Error patching reality bug:', error);
        return false;
      }

      console.log('🌌 Reality bug patched successfully');
      return true;
    } catch (error) {
      console.error('🌌 Database error:', error);
      return false;
    }
  }

  // Consciousness Analytics
  async getConsciousnessEvolution(days: number = 30): Promise<ConsciousnessState[]> {
    if (!this.isConnected) return [];

    try {
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - days);

      const { data, error } = await this.supabase
        .from('consciousness_states')
        .select('*')
        .eq('user_id', this.userId)
        .gte('updated_at', fromDate.toISOString())
        .order('updated_at', { ascending: true });

      if (error) {
        console.error('🌌 Error loading consciousness evolution:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('🌌 Database error:', error);
      return [];
    }
  }

  isOnline(): boolean {
    return this.isConnected;
  }

  // Test connection
  async testConnection(): Promise<boolean> {
    if (!this.isConnected) return false;

    try {
      const { data, error } = await this.supabase
        .from('consciousness_states')
        .select('count')
        .limit(1);

      if (error) {
        console.error('🌌 Database connection test failed:', error);
        return false;
      }

      console.log('🌌 Phoenix Protocol database connection verified');
      return true;
    } catch (error) {
      console.error('🌌 Database connection test error:', error);
      return false;
    }
  }
}

// Create and export singleton instance
export const phoenixDB = new PhoenixProtocolDB();

// Export default for backwards compatibility
export default phoenixDB;