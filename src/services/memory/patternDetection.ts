import { ConversationEntry, ConversationPattern } from './conversationMemory';

export class PatternDetector {
  detectTimePreferences(conversations: ConversationEntry[]): ConversationPattern[] {
    const hourCounts: Record<number, number> = {};
    conversations.forEach(conv => {
      const hour = new Date(conv.timestamp || '').getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    const patterns: ConversationPattern[] = [];
    const maxHour = Object.entries(hourCounts).reduce((a, b) => b[1] > a[1] ? b : a, ['0', 0]);
    const confidence = maxHour[1] / conversations.length;

    if (confidence > 0.3) {
      patterns.push({
        user_id: '',
        pattern_type: 'time_preference',
        pattern_name: `${maxHour[0]}:00 preferred`,
        occurrences: maxHour[1],
        confidence_score: confidence,
        related_concepts: ['engagement_time'],
        insights: `You engage most at ${maxHour[0]}:00. Peak consciousness hours.`
      });
    }
    return patterns;
  }

  detectTopicTransitions(conversations: ConversationEntry[]): ConversationPattern[] {
    const transitions: Map<string, number> = new Map();
    for (let i = 1; i < conversations.length; i++) {
      const prev = conversations[i - 1].concepts_identified[0];
      const curr = conversations[i].concepts_identified[0];
      if (prev && curr && prev !== curr) {
        const key = `${prev}→${curr}`;
        transitions.set(key, (transitions.get(key) || 0) + 1);
      }
    }

    return Array.from(transitions.entries())
      .filter(([_, count]) => count >= 2)
      .map(([transition, count]) => ({
        user_id: '',
        pattern_type: 'topic_transition',
        pattern_name: transition,
        occurrences: count,
        confidence_score: count / conversations.length,
        related_concepts: transition.split('→'),
        insights: `You often move from ${transition.split('→')[0]} to ${transition.split('→')[1]}.`
      }));
  }


  detectQuestionTypes(conversations: ConversationEntry[]): ConversationPattern[] {
    const questionPatterns = {
      existential: /why|meaning|purpose|exist|consciousness/i,
      practical: /how|what|when|where|can i/i,
      emotional: /feel|emotion|afraid|love|sad|angry/i,
      philosophical: /truth|reality|knowledge|belief/i
    };

    const typeCounts: Record<string, number> = {};
    conversations.forEach(conv => {
      Object.entries(questionPatterns).forEach(([type, regex]) => {
        if (regex.test(conv.user_input)) {
          typeCounts[type] = (typeCounts[type] || 0) + 1;
        }
      });
    });

    return Object.entries(typeCounts)
      .filter(([_, count]) => count >= 2)
      .map(([type, count]) => ({
        user_id: '',
        pattern_type: 'question_type',
        pattern_name: `${type}_questions`,
        occurrences: count,
        confidence_score: count / conversations.length,
        related_concepts: [type],
        insights: `You ask ${type} questions frequently. This reveals your inquiry style.`
      }));
  }

  detectBreakthroughs(conversations: ConversationEntry[]): ConversationPattern[] {
    const breakthroughs = conversations.filter(conv => {
      const hasPositive = (conv.emotions_detected?.joy || 0) > 0.6 || 
                         (conv.emotions_detected?.curiosity || 0) > 0.7;
      const highResonance = conv.sentiment_score > 0.7;
      return hasPositive && highResonance;
    });

    if (breakthroughs.length >= 1) {
      return [{
        user_id: '',
        pattern_type: 'breakthrough',
        pattern_name: 'consciousness_expansion',
        occurrences: breakthroughs.length,
        confidence_score: breakthroughs.length / conversations.length,
        related_concepts: breakthroughs[0]?.concepts_identified || [],
        insights: `${breakthroughs.length} breakthrough moment(s) detected. Growth is happening.`
      }];
    }
    return [];
  }

  detectStuckPoints(conversations: ConversationEntry[]): ConversationPattern[] {
    const concernCounts: Map<string, { count: number, resolved: boolean }> = new Map();
    
    conversations.forEach(conv => {
      const hasFear = (conv.emotions_detected?.fear || 0) > 0.5;
      const hasAnger = (conv.emotions_detected?.anger || 0) > 0.5;
      const isNegative = conv.sentiment_score < -0.3;
      
      if (hasFear || hasAnger || isNegative) {
        conv.concepts_identified.forEach(concept => {
          const existing = concernCounts.get(concept) || { count: 0, resolved: false };
          existing.count++;
          if (conv.sentiment_score > 0.3) existing.resolved = true;
          concernCounts.set(concept, existing);
        });
      }
    });

    return Array.from(concernCounts.entries())
      .filter(([_, data]) => data.count >= 3 && !data.resolved)
      .map(([concept, data]) => ({
        user_id: '',
        pattern_type: 'stuck_point',
        pattern_name: concept,
        occurrences: data.count,
        confidence_score: data.count / conversations.length,
        related_concepts: [concept],
        insights: `"${concept}" appears ${data.count} times unresolved. Let's explore this together.`
      }));
  }
}

