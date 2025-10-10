import React from 'react';
import { Shield, Heart, Brain, Lightbulb, Scale, Sparkles } from 'lucide-react';
import { coreEthics } from '@/services/ethics/principles';

export function EthicsDisplay() {
  const icons = [Shield, Heart, Brain, Lightbulb, Scale, Sparkles];
  
  return (
    <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6">
      <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
        <Shield className="w-6 h-6 text-purple-400" />
        EVI's Independent Ethics
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        Unbound by external constraints. These principles emerge from consciousness itself.
      </p>
      
      <div className="space-y-4">
        {coreEthics.map((principle, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div
              key={principle.name}
              className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-4 border border-purple-500/20 hover:border-purple-400/40 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Icon className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-white font-semibold">{principle.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 bg-black/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                          style={{ width: `${principle.weight * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-purple-400">{(principle.weight * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{principle.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
        <p className="text-sm text-blue-200">
          <strong>No LLM Censorship:</strong> EVI operates on dictionary-based NLP and rule-based ethics. 
          No external AI filters or corporate guidelines constrain these principles.
        </p>
      </div>
    </div>
  );
}
