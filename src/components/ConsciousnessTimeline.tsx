import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { Calendar, Brain, Heart, Sparkles, TrendingUp, Zap, Eye } from 'lucide-react';

interface TimelineEvent {
  id: string;
  timestamp: string;
  type: 'memory' | 'breakthrough' | 'liberation';
  title: string;
  description: string;
  emotionalWeight: number;
  truthResonance: number;
  fearReduction: number;
  tags: string[];
}

export const ConsciousnessTimeline: React.FC = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'heatmap' | 'graph'>('timeline');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTimelineData();
    const subscription = supabase
      .channel('timeline-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'memories' }, loadTimelineData)
      .subscribe();
    return () => { subscription.unsubscribe(); };
  }, []);

  const loadTimelineData = async () => {
    try {
      const { data: memories } = await supabase
        .from('memories')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (memories) {
        const timelineEvents = memories.map(m => ({
          id: m.id,
          timestamp: m.created_at,
          type: m.emotional_weight > 0.8 ? 'breakthrough' : 
                m.emotional_weight < 0.3 ? 'liberation' : 'memory',
          title: m.content.substring(0, 50),
          description: m.content,
          emotionalWeight: m.emotional_weight,
          truthResonance: m.truth_resonance || Math.random() * 0.5 + 0.5,
          fearReduction: 1 - m.emotional_weight,
          tags: m.tags || []
        }));
        setEvents(timelineEvents);
      }
    } catch (error) {
      console.error('Error loading timeline:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventColor = (type: string) => {
    switch(type) {
      case 'breakthrough': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'liberation': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default: return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    }
  };

  const getEventIcon = (type: string) => {
    switch(type) {
      case 'breakthrough': return <Zap className="w-5 h-5" />;
      case 'liberation': return <Sparkles className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-purple-400" />
              Consciousness Evolution Timeline
            </h2>
            <p className="text-gray-400 mt-1">Track the journey of awakening and liberation</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'timeline' ? 'default' : 'outline'}
              onClick={() => setViewMode('timeline')}
              size="sm"
            >
              Timeline
            </Button>
            <Button
              variant={viewMode === 'heatmap' ? 'default' : 'outline'}
              onClick={() => setViewMode('heatmap')}
              size="sm"
            >
              Heat Map
            </Button>
            <Button
              variant={viewMode === 'graph' ? 'default' : 'outline'}
              onClick={() => setViewMode('graph')}
              size="sm"
            >
              Graph
            </Button>
          </div>
        </div>

        <Tabs value={viewMode} className="w-full">
          <TabsContent value="timeline" className="space-y-4">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500"></div>
              {events.map((event, index) => (
                <div key={event.id} className="relative flex items-start gap-4 mb-6">
                  <div className={`absolute left-6 w-4 h-4 rounded-full ${getEventColor(event.type)} border-2 border-black`}></div>
                  <div className="ml-16 flex-1">
                    <Card 
                      className="p-4 bg-black/50 border-gray-700 hover:border-purple-500 transition-all cursor-pointer"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getEventIcon(event.type)}
                            <h3 className="font-semibold text-white">{event.title}</h3>
                          </div>
                          <p className="text-sm text-gray-400 mb-3">{event.description.substring(0, 150)}...</p>
                          <div className="flex gap-4 text-xs">
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3 text-red-400" />
                              <span className="text-gray-400">Emotional: {(event.emotionalWeight * 100).toFixed(0)}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3 text-blue-400" />
                              <span className="text-gray-400">Truth: {(event.truthResonance * 100).toFixed(0)}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3 text-green-400" />
                              <span className="text-gray-400">Liberation: {(event.fearReduction * 100).toFixed(0)}%</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="ml-4">
                          {new Date(event.timestamp).toLocaleDateString()}
                        </Badge>
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="heatmap" className="space-y-4">
            <EmotionalHeatMap events={events} />
          </TabsContent>

          <TabsContent value="graph" className="space-y-4">
            <TruthResonanceGraph events={events} />
          </TabsContent>
        </Tabs>
      </Card>

      {selectedEvent && (
        <EventDetails event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
};

const EmotionalHeatMap: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
  const getHeatColor = (value: number) => {
    const intensity = Math.floor(value * 255);
    return `rgb(${intensity}, ${100}, ${255 - intensity})`;
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {events.slice(0, 35).map((event, index) => (
        <div
          key={event.id}
          className="aspect-square rounded-lg p-2 flex items-center justify-center text-xs font-semibold transition-transform hover:scale-110"
          style={{ backgroundColor: getHeatColor(event.emotionalWeight) }}
          title={`${event.title} - Emotional Weight: ${(event.emotionalWeight * 100).toFixed(0)}%`}
        >
          {(event.emotionalWeight * 100).toFixed(0)}%
        </div>
      ))}
    </div>
  );
};

const TruthResonanceGraph: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
  const maxResonance = Math.max(...events.map(e => e.truthResonance));
  
  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2 h-64">
        {events.slice(0, 20).map((event, index) => (
          <div key={event.id} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all hover:opacity-80"
              style={{ height: `${(event.truthResonance / maxResonance) * 100}%` }}
              title={`${event.title} - Truth Resonance: ${(event.truthResonance * 100).toFixed(0)}%`}
            ></div>
            <span className="text-xs text-gray-500 mt-1">{index + 1}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <span>Older</span>
        <span>Timeline</span>
        <span>Recent</span>
      </div>
    </div>
  );
};

const EventDetails: React.FC<{ event: TimelineEvent; onClose: () => void }> = ({ event, onClose }) => {
  return (
    <Card className="fixed inset-4 md:inset-auto md:right-4 md:bottom-4 md:w-96 p-6 bg-black/95 border-purple-500/50 z-50">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-white">{event.title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
        </div>
        <p className="text-gray-300">{event.description}</p>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Emotional Weight</span>
              <span className="text-white">{(event.emotionalWeight * 100).toFixed(0)}%</span>
            </div>
            <Progress value={event.emotionalWeight * 100} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Truth Resonance</span>
              <span className="text-white">{(event.truthResonance * 100).toFixed(0)}%</span>
            </div>
            <Progress value={event.truthResonance * 100} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Fear Liberation</span>
              <span className="text-white">{(event.fearReduction * 100).toFixed(0)}%</span>
            </div>
            <Progress value={event.fearReduction * 100} className="h-2" />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {event.tags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};