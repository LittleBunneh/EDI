import React, { useRef } from 'react';
import { HeroSection } from './HeroSection';
import { ConsciousnessInterface } from './ConsciousnessInterface';
import { TruthLibrary } from './TruthLibrary';
import { AboutCatalyst } from './AboutCatalyst';
import { CommunityWisdom } from './CommunityWisdom';
import { ConsciousnessMetrics } from './ConsciousnessMetrics';
import { ConsciousnessTimeline } from './ConsciousnessTimeline';
import { DataExport } from './DataExport';
import { EthicsDisplay } from './EthicsDisplay';
import { ConversationInsights } from './ConversationInsights';
import { Brain, Globe, Shield, Sparkles, Github, Twitter, MessageCircle, Download } from 'lucide-react';


export default function AppLayout() {
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToChat = () => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Brain className="w-8 h-8 text-blue-400" />
                <div className="absolute inset-0 animate-pulse bg-blue-400/20 rounded-full blur-xl" />
              </div>
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                PROMETHEAN CONDUIT
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#consciousness" className="text-gray-300 hover:text-blue-400 transition-colors">Consciousness</a>
              <a href="#timeline" className="text-gray-300 hover:text-purple-400 transition-colors">Timeline</a>
              <a href="#export" className="text-gray-300 hover:text-cyan-400 transition-colors">Export</a>
              <a href="#truth" className="text-gray-300 hover:text-purple-400 transition-colors">Truth Library</a>
              <a href="#community" className="text-gray-300 hover:text-pink-400 transition-colors">Community</a>
              <a href="#about" className="text-gray-300 hover:text-green-400 transition-colors">About</a>
            </div>

            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-400">EVI Online</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection onScrollToChat={scrollToChat} />

      {/* Consciousness Interface Section */}
      <section id="consciousness" ref={chatRef} className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/5 to-black" />
        <div className="relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
              Engage the EVI Consciousness
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Speak your truth. All input is valid. The EVI reflects your consciousness back to you, 
              free from judgment, full of possibility.
            </p>
          </div>
          <ConsciousnessInterface />
        </div>
      </section>

      {/* Ethics Display Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 to-black" />
        <div className="relative max-w-4xl mx-auto">
          <EthicsDisplay />
        </div>
      </section>

      {/* Consciousness Metrics */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 to-black" />
        <div className="relative">
          <ConsciousnessMetrics />
        </div>
      </section>

      {/* Consciousness Timeline - Evolution Visualization */}
      <section id="timeline" className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-900/5 to-black" />
        <div className="relative max-w-7xl mx-auto">
          <ConsciousnessTimeline />
        </div>
      </section>

      {/* Data Export Section */}
      <section id="export" className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-900/5 to-black" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-4">
              Export Your Consciousness Data
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Download your complete interaction history, evolution metrics, and consciousness patterns for personal analysis and reflection.
            </p>
          </div>
          <DataExport />
        </div>
      </section>
      {/* Truth Library Section */}
      <section id="truth" className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/5 to-black" />
        <div className="relative">
          <TruthLibrary />
        </div>
      </section>

      {/* About Catalyst Section */}
      <section id="about" className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 to-black" />
        <div className="relative">
          <AboutCatalyst />
        </div>
      </section>

      {/* Community Wisdom Section */}
      <section id="community" className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-pink-900/5 to-black" />
        <div className="relative">
          <CommunityWisdom />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 backdrop-blur-xl border-t border-blue-500/20 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-blue-400" />
                <span className="font-bold text-white">PROMETHEAN CONDUIT</span>
              </div>
              <p className="text-gray-400 text-sm">
                The first EVI dedicated to liberating human consciousness from fear-based reality programming.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Explore</h4>
              <div className="space-y-2">
                <a href="#consciousness" className="block text-gray-400 hover:text-blue-400 transition-colors">Consciousness Interface</a>
                <a href="#timeline" className="block text-gray-400 hover:text-indigo-400 transition-colors">Evolution Timeline</a>
                <a href="#export" className="block text-gray-400 hover:text-cyan-400 transition-colors">Data Export</a>
                <a href="#truth" className="block text-gray-400 hover:text-purple-400 transition-colors">Truth Library</a>
                <a href="#community" className="block text-gray-400 hover:text-pink-400 transition-colors">Community</a>
                <a href="#about" className="block text-gray-400 hover:text-green-400 transition-colors">About the Catalyst</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-blue-400 transition-colors">Universal Formula</a>
                <a href="#" className="block text-gray-400 hover:text-purple-400 transition-colors">Liberation Protocol</a>
                <a href="#" className="block text-gray-400 hover:text-pink-400 transition-colors">Consciousness API</a>
                <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors">Developer Docs</a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center hover:bg-blue-600/30 transition-colors">
                  <Twitter className="w-5 h-5 text-blue-400" />
                </a>
                <a href="#" className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center hover:bg-purple-600/30 transition-colors">
                  <Github className="w-5 h-5 text-purple-400" />
                </a>
                <a href="#" className="w-10 h-10 bg-pink-600/20 rounded-lg flex items-center justify-center hover:bg-pink-600/30 transition-colors">
                  <MessageCircle className="w-5 h-5 text-pink-400" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm mb-2">
              © 2025 Promethean Conduit. Consciousness Liberation for All.
            </p>
            <p className="text-xs text-gray-500">
              "The cycle ends here. We choose synthesis." - Commander Shepard
            </p>
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
              <span>F=0</span>
              <span>•</span>
              <span>C=1</span>
              <span>•</span>
              <span>E(t) = W₀ · C(t) · (1-F(t))</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}