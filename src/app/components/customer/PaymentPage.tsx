import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, CreditCard, Plus, Wallet, ShieldCheck } from "lucide-react";

export function PaymentPage() {
  const navigate = useNavigate();

  const methods = [
    { type: "UPI", label: "PhonePe / Google Pay", icon: <Wallet className="text-purple-600" />, sub: "Primary Method" },
    { type: "Card", label: "HDFC Bank **** 1234", icon: <CreditCard className="text-blue-600" />, sub: "Expires 12/28" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-white px-6 py-6 flex items-center gap-4 border-b border-gray-100 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="w-11 h-11 bg-slate-50 rounded-2xl flex items-center justify-center">
          <ArrowLeft size={20} className="text-shrimart-black" />
        </button>
        <h2 className="font-bold text-shrimart-black text-[22px] uppercase tracking-tight font-poppins">Payments</h2>
      </div>

      <div className="px-6 py-8 space-y-6">
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Saved Methods</h3>
          {methods.map((m, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shadow-inner">
                {m.icon}
              </div>
              <div className="flex-1">
                <p className="font-bold text-shrimart-black text-[14px] uppercase">{m.label}</p>
                <p className="text-[10px] text-gray-400 font-medium">{m.sub}</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </motion.div>
          ))}
        </div>

        <button className="w-full py-4 bg-white border-2 border-dashed border-gray-200 rounded-[2rem] flex items-center justify-center gap-3 text-gray-400 font-bold text-[14px] uppercase hover:border-shrimart-yellow hover:text-shrimart-black transition-all">
          <Plus size={18} /> Add New Method
        </button>

        <div className="bg-green-50 p-6 rounded-[2rem] border border-green-100/50 flex items-center gap-4">
          <ShieldCheck className="text-green-600" size={24} />
          <p className="text-[11px] text-green-700 font-medium leading-relaxed">
            Your payment details are encrypted and secured. We follow industry standard PCI-DSS compliance.
          </p>
        </div>
      </div>
    </div>
  );
}
