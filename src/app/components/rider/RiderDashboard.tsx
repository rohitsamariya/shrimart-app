import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { motion } from "motion/react";
import { 
  Bell, 
  LogOut,
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  Info, 
  Zap,
  TrendingUp,
  Package,
  Star
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function RiderDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isOnline, setIsOnline } = useOutletContext<{ isOnline: boolean; setIsOnline: (v: boolean) => void }>();

  const recentActivity = [
    { id: "Order #SMF-9810", desc: "Delivered • 12:45 PM", amount: "+₹54.00", icon: <CheckCircle2 size={18} className="text-green-500" />, bg: "bg-green-50" },
    { id: "Bonus Achieved", desc: "10 Daily Deliveries • 11:30 AM", amount: "+₹100.00", icon: <Info size={18} className="text-blue-500" />, bg: "bg-blue-50" },
    { id: "Order #SMF-9808", desc: "Delivered • 10:20 AM", amount: "+₹48.50", icon: <CheckCircle2 size={18} className="text-green-500" />, bg: "bg-green-50" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-32">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-shrimart-yellow rounded-2xl flex items-center justify-center shadow-sm">
            <Package size={20} className="text-shrimart-black" />
          </div>
          <div>
            <h1 className="text-[14px] font-bold text-shrimart-black uppercase tracking-tight leading-tight font-poppins">ShriMart</h1>
            <p className="text-[12px] font-normal text-gray-400 uppercase tracking-widest mt-0.5 font-inter">Rider Partner App</p>
          </div>
        </div>
        <button 
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-gray-400 border border-gray-100 hover:bg-white hover:text-red-500 transition-all shadow-sm active:scale-95"
        >
          <LogOut size={20} />
        </button>
      </div>

      <div className="px-6 space-y-6 pt-6">
        {/* Profile Card */}
        <div className="bg-white rounded-[2rem] p-5 flex items-center justify-between shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full border-2 border-shrimart-yellow p-0.5">
                <div className="w-full h-full rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
                  <span className="text-3xl">👤</span>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <h2 className="text-[22px] font-semibold text-shrimart-black uppercase leading-tight font-poppins">Suresh Kumar</h2>
              <div className="flex items-center gap-1 mt-1 font-inter">
                <Star size={10} className="fill-shrimart-yellow text-shrimart-yellow" />
                <span className="text-[12px] font-medium text-gray-400 uppercase tracking-widest">Platinum Rider</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 font-inter">
            <span className="text-[12px] font-bold text-green-500 uppercase tracking-widest">Online</span>
            <button 
              onClick={() => setIsOnline(!isOnline)}
              className={`w-12 h-6 rounded-full transition-all relative ${isOnline ? "bg-shrimart-yellow shadow-glow" : "bg-gray-200"}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isOnline ? "right-1" : "left-1"}`} />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-shrimart-yellow rounded-[2rem] p-5 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-start justify-between mb-4 font-inter">
              <div className="w-10 h-10 bg-shrimart-black rounded-2xl flex items-center justify-center shadow-sm">
                <TrendingUp size={18} className="text-shrimart-yellow" />
              </div>
              <span className="bg-white/40 backdrop-blur-md text-[10px] font-bold text-shrimart-black px-2 py-0.5 rounded-full">+15%</span>
            </div>
            <p className="text-[12px] font-medium text-shrimart-black/60 uppercase tracking-widest leading-none font-inter">Today's Earnings</p>
            <p className="text-[20px] font-bold text-shrimart-black mt-1 font-inter">₹850.50</p>
          </div>

          <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-gray-100 relative overflow-hidden group">
            <div className="flex items-start justify-between mb-4 font-inter">
              <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center shadow-sm">
                <CheckCircle2 size={18} className="text-shrimart-black" />
              </div>
              <span className="bg-green-50 text-[10px] font-bold text-green-500 px-2 py-0.5 rounded-full">+2</span>
            </div>
            <p className="text-[12px] font-medium text-gray-400 uppercase tracking-widest leading-none font-inter">Orders Done</p>
            <p className="text-[20px] font-bold text-shrimart-black mt-1 font-inter">12</p>
          </div>
        </div>

        {/* New Request */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[14px] font-semibold text-shrimart-black uppercase tracking-widest font-poppins">New Request</h3>
            <div className="flex items-center gap-1.5 font-inter">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em]">Incoming...</span>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-shrimart-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex items-start justify-between mb-6 font-inter">
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ">Order ID</p>
                <h4 className="text-[18px] font-bold text-white tracking-tight">#SMF-9821</h4>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ">Est. Earnings</p>
                <h4 className="text-[18px] font-bold text-shrimart-yellow tracking-tight">₹75.00</h4>
              </div>
            </div>

            <div className="space-y-4 mb-8 font-inter">
              <div className="flex items-start gap-3 relative">
                <div className="absolute left-[7px] top-4 bottom-[-16px] w-[1px] bg-white/10" />
                <div className="w-3.5 h-3.5 rounded-full bg-shrimart-yellow border-2 border-slate-900 z-10 mt-1" />
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">Pickup</p>
                  <p className="text-[13px] font-medium text-white uppercase mt-1 tracking-tight">Fresh Mart, Sector 4, Shrimadhopur</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-slate-900 z-10 mt-1" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">Delivery</p>
                    <span className="text-[10px] font-medium text-gray-500 uppercase tracking-tighter">(3.2 km away)</span>
                  </div>
                  <p className="text-[13px] font-medium text-white uppercase mt-1 tracking-tight">B-42, Krishna Residency</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 font-inter">
              <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl py-3.5 text-[12px] font-bold text-white uppercase tracking-[0.2em] transition-all active:scale-95">
                Reject
              </button>
              <button className="flex-1 bg-shrimart-yellow hover:bg-shrimart-yellow-dark rounded-2xl py-3.5 text-[12px] font-bold text-shrimart-black uppercase tracking-[0.2em] shadow-glow transition-all active:scale-95">
                Accept
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-[14px] font-semibold text-shrimart-black uppercase tracking-widest px-2 font-poppins">Recent Activity</h3>
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden font-inter">
            {recentActivity.map((activity, idx) => (
              <div 
                key={activity.id}
                className={`flex items-center gap-4 px-6 py-4 transition-all hover:bg-slate-50 ${
                  idx !== recentActivity.length - 1 ? "border-b border-gray-50" : ""
                }`}
              >
                <div className={`w-10 h-10 ${activity.bg} rounded-full flex items-center justify-center shadow-sm`}>
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-bold text-shrimart-black uppercase tracking-tight">{activity.id}</p>
                  <p className="text-[12px] font-normal text-gray-400 mt-0.5 uppercase tracking-widest">{activity.desc}</p>
                </div>
                <span className="text-[14px] font-bold text-shrimart-black">{activity.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
