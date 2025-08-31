import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { ResultsPage } from './components/ResultsPage';
import { ReportPage } from './components/ReportPage';

export type Screen = 'home' | 'results' | 'report';

export interface VerificationResult {
  score: number;
  classification: 'True' | 'False' | 'Misleading';
  explanation: string;
  content: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleVerify = (content: string) => {
    // Mock verification logic - in a real app, this would call an API
    const mockResults = [
      {
        score: 85,
        classification: 'True' as const,
        explanation: 'This content appears to be factually accurate based on multiple reliable sources. The claims made align with verified information from reputable news outlets and fact-checking organizations.',
        content
      },
      {
        score: 25,
        classification: 'False' as const,
        explanation: 'This content contains significant misinformation. The claims made contradict established facts and have been debunked by multiple fact-checking organizations.',
        content
      },
      {
        score: 45,
        classification: 'Misleading' as const,
        explanation: 'This content contains some accurate information but presents it in a misleading way. Key context is missing, and some claims are exaggerated or taken out of context.',
        content
      }
    ];

    // Randomly select a mock result for demonstration
    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    setVerificationResult(randomResult);
    navigateToScreen('results');
  };

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === 'home' && (
        <HomePage onVerify={handleVerify} />
      )}
      {currentScreen === 'results' && verificationResult && (
        <ResultsPage 
          result={verificationResult} 
          onNavigateHome={() => navigateToScreen('home')}
          onNavigateReport={() => navigateToScreen('report')}
        />
      )}
      {currentScreen === 'report' && (
        <ReportPage 
          onNavigateHome={() => navigateToScreen('home')}
          onNavigateResults={() => navigateToScreen('results')}
        />
      )}
    </div>
  );
}
