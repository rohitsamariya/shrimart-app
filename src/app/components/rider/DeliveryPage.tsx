import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Package, MapPin, Phone, CheckCircle } from "lucide-react";

type Status = "pending" | "picked" | "delivered";

export function DeliveryPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("pending");

  const steps = [
    { label: "Transit to Pickup Terminal", done: status !== "pending" },
    { label: "Order Authenticated & Picked", done: status === "picked" || status === "delivered" },
    { label: "Deployment Finalized", done: status === "delivered" },
  ];

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
          <h2 className="font-bold text-shrimart-black text-[22px] uppercase tracking-tight font-poppins">Mission Status</h2>
          <p className="text-[12px] font-normal text-gray-400 uppercase tracking-widest mt-0.5 font-inter">Real-time Deployment Tracking</p>
        </div>
      </div>

      <div className="px-6 py-8 space-y-10">
        {/* Order summary Premium */}
        <div className="bg-shrimart-black rounded-[2.5rem] p-8 shadow-premium relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-shrimart-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="flex items-center justify-between relative z-10 font-inter">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Manifest #SRM1024</p>
              <h3 className="text-white font-medium text-[17px] leading-tight">Tomatoes, Milk, Fresh Apples</h3>
            </div>
            <div className="bg-shrimart-yellow text-shrimart-black px-5 py-2 rounded-2xl font-bold text-[16px] shadow-glow">
              ₹350
            </div>
          </div>
        </div>

        {/* Customer card Premium */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-premium p-8 flex items-center gap-6">
          <div className="w-16 h-16 bg-shrimart-yellow rounded-[1.5rem] flex items-center justify-center shadow-glow font-bold text-shrimart-black text-[22px] flex-shrink-0 font-poppins">
            R
          </div>
          <div className="flex-1 font-inter">
            <h3 className="text-shrimart-black font-semibold text-[20px] leading-tight">Ramesh Sharma</h3>
            <div className="flex items-center gap-2 mt-2">
              <MapPin size={14} className="text-gray-300" />
              <p className="text-[12px] font-normal text-gray-400 uppercase tracking-widest">Hanuman Temple, Ward 5</p>
            </div>
            <div className="mt-3 inline-flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-lg">
              <span className="w-1.5 h-1.5 bg-shrimart-yellow rounded-full animate-pulse" />
              <p className="text-[10px] font-bold text-shrimart-black uppercase tracking-widest">COD · Pay ₹350</p>
            </div>
          </div>
          <button className="w-14 h-14 bg-shrimart-yellow rounded-2xl flex items-center justify-center shadow-glow active:scale-95 transition-transform">
            <Phone size={22} className="text-shrimart-black" />
          </button>
        </div>

        {/* Progress Steps Premium */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-premium p-10 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-shrimart-yellow via-transparent to-transparent opacity-20" />
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-10 font-inter">Deployment Workflow</h3>
          <div className="relative">
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-100 border-l border-dashed border-gray-200" />
            <div className="space-y-10">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-6 relative z-10 group">
                  <motion.div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                       step.done 
                        ? "bg-shrimart-black text-shrimart-yellow shadow-glow" 
                        : "bg-slate-50 text-slate-300 border border-gray-100"
                    }`}
                    animate={step.done ? { scale: [1, 1.1, 1] } : {}}
                  >
                    {step.done ? (
                      <CheckCircle size={22} className="shadow-white" />
                    ) : (
                      <span className="font-bold text-sm font-inter">{i + 1}</span>
                    )}
                  </motion.div>
                  <div className="font-inter">
                    <p className={`font-semibold uppercase text-sm tracking-tight transition-colors duration-500 ${step.done ? "text-shrimart-black" : "text-gray-300"}`}>
                      {step.label}
                    </p>
                    {step.done && <p className="text-[10px] font-bold text-shrimart-yellow uppercase tracking-widest mt-0.5">Verified</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button Premium */}
        {status === "pending" && (
          <motion.button
            className="w-full bg-shrimart-black text-white py-6 rounded-[2rem] font-semibold text-[16px] uppercase flex items-center justify-center gap-4 shadow-premium active:scale-95 group overflow-hidden relative font-inter"
            whileHover={{ y: -4 }}
            onClick={() => setStatus("picked")}
          >
            <div className="absolute inset-0 bg-shrimart-yellow/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <Package size={24} className="group-hover:rotate-12 transition-transform" />
            Initialize Pickup
          </motion.button>
        )}

        {status === "picked" && (
          <motion.button
            className="w-full bg-shrimart-yellow text-shrimart-black py-6 rounded-[2rem] font-semibold text-[16px] uppercase flex items-center justify-center gap-4 shadow-glow active:scale-95 group overflow-hidden relative font-inter"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ y: -4 }}
            onClick={() => setStatus("delivered")}
          >
            <CheckCircle size={24} className="group-hover:scale-125 transition-transform" />
            Complete Deployment
          </motion.button>
        )}

        {status === "delivered" && (
          <motion.div
            className="bg-shrimart-black rounded-[2.5rem] p-10 text-white text-center shadow-premium relative overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {/* Animated Celebration effect */}
            <motion.div 
              className="absolute inset-0 bg-shrimart-yellow/5"
              animate={{ opacity: [0, 0.1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <motion.div 
               className="w-24 h-24 bg-shrimart-yellow rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-glow"
               animate={{ rotate: [0, -10, 10, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
            >
               <CheckCircle size={48} className="text-shrimart-black" />
            </motion.div>
            
            <h3 className="font-bold text-[26px] uppercase tracking-tighter mb-2 text-shrimart-yellow font-poppins">Mission Success!</h3>
            <div className="space-y-4 mb-10 font-inter">
               <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Earnings Logged: <span className="text-white">₹45.00</span></p>
               <div className="h-[1px] w-12 bg-gray-600 mx-auto" />
               <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Cumulative Yield: ₹180.00 Today</p>
            </div>
            
            <button
              className="w-full bg-white text-shrimart-black py-5 rounded-[2rem] font-semibold uppercase text-[12px] tracking-widest shadow-premium active:scale-95 transition-transform font-inter"
              onClick={() => navigate("/rider")}
            >
              Back to Command
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}