import { useState } from 'react';
import { Activity, BarChart3, TrendingDown, TrendingUp, DollarSign, Percent } from 'lucide-react';

const InputField = ({ label, icon: Icon, id, value, onChange, placeholder, step, description }) => (
  <div className="flex flex-col gap-1.5 mb-5 relative group">
    <label htmlFor={id} className="text-sm font-medium text-slate-300 flex items-center gap-2">
      <Icon size={16} className="text-blue-400" />
      {label}
    </label>
    <input
      type="number"
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      step={step}
      required
      className="input-field rounded-lg px-4 py-2.5 w-full text-sm font-medium"
    />
    {description && (
      <p className="text-[10px] text-slate-500 mt-0.5 leading-tight opacity-80 group-hover:opacity-100 transition-opacity">
        {description}
      </p>
    )}
  </div>
);

export default function PredictionForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    Open: '',
    High: '',
    Low: '',
    Volume: '',
    Price_Range: '',
    Daily_Return: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert all to numbers
    const processedData = {
      Open: parseFloat(formData.Open),
      High: parseFloat(formData.High),
      Low: parseFloat(formData.Low),
      Volume: parseInt(formData.Volume, 10),
      Price_Range: parseFloat(formData.Price_Range),
      Daily_Return: parseFloat(formData.Daily_Return)
    };
    
    onSubmit(processedData);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 w-full max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
          Enter Market Data
        </h2>
        <p className="text-slate-400 text-sm mt-1">Input the day's stock metrics to predict closing movement.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <InputField 
            label="Open Price" 
            id="Open" 
            icon={DollarSign} 
            value={formData.Open} 
            onChange={handleChange} 
            placeholder="e.g. 90.5" 
            step="0.01" 
            description="Starting price of the trading day."
          />
          <InputField 
            label="High Price" 
            id="High" 
            icon={TrendingUp} 
            value={formData.High} 
            onChange={handleChange} 
            placeholder="e.g. 92.0" 
            step="0.01" 
            description="Highest price reached during the day."
          />
          <InputField 
            label="Low Price" 
            id="Low" 
            icon={TrendingDown} 
            value={formData.Low} 
            onChange={handleChange} 
            placeholder="e.g. 89.0" 
            step="0.01" 
            description="Lowest price reached during the day."
          />
          <InputField 
            label="Volume" 
            id="Volume" 
            icon={BarChart3} 
            value={formData.Volume} 
            onChange={handleChange} 
            placeholder="e.g. 1000000" 
            step="1" 
            description="Total number of shares traded."
          />
          <InputField 
            label="Price Range" 
            id="Price_Range" 
            icon={Activity} 
            value={formData.Price_Range} 
            onChange={handleChange} 
            placeholder="e.g. 3.0" 
            step="0.01" 
            description="Difference between High and Low."
          />
          <InputField 
            label="Daily Return" 
            id="Daily_Return" 
            icon={Percent} 
            value={formData.Daily_Return} 
            onChange={handleChange} 
            placeholder="e.g. 0.05" 
            step="0.0001" 
            description="Intraday return: (Close - Open) / Open."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <>
              <Activity size={18} />
              Predict Movement
            </>
          )}
        </button>
      </form>
    </div>
  );
}
