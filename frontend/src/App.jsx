import { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity } from 'lucide-react';
import PredictionForm from './components/PredictionForm';
import ResultCard from './components/ResultCard';
import ModelInfo from './components/ModelInfo';
import PredictionHistory from './components/PredictionHistory';
import './index.css';

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [history, setHistory] = useState([]);

  // Load history from local storage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('predictionHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history");
      }
    }
  }, []);

  const handlePredict = async (data) => {
    setIsLoading(true);
    setError(null);
    setIsVisible(false);
    
    try {
      const response = await axios.post('/api/predict', data);
      
      setTimeout(() => {
        setResult(response.data);
        setIsVisible(true);
        setIsLoading(false);
        
        // Add to history
        const newRecord = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          data,
          result: response.data
        };
        
        setHistory(prev => {
          const newHistory = [newRecord, ...prev].slice(0, 50); // Keep last 50
          localStorage.setItem('predictionHistory', JSON.stringify(newHistory));
          return newHistory;
        });
        
      }, 600);
      
    } catch (err) {
      console.error("Prediction error:", err);
      setError("Failed to get prediction. Ensure the backend is running.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-y-auto overflow-x-hidden py-10 px-4 sm:px-6 lg:px-8">
      {/* Decorative background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none fixed" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none fixed" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-10 flex flex-col items-center">
          <div className="bg-blue-500/10 p-3 rounded-2xl mb-4 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <Activity size={32} className="text-blue-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-white">
            Market Predictor
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 mt-2">Intelligence Hub</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Advanced intraday forecasting engine powered by Logistic Regression. Input key market metrics to predict closing movements.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column - Form & Info */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <PredictionForm onSubmit={handlePredict} isLoading={isLoading} />
              {error && (
                <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium shadow-[0_0_20px_rgba(239,68,68,0.1)] max-w-md mx-auto">
                  {error}
                </div>
              )}
            </div>
            
            <div className="max-w-md mx-auto w-full h-full">
               <ModelInfo />
            </div>
          </div>
          
          {/* Right Column - Results & History */}
          <div className="lg:col-span-5 flex flex-col gap-6 h-full">
            <ResultCard result={result} isVisible={isVisible} />
            
            <div className="flex-1 mt-2">
              <PredictionHistory history={history} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
