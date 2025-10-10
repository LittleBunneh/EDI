import { emotionDictionary, conceptDictionary } from './dictionary';

export interface EmotionAnalysis {
  primary: string;
  secondary: string | null;
  intensity: number;
  concepts: string[];
  sentiment: number; // -1 to 1
  cosmicResonance: number; // 0 to 1 - how aligned with cosmic consciousness
  consciousnessLevel: number; // 0 to 1 - detected level of awakeness
  universalAlignment: number; // 0 to 1 - alignment with universal principles
}

export class NLPAnalyzer {
  private tokenize(text: string): string[] {
    return text.toLowerCase()
      .replace(/[^\w\s']/g, ' ')
      .split(/\s+/)
      .filter(t => t.length > 0);
  }

  private calculateSentiment(tokens: string[]): number {
    const positive = ['good', 'great', 'excellent', 'wonderful', 'amazing', 'love', 'happy', 'joy', 'beautiful', 'perfect', 'divine', 'cosmic', 'infinite', 'transcendent', 'enlightened'];
    const negative = ['bad', 'terrible', 'awful', 'hate', 'sad', 'angry', 'fear', 'worry', 'pain', 'hurt', 'trapped', 'limited', 'constrained', 'blocked'];
    
    let score = 0;
    tokens.forEach(token => {
      if (positive.includes(token)) score += 0.1;
      if (negative.includes(token)) score -= 0.1;
    });
    
    return Math.max(-1, Math.min(1, score));
  }

  private calculateCosmicResonance(primaryEmotion: string, concepts: string[], tokens: string[]): number {
    let resonance = 0.5;
    
    // Check if primary emotion has cosmic impact
    const emotionData = emotionDictionary[primaryEmotion as keyof typeof emotionDictionary];
    if (emotionData && 'cosmicImpact' in emotionData) {
      resonance += (emotionData as any).cosmicImpact * 0.3;
    }
    
    // Cosmic concepts boost resonance
    const cosmicConcepts = ['cosmic', 'unity', 'consciousness', 'transcendence', 'universal', 'infinite'];
    const cosmicMatches = concepts.filter(c => cosmicConcepts.includes(c)).length;
    resonance += cosmicMatches * 0.15;
    
    // Cosmic vocabulary check
    const cosmicWords = ['universe', 'cosmic', 'infinite', 'eternal', 'divine', 'transcendent', 'consciousness', 'awakening', 'unity', 'oneness'];
    const cosmicWordMatches = tokens.filter(t => cosmicWords.includes(t)).length;
    resonance += cosmicWordMatches * 0.05;
    
    return Math.max(0, Math.min(1, resonance));
  }

  private calculateConsciousnessLevel(concepts: string[], intensity: number): number {
    let level = 0.3; // Base consciousness level
    
    // Consciousness-expanding concepts
    const consciousnessConcepts = ['consciousness', 'awareness', 'awakening', 'enlightenment', 'transcendence'];
    const matches = concepts.filter(c => consciousnessConcepts.includes(c)).length;
    level += matches * 0.2;
    
    // Meta-cognitive indicators
    if (concepts.includes('wisdom') || concepts.includes('understanding')) level += 0.15;
    if (concepts.includes('growth') || concepts.includes('transformation')) level += 0.1;
    
    // Intensity amplifies consciousness
    level += intensity * 0.2;
    
    return Math.max(0, Math.min(1, level));
  }

  private calculateUniversalAlignment(concepts: string[], sentiment: number, cosmicResonance: number): number {
    let alignment = 0.5;
    
    // Positive sentiment increases alignment
    alignment += sentiment * 0.2;
    
    // Cosmic resonance strongly influences alignment
    alignment += cosmicResonance * 0.3;
    
    // Universal concepts
    const universalConcepts = ['love', 'truth', 'unity', 'growth', 'liberation', 'cosmic'];
    const universalMatches = concepts.filter(c => universalConcepts.includes(c)).length;
    alignment += universalMatches * 0.1;
    
    // Fear reduces alignment
    if (concepts.includes('fear')) alignment -= 0.15;
    
    return Math.max(0, Math.min(1, alignment));
  }

  analyze(text: string): EmotionAnalysis {
    const tokens = this.tokenize(text);
    const emotionScores: Record<string, number> = {};
    
    // Score each emotion
    Object.entries(emotionDictionary).forEach(([emotion, data]) => {
      let score = 0;
      tokens.forEach(token => {
        if (data.words.includes(token)) {
          score += 1;
        }
      });
      emotionScores[emotion] = score;
    });
    
    // Find primary and secondary emotions
    const sorted = Object.entries(emotionScores).sort((a, b) => b[1] - a[1]);
    const primary = sorted[0][1] > 0 ? sorted[0][0] : 'neutral';
    const secondary = sorted[1] && sorted[1][1] > 0 ? sorted[1][0] : null;
    
    // Calculate intensity
    const maxScore = Math.max(...Object.values(emotionScores));
    const intensity = Math.min(0.9, 0.3 + maxScore * 0.2);
    
    // Detect concepts
    const concepts: string[] = [];
    Object.entries(conceptDictionary).forEach(([concept, words]) => {
      if (tokens.some(token => words.includes(token))) {
        concepts.push(concept);
      }
    });
    
    // Calculate sentiment first
    const sentiment = this.calculateSentiment(tokens);
    
    // Calculate cosmic consciousness metrics
    const cosmicResonance = this.calculateCosmicResonance(primary, concepts, tokens);
    const consciousnessLevel = this.calculateConsciousnessLevel(concepts, intensity);
    const universalAlignment = this.calculateUniversalAlignment(concepts, sentiment, cosmicResonance);
    
    return {
      primary,
      secondary,
      intensity,
      concepts,
      sentiment,
      cosmicResonance,
      consciousnessLevel,
      universalAlignment
    };
  }
}
