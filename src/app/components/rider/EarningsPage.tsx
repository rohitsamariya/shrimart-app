import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, TrendingUp, Bike, Award, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const weekData = [
  { day: "Mon", amount: 120 },
  { day: "Tue", amount: 185 },
  { day: "Wed", amount: 145 },
  { day: "Thu", amount: 210 },
  { day: "Fri", amount: 175 },
  { day: "Sat", amount: 270 },
  { day: "Sun", amount: 135 },
];

const recentDeliveries = [
  { id: "#SRM1023", time: "Today, 2:15 PM", earning: 45 },
  { id: "#SRM1022", time: "Today, 12:30 PM", earning: 38 },
  { id: "#SRM1021", time: "Today, 10:45 AM", earning: 52 },
  { id: "#SRM1020", time: "Yesterday, 3:00 PM", earning: 42 },
  { id: "#SRM1018", time: "Yesterday, 11:30 AM", earning: 38 },
];

export function EarningsPage() {
  const navigate = useNavigate();
  const total = weekData.reduce((s, d) => s + d.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl px-6 py-6 flex items-center gap-4 border-b border-gray-100/50 sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="w-11 h-11 bg-slate-50 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-all active:scale-90"
        >
          <ArrowLeft size={20} className="text-shrimart-black" />
        </button>
        <div>
          <h2 className="font-bold text-shrimart-black text-[22px] uppercase tracking-tight font-poppins">Yield Report</h2>
          <p className="text-[12px] font-normal text-gray-400 uppercase tracking-widest mt-0.5 font-inter">Financial Performance Analytics</p>
        </div>
      </div>

      <div className="px-6 py-10 space-y-10">
        {/* Week banner Premium */}
        <motion.div
          className="rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-premium"
          style={{ background: "#000" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Decorative mesh */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-shrimart-yellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-shrimart-yellow/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 font-inter">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">Yield: Cycle 12</p>
            <div className="flex items-baseline gap-1">
              <span className="text-[32px] font-bold uppercase text-shrimart-yellow leading-none tracking-tighter">₹{total}</span>
              <span className="text-gray-500 font-bold text-[14px]">.80</span>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <div className="bg-[#10B981]/10 px-3 py-1.5 rounded-xl border border-[#10B981]/20 flex items-center gap-2 font-inter">
                <TrendingUp size={14} className="text-[#10B981]" />
                <span className="text-[#10B981] font-bold text-[10px] uppercase tracking-widest">+18.4%</span>
              </div>
              <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest font-inter">vs last cycle</p>
            </div>
          </div>
        </motion.div>

        {/* Stats row Premium */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: <Calendar size={18} />, label: "Today", value: "₹135", color: "text-blue-400" },
            { icon: <Bike size={18} />, label: "Trips", value: "28", color: "text-shrimart-yellow" },
            { icon: <Award size={18} />, label: "Score", value: "4.9", color: "text-[#10B981]" },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label} 
              className="bg-white rounded-[2rem] p-6 text-center border border-gray-100 shadow-premium"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 ${stat.color} shadow-inner`}>
                {stat.icon}
              </div>
              <p className="font-bold text-shrimart-black text-[20px] uppercase leading-none mb-1 font-inter">{stat.value}</p>
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest font-inter">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Chart Premium Styling */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-premium p-8 overflow-hidden relative">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-shrimart-black uppercase tracking-tight text-[18px] leading-tight font-poppins">Daily Analytics</h3>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mt-0.5 font-inter">7-Day Deployment View</p>
            </div>
            <div className="bg-slate-50 px-4 py-2 rounded-xl flex items-center gap-2 border border-gray-100 font-inter">
              <Calendar size={14} className="text-gray-400" />
              <span className="text-[10px] font-bold text-shrimart-black uppercase tracking-widest">Week 12</span>
            </div>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                <defs>
                  <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFD84D" stopOpacity={1} />
                    <stop offset="100%" stopColor="#FFD84D" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fontWeight: 900, fill: "#9CA3AF", textAnchor: "middle" }} 
                />
                <Tooltip
                  cursor={{ fill: "rgba(0,0,0,0.03)", radius: 10 }}
                  contentStyle={{ 
                    background: "#000", 
                    border: "none", 
                    borderRadius: 16, 
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                    padding: "10px 15px"
                  }}
                  itemStyle={{ 
                    padding: 0, 
                    color: "#FFD84D", 
                    fontSize: 10, 
                    fontFamily: "Inter", 
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                  labelStyle={{ display: "none" }}
                  formatter={(v: number) => [`₹${v}`, "Yield"]}
                />
                <Bar 
                  dataKey="amount" 
                  fill="url(#yieldGradient)" 
                  radius={[10, 10, 10, 10]} 
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent deliveries Premium */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2 font-poppins">
            <h3 className="font-bold text-shrimart-black uppercase tracking-tighter text-[22px]">Event Log</h3>
            <span className="text-[12px] font-bold text-shrimart-yellow bg-shrimart-black px-4 py-1.5 rounded-2xl uppercase tracking-widest shadow-premium font-inter">Archive</span>
          </div>
          
          <div className="space-y-4">
            {recentDeliveries.map((d, i) => (
              <motion.div 
                key={d.id} 
                className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-premium flex items-center gap-5 transition-transform active:scale-95"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-gray-100">
                  <Bike size={22} className="text-gray-400 group-hover:text-shrimart-yellow transition-colors" />
                </div>
                <div className="flex-1 font-inter">
                  <p className="font-bold text-shrimart-black uppercase tracking-tighter text-[17px] leading-tight">{d.id}</p>
                  <p className="text-[12px] font-normal text-gray-300 uppercase tracking-widest mt-0.5">{d.time}</p>
                </div>
                <div className="text-right font-inter">
                  <span className="font-bold text-[#10B981] text-[18px] leading-none">+₹{d.earning}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievement banner Premium */}
        <div className="bg-shrimart-yellow rounded-[2.5rem] p-10 shadow-glow overflow-hidden relative group">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-shrimart-black rounded-[2rem] flex items-center justify-center shadow-premium rotate-3 group-hover:rotate-0 transition-transform">
              <Award size={40} className="text-shrimart-yellow" />
            </div>
            <div className="flex-1 font-inter">
              <p className="text-[10px] font-bold text-shrimart-black/60 uppercase tracking-widest mb-1 font-poppins">Vanguard Status</p>
              <h3 className="font-bold text-shrimart-black uppercase tracking-tight text-[22px] leading-tight font-poppins">Supreme Rider! 👑</h3>
              <p className="text-[12px] font-normal text-shrimart-black/40 uppercase tracking-widest mt-2 leading-tight">Top 10% elite performer in the current operational cycle</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
