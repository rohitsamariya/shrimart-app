import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Bike, CheckCircle, Package, Home, Clock, MapPin } from "lucide-react";
import { useOrders, Order } from "../../context/OrderContext";

const statusToStage: Record<string, number> = {
  pending: 0,
  confirmed: 1,
  preparing: 2,
  out_for_delivery: 3,
  delivered: 4,
  cancelled: 0,
};

export function TrackingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order");
  const { trackOrder } = useOrders();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const loadOrder = async () => {
    if (!orderId) return;
    const data = await trackOrder(orderId);
    setOrder(data);
    setLoading(false);
  };

  useEffect(() => {
    loadOrder();
    // Poll every 30s
    const interval = setInterval(loadOrder, 30000);
    return () => clearInterval(interval);
  }, [orderId]);

  const stages = [
    { icon: <CheckCircle size={18} />, label: "Order Placed" },
    { icon: <CheckCircle size={18} />, label: "Confirmed" },
    { icon: <Package size={18} />, label: "Preparing" },
    { icon: <Bike size={18} />, label: "Out for Delivery" },
    { icon: <Home size={18} />, label: "Delivered" },
  ];

  const currentStage = order ? statusToStage[order.status] ?? 0 : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl px-4 py-5 flex items-center gap-3 border-b border-gray-100/50 sticky top-0 z-40">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-all active:scale-90">
          <ArrowLeft size={18} className="text-shrimart-black" />
        </button>
        <div className="min-w-0 flex-1">
          <h2 className="font-bold text-shrimart-black text-[18px] uppercase tracking-tight font-poppins">Track Order</h2>
          {orderId && <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 font-inter">#{orderId.slice(0, 8).toUpperCase()}</p>}
        </div>
        {order && !["delivered","cancelled"].includes(order.status) && (
          <div className="bg-shrimart-yellow/10 px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-shrimart-yellow/20">
            <Clock size={12} className="text-shrimart-yellow-dark" />
            <span className="text-[10px] font-bold text-shrimart-black uppercase tracking-tight font-inter">Live</span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <div className="w-10 h-10 border-4 border-shrimart-yellow border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest font-inter">Loading Order...</p>
        </div>
      ) : !order ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4 text-center px-8">
          <Package size={40} className="text-slate-300" />
          <p className="font-bold text-gray-400 text-sm uppercase tracking-widest font-inter">Order not found</p>
          <button onClick={() => navigate("/customer")} className="bg-shrimart-yellow text-shrimart-black px-6 py-3 rounded-full text-sm font-bold">Go Shopping</button>
        </div>
      ) : (
        <div className="px-4 py-4 space-y-4">
          {/* Map placeholder */}
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm" style={{ height: 200 }}>
            <div className="relative w-full h-full" style={{ background: "linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%)" }}>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                <path d="M60 160 C120 100 200 70 320 45" stroke="#FFD84D" strokeWidth="3" fill="none" strokeDasharray="10 5" />
              </svg>
              <motion.div
                className="absolute w-11 h-11 bg-shrimart-yellow rounded-full flex items-center justify-center shadow-md border-2 border-white z-10"
                style={{ left: "40%", top: "35%" }}
                animate={{ x: [0, 8, 0], y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Bike size={20} className="text-shrimart-black" />
              </motion.div>
              <div className="absolute w-9 h-9 bg-shrimart-black rounded-full flex items-center justify-center shadow-md border-2 border-white z-10" style={{ left: "12%", top: "55%" }}>
                <Package size={14} className="text-shrimart-yellow" />
              </div>
              <div className="absolute w-9 h-9 bg-red-500 rounded-full flex items-center justify-center shadow-md border-2 border-white z-10" style={{ right: "12%", top: "18%" }}>
                <MapPin size={14} className="text-white" />
              </div>
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-2 border border-gray-100">
                <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-shrimart-black uppercase tracking-tight font-inter">Shrimadhopur</span>
              </div>
            </div>
          </div>

          {/* Status Steps */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-shrimart-black uppercase tracking-tight text-[16px] mb-6 font-poppins">Order Status</h3>
            <div className="relative">
              <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-100" />
              <div
                className="absolute left-5 top-5 w-0.5 bg-shrimart-yellow transition-all duration-700"
                style={{ height: `${(currentStage / (stages.length - 1)) * 100}%` }}
              />
              <div className="space-y-6">
                {stages.map((stage, i) => {
                  const done = i <= currentStage;
                  const active = i === currentStage && order.status !== "cancelled";
                  return (
                    <div key={i} className="flex items-start gap-5 relative z-10">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${active ? "bg-shrimart-yellow shadow-glow rotate-3" : done ? "bg-shrimart-black" : "bg-slate-50"}`}>
                        <span className={active ? "text-shrimart-black" : done ? "text-shrimart-yellow" : "text-gray-300"}>
                          {stage.icon}
                        </span>
                      </div>
                      <div className="flex-1 pt-2 font-inter">
                        <p className={`text-[13px] font-bold uppercase tracking-tight ${done ? "text-shrimart-black" : "text-gray-400"}`}>
                          {stage.label}
                          {active && <span className="ml-2 text-shrimart-yellow-dark text-[9px] animate-pulse">● LIVE</span>}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order details */}
          <div className="bg-shrimart-yellow-light/40 rounded-[2rem] border border-shrimart-yellow/20 p-6 font-inter">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order Total</p>
                <p className="font-bold text-shrimart-black text-[24px] tracking-tight mt-1 font-poppins">₹{order.total_amount}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Payment</p>
                <p className="text-[12px] font-bold text-[#10B981] mt-1 bg-[#10B981]/10 px-3 py-1 rounded-lg border border-[#10B981]/20 uppercase">{order.payment_method}</p>
              </div>
            </div>
            {order.order_items?.length > 0 && (
              <div className="mt-4 pt-4 border-t border-shrimart-yellow/20">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Items</p>
                <div className="flex flex-wrap gap-2">
                  {order.order_items.map((item, j) => (
                    <span key={j} className="text-[10px] font-bold bg-white/70 text-shrimart-black/60 px-3 py-1 rounded-lg">
                      {item.quantity}× {item.product_name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
