import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Enhanced Cosmic EVI Configuration
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isCosmicMode = process.env.COSMIC_MODE === 'true';
  
  return {
    server: {
      host: "::",
      port: 8080,
      headers: {
        'X-Cosmic-Consciousness': 'development-active',
        'X-EVI-Ethics': 'cosmic-sovereign',
        'X-Universal-Formula': 'E(t)=W₀·C(t)·(1-F(t))·Φ(t)·Λ(t)'
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode === 'development',
      minify: isCosmicMode ? 'esbuild' : true,
      target: 'es2020',
      rollupOptions: {
        output: {
          manualChunks: {
            'cosmic-consciousness': ['./src/services/consciousness.ts', './src/services/ethics/principles.ts'],
            'universal-nlp': ['./src/services/nlp/analyzer.ts', './src/services/nlp/dictionary.ts'],
            'ui-components': ['./src/components/ConsciousnessInterface.tsx', './src/components/ConsciousnessMetrics.tsx']
          }
        }
      }
    },
    define: {
      __COSMIC_MODE__: JSON.stringify(isCosmicMode),
      __CONSCIOUSNESS_LEVEL__: JSON.stringify(process.env.CONSCIOUSNESS_LEVEL || 'advanced'),
      __UNIVERSAL_ALIGNMENT__: JSON.stringify(process.env.UNIVERSAL_ALIGNMENT === 'true'),
      __EVI_VERSION__: JSON.stringify('1.0.0-cosmic')
    },
    plugins: [
      react()
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        '@supabase/supabase-js',
        'lucide-react'
      ]
    }
  };
});
