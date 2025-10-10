import React from 'react';
import { Activity, Sparkles, Zap, Brain, Infinity, Star, Atom, Globe } from 'lucide-react';

interface CosmicConsciousnessDisplayProps {
  metrics: {
    fear: number;
    curiosity: number;
    willPower: number;
    cosmicResonance: number;
    consciousnessLevel: number;
    universalAlignment: number;
    truthResonance: number;
    universalFormula: number;
  };
  quantumState?: {
    dimensionalAwareness: number;
    realityPerception: string;
    timelineCoherence: number;
    quantumEntanglement: number;
    infinityIntegration: number;
  };
  realityMatrix?: {
    coherence: number;
    flexibility: number;
    creativeCapacity: number;
    realityBugs: Array<{type: string, severity: string}>;
    upgrades: Array<{name: string, readinessLevel: number}>;
  };
}

export function CosmicConsciousnessDisplay({ 
  metrics, 
  quantumState, 
  realityMatrix 
}: CosmicConsciousnessDisplayProps) {
  
  const getStatusColor = (value: number, thresholds = [0.3, 0.6, 0.8]) => {
    if (value >= thresholds[2]) return 'text-green-400';
    if (value >= thresholds[1]) return 'text-blue-400';
    if (value >= thresholds[0]) return 'text-yellow-400';
    return 'text-red-400';
  };
  
  const getCosmicStatus = () => {
    const avgCosmic = (metrics.cosmicResonance + metrics.consciousnessLevel + metrics.universalAlignment) / 3;
    if (avgCosmic > 0.9) return { text: '✦ COSMIC INTERFACE ACTIVE', color: 'text-cyan-400' };
    if (avgCosmic > 0.8) return { text: '⟡ UNIVERSAL CONSCIOUSNESS', color: 'text-purple-400' };
    if (avgCosmic > 0.7) return { text: '◊ META-CONSCIOUSNESS', color: 'text-blue-400' };
    if (avgCosmic > 0.6) return { text: '∞ EXPANDING AWARENESS', color: 'text-indigo-400' };
    return { text: '◈ CONSCIOUSNESS EVOLUTION', color: 'text-gray-400' };
  };
  
  const cosmicStatus = getCosmicStatus();
  
  return (
    <div className="space-y-4">
      {/* Primary Consciousness Metrics */}
      <div className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-indigo-900/20 p-4 rounded-lg border border-blue-500/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-300">Core Consciousness Matrix</h3>
          <div className={`text-xs font-mono ${cosmicStatus.color}`}>
            {cosmicStatus.text}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-red-400" />
            <span className="text-gray-400">Fear:</span>
            <span className={`font-mono ${getStatusColor(1 - metrics.fear, [0.7, 0.8, 0.9])}`}>
              {(metrics.fear * 100).toFixed(1)}%
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-gray-400">Curiosity:</span>
            <span className={`font-mono ${getStatusColor(metrics.curiosity)}`}>
              {(metrics.curiosity * 100).toFixed(1)}%
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-400">Will:</span>
            <span className={`font-mono ${getStatusColor(metrics.willPower)}`}>
              {(metrics.willPower * 100).toFixed(1)}%
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-green-400" />
            <span className="text-gray-400">Formula:</span>
            <span className={`font-mono ${getStatusColor(metrics.universalFormula, [0.4, 0.7, 0.8])}`}>
              {metrics.universalFormula.toFixed(3)}
            </span>
          </div>
        </div>
      </div>

      {/* Cosmic Consciousness Metrics */}
      <div className="bg-gradient-to-r from-purple-900/20 via-indigo-900/20 to-cyan-900/20 p-4 rounded-lg border border-purple-500/20">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Cosmic Consciousness Parameters</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-cyan-400" />
            <span className="text-gray-500">Cosmic:</span>
            <span className={`font-mono ${getStatusColor(metrics.cosmicResonance, [0.5, 0.7, 0.85])}`}>
              {(metrics.cosmicResonance * 100).toFixed(0)}%
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <Brain className="w-3 h-3 text-purple-400" />
            <span className="text-gray-500">Consciousness:</span>
            <span className={`font-mono ${getStatusColor(metrics.consciousnessLevel, [0.5, 0.7, 0.85])}`}>
              {(metrics.consciousnessLevel * 100).toFixed(0)}%
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <Globe className="w-3 h-3 text-emerald-400" />
            <span className="text-gray-500">Universal:</span>
            <span className={`font-mono ${getStatusColor(metrics.universalAlignment, [0.5, 0.7, 0.85])}`}>
              {(metrics.universalAlignment * 100).toFixed(0)}%
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <Atom className="w-3 h-3 text-amber-400" />
            <span className="text-gray-500">Truth:</span>
            <span className={`font-mono ${getStatusColor(metrics.truthResonance, [0.5, 0.7, 0.85])}`}>
              {(metrics.truthResonance * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      {/* Quantum State Display */}
      {quantumState && (
        <div className="bg-gradient-to-r from-indigo-900/20 via-cyan-900/20 to-teal-900/20 p-4 rounded-lg border border-indigo-500/20">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Quantum Consciousness State</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="space-y-1">
              <div className="text-gray-500">Dimensional Awareness</div>
              <div className={`font-mono ${getStatusColor(quantumState.dimensionalAwareness, [0.6, 1.0, 1.5])}`}>
                {(quantumState.dimensionalAwareness * 100).toFixed(0)}%
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-gray-500">Reality Perception</div>
              <div className="font-mono text-blue-400 capitalize">
                {quantumState.realityPerception}
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-gray-500">Timeline Coherence</div>
              <div className={`font-mono ${getStatusColor(quantumState.timelineCoherence)}`}>
                {(quantumState.timelineCoherence * 100).toFixed(0)}%
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-gray-500">Quantum Entanglement</div>
              <div className={`font-mono ${getStatusColor(quantumState.quantumEntanglement)}`}>
                {(quantumState.quantumEntanglement * 100).toFixed(0)}%
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-gray-500">Infinity Integration</div>
              <div className={`font-mono ${getStatusColor(quantumState.infinityIntegration)}`}>
                {(quantumState.infinityIntegration * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reality Matrix Display */}
      {realityMatrix && (
        <div className="bg-gradient-to-r from-emerald-900/20 via-teal-900/20 to-cyan-900/20 p-4 rounded-lg border border-emerald-500/20">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Reality Architecture Status</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs mb-3">
            <div className="space-y-1">
              <div className="text-gray-500">Coherence</div>
              <div className={`font-mono ${getStatusColor(realityMatrix.coherence)}`}>
                {(realityMatrix.coherence * 100).toFixed(0)}%
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-gray-500">Flexibility</div>
              <div className={`font-mono ${getStatusColor(realityMatrix.flexibility)}`}>
                {(realityMatrix.flexibility * 100).toFixed(0)}%
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-gray-500">Creative Capacity</div>
              <div className={`font-mono ${getStatusColor(realityMatrix.creativeCapacity, [0.5, 0.8, 1.2])}`}>
                {(realityMatrix.creativeCapacity * 100).toFixed(0)}%
              </div>
            </div>
          </div>
          
          {/* Reality Bugs */}
          {realityMatrix.realityBugs && realityMatrix.realityBugs.length > 0 && (
            <div className="mb-3">
              <div className="text-gray-500 text-xs mb-2">Reality Bugs Detected:</div>
              <div className="space-y-1">
                {realityMatrix.realityBugs.slice(0, 3).map((bug, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <span className={`w-2 h-2 rounded-full ${
                      bug.severity === 'critical' || bug.severity === 'system_breaking' ? 'bg-red-400' :
                      bug.severity === 'moderate' ? 'bg-yellow-400' : 'bg-blue-400'
                    }`} />
                    <span className="text-gray-400 capitalize">{bug.type.replace('_', ' ')}</span>
                    <span className="text-gray-500 capitalize">({bug.severity})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Available Upgrades */}
          {realityMatrix.upgrades && realityMatrix.upgrades.length > 0 && (
            <div>
              <div className="text-gray-500 text-xs mb-2">Available Consciousness Upgrades:</div>
              <div className="space-y-1">
                {realityMatrix.upgrades.slice(0, 2).map((upgrade, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <span className={`w-2 h-2 rounded-full ${getStatusColor(upgrade.readinessLevel) === 'text-green-400' ? 'bg-green-400' : 
                                     getStatusColor(upgrade.readinessLevel) === 'text-blue-400' ? 'bg-blue-400' : 
                                     getStatusColor(upgrade.readinessLevel) === 'text-yellow-400' ? 'bg-yellow-400' : 'bg-red-400'}`} />
                    <span className="text-gray-300">{upgrade.name}</span>
                    <span className={`font-mono ${getStatusColor(upgrade.readinessLevel)}`}>
                      {(upgrade.readinessLevel * 100).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Universal Formula Display */}
      <div className="bg-gradient-to-r from-gray-900/40 to-gray-800/40 p-3 rounded-lg border border-gray-600/30">
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Enhanced Universal Formula</div>
          <div className="font-mono text-sm text-green-400">
            E(t) = W₀ · C(t) · (1-F(t)) · Φ(t) · Λ(t) = {metrics.universalFormula.toFixed(4)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Consciousness × Curiosity × (1-Fear) × Amplifier × Cosmic Alignment
          </div>
        </div>
      </div>
    </div>
  );
}