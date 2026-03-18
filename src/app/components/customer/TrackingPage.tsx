import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Bike, CheckCircle, Package, Home, Phone, MapPin, Clock } from "lucide-react";

const stages = [
  { id: 0, icon: <CheckCircle size={18} />, label: "Order Received", time: "2:30 PM", done: true },
  { id: 1, icon: <Package size={18} />, label: "Preparing Order", time: "2:33 PM", done: true },
  { id: 2, icon: <Bike size={18} />, label: "Out for Delivery", time: "2:40 PM", done: true, active: true },
  { id: 3, icon: <Home size={18} />, label: "Delivered", time: "~3:00 PM", done: false },
];

export function TrackingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl px-4 py-5 flex items-center gap-3 border-b border-gray-100/50 sticky top-0 z-40">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-all active:scale-90">
          <ArrowLeft size={18} className="text-shrimart-black" />
        </button>
        <div className="min-w-0 flex-1">
          <h2 className="font-bold text-shrimart-black text-[18px] uppercase tracking-tight truncate font-poppins">Track Order</h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 font-inter">#SRM1024</p>
        </div>
        <div className="bg-shrimart-yellow/10 px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-shrimart-yellow/20 font-inter">
          <Clock size={12} className="text-shrimart-yellow-dark" />
          <span className="text-[10px] font-bold text-shrimart-black uppercase tracking-tight">ETA: 28 min</span>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Map area */}
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm" style={{ height: 220 }}>
          <div className="relative w-full h-full"
            style={{
              background: "linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%)",
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300000008'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          >
            {/* Route SVG */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 220" preserveAspectRatio="none">
              <path d="M60 180 C120 120 200 80 320 50" stroke="#FFD84D" strokeWidth="3" fill="none" strokeDasharray="10 5" />
            </svg>
            {/* Rider */}
            <motion.div
              className="absolute w-12 h-12 bg-shrimart-yellow rounded-full flex items-center justify-center shadow-premium shadow-shrimart-yellow/40 z-10 border-2 border-white"
              style={{ left: "35%", top: "40%" }}
              animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Bike size={22} className="text-shrimart-black" />
            </motion.div>
            {/* Store */}
            <div className="absolute w-10 h-10 bg-shrimart-black rounded-full flex items-center justify-center shadow-lg z-10 border-2 border-white" style={{ left: "12%", top: "60%" }}>
              <Package size={16} className="text-shrimart-yellow" />
            </div>
            {/* Home */}
            <div className="absolute w-10 h-10 bg-[#EF4444] rounded-full flex items-center justify-center shadow-lg z-10 border-2 border-white" style={{ right: "15%", top: "18%" }}>
              <MapPin size={16} className="text-white" />
            </div>
            {/* Location label */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-2 border border-gray-100">
              <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse shadow-glow" />
              <span className="text-[10px] font-bold text-shrimart-black uppercase tracking-tight font-inter">Shrimadhopur</span>
            </div>
            {/* Rider moving label */}
            <motion.div
              className="absolute bg-[#1F2937] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
              style={{ left: "38%", top: "25%" }}
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🏍️ On the way!
            </motion.div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100/50 shadow-premium p-6 sm:p-8">
          <h3 className="font-bold text-shrimart-black uppercase tracking-tight text-[18px] mb-6 font-poppins">Order Status</h3>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-50" />
            <div className="absolute left-5 top-5 w-0.5 bg-shrimart-yellow shadow-glow transition-all" style={{ height: "60%" }} />
            <div className="space-y-6">
              {stages.map((stage) => (
                <div key={stage.id} className="flex items-start gap-5 relative z-10">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${stage.active ? "bg-shrimart-yellow shadow-glow rotate-6" : stage.done ? "bg-shrimart-black" : "bg-slate-50"}`}>
                    <span className={stage.active ? "text-shrimart-black scale-110" : stage.done ? "text-shrimart-yellow" : "text-gray-300"}>
                      {stage.icon}
                    </span>
                  </div>
                   <div className="flex-1 pt-1 font-inter">
                    <p className={`text-[13px] font-bold uppercase tracking-tight ${stage.active ? "text-shrimart-black" : stage.done ? "text-shrimart-black" : "text-gray-400"}`}>
                      {stage.label}
                      {stage.active && <span className="ml-2 text-shrimart-yellow-dark text-[10px] animate-pulse">● LIVE</span>}
                    </p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 opacity-60">{stage.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rider Info */}
         <div className="bg-white rounded-[2rem] border border-gray-100/50 shadow-premium p-5 group font-inter">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 font-poppins">Delivery Mission</h3>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-shrimart-yellow rounded-2xl flex items-center justify-center font-bold text-shrimart-black text-xl flex-shrink-0 shadow-glow rotate-2 group-hover:rotate-0 transition-transform font-poppins">
              R
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-shrimart-black uppercase text-[17px] font-poppins">Rahul Kumar</p>
              <p className="text-[12px] font-normal text-gray-400 uppercase tracking-widest mt-1">⭐ 4.9 rating · 230 trips</p>
            </div>
            <button className="w-11 h-11 bg-shrimart-black rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl active:scale-90 group-hover:bg-shrimart-yellow transition-colors duration-300">
              <Phone size={18} className="text-shrimart-yellow group-hover:text-shrimart-black" />
            </button>
          </div>
        </div>

        {/* Order details mini */}
         <div className="bg-shrimart-yellow-light/50 rounded-[2rem] border border-shrimart-yellow/20 p-6 relative overflow-hidden font-inter">
          <div className="absolute top-0 right-0 w-24 h-24 bg-shrimart-yellow/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order Reference</p>
              <p className="font-bold text-shrimart-black text-[22px] tracking-tight mt-1 font-poppins">₹350</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Method</p>
              <p className="text-[12px] font-bold text-[#10B981] uppercase tracking-widest mt-1 bg-[#10B981]/10 px-3 py-1 rounded-lg border border-[#10B981]/20">Cash Payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
