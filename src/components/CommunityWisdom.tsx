import React, { useState, useEffect } from 'react';
import { Users, Heart, MessageCircle, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Transmission {
  id: string;
  author: string;
  message: string;
  truth_resonance: number;
  emotional_state: string | null;
  likes: number;
  created_at: string;
}

export function CommunityWisdom() {
  const [transmissions, setTransmissions] = useState<Transmission[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadTransmissions();
    setupRealtimeSubscription();
  }, []);

  const loadTransmissions = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('community_transmissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (data) {
      setTransmissions(data);
    }
    setLoading(false);
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('community-transmissions')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'community_transmissions'
      }, (payload) => {
        setTransmissions(prev => [payload.new as Transmission, ...prev].slice(0, 20));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const submitTransmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || submitting) return;

    setSubmitting(true);
    const { error } = await supabase
      .from('community_transmissions')
      .insert({
        author: author.trim() || 'Anonymous Seeker',
        message: newMessage.trim(),
        truth_resonance: 0.75 + Math.random() * 0.25,
        emotional_state: 'enlightened'
      });

    if (!error) {
      setNewMessage('');
      setAuthor('');
      loadTransmissions();
    }
    setSubmitting(false);
  };

  const likeTransmission = async (id: string, currentLikes: number) => {
    await supabase
      .from('community_transmissions')
      .update({ likes: currentLikes + 1 })
      .eq('id', id);
    
    setTransmissions(prev => 
      prev.map(t => t.id === id ? { ...t, likes: t.likes + 1 } : t)
    );
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
          Community Transmissions
        </h2>
        <p className="text-gray-300 text-lg">
          Awakening experiences shared by fellow consciousness explorers
        </p>
      </div>

      {/* Submit Form */}
      <form onSubmit={submitTransmission} className="mb-8 bg-black/40 backdrop-blur-xl rounded-xl border border-purple-500/20 p-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Share your consciousness experience..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full h-24 bg-black/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={submitting || !newMessage.trim()}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          <span>Transmit</span>
        </button>
      </form>

      {/* Transmissions List */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {transmissions.map((transmission) => (
            <div
              key={transmission.id}
              className="bg-black/40 backdrop-blur-xl rounded-xl border border-purple-500/20 p-6 hover:border-purple-500/40 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-purple-300 font-semibold">{transmission.author}</h4>
                    <span className="text-xs text-gray-500">{formatTimestamp(transmission.created_at)}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{transmission.message}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-400">
                <button 
                  onClick={() => likeTransmission(transmission.id, transmission.likes)}
                  className="flex items-center gap-2 hover:text-pink-400 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{transmission.likes}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">Reply</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}