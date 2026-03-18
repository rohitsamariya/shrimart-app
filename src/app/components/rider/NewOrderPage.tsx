import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, MapPin, Package, X, CheckCircle, Clock, TrendingUp, ArrowRight } from "lucide-react";

export function NewOrderPage() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    setTimeout(() => navigate("/rider/navigate"), 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl px-6 py-6 flex items-center gap-4 border-b border-gray-100/50 sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="w-11 h-11 bg-slate-50 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-all active:scale-90"
        >
          <ArrowLeft size={20} className="text-shrimart-black" />
        </button>
        <div>
          <h2 className="font-bold text-shrimart-black text-[22px] uppercase tracking-tight font-poppins">New Request</h2>
          <p className="text-[12px] font-normal text-gray-400 uppercase tracking-widest mt-0.5 font-inter">Incoming Order Alert</p>
        </div>
      </div>

      <div className="px-6 py-10 space-y-10">
        {/* Timer ring */}
        <div className="flex justify-center">
          <motion.div
            className="relative w-32 h-32 rounded-[2.5rem] border-4 border-shrimart-yellow flex items-center justify-center bg-white shadow-premium overflow-hidden"
            animate={accepted ? { scale: [1, 1.1, 1] } : { borderColor: ["#FFD84D", "#000", "#FFD84D"] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {accepted ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <CheckCircle size={56} className="text-[#10B981]" />
              </motion.div>
            ) : (
              <div className="text-center font-inter">
                <p className="font-bold text-shrimart-black text-[26px] leading-none">15</p>
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mt-1">Seconds</p>
              </div>
            )}
            {/* Pulsing glow */}
            {!accepted && <div className="absolute inset-0 bg-shrimart-yellow/5 animate-pulse" />}
          </motion.div>
        </div>

        {/* Order Card Container */}
        <div className="bg-white rounded-[2.5rem] shadow-premium border border-gray-100 overflow-hidden">
          <div className="bg-shrimart-black px-8 py-5 flex items-center justify-between font-inter">
            <span className="text-[10px] font-bold text-shrimart-yellow uppercase tracking-[0.2em]">Transaction #SRM1024</span>
            <span className="font-bold text-white text-[22px]">₹350</span>
          </div>
          <div className="grid grid-cols-2">
            {[
              { label: "Est. Earning", value: "₹45.00", highlight: true, icon: <TrendingUp size={14} /> },
              { label: "Distance", value: "1.2 KM", highlight: false, icon: <MapPin size={14} /> },
              { label: "Total Items", value: "3 Units", highlight: false, icon: <Package size={14} /> },
              { label: "Est. Time", value: "15 MINS", highlight: false, icon: <Clock size={14} /> },
            ].map((item, i) => (
              <div key={item.label} className={`px-8 py-6 border-b border-gray-50 ${i % 2 === 0 ? "border-r" : ""} ${item.highlight ? "bg-shrimart-yellow/5" : ""}`}>
                <div className="flex items-center gap-2 mb-2 font-inter">
                   <span className="text-gray-300">{item.icon}</span>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{item.label}</p>
                </div>
                <p className={`font-bold text-[18px] uppercase font-poppins ${item.highlight ? "text-shrimart-yellow" : "text-shrimart-black"}`}>{item.value}</p>
              </div>
            ))}
          </div>
          
          {/* Route Details */}
          <div className="p-8 space-y-8 bg-slate-50/50">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] font-inter">Deployment Route</h3>
            <div className="flex items-start gap-6 relative">
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-12 h-12 bg-[#10B981] rounded-2xl flex items-center justify-center shadow-glow">
                  <Package size={22} className="text-white" />
                </div>
                <div className="w-0.5 h-12 bg-gray-200 border-dashed border-l-2" />
                <div className="w-12 h-12 bg-shrimart-black rounded-2xl flex items-center justify-center shadow-premium">
                  <MapPin size={22} className="text-shrimart-yellow" />
                </div>
              </div>
              <div className="flex-1 space-y-10 font-inter">
                <div>
                  <p className="text-[10px] font-bold text-[#10B981] uppercase tracking-widest mb-1">Phase 1: Pickup</p>
                  <p className="font-semibold text-shrimart-black uppercase text-[17px] leading-tight font-poppins">Local Market, Main Bazaar</p>
                  <p className="text-[10px] font-normal text-gray-400 uppercase tracking-tighter mt-1">Shrimadhopur · 0.5 KM FROM YOU</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-shrimart-yellow uppercase tracking-widest mb-1">Phase 2: Delivery</p>
                  <p className="font-semibold text-shrimart-black uppercase text-[17px] leading-tight font-poppins">Near Hanuman Temple, Ward 5</p>
                  <p className="text-[10px] font-normal text-gray-400 uppercase tracking-tighter mt-1">Sikar · 1.2 KM FROM PICKUP</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items Preview */}
        <div className="bg-white/40 backdrop-blur-sm border border-gray-100 rounded-2xl px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center border border-gray-200">
             <span className="text-lg">🛒</span>
          </div>
          <div className="flex-1 font-inter">
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Manifest Items</p>
             <p className="text-[14px] font-medium text-shrimart-black uppercase truncate">Tomatoes, Amul Milk, Fresh Apples</p>
          </div>
        </div>

        {/* Action Buttons */}
        {!accepted ? (
           <div className="flex items-center gap-4 fixed bottom-10 left-6 right-6 font-inter">
            <motion.button
              className="flex-1 bg-white border border-gray-200 text-gray-400 py-5 rounded-[2rem] font-bold uppercase text-[12px] tracking-widest transition-all hover:bg-red-50 hover:text-red-500 hover:border-red-100 active:scale-95 shadow-premium"
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
            >
              Pass Request
            </motion.button>
            <motion.button
              className="flex-[2] bg-shrimart-yellow text-shrimart-black py-5 rounded-[2rem] font-semibold text-[16px] uppercase flex items-center justify-center gap-3 shadow-glow active:scale-95"
              whileHover={{ y: -4 }}
              onClick={handleAccept}
            >
              Accept Mission <ArrowRight size={22} />
            </motion.button>
          </div>
        ) : (
          <motion.div
            className="bg-shrimart-black text-white rounded-[2.5rem] p-10 text-center shadow-premium relative overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="absolute inset-0 bg-shrimart-yellow/5 animate-pulse" />
            <motion.div 
               className="w-20 h-20 bg-shrimart-yellow rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-glow"
               animate={{ rotate: 360 }}
               transition={{ duration: 1, repeat: 1 }}
            >
               <CheckCircle size={40} className="text-shrimart-black" />
            </motion.div>
            <h3 className="text-[26px] font-bold uppercase tracking-tight text-shrimart-yellow mb-2 font-poppins">Accepted! 🎉</h3>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[12px] font-inter">Initializing Navigation Systems...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
