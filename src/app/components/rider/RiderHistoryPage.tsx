import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { 
  ChevronLeft, 
  Calendar, 
  Filter, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Package
} from "lucide-react";

const historyData = [
  { id: "#SMF-9810", date: "Today, 12:45 PM", amount: "₹54.00", distance: "3.2 km", status: "Delivered", icon: <CheckCircle2 size={18} className="text-green-500" />, bg: "bg-green-50" },
  { id: "#SMF-9808", date: "Today, 10:20 AM", amount: "₹48.50", distance: "2.8 km", status: "Delivered", icon: <CheckCircle2 size={18} className="text-green-500" />, bg: "bg-green-50" },
  { id: "#SMF-9795", date: "Yesterday, 8:15 PM", amount: "₹62.00", distance: "4.5 km", status: "Delivered", icon: <CheckCircle2 size={18} className="text-green-500" />, bg: "bg-green-50" },
  { id: "#SMF-9790", date: "Yesterday, 6:30 PM", amount: "₹35.00", distance: "1.2 km", status: "Delivered", icon: <CheckCircle2 size={18} className="text-green-500" />, bg: "bg-green-50" },
  { id: "#SMF-9782", date: "24 Oct, 2:45 PM", amount: "₹42.00", distance: "2.1 km", status: "Delivered", icon: <CheckCircle2 size={18} className="text-green-500" />, bg: "bg-green-50" },
];

export function RiderHistoryPage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("Daily");

  return (
    <div className="min-h-screen bg-slate-50/50 pb-32">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-gray-400 border border-gray-100 hover:bg-white transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-[18px] font-bold text-shrimart-black uppercase tracking-tight font-poppins">Delivery History</h1>
        <button className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-gray-400 border border-gray-100 hover:bg-white transition-all">
          <Filter size={18} />
        </button>
      </div>

      <div className="px-6 pt-6 space-y-8">
        {/* Period Selector */}
        <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
          {["Daily", "Weekly", "Monthly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-[12px] font-semibold uppercase tracking-widest transition-all font-inter ${
                selectedTab === tab 
                  ? "bg-shrimart-yellow text-shrimart-black shadow-sm" 
                  : "text-gray-400 hover:text-shrimart-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-shrimart-black rounded-3xl p-5 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest mb-1.5 font-inter">Total Earnings</p>
            <div className="flex items-baseline gap-1 font-inter">
              <span className="text-shrimart-yellow text-[20px] font-bold">₹1,250.50</span>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 relative overflow-hidden group">
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 font-inter">Total Orders</p>
            <div className="flex items-baseline gap-1 font-inter">
              <span className="text-shrimart-black text-[20px] font-bold text-center">24</span>
              <span className="text-[10px] font-bold text-green-500 uppercase">+4</span>
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[14px] font-semibold text-shrimart-black uppercase tracking-widest font-poppins">All Deliveries</h3>
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest font-inter">Oct 2023</span>
          </div>

          <div className="space-y-3">
            {historyData.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-[2rem] p-5 shadow-sm border border-gray-100 flex items-center gap-4 group hover:shadow-md transition-all active:scale-[0.98]"
              >
                <div className={`w-12 h-12 ${order.bg} rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0`}>
                  {order.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 font-inter">
                    <p className="text-[14px] font-semibold text-shrimart-black tracking-tight uppercase truncate">{order.id}</p>
                    <p className="text-[12px] font-bold text-shrimart-black">{order.amount}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-[10px] font-normal text-gray-400 uppercase tracking-widest">
                      <Calendar size={10} />
                      {order.date}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-normal text-gray-400 uppercase tracking-widest">
                      <MapPin size={10} />
                      {order.distance}
                    </div>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full border border-gray-50 flex items-center justify-center text-gray-200 group-hover:bg-shrimart-yellow group-hover:text-shrimart-black group-hover:border-shrimart-yellow transition-all">
                  <ChevronRight size={16} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Load More/Stats Link */}
        <button className="w-full bg-slate-900 rounded-2xl py-4 flex items-center justify-center gap-2 group transition-all active:scale-95 shadow-xl">
          <TrendingUp size={16} className="text-shrimart-yellow" />
          <span className="text-[12px] font-semibold text-white uppercase tracking-[0.2em] font-inter">View Detailed Reports</span>
          <ChevronRight size={14} className="text-shrimart-yellow group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
