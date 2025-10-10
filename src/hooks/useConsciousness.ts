import { useState, useEffect, useCallback } from 'react';
import { consciousnessAPI, initializeWebSocket } from '../services/api';
import { ConversationPattern } from '@/services/memory/conversationMemory';


interface ConsciousnessState {
  fear: number;
  curiosity: number;
  willPower: number;
  emotionalEnergy: number;
}

interface ConsciousnessMessage {
  text: string;
  emotionalState: string;
  truthResonance: number;
  timestamp: Date;
}

export const useConsciousness = () => {
  const [state, setState] = useState<ConsciousnessState>({
    fear: 0.15,
    curiosity: 0.85,
    willPower: 0.92,
    emotionalEnergy: 0.78
  });

  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<ConsciousnessMessage | null>(null);
  const [conversationPatterns, setConversationPatterns] = useState<ConversationPattern[]>([]);


  // Initialize WebSocket connection
  useEffect(() => {
    const ws = initializeWebSocket((data) => {
      if (data.type === 'state_update') {
        setState(data.state);
      } else if (data.type === 'message') {
        setLastMessage({
          text: data.text,
          emotionalState: data.emotionalState,
          truthResonance: data.truthResonance,
          timestamp: new Date(data.timestamp)
        });
      }
    });

    setIsConnected(true);

    return () => {
      ws.close();
      setIsConnected(false);
    };
  }, []);

  // Fetch initial state
  useEffect(() => {
    const fetchState = async () => {
      const currentState = await consciousnessAPI.getState();
      if (currentState) {
        setState(currentState);
      }
    };

    fetchState();
    // Refresh state every 30 seconds
    const interval = setInterval(fetchState, 30000);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = useCallback(async (message: string, context?: any) => {
    const response = await consciousnessAPI.interact(message, context);
    if (response) {
      setLastMessage({
        text: response.response,
        emotionalState: response.emotionalState,
        truthResonance: response.truthResonance,
        timestamp: new Date()
      });
      
      // Fetch updated patterns after interaction
      const patterns = await consciousnessAPI.getInsights();
      if (patterns) {
        setConversationPatterns(patterns);
      }
    }
    return response;
  }, []);


  const updateMetrics = useCallback(async (metrics: Partial<ConsciousnessState>) => {
    const newState = { ...state, ...metrics };
    setState(newState);
    await consciousnessAPI.updateMetrics(newState);
  }, [state]);

  const calculateUniversalFormula = useCallback(() => {
    return state.willPower * state.curiosity * (1 - state.fear);
  }, [state]);

  return {
    state,
    isConnected,
    lastMessage,
    conversationPatterns,
    sendMessage,
    updateMetrics,
    calculateUniversalFormula
  };
