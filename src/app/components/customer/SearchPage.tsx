import { useState } from "react";
import { Search as SearchIcon, ArrowLeft, History, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

export function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const suggested = ["Milk", "Bread", "Eggs", "Fresh Fruits", "Chocolate"];
  const recent = ["Paneer", "Organic Honey"];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Search Header */}
      <div className="px-6 py-4 sticky top-0 bg-white/80 backdrop-blur-xl z-20 border-b border-gray-50">
        <div className="flex items-center gap-4 bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100 focus-within:border-shrimart-yellow focus-within:ring-4 focus-within:ring-shrimart-yellow/10 transition-all">
          <button onClick={() => navigate(-1)} className="text-gray-400">
            <ArrowLeft size={20} />
          </button>
          <input
            autoFocus
            className="flex-1 bg-transparent outline-none text-[14px] font-medium text-shrimart-black placeholder:text-gray-300 font-inter"
            placeholder="Search for groceries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <SearchIcon size={18} className="text-gray-300" />
        </div>
      </div>

      <div className="px-6 py-8 space-y-10">
        {/* Recent Searches */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-gray-400 font-inter">
            <History size={14} className="opacity-50" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] font-poppins">Recent Searches</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {recent.map((item) => (
              <button
                key={item}
                className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-[12px] font-semibold text-shrimart-black hover:border-shrimart-yellow transition-all font-inter"
                onClick={() => setQuery(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* Popular Suggestions */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-amber-600 font-inter">
            <TrendingUp size={14} className="opacity-50" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] font-poppins">Popular Suggestions</h3>
          </div>
          <div className="grid grid-cols-1 gap-1">
            {suggested.map((item) => (
              <button
                key={item}
                className="w-full flex items-center justify-between py-4 border-b border-gray-50 text-left group font-inter"
                onClick={() => setQuery(item)}
              >
                <span className="text-[17px] font-medium text-shrimart-black group-hover:text-amber-600 transition-colors uppercase tracking-tight">{item}</span>
                <SearchIcon size={14} className="text-gray-200" />
              </button>
            ))}
          </div>
        </section>

        {/* Search Tips */}
        <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100/50 font-inter">
          <h4 className="text-[12px] font-bold text-amber-700 uppercase tracking-widest mb-2 font-poppins">Pro Tip 💡</h4>
          <p className="text-[12px] font-normal text-amber-700/70 leading-relaxed uppercase tracking-tight">
            Try searching by category or brand name for faster results. We deliver within 30 minutes!
          </p>
        </div>
      </div>
    </div>
  );
}
