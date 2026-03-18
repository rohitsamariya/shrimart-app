import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Bike, Package, MapPin, Navigation, Phone, ArrowRight } from "lucide-react";

export function NavigatePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl px-6 py-6 flex items-center gap-4 border-b border-gray-100/50 sticky top-0 z-20">
        <button 
          onClick={() => navigate(-1)} 
          className="w-11 h-11 bg-slate-50 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-all active:scale-90"
        >
          <ArrowLeft size={20} className="text-shrimart-black" />
        </button>
        <div>
          <h2 className="font-bold text-shrimart-black text-[22px] uppercase tracking-tight font-poppins">Navigation</h2>
          <p className="text-[12px] font-normal text-gray-400 uppercase tracking-widest mt-0.5 font-inter">Active Mission: #SRM1024</p>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Map Placeholder Premium */}
        <div className="rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-premium bg-white relative" style={{ height: 320 }}>
          <div className="absolute inset-0 grayscale opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          
          <div className="relative w-full h-full p-8 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="bg-shrimart-black/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-premium border border-white/10 font-inter">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Route Distance</p>
                <p className="text-shrimart-yellow font-bold uppercase leading-none">1.7 KM TOTAL</p>
              </div>
              <div className="w-12 h-12 bg-shrimart-yellow rounded-2xl flex items-center justify-center shadow-glow">
                 <Navigation size={22} className="text-shrimart-black" />
              </div>
            </div>

            {/* Path Visualization Mock */}
            <div className="absolute inset-0 flex items-center justify-center -z-0">
               <svg width="200" height="150" viewBox="0 0 200 150" className="opacity-40">
                  <motion.path 
                    d="M20 130 Q 60 40 180 20" 
                    stroke="black" 
                    strokeWidth="4" 
                    fill="none" 
                    strokeDasharray="10 5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <circle cx="20" cy="130" r="6" fill="#10B981" />
                  <circle cx="180" cy="20" r="6" fill="#EF4444" />
               </svg>
            </div>

            <div className="flex justify-between items-end">
               <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-premium border border-gray-100 flex items-center gap-2 font-inter">
                  <div className="w-2 h-2 bg-shrimart-black rounded-full animate-ping" />
                  <span className="text-[10px] font-bold text-shrimart-black uppercase tracking-widest">Live: Shrimadhopur</span>
               </div>
            </div>
          </div>
        </div>

        {/* Stops Implementation */}
        <div className="space-y-4">
          <motion.div 
            className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-premium flex items-center gap-5"
            whileHover={{ y: -4 }}
          >
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-green-100 shadow-inner">
              <Package size={24} className="text-[#10B981]" />
            </div>
            <div className="flex-1 font-inter">
              <p className="text-[10px] font-bold text-[#10B981] uppercase tracking-[0.2em] mb-1">Phase 1 · Pickup</p>
              <h3 className="font-semibold text-shrimart-black text-[17px] uppercase leading-tight font-poppins">Main Bazaar Market</h3>
              <p className="text-[12px] font-normal text-gray-400 uppercase tracking-widest mt-1">0.5 KM · ~5 MINS</p>
            </div>
            <button className="w-12 h-12 bg-shrimart-black rounded-2xl flex items-center justify-center shadow-premium active:scale-90">
              <Navigation size={20} className="text-shrimart-yellow" />
            </button>
          </motion.div>

          <motion.div 
            className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-premium flex items-center gap-5 opacity-60"
            whileHover={{ y: -4 }}
          >
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-red-100 shadow-inner">
              <MapPin size={24} className="text-red-500" />
            </div>
            <div className="flex-1 font-inter">
              <p className="text-[10px] font-bold text-red-400 uppercase tracking-[0.2em] mb-1">Phase 2 · Delivery</p>
              <h3 className="font-semibold text-shrimart-black text-[17px] uppercase leading-tight font-poppins">Hanuman Temple</h3>
              <p className="text-[12px] font-normal text-gray-400 uppercase tracking-widest mt-1">1.2 KM FROM PICKUP</p>
            </div>
            <button className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300">
              <Phone size={20} />
            </button>
          </motion.div>
        </div>

        {/* Recipient Intelligence */}
        <div className="bg-shrimart-black rounded-[2.5rem] p-8 shadow-premium relative overflow-hidden group">
          <div className="absolute inset-0 bg-shrimart-yellow/5 animate-pulse" />
           <div className="flex items-center gap-6 relative z-10 font-inter">
            <div className="w-16 h-16 bg-shrimart-yellow rounded-[1.5rem] flex items-center justify-center shadow-glow font-bold text-shrimart-black text-[22px] font-poppins">R</div>
             <div className="flex-1">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Recipient Node</p>
              <h3 className="text-[20px] font-bold text-white uppercase tracking-tight font-poppins">Ramesh Sharma</h3>
              <p className="text-[12px] font-normal text-shrimart-yellow/60 uppercase tracking-widest mt-1">Customer · +91 98765 43210</p>
            </div>
            <button className="w-14 h-14 bg-shrimart-yellow rounded-2xl flex items-center justify-center shadow-glow active:scale-90">
              <Phone size={22} className="text-shrimart-black" />
            </button>
          </div>
        </div>

         <motion.button
          className="w-full bg-shrimart-yellow text-shrimart-black py-6 rounded-[2rem] font-semibold text-[16px] uppercase flex items-center justify-center gap-3 shadow-glow active:scale-95 font-inter"
          whileHover={{ y: -4 }}
          onClick={() => navigate("/rider/delivery")}
        >
          Access Delivery Terminal <ArrowRight size={22} />
        </motion.button>
      </div>
    </div>
  );
}
