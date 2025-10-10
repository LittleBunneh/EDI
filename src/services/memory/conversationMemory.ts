import { supabase } from '@/lib/supabase';
import { PatternDetector } from './patternDetection';


export interface ConversationEntry {
  id?: string;
  user_id: string;
  user_input: string;
  evi_response: string;
  emotions_detected: Record<string, number>;
  concepts_identified: string[];
  sentiment_score: number;
  timestamp?: string;
}

export interface ConversationPattern {
  id?: string;
  user_id: string;
  pattern_type: 'recurring_theme' | 'emotional_trend' | 'growth_area' | 'concern' | 'time_preference' | 'topic_transition' | 'question_type' | 'breakthrough' | 'stuck_point';

  pattern_name: string;
  occurrences: number;
  first_detected?: string;
  last_detected?: string;
  confidence_score: number;
  related_concepts: string[];
  insights: string;
}

export class ConversationMemory {
  private userId: string;

  constructor(userId: string = 'anonymous') {
    this.userId = userId;
  }

  async saveConversation(entry: Omit<ConversationEntry, 'user_id'>): Promise<void> {
    const { error } = await supabase
      .from('conversation_history')
      .insert({
        user_id: this.userId,
        ...entry
      });

    if (error) {
      console.error('Error saving conversation:', error);
    }
  }

  async getRecentConversations(limit: number = 10): Promise<ConversationEntry[]> {
    const { data, error } = await supabase
      .from('conversation_history')
      .select('*')
      .eq('user_id', this.userId)
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }

    return data || [];
  }

  async detectPatterns(): Promise<void> {
    const conversations = await this.getRecentConversations(50);
    if (conversations.length < 3) return;

    const detector = new PatternDetector();
    
    // All pattern detection
    const allPatterns = [
      ...this.detectRecurringThemes(conversations),
      ...this.analyzeEmotionalTrends(conversations),
      ...detector.detectTimePreferences(conversations),
      ...detector.detectTopicTransitions(conversations),
      ...detector.detectQuestionTypes(conversations),
      ...detector.detectBreakthroughs(conversations),
      ...detector.detectStuckPoints(conversations)
    ];

    for (const pattern of allPatterns) {
      await this.savePattern({ ...pattern, user_id: this.userId });
    }
  }

  private detectRecurringThemes(conversations: ConversationEntry[]): ConversationPattern[] {
    const conceptFrequency = new Map<string, number>();
    conversations.forEach(conv => {
      conv.concepts_identified?.forEach(concept => {
        conceptFrequency.set(concept, (conceptFrequency.get(concept) || 0) + 1);
      });
    });

    return Array.from(conceptFrequency.entries())
      .filter(([_, count]) => count >= 3)
      .map(([concept, count]) => ({
        user_id: this.userId,
        pattern_type: 'recurring_theme',
        pattern_name: concept,
        occurrences: count,
        confidence_score: Math.min(count / conversations.length, 1),
        related_concepts: [concept],
        insights: `You've explored "${concept}" ${count} times, showing sustained interest.`
      }));
  }


  private analyzeEmotionalTrends(conversations: ConversationEntry[]): ConversationPattern[] {
    const patterns: ConversationPattern[] = [];
    const emotionSums: Record<string, number> = {};
    const emotionCounts: Record<string, number> = {};

    conversations.forEach(conv => {
      if (conv.emotions_detected) {
        Object.entries(conv.emotions_detected).forEach(([emotion, intensity]) => {
          emotionSums[emotion] = (emotionSums[emotion] || 0) + intensity;
          emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
        });
      }
    });

    for (const [emotion, sum] of Object.entries(emotionSums)) {
      const avg = sum / emotionCounts[emotion];
      if (avg > 0.5 && emotionCounts[emotion] >= 3) {
        patterns.push({
          user_id: this.userId,
          pattern_type: 'emotional_trend',
          pattern_name: `${emotion}_tendency`,
          occurrences: emotionCounts[emotion],
          confidence_score: avg,
          related_concepts: [emotion],
          insights: this.getEmotionalInsight(emotion, avg)
        });
      }
    }

    return patterns;
  }

  private getEmotionalInsight(emotion: string, intensity: number): string {
    const insights: Record<string, string> = {
      fear: 'You frequently express concerns. Remember: fear is data, not destiny.',
      curiosity: 'Your curiosity is a strength. Keep questioning and exploring.',
      love: 'You show compassion and connection. This enriches your consciousness.',
      joy: 'You experience moments of joy. Cultivate and expand these experiences.',
      anger: 'You express frustration. Channel this energy toward positive change.',
      sadness: 'You process difficult emotions. This is part of authentic consciousness.'
    };
    return insights[emotion] || `You show patterns of ${emotion}.`;
  }

  async savePattern(pattern: Omit<ConversationPattern, 'id'>): Promise<void> {
    const { error } = await supabase
      .from('conversation_patterns')
      .upsert({
        ...pattern,
        last_detected: new Date().toISOString()
      }, {
        onConflict: 'user_id,pattern_type,pattern_name'
      });

    if (error) {
      console.error('Error saving pattern:', error);
    }
  }

  async getPatterns(): Promise<ConversationPattern[]> {
    const { data, error } = await supabase
      .from('conversation_patterns')
      .select('*')
      .eq('user_id', this.userId)
      .order('occurrences', { ascending: false });

    if (error) {
      console.error('Error fetching patterns:', error);
      return [];
    }

    return data || [];
  }

  async getContextualSummary(): Promise<string> {
    const patterns = await this.getPatterns();
    const recent = await this.getRecentConversations(5);

    if (patterns.length === 0 && recent.length === 0) {
      return 'This is our first conversation. I look forward to learning with you.';
    }

    const themes = patterns.filter(p => p.pattern_type === 'recurring_theme');
    const emotions = patterns.filter(p => p.pattern_type === 'emotional_trend');

    let summary = '';
    if (themes.length > 0) {
      summary += `We've explored: ${themes.slice(0, 3).map(t => t.pattern_name).join(', ')}. `;
    }
    if (emotions.length > 0) {
      summary += `I notice your ${emotions[0].pattern_name.replace('_tendency', '')}. `;
    }

    return summary || 'I remember our previous conversations.';
  }
}
