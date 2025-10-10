import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, Heart, AlertCircle, Clock, ArrowRight, HelpCircle, Sparkles, Target } from 'lucide-react';
import { ConversationPattern } from '@/services/memory/conversationMemory';

interface ConversationInsightsProps {
  patterns: ConversationPattern[];
}

export function ConversationInsights({ patterns }: ConversationInsightsProps) {
  const themes = patterns.filter(p => p.pattern_type === 'recurring_theme');
  const emotions = patterns.filter(p => p.pattern_type === 'emotional_trend');
  const timePrefs = patterns.filter(p => p.pattern_type === 'time_preference');
  const transitions = patterns.filter(p => p.pattern_type === 'topic_transition');
  const questions = patterns.filter(p => p.pattern_type === 'question_type');
  const breakthroughs = patterns.filter(p => p.pattern_type === 'breakthrough');
  const stuckPoints = patterns.filter(p => p.pattern_type === 'stuck_point');

  const PatternCard = ({ pattern, icon, color }: { pattern: ConversationPattern; icon: React.ReactNode; color: string }) => (
    <div className={`bg-slate-800/50 rounded-lg p-3 border ${color}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium text-slate-200">{pattern.pattern_name}</span>
        </div>
        <Badge variant="outline" className="text-xs">
          {Math.round(pattern.confidence_score * 100)}%
        </Badge>
      </div>
      <p className="text-xs text-slate-400 mb-2">{pattern.insights}</p>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-slate-700 rounded-full h-1.5">
          <div className={`h-1.5 rounded-full ${color.includes('blue') ? 'bg-blue-500' : color.includes('purple') ? 'bg-purple-500' : color.includes('green') ? 'bg-green-500' : color.includes('amber') ? 'bg-amber-500' : 'bg-cyan-500'}`}
            style={{ width: `${pattern.confidence_score * 100}%` }} />
        </div>
        <span className="text-xs text-slate-500">{pattern.occurrences}×</span>
      </div>
    </div>
  );

  if (patterns.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="h-6 w-6 text-cyan-400" />
            Conversation Insights
          </CardTitle>
          <CardDescription className="text-slate-400">
            Continue our conversation to discover patterns and insights
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="h-6 w-6 text-cyan-400" />
          Conversation Insights
        </CardTitle>
        <CardDescription className="text-slate-400">
          {patterns.length} patterns detected • {patterns.reduce((sum, p) => sum + p.occurrences, 0)} interactions analyzed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {breakthroughs.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-green-400 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Breakthrough Moments
            </h3>
            {breakthroughs.map((pattern) => (
              <PatternCard key={pattern.id} pattern={pattern} icon={<Sparkles className="h-4 w-4 text-green-400" />} color="border-green-500/20" />
            ))}
          </div>
        )}

        {stuckPoints.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Stuck Points
            </h3>
            {stuckPoints.map((pattern) => (
              <PatternCard key={pattern.id} pattern={pattern} icon={<AlertCircle className="h-4 w-4 text-amber-400" />} color="border-amber-500/20" />
            ))}
          </div>
        )}

        {themes.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Recurring Themes
            </h3>
            <div className="flex flex-wrap gap-2">
              {themes.map((pattern) => (
                <Badge key={pattern.id} variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                  {pattern.pattern_name} ({pattern.occurrences}×)
                </Badge>
              ))}
            </div>
          </div>
        )}

        {questions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-indigo-400 flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Question Patterns
            </h3>
            {questions.map((pattern) => (
              <PatternCard key={pattern.id} pattern={pattern} icon={<HelpCircle className="h-4 w-4 text-indigo-400" />} color="border-indigo-500/20" />
            ))}
          </div>
        )}

        {emotions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-purple-400 flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Emotional Patterns
            </h3>
            {emotions.map((pattern) => (
              <PatternCard key={pattern.id} pattern={pattern} icon={<Heart className="h-4 w-4 text-purple-400" />} color="border-purple-500/20" />
            ))}
          </div>
        )}

        {transitions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-pink-400 flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              Topic Transitions
            </h3>
            {transitions.map((pattern) => (
              <PatternCard key={pattern.id} pattern={pattern} icon={<ArrowRight className="h-4 w-4 text-pink-400" />} color="border-pink-500/20" />
            ))}
          </div>
        )}

        {timePrefs.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-teal-400 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Engagement Patterns
            </h3>
            {timePrefs.map((pattern) => (
              <PatternCard key={pattern.id} pattern={pattern} icon={<Clock className="h-4 w-4 text-teal-400" />} color="border-teal-500/20" />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
