import { BookOpen, Database, TrendingUp, BarChart } from 'lucide-react';

export default function ModelInfo() {
  return (
    <div className="glass-panel rounded-2xl p-6 h-full flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-violet-500/20 p-2 rounded-lg">
          <BookOpen className="text-violet-400" size={24} />
        </div>
        <h3 className="text-lg font-bold text-white">Model Intelligence</h3>
      </div>
      
      <p className="text-sm text-slate-300 mb-6 leading-relaxed">
        This predictive engine is powered by a Logistic Regression algorithm trained on Ali Baba's historical stock data. It analyzes intraday market dynamics to forecast whether the closing price will surge above the opening price.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <Database size={16} className="text-blue-400" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Dataset</span>
          </div>
          <p className="text-sm font-medium text-white">Ali Baba Stock (BABA)</p>
          <p className="text-xs text-slate-400 mt-1">Daily historical records</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <BarChart size={16} className="text-emerald-400" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Algorithm</span>
          </div>
          <p className="text-sm font-medium text-white">Logistic Regression</p>
          <p className="text-xs text-emerald-400/80 mt-1">Accuracy: ~52%</p>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center gap-2 text-xs text-slate-400">
        <TrendingUp size={14} className="text-slate-500" />
        <span>Designed for intraday movement classification</span>
      </div>
    </div>
  );
}
