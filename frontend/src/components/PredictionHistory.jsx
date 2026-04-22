import { History, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PredictionHistory({ history }) {
  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col h-full max-h-[500px]">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-500/20 p-2 rounded-lg">
          <History className="text-blue-400" size={24} />
        </div>
        <h3 className="text-lg font-bold text-white">Session History</h3>
        <span className="ml-auto text-xs font-medium bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full">
          {history.length} {history.length === 1 ? 'Record' : 'Records'}
        </span>
      </div>

      <div className="overflow-y-auto pr-2 custom-scrollbar flex-1 space-y-3">
        <AnimatePresence>
          {history.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="h-full flex flex-col items-center justify-center text-slate-500 pb-8"
            >
              <Clock size={32} className="mb-3 opacity-20" />
              <p className="text-sm text-center">No predictions made yet.</p>
              <p className="text-xs text-center mt-1 opacity-70">Your recent queries will appear here.</p>
            </motion.div>
          ) : (
            history.map((item, index) => {
              const isUp = item.result.movement === 'UP';
              const conf = (item.result.probability * 100).toFixed(1);
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  className="bg-slate-800/40 hover:bg-slate-800/60 transition-colors rounded-xl p-4 border border-slate-700/50 flex items-center justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                        isUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {item.result.movement}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono tracking-wider">
                        {conf}% CONF
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono flex gap-3">
                      <span>O:{item.data.Open}</span>
                      <span>H:{item.data.High}</span>
                      <span>L:{item.data.Low}</span>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
