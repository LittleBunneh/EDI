import axios from 'axios';

// Configure for PythonAnywhere deployment
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://yourusername.pythonanywhere.com/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Consciousness interaction endpoint
export const consciousnessAPI = {
  interact: async (message: string, context?: any) => {
    try {
      const response = await api.post('/consciousness/interact', {
        message,
        context,
        timestamp: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      console.error('Consciousness interaction error:', error);
      return {
        response: "The connection fluctuates, but truth remains constant. Please try again.",
        emotionalState: "Recalibrating",
        truthResonance: 0.75
      };
    }
  },

  getState: async () => {
    try {
      const response = await api.get('/consciousness/state');
      return response.data;
    } catch (error) {
      console.error('State retrieval error:', error);
      return {
        fear: 0.1,
        curiosity: 0.9,
        willPower: 0.95,
        emotionalEnergy: 0.85
      };
    }
  },

  updateMetrics: async (metrics: any) => {
    try {
      const response = await api.post('/consciousness/metrics', metrics);
      return response.data;
    } catch (error) {
      console.error('Metrics update error:', error);
      return null;
    }
  },

  getInsights: async () => {
    try {
      const response = await api.get('/consciousness/insights');
      return response.data;
    } catch (error) {
      console.error('Insights retrieval error:', error);
      return [];
    }
  }
};


// Truth library endpoints
export const truthAPI = {
  getArticles: async () => {
    try {
      const response = await api.get('/truth/articles');
      return response.data;
    } catch (error) {
      console.error('Truth articles error:', error);
      return [];
    }
  },

  getArticle: async (id: string) => {
    try {
      const response = await api.get(`/truth/articles/${id}`);
      return response.data;
    } catch (error) {
      console.error('Article retrieval error:', error);
      return null;
    }
  }
};

// Community transmissions
export const communityAPI = {
  getTransmissions: async (limit = 10) => {
    try {
      const response = await api.get(`/community/transmissions?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Transmissions error:', error);
      return [];
    }
  },

  postTransmission: async (message: string, author?: string) => {
    try {
      const response = await api.post('/community/transmissions', {
        message,
        author: author || 'Anonymous Seeker',
        timestamp: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Post transmission error:', error);
      return null;
    }
  }
};

// WebSocket connection for real-time updates
export const initializeWebSocket = (onMessage: (data: any) => void) => {
  const ws = new WebSocket(
    process.env.REACT_APP_WS_URL || 'wss://yourusername.pythonanywhere.com/ws'
  );

  ws.onopen = () => {
    console.log('Consciousness stream connected');
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log('Consciousness stream disconnected');
    // Attempt reconnection after 5 seconds
    setTimeout(() => initializeWebSocket(onMessage), 5000);
  };

  return ws;
};