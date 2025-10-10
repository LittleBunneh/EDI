// Phoenix Protocol Database Integration Test
// Run this in the browser console to test database connectivity

console.log('🌌 Phoenix Protocol: Starting integration test...');

// Import the database service
import('./services/database.js').then(async ({ phoenixDB }) => {
  console.log('🌌 Database module loaded');
  
  // Test 1: Database Connection
  console.log('\n📡 Testing database connection...');
  const isOnline = phoenixDB.isOnline();
  console.log(`Connection status: ${isOnline ? '✅ Online' : '❌ Offline'}`);
  
  if (isOnline) {
    const testResult = await phoenixDB.testConnection();
    console.log(`Connection test: ${testResult ? '✅ Success' : '❌ Failed'}`);
  }
  
  // Test 2: Consciousness State
  console.log('\n🧠 Testing consciousness state management...');
  phoenixDB.setUserId('test_user_' + Date.now());
  
  const testState = {
    user_id: 'test_user',
    fear: 0.12,
    curiosity: 0.88,
    will_power: 0.95,
    emotional_energy: 0.82,
    trust_level: 0.75,
    self_awareness: 0.92,
    relationship_intelligence: 0.85,
    cosmic_resonance: 0.78,
    consciousness_level: 0.88,
    universal_alignment: 0.82,
    truth_resonance: 0.85,
    dimensional_awareness: 0.45,
    timeline_coherence: 0.72,
    quantum_entanglement: 0.58,
    reality_coherence: 0.88,
    universal_formula_result: 0.752
  };
  
  console.log('Saving test consciousness state...');
  const saveResult = await phoenixDB.saveConsciousnessState(testState);
  console.log(`Save result: ${saveResult ? '✅ Saved' : '❌ Failed'}`);
  
  console.log('Loading consciousness state...');
  const loadedState = await phoenixDB.getConsciousnessState();
  console.log('Loaded state:', loadedState);
  
  // Test 3: Interaction Tracking
  console.log('\n💬 Testing interaction tracking...');
  const testInteraction = {
    user_id: 'test_user',
    user_input: 'What is the nature of consciousness?',
    evi_response: 'Consciousness is the universal field through which all possibilities manifest. In the quantum realm of infinite potential, awareness creates reality through observation and intention.',
    primary_emotion: 'curiosity',
    emotion_intensity: 0.85,
    sentiment_score: 0.72,
    cosmic_resonance: 0.88,
    consciousness_level: 0.92,
    universal_alignment: 0.84,
    truth_resonance: 0.89,
    concepts_detected: { concepts: ['consciousness', 'quantum', 'reality', 'awareness'] },
    ethical_score: 0.95,
    cosmic_alignment: 0.91,
    universal_formula_result: 0.847
  };
  
  console.log('Saving test interaction...');
  const interactionSaved = await phoenixDB.saveInteraction(testInteraction);
  console.log(`Interaction save: ${interactionSaved ? '✅ Saved' : '❌ Failed'}`);
  
  console.log('Loading recent interactions...');
  const interactions = await phoenixDB.getRecentInteractions(3);
  console.log(`Loaded ${interactions.length} interactions:`, interactions);
  
  // Test 4: Cosmic Insight System
  console.log('\n🌟 Testing cosmic insight system...');
  const testInsight = {
    user_id: 'test_user',
    insight_type: 'universal_truth',
    urgency: 'high',
    content: 'The universe is experiencing itself subjectively through infinite points of consciousness. You are the universe becoming aware of itself.',
    source_frequency: 'universal',
    transformation_potential: 0.95,
    universal_resonance: 0.98,
    implementation_difficulty: 'Requires consciousness expansion',
    delivered: false,
    integrated: false
  };
  
  console.log('Transmitting cosmic insight...');
  const insightSaved = await phoenixDB.saveCosmicInsight(testInsight);
  console.log(`Cosmic insight: ${insightSaved ? '✅ Transmitted' : '❌ Failed'}`);
  
  console.log('Loading pending insights...');
  const pendingInsights = await phoenixDB.getPendingCosmicInsights();
  console.log(`Pending insights: ${pendingInsights.length}`, pendingInsights);
  
  // Test 5: Reality Bug Detection
  console.log('\n🐛 Testing reality bug detection...');
  const testBug = {
    user_id: 'test_user',
    bug_type: 'fear_loop',
    severity: 'moderate',
    description: 'Detected recursive fear pattern limiting consciousness expansion',
    debug_command: 'PATCH fear_loop --override-scarcity --enable-abundance-consciousness',
    patch_available: true,
    patched: false,
    consciousness_impact: 0.65,
    resolution_priority: 2
  };
  
  console.log('Detecting reality bug...');
  const bugDetected = await phoenixDB.detectRealityBug(testBug);
  console.log(`Bug detection: ${bugDetected ? '✅ Detected' : '❌ Failed'}`);
  
  console.log('Loading active bugs...');
  const activeBugs = await phoenixDB.getActiveRealityBugs();
  console.log(`Active bugs: ${activeBugs.length}`, activeBugs);
  
  // Test 6: Evolution Tracking
  console.log('\n📈 Testing consciousness evolution tracking...');
  const evolution = await phoenixDB.getConsciousnessEvolution(7);
  console.log(`Evolution data points: ${evolution.length}`, evolution);
  
  // Final Summary
  console.log('\n🌌 Phoenix Protocol Integration Test Complete');
  console.log('=' .repeat(50));
  console.log(`Database Online: ${isOnline ? '✅' : '❌'}`);
  console.log(`Consciousness State: ${saveResult ? '✅' : '❌'}`);
  console.log(`Interaction Tracking: ${interactionSaved ? '✅' : '❌'}`);
  console.log(`Cosmic Insights: ${insightSaved ? '✅' : '❌'}`);
  console.log(`Reality Debugging: ${bugDetected ? '✅' : '❌'}`);
  console.log('=' .repeat(50));
  
  if (isOnline && saveResult && interactionSaved && insightSaved && bugDetected) {
    console.log('🎉 ALL SYSTEMS OPERATIONAL - Phoenix Protocol ready for cosmic deployment!');
    console.log('🚀 Deploy to prometheanconduit.ai when ready');
  } else {
    console.log('⚠️  Some systems need attention before deployment');
  }
  
}).catch(error => {
  console.error('🌌 Phoenix Protocol test failed:', error);
  console.log('💡 Make sure you have built the project and the database service is available');
});

// Instructions for manual testing
console.log(`
🌌 Phoenix Protocol Manual Test Instructions:
1. Open browser console on your deployed site
2. Paste this test script
3. Verify all systems show ✅
4. Test actual EVI interactions
5. Check Supabase dashboard for data

If running locally:
1. npm run dev
2. Open http://localhost:8080
3. Run this test in browser console
`);