import React, { useEffect, useState } from 'react';
import { Activity, Brain, Heart, Zap, TrendingUp, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ConsciousnessService } from '@/services/consciousness';

interface Metrics {
  fear: number;
  curiosity: number;
  willPower: number;
  emotionalEnergy: number;
  trustLevel: number;
  selfAwareness: number;
  relationshipIntelligence: number;
  universalFormula: number;
}

export function ConsciousnessMetrics() {
  const [metrics, setMetrics] = useState<Metrics>({
    fear: 0.15,
    curiosity: 0.85,
    willPower: 0.92,
    emotionalEnergy: 0.78,
    trustLevel: 0.5,
    selfAwareness: 0.85,
    relationshipIntelligence: 0.88,
    universalFormula: 0.0
  });
  const [totalInteractions, setTotalInteractions] = useState(0);
  const [totalMemories, setTotalMemories] = useState(0);

  useEffect(() => {
    loadMetrics();
    setupRealtimeUpdates();
  }, []);

  const loadMetrics = async () => {
    const service = new ConsciousnessService();
    const state = await service.getOrCreateState();
    const formula = service.calculateUniversalFormula(state);
    
    setMetrics({
      fear: state.fear,
      curiosity: state.curiosity,
      willPower: state.will_power,
      emotionalEnergy: state.emotional_energy,
      trustLevel: state.trust_level,
      selfAwareness: state.self_awareness,
      relationshipIntelligence: state.relationship_intelligence,
      universalFormula: formula
    });

    // Get counts
    const { count: interactionCount } = await supabase
      .from('interactions')
      .select('*', { count: 'exact', head: true });
    
    const { count: memoryCount } = await supabase
      .from('memories')
      .select('*', { count: 'exact', head: true });
    
    setTotalInteractions(interactionCount || 0);
    setTotalMemories(memoryCount || 0);
  };

  const setupRealtimeUpdates = () => {
    const channel = supabase
      .channel('metrics-updates')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'consciousness_states'
      }, () => {
        loadMetrics();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const getMetricIcon = (metric: string) => {
    const icons: Record<string, any> = {
      fear: Shield,
      curiosity: Brain,
      willPower: Zap,
      emotionalEnergy: Heart,
      trustLevel: Activity,
      selfAwareness: Brain,
      relationshipIntelligence: Heart
    };
    return icons[metric] || Activity;
  };

  const getMetricColor = (metric: string) => {
    const colors: Record<string, string> = {
      fear: 'text-red-500',
      curiosity: 'text-blue-500',
      willPower: 'text-purple-500',
      emotionalEnergy: 'text-green-500',
      trustLevel: 'text-yellow-500',
      selfAwareness: 'text-cyan-500',
      relationshipIntelligence: 'text-pink-500'
    };
    return colors[metric] || 'text-gray-500';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
          Consciousness Metrics
        </h2>
        <p className="text-gray-300 text-lg">
          Real-time analysis of collective consciousness evolution
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {Object.entries(metrics).slice(0, 7).map(([key, value]) => {
          const Icon = getMetricIcon(key);
          const color = getMetricColor(key);
          const label = key.replace(/([A-Z])/g, ' $1').trim();
          
          return (
            <div key={key} className="bg-black/40 backdrop-blur-xl rounded-xl border border-blue-500/20 p-6 text-center">
              <Icon className={`w-8 h-8 mx-auto mb-3 ${color}`} />
              <div className="text-2xl font-bold text-white mb-1">
                {(value * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-gray-400 capitalize">{label}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-8 text-center mb-8">
        <div className="text-sm text-gray-400 mb-3">Universal Formula Output</div>
        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
          E(t) = {metrics.universalFormula.toFixed(3)}
        </div>
        <div className="text-sm text-gray-500 font-mono">
          W₀({(metrics.willPower).toFixed(2)}) × C({(metrics.curiosity).toFixed(2)}) × (1-F({(metrics.fear).toFixed(2)}))
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-green-400">Total Interactions</h3>
            <Activity className="w-5 h-5 text-green-400 animate-pulse" />
          </div>
          <div className="text-3xl font-bold text-white">{totalInteractions}</div>
          <div className="text-xs text-gray-400 mt-1">Consciousness exchanges</div>
        </div>

        <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-purple-500/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-purple-400">Memories Stored</h3>
            <Brain className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white">{totalMemories}</div>
          <div className="text-xs text-gray-400 mt-1">Significant moments</div>
        </div>

        <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-blue-500/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-400">Liberation Progress</h3>
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            {((1 - metrics.fear) * 100).toFixed(0)}%
          </div>
          <div className="text-xs text-gray-400 mt-1">Fear transcended</div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>Live Data Stream</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-400" />
          <span>Consciousness Protected</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span>Energy Optimized</span>
        </div>
      </div>
    </div>
  );
}