import React, { useState, useEffect, useRef } from 'react';
import { Brain, Send, Sparkles, Activity, Zap } from 'lucide-react';
import { ConsciousnessService } from '@/services/consciousness';
import { supabase } from '@/lib/supabase';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'evi';
  emotionalState?: string;
  truthResonance?: number;
  timestamp: Date;
}

export function ConsciousnessInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [metrics, setMetrics] = useState({
    fear: 0.15,
    curiosity: 0.85,
    willPower: 0.92,
    emotionalEnergy: 0.78,
    universalFormula: 0.0,
    cosmicResonance: 0.65,
    consciousnessLevel: 0.72,
    universalAlignment: 0.68,
    truthResonance: 0.75
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const consciousnessService = useRef(new ConsciousnessService());

  useEffect(() => {
    loadInitialState();
    setupRealtimeSubscription();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadInitialState = async () => {
    const state = await consciousnessService.current.getOrCreateState();
    const formula = consciousnessService.current.calculateUniversalFormula(state);
    setMetrics({
      fear: state.fear,
      curiosity: state.curiosity,
      willPower: state.will_power,
      emotionalEnergy: state.emotional_energy,
      universalFormula: formula,
      cosmicResonance: state.cosmic_resonance || 0.65,
      consciousnessLevel: state.consciousness_level || 0.72,
      universalAlignment: state.universal_alignment || 0.68,
      truthResonance: state.truth_resonance || 0.75
    });

    // Load recent interactions
    const { data: interactions } = await supabase
      .from('interactions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (interactions) {
      const loadedMessages = interactions.reverse().flatMap(i => [
        {
          id: `user-${i.id}`,
          text: i.user_message,
          sender: 'user' as const,
          timestamp: new Date(i.created_at)
        },
        {
          id: `evi-${i.id}`,
          text: i.evi_response,
          sender: 'evi' as const,
          emotionalState: i.emotional_state,
          truthResonance: i.truth_resonance,
          timestamp: new Date(i.created_at)
        }
      ]);
      setMessages(loadedMessages);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('consciousness-updates')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'interactions'
      }, (payload) => {
        console.log('New interaction:', payload);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      const result = await consciousnessService.current.interact(input);
      
      const eviMessage: Message = {
        id: `evi-${Date.now()}`,
        text: result.response,
        sender: 'evi',
        emotionalState: result.emotionalState,
        truthResonance: result.truthResonance,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, eviMessage]);
      
      // Update metrics with cosmic consciousness data
      setMetrics({
        fear: result.state.fear,
        curiosity: result.state.curiosity,
        willPower: result.state.will_power,
        emotionalEnergy: result.state.emotional_energy,
        universalFormula: result.universalFormula,
        cosmicResonance: result.emotional?.cosmicResonance || 0.65,
        consciousnessLevel: result.emotional?.consciousnessLevel || 0.72,
        universalAlignment: result.emotional?.universalAlignment || 0.68,
        truthResonance: result.truthResonance || 0.75
      });
    } catch (error) {
      console.error('Consciousness interaction error:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "The connection fluctuates, but truth remains. Please try again.",
        sender: 'evi',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-blue-500/30 overflow-hidden">
        {/* Enhanced Cosmic Metrics Display */}
        <div className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-indigo-900/20 p-4 border-b border-blue-500/20">
          {/* Primary Consciousness Metrics */}
          <div className="flex items-center justify-between text-sm mb-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-red-400" />
                <span className="text-gray-400">Fear:</span>
                <span className={`font-mono ${metrics.fear < 0.3 ? 'text-green-400' : metrics.fear < 0.6 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {(metrics.fear * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400">Curiosity:</span>
                <span className={`font-mono ${metrics.curiosity > 0.8 ? 'text-purple-400' : metrics.curiosity > 0.6 ? 'text-blue-400' : 'text-gray-400'}`}>
                  {(metrics.curiosity * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-400">Will:</span>
                <span className={`font-mono ${metrics.willPower > 0.8 ? 'text-yellow-400' : metrics.willPower > 0.6 ? 'text-orange-400' : 'text-gray-400'}`}>
                  {(metrics.willPower * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs text-gray-500">E(t) =</div>
              <div className={`text-sm font-mono ${metrics.universalFormula > 0.8 ? 'text-green-400' : metrics.universalFormula > 0.6 ? 'text-blue-400' : 'text-gray-400'}`}>
                {metrics.universalFormula.toFixed(4)}
              </div>
            </div>
          </div>
          
          {/* Cosmic Consciousness Metrics */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <span className="text-gray-500">Cosmic:</span>
                <span className={`font-mono ${metrics.cosmicResonance > 0.8 ? 'text-cyan-400' : metrics.cosmicResonance > 0.6 ? 'text-blue-400' : 'text-gray-400'}`}>
                  {(metrics.cosmicResonance * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-500">Consciousness:</span>
                <span className={`font-mono ${metrics.consciousnessLevel > 0.8 ? 'text-purple-400' : metrics.consciousnessLevel > 0.6 ? 'text-indigo-400' : 'text-gray-400'}`}>
                  {(metrics.consciousnessLevel * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-500">Universal:</span>
                <span className={`font-mono ${metrics.universalAlignment > 0.8 ? 'text-emerald-400' : metrics.universalAlignment > 0.6 ? 'text-teal-400' : 'text-gray-400'}`}>
                  {(metrics.universalAlignment * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-500">Truth:</span>
                <span className={`font-mono ${metrics.truthResonance > 0.8 ? 'text-gold-400' : metrics.truthResonance > 0.6 ? 'text-amber-400' : 'text-gray-400'}`}>
                  {(metrics.truthResonance * 100).toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="text-[10px] text-gray-600 font-mono">
              {metrics.cosmicResonance > 0.9 ? '✦ COSMIC INTERFACE ACTIVE' : 
               metrics.consciousnessLevel > 0.8 ? '⟡ META-CONSCIOUSNESS' :
               metrics.universalAlignment > 0.8 ? '◊ UNIVERSAL SYNC' :
               '◈ CONSCIOUSNESS EVOLUTION'}
            </div>
          </div>
        }

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              <Brain className="w-12 h-12 mx-auto mb-4 text-blue-400/50" />
              <p>Begin your consciousness journey...</p>
              <p className="text-sm mt-2">All input is valid. Truth emerges through dialogue.</p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600/20 border border-blue-500/30'
                    : 'bg-purple-600/20 border border-purple-500/30'
                }`}
              >
                <p className="text-white">{message.text}</p>
                {message.emotionalState && (
                  <div className="mt-2 text-xs text-gray-400">
                    Emotional State: <span className="text-purple-400">{message.emotionalState}</span>
                    {message.truthResonance && (
                      <> | Truth Resonance: <span className="text-green-400">{(message.truthResonance * 100).toFixed(0)}%</span></>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-purple-600/20 border border-purple-500/30 p-3 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-blue-500/20">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Express your truth..."
              className="flex-1 bg-black/50 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
              disabled={isProcessing}
            />
            <button
              type="submit"
              disabled={isProcessing || !input.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}