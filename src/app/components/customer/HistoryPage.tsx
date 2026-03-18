import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle, RefreshCw, Star } from "lucide-react";

const orders = [
  { id: "#SRM1024", date: "Today, 2:30 PM", items: ["🍅 Tomatoes", "🥛 Amul Milk", "🍎 Apples"], total: 160, status: "Delivered", rating: null },
  { id: "#SRM1023", date: "Yesterday, 1:20 PM", items: ["🥭 Mango", "🍟 Chips", "🥬 Spinach"], total: 95, status: "Delivered", rating: 5 },
  { id: "#SRM1022", date: "14 Mar, 10:30 AM", items: ["🥛 Amul Milk", "🧀 Paneer", "🍞 Bread"], total: 180, status: "Delivered", rating: 4 },
  { id: "#SRM1019", date: "10 Mar, 3:00 PM", items: ["🍚 Rice", "🧅 Onions", "🫙 Oil"], total: 215, status: "Delivered", rating: 5 },
  { id: "#SRM1014", date: "7 Mar, 6:00 PM", items: ["🍌 Bananas", "🍪 Biscuits"], total: 50, status: "Cancelled", rating: null },
];

export function HistoryPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl px-6 py-6 flex items-center gap-4 border-b border-gray-100/50 sticky top-0 z-10 transition-all">
        <button 
          onClick={() => navigate(-1)} 
          className="w-11 h-11 bg-slate-50 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-all active:scale-90"
        >
          <ArrowLeft size={20} className="text-shrimart-black" />
        </button>
        <div>
          <h2 className="font-bold text-shrimart-black text-[22px] uppercase tracking-tight font-poppins">Archives</h2>
          <p className="text-[12px] font-normal text-gray-400 uppercase tracking-widest mt-0.5 font-inter">{orders.length} past purchases</p>
        </div>
      </div>

      <div className="px-6 py-8 space-y-6">
        {orders.map((order, i) => (
          <motion.div
            key={order.id}
            className="bg-white rounded-[2.5rem] shadow-premium border border-gray-100 overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6 font-inter">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{order.date}</p>
                  <p className="font-bold text-shrimart-black text-[18px] uppercase tracking-tighter font-poppins">{order.id}</p>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-2xl border ${
                  order.status === "Delivered" 
                    ? "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20" 
                    : "bg-red-50 text-red-500 border-red-100"
                }`}>
                  {order.status === "Delivered" ? "✓ SHIPPED" : "✗ REJECTED"}
                </span>
              </div>

               <div className="flex flex-wrap gap-2 mb-8 font-inter">
                {order.items.map((item, j) => (
                  <span key={j} className="text-[10px] font-bold bg-slate-50 text-shrimart-black/40 px-3 py-1.5 rounded-xl border border-gray-100/50 uppercase">
                    {item}
                  </span>
                ))}
              </div>

               <div className="flex items-center justify-between pt-6 border-t border-slate-50 font-inter">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Spent</span>
                  <span className="font-bold text-shrimart-black text-[22px]">₹{order.total}</span>
                </div>
                <div className="flex items-center gap-3">
                  {order.rating !== null && (
                     <div className="flex items-center gap-1 bg-shrimart-yellow/10 px-3 py-2 rounded-2xl border border-shrimart-yellow/20 font-inter">
                      <Star size={12} className="fill-shrimart-yellow text-shrimart-yellow" />
                      <span className="text-[10px] font-bold text-shrimart-black">{order.rating}.0</span>
                    </div>
                  )}
                  {order.status === "Delivered" && (
                    <button
                      className="w-12 h-12 bg-shrimart-yellow rounded-2xl flex items-center justify-center shadow-glow hover:bg-shrimart-yellow-dark transition-all active:scale-90"
                      onClick={() => navigate("/customer")}
                    >
                      <RefreshCw size={20} className="text-shrimart-black" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
