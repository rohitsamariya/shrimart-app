import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { CheckCircle, Clock, MapPin, Package, ArrowRight } from "lucide-react";
import { useCart } from "../../context/CartContext";

export function ConfirmationPage() {
  const navigate = useNavigate();
  const { cartTotal, clearCart } = useCart();

  const delivery = cartTotal >= 199 ? 0 : 20;
  const total = cartTotal + delivery;
  const orderId = "SHR-" + Math.floor(1000 + Math.random() * 9000);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 pb-20 overflow-hidden relative">
      {/* Background Decor */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-shrimart-yellow/5 rounded-full blur-[120px] -z-0"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-green-500/5 rounded-full blur-[120px] -z-0"
      />

      <div className="w-full max-w-sm flex flex-col items-center relative z-10">
        {/* Success Icon */}
        <motion.div
          className="w-32 h-32 bg-white rounded-[2.5rem] shadow-premium flex items-center justify-center mb-10 relative"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="absolute inset-0 bg-shrimart-yellow/10 rounded-[2.5rem] animate-pulse" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
          >
            <CheckCircle size={64} className="text-[#10B981]" />
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-[26px] font-bold text-shrimart-black mb-3 uppercase tracking-tight font-poppins">Success! 🎉</h1>
          <p className="text-gray-400 font-normal font-inter">Your order is being processed by the vendor.</p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          className="w-full bg-white rounded-[2.5rem] shadow-premium border border-gray-100 overflow-hidden mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-shrimart-black px-6 py-5 flex justify-between items-center font-inter">
            <p className="text-[10px] font-bold text-shrimart-yellow uppercase tracking-[0.2em]">Transaction Receipt</p>
            <span className="text-[10px] font-bold text-white">{orderId}</span>
          </div>
          <div className="px-8 py-8 space-y-6">
            {[
              { label: "Payable Total", value: `₹${total}`, emphasize: true },
              { label: "Status", value: "Preparing", highlight: true },
              { label: "ETA", value: "~25-30 Mins" },
              { label: "Method", value: "Cash on Delivery" },
            ].map((row, i) => (
              <div key={i} className={`flex items-center justify-between`}>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none font-inter">{row.label}</span>
                <span className={`font-bold uppercase ${
                  row.emphasize ? "text-shrimart-black text-[22px] font-poppins" : 
                  row.highlight ? "text-[#10B981] text-[10px] bg-[#10B981]/10 px-3 py-1.5 rounded-xl font-inter" : 
                  "text-shrimart-black text-[14px] font-inter"
                }`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 px-8 py-4 border-t border-gray-50 flex items-center gap-3 font-inter">
             <MapPin size={14} className="text-gray-400" />
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Delivering to Shrimadhopur, Rajasthan</span>
          </div>
        </motion.div>

        {/* Action Section */}
        <motion.div
          className="w-full space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            className="w-full bg-shrimart-black text-shrimart-yellow py-5 rounded-[2rem] font-semibold text-[16px] uppercase flex items-center justify-center gap-3 shadow-premium active:scale-95 font-inter"
            onClick={() => navigate("/customer/tracking")}
          >
            Live Tracking <ArrowRight size={22} />
          </button>
          <button
            className="w-full bg-transparent text-gray-400 py-3 rounded-2xl font-bold text-[12px] uppercase tracking-widest hover:text-shrimart-black transition-colors font-inter"
            onClick={() => { clearCart(); navigate("/customer"); }}
          >
            Exit to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}
