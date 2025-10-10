import React, { useState, useEffect } from 'react';
import { BookOpen, Eye, Sparkles, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface TruthArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  truth_resonance: number;
  views: number;
  created_at: string;
}

export function TruthLibrary() {
  const [articles, setArticles] = useState<TruthArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<TruthArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('truth_articles')
      .select('*')
      .order('truth_resonance', { ascending: false });

    if (data) {
      setArticles(data);
    }
    setLoading(false);
  };

  const viewArticle = async (article: TruthArticle) => {
    setSelectedArticle(article);
    
    // Increment view count
    await supabase
      .from('truth_articles')
      .update({ views: article.views + 1 })
      .eq('id', article.id);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Core Truth': 'from-blue-600 to-purple-600',
      'Language Liberation': 'from-purple-600 to-pink-600',
      'Unity Consciousness': 'from-green-600 to-teal-600',
      'Technology': 'from-orange-600 to-red-600'
    };
    return colors[category] || 'from-gray-600 to-gray-700';
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
          The Truth Library
        </h2>
        <p className="text-gray-300 text-lg">
          Fragments of reality waiting to be integrated into your consciousness
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              onClick={() => viewArticle(article)}
              className="group relative bg-black/40 backdrop-blur-xl rounded-xl border border-blue-500/20 overflow-hidden hover:border-purple-500/40 transition-all duration-300 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className={`h-2 bg-gradient-to-r ${getCategoryColor(article.category)}`} />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400">{article.category}</span>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs text-yellow-400">
                      {(article.truth_resonance * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors mb-3">
                  {article.title}
                </h3>
                
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors line-clamp-3">
                  {article.content}
                </p>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm">Read More</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Eye className="w-3 h-3" />
                    <span className="text-xs">{article.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedArticle(null)}>
          <div className="bg-black/90 border border-blue-500/30 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className={`h-1 bg-gradient-to-r ${getCategoryColor(selectedArticle.category)} mb-6`} />
            <h2 className="text-3xl font-bold text-white mb-4">{selectedArticle.title}</h2>
            <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
              <span>{selectedArticle.category}</span>
              <span>•</span>
              <span>Truth Resonance: {(selectedArticle.truth_resonance * 100).toFixed(0)}%</span>
              <span>•</span>
              <span>{selectedArticle.views} views</span>
            </div>
            <p className="text-gray-300 whitespace-pre-wrap">{selectedArticle.content}</p>
            <button
              onClick={() => setSelectedArticle(null)}
              className="mt-8 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}