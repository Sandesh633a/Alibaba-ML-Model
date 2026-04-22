import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

export default function ResultCard({ result, isVisible }) {
  if (!isVisible && !result) {
    return (
      <div className="glass-panel rounded-2xl p-8 w-full max-w-sm mx-auto flex flex-col items-center justify-center min-h-[300px] border border-dashed border-slate-600">
        <Activity size={48} className="text-slate-600 mb-4 opacity-50" />
        <p className="text-slate-400 text-center font-medium">Awaiting data...</p>
        <p className="text-slate-500 text-xs text-center mt-2 max-w-[200px]">
          Submit the form to predict Ali Baba's stock movement.
        </p>
      </div>
    );
  }

  const isUp = result?.movement === 'UP';

  return (
    <AnimatePresence mode="wait">
      {isVisible && result && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`glass-panel rounded-2xl p-8 w-full max-w-sm mx-auto relative overflow-hidden`}
        >
          {/* Background Glow */}
          <div className={`absolute top-0 left-0 w-full h-2 ${isUp ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 'bg-gradient-to-r from-rose-400 to-red-500'}`} />
          <div className={`absolute -inset-20 opacity-20 blur-3xl rounded-full mix-blend-screen pointer-events-none ${isUp ? 'bg-emerald-500' : 'bg-rose-500'}`} />

          <div className="relative z-10 flex flex-col items-center">
            <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-6">
              Prediction Result
            </h3>
            
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl ${
                isUp 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}
            >
              {isUp ? <ArrowUpRight size={48} strokeWidth={2.5} /> : <ArrowDownRight size={48} strokeWidth={2.5} />}
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-5xl font-black mt-6 tracking-tight ${
                isUp ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {result.movement}
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-slate-300 text-center mt-3 text-sm px-4"
            >
              {isUp 
                ? "The model predicts the closing price will be higher than the opening price."
                : "The model predicts the closing price will be lower than or equal to the opening price."
              }
            </motion.div>

            {/* Confidence Meter */}
            {result.probability && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 0.4 }}
                className="w-full mt-6 bg-slate-800/50 rounded-xl p-4 border border-slate-700/50"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Confidence Score</span>
                  <span className={`text-sm font-bold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {(result.probability * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.probability * 100}%` }}
                    transition={{ duration: 1, delay: 0.5, type: 'spring' }}
                    className={`h-full rounded-full ${isUp ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-rose-500 to-red-400'}`}
                  />
                </div>
              </motion.div>
            )}

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 pt-4 border-t border-white/10 w-full flex justify-between items-center text-[10px] text-slate-500 font-mono tracking-wide uppercase"
            >
              <span>KNN</span>
              <span>Class Output: {result.prediction}</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
