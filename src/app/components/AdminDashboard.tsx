import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Bike,
  TrendingUp,
  Users,
  Search,
  Bell,
  ChevronDown,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  BarChart3,
  Star,
  MapPin,
  RefreshCw,
  Filter,
  LogOut,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { useAuth } from "../context/AuthContext";

type Tab = "dashboard" | "orders" | "products" | "riders";

const revenueData = [
  { day: "Mon", revenue: 1200, orders: 28 },
  { day: "Tue", revenue: 1800, orders: 42 },
  { day: "Wed", revenue: 1400, orders: 33 },
  { day: "Thu", revenue: 2100, orders: 51 },
  { day: "Fri", revenue: 2600, orders: 62 },
  { day: "Sat", revenue: 3100, orders: 74 },
  { day: "Sun", revenue: 2800, orders: 67 },
];

const orders = [
  { id: "#SRM1024", customer: "Ramesh Sharma", items: "Tomatoes, Milk", amount: 350, status: "Out for Delivery", rider: "Rahul K.", time: "2:40 PM" },
  { id: "#SRM1023", customer: "Priya Gupta", items: "Apples, Bread", amount: 160, status: "Delivered", rider: "Mohan S.", time: "1:20 PM" },
  { id: "#SRM1022", customer: "Ankit Meena", items: "Mango, Chips", amount: 95, status: "Preparing", rider: "—", time: "2:55 PM" },
  { id: "#SRM1021", customer: "Sita Devi", items: "Vegetables", amount: 220, status: "Delivered", rider: "Rahul K.", time: "11:30 AM" },
  { id: "#SRM1020", customer: "Vikas Sharma", items: "Milk, Eggs", amount: 130, status: "Cancelled", rider: "—", time: "10:00 AM" },
];

const products = [
  { id: 1, name: "Fresh Tomatoes", category: "Vegetables", price: 25, stock: 150, emoji: "🍅" },
  { id: 2, name: "Green Spinach", category: "Vegetables", price: 15, stock: 80, emoji: "🥬" },
  { id: 3, name: "Sweet Mango", category: "Fruits", price: 60, stock: 45, emoji: "🥭" },
  { id: 4, name: "Fresh Apples", category: "Fruits", price: 80, stock: 60, emoji: "🍎" },
  { id: 5, name: "Amul Milk 1L", category: "Dairy", price: 55, stock: 120, emoji: "🥛" },
  { id: 6, name: "Lay's Chips", category: "Snacks", price: 20, stock: 200, emoji: "🍟" },
];

const riders = [
  { id: 1, name: "Rahul Kumar", phone: "98765 43210", status: "Online", deliveries: 230, rating: 4.9, earnings: "₹6,200" },
  { id: 2, name: "Mohan Singh", phone: "98765 43211", status: "Online", deliveries: 185, rating: 4.8, earnings: "₹5,100" },
  { id: 3, name: "Deepak Verma", phone: "98765 43212", status: "Offline", deliveries: 142, rating: 4.7, earnings: "₹3,900" },
  { id: 4, name: "Suresh Yadav", phone: "98765 43213", status: "On Delivery", deliveries: 98, rating: 4.6, earnings: "₹2,800" },
];

const statusColors: Record<string, string> = {
  "Delivered": "bg-green-100 text-[#34C759]",
  "Out for Delivery": "bg-blue-100 text-blue-600",
  "Preparing": "bg-yellow-100 text-yellow-700",
  "Cancelled": "bg-red-100 text-[#EF4444]",
  "Online": "bg-green-100 text-[#34C759]",
  "Offline": "bg-gray-100 text-gray-500",
  "On Delivery": "bg-blue-100 text-blue-600",
};

export function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [searchQ, setSearchQ] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login/admin");
  };

  const stats = [
    { label: "Total Orders Today", value: "74", change: "+12%", icon: <ShoppingCart size={20} />, color: "bg-blue-50 text-blue-600" },
    { label: "Revenue Today", value: "₹3,100", change: "+8%", icon: <TrendingUp size={20} />, color: "bg-green-50 text-[#34C759]" },
    { label: "Active Riders", value: "3", change: "2 Online", icon: <Bike size={20} />, color: "bg-yellow-50 text-[#FFC107]" },
    { label: "Pending Orders", value: "6", change: "-3 from yesterday", icon: <Clock size={20} />, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Top Nav Premium */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100/50 px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between sticky top-0 z-40 shadow-premium">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-shrimart-yellow rounded-2xl flex items-center justify-center shadow-glow">
            <span className="text-[26px] font-bold text-shrimart-black font-poppins">S</span>
          </div>
          <div>
            <h1 className="font-bold text-shrimart-black text-[22px] uppercase tracking-tight leading-none font-poppins">ShriMart</h1>
            <p className="text-[12px] font-normal text-gray-400 uppercase tracking-widest mt-1 font-inter">Command Terminal · Admin</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative hidden lg:flex items-center group">
            <Search size={16} className="absolute left-4 text-gray-300 group-focus-within:text-shrimart-yellow transition-colors" />
            <input
              className="bg-slate-50 border border-gray-100 rounded-2xl pl-11 pr-5 py-3 text-sm outline-none text-shrimart-black w-72 focus:ring-2 focus:ring-shrimart-yellow/20 transition-all font-medium"
              placeholder="Search Intelligence..."
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <button className="relative w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-all active:scale-95 group">
              <Bell size={20} className="text-shrimart-black group-hover:rotate-12" />
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            </button>
            
            <button 
              onClick={handleLogout}
              className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-100 transition-all active:scale-95 shadow-sm"
              title="Logout System"
            >
              <LogOut size={20} />
            </button>

            <div className="h-8 w-[1px] bg-gray-100 mx-1" />
            
            <div className="flex items-center gap-4 bg-shrimart-black px-5 py-2.5 rounded-2xl cursor-pointer hover:bg-shrimart-black/90 transition-all shadow-premium group font-inter">
              <div className="w-8 h-8 bg-shrimart-yellow rounded-xl flex items-center justify-center text-xs font-bold text-shrimart-black group-hover:rotate-6 font-poppins">A</div>
              <div className="hidden md:block">
                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest leading-none mb-0.5">System Administrator</p>
                <span className="text-[12px] font-bold text-white uppercase tracking-tight">{user?.email || "Super Admin"}</span>
              </div>
              <span className="flex items-center">
                <ChevronDown size={14} className="text-gray-500 group-hover:translate-y-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Premium */}
        <div className="hidden lg:flex flex-col w-72 bg-white/50 backdrop-blur-md min-h-screen border-r border-gray-100/50 pt-10 px-6 sticky top-24 h-[calc(100vh-100px)] font-inter">
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] mb-8 ml-4 px-2">Navigation Matrix</p>
          <div className="space-y-4">
            {[
              { id: "dashboard" as Tab, icon: <LayoutDashboard size={20} />, label: "Dashboard" },
              { id: "orders" as Tab, icon: <ShoppingCart size={20} />, label: "Missions" },
              { id: "products" as Tab, icon: <Package size={20} />, label: "Inventory" },
              { id: "riders" as Tab, icon: <Bike size={20} />, label: "Vanguard" },
            ].map((item) => (
              <button
                key={item.id}
                className={`w-full flex items-center gap-5 px-6 py-4 rounded-[1.5rem] text-[14px] font-semibold uppercase tracking-tight transition-all relative group overflow-hidden font-inter ${
                  tab === item.id 
                    ? "bg-shrimart-black text-shrimart-yellow shadow-premium" 
                    : "text-gray-400 hover:text-shrimart-black hover:bg-slate-50"
                }`}
                onClick={() => setTab(item.id)}
              >
                {tab === item.id && (
                  <motion.div 
                    layoutId="activeTab" 
                    className="absolute inset-0 bg-shrimart-black -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className={`${tab === item.id ? "text-shrimart-yellow" : "text-gray-300 group-hover:text-shrimart-yellow"} transition-colors`}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-auto mb-10 p-6 bg-shrimart-black rounded-[2rem] shadow-glow relative overflow-hidden group font-inter">
            <div className="absolute top-0 right-0 w-24 h-24 bg-shrimart-yellow/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Network Health</p>
              <h4 className="text-white font-bold uppercase text-xs">Vanguard Alpha Online</h4>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
                <span className="text-[8px] font-bold text-shrimart-yellow uppercase tracking-widest">Active Status</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Premium */}
        <div className="lg:hidden fixed bottom-10 left-6 right-6 z-50">
          <div className="bg-shrimart-black/95 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-premium px-8 py-5 flex items-center justify-around font-inter">
            {[
              { id: "dashboard" as Tab, icon: <LayoutDashboard size={22} />, label: "Core" },
              { id: "orders" as Tab, icon: <ShoppingCart size={22} />, label: "Missions" },
              { id: "products" as Tab, icon: <Package size={22} />, label: "Stock" },
              { id: "riders" as Tab, icon: <Bike size={22} />, label: "Units" },
            ].map((item) => (
              <button
                key={item.id}
                className={`flex flex-col items-center gap-1.5 transition-all active:scale-90 ${tab === item.id ? "text-shrimart-yellow" : "text-gray-500"}`}
                onClick={() => setTab(item.id)}
              >
                <div className={`transition-all duration-300 ${tab === item.id ? "-translate-y-1 scale-110" : ""}`}>
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                {tab === item.id && (
                   <motion.div layoutId="mobileActive" className="w-1 h-1 bg-shrimart-yellow rounded-full mt-0.5" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6">
          {/* ── DASHBOARD ── */}
          {tab === "dashboard" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
              <div>
                <h2 className="text-[22px] font-bold text-shrimart-black uppercase tracking-tighter leading-none font-poppins">Command Center</h2>
                <p className="text-[12px] font-normal text-gray-400 uppercase tracking-widest mt-2 font-inter">Operation Update · Sunday, 16 March 2026</p>
              </div>

              {/* Stats Cards Premium */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { label: "Missions Today", value: "74", change: "+12.5%", icon: <ShoppingCart size={22} />, color: "bg-blue-50 text-blue-500" },
                  { label: "Gross Yield", value: "₹3,100", change: "+8.2%", icon: <TrendingUp size={22} />, color: "bg-green-50 text-[#10B981]" },
                  { label: "Vanguard Units", value: "3", change: "2 Online", icon: <Bike size={22} />, color: "bg-shrimart-yellow/10 text-shrimart-black" },
                  { label: "Awaiting Deployment", value: "6", change: "-3 Active", icon: <Clock size={22} />, color: "bg-purple-50 text-purple-500" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-5 sm:p-8 shadow-premium border border-gray-100/50 hover:shadow-glow transition-all group overflow-hidden relative font-inter"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-shrimart-yellow/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-inner group-hover:scale-110 transition-transform`}>
                      {stat.icon}
                    </div>
                    <div className="font-bold text-shrimart-black text-[20px] sm:text-[24px] uppercase tracking-tighter mb-1 leading-none">{stat.value}</div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                    <div className="mt-4 inline-flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-lg">
                      <TrendingUp size={10} className="text-[#10B981]" />
                      <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-widest">{stat.change}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Charts Premium */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-gray-100/50 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="font-bold text-shrimart-black uppercase tracking-tight text-[18px] font-poppins">Yield Analytics</h3>
                      <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mt-1 font-inter">Weekly Performance Matrix</p>
                    </div>
                    <div className="bg-shrimart-black text-shrimart-yellow px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest font-inter">Cycle 12</div>
                  </div>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                      <defs>
                        <linearGradient id="adminYieldGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FFD84D" stopOpacity={1} />
                          <stop offset="100%" stopColor="#FFD84D" stopOpacity={0.4} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: "#9CA3AF" }} />
                      <YAxis hide />
                      <Tooltip
                        cursor={{ fill: "rgba(0,0,0,0.03)", radius: 10 }}
                        contentStyle={{ background: "#000", border: "none", borderRadius: 16, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
                        itemStyle={{ color: "#FFD84D", fontSize: 10, fontWeight: 700, textTransform: "uppercase", fontFamily: "Inter" }}
                        labelStyle={{ display: "none" }}
                        formatter={(v: number) => [`₹${v}`, "Yield"]}
                      />
                      <Bar dataKey="revenue" fill="url(#adminYieldGradient)" radius={[8, 8, 8, 8]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-gray-100/50">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="font-bold text-shrimart-black uppercase tracking-tight text-[18px] font-poppins">Mission Trajectory</h3>
                      <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mt-1 font-inter">Engagement Volume Trend</p>
                    </div>
                    <div className="bg-[#10B981]/10 text-[#10B981] px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-[#10B981]/20 font-inter">+14.2%</div>
                  </div>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={revenueData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" vertical={false} />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: "#9CA3AF" }} />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{ background: "#000", border: "none", borderRadius: 16, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
                        itemStyle={{ color: "#10B981", fontSize: 10, fontWeight: 700, textTransform: "uppercase", fontFamily: "Inter" }}
                        labelStyle={{ display: "none" }}
                        formatter={(v) => [v, "Missions"]}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="orders" 
                        stroke="#10B981" 
                        strokeWidth={4} 
                        dot={{ fill: "#10B981", r: 5, strokeWidth: 2, stroke: "#fff" }} 
                        activeDot={{ r: 8, strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Orders Premium Table */}
              <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-premium border border-gray-100/50 overflow-hidden">
                <div className="p-6 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50/50">
                  <div>
                    <h3 className="font-bold text-shrimart-black uppercase tracking-tight text-[18px] sm:text-[22px] leading-none font-poppins">Vanguard Log</h3>
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mt-1 sm:mt-2 font-inter">Active Mission Status Update</p>
                  </div>
                  <button className="w-full sm:w-auto bg-slate-50 hover:bg-shrimart-yellow hover:text-shrimart-black transition-all px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-gray-100 font-inter" onClick={() => setTab("orders")}>Access Archive</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50/50 font-inter">
                        {["Manifest ID", "Recipient Node", "Yield Amount", "Mission Status", "Operator Unit"].map((h) => (
                          <th key={h} className="px-10 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 4).map((order) => (
                        <tr key={order.id} className="border-b border-gray-50/50 hover:bg-slate-50/30 transition-all group font-inter">
                          <td className="px-10 py-6 text-sm font-bold text-shrimart-black uppercase tracking-tight">{order.id}</td>
                          <td className="px-10 py-6">
                            <p className="text-[14px] font-bold text-shrimart-black uppercase tracking-tight leading-none mb-1">{order.customer}</p>
                            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.2em]">Authorized Recipient</p>
                          </td>
                          <td className="px-10 py-6 text-sm font-bold text-shrimart-black">₹{order.amount}</td>
                          <td className="px-10 py-6">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl inline-flex items-center gap-2 ${statusColors[order.status]} shadow-inner`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                              {order.status}
                            </span>
                          </td>
                          <td className="px-10 py-6">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase">{order.rider[0]}</div>
                                <span className="text-[12px] font-medium text-gray-600 uppercase tracking-tight">{order.rider}</span>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── ORDERS ── */}
          {tab === "orders" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h2 className="text-[22px] font-bold text-shrimart-black uppercase tracking-tighter leading-none font-poppins">Mission Archive</h2>
                  <p className="text-[12px] font-normal text-gray-400 uppercase tracking-widest mt-2 font-inter">{orders.length} Authorized Deployments Today</p>
                </div>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 bg-white border border-gray-100 px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:bg-slate-50 transition-all shadow-premium font-inter">
                    <Filter size={14} />
                    Filter Matrix
                  </button>
                  <button className="flex items-center gap-2 bg-shrimart-black text-shrimart-yellow px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-glow active:scale-95 transition-all font-inter">
                    <RefreshCw size={14} />
                    Sync Intelligence
                  </button>
                </div>
              </div>

              {/* Status summary pills Premium */}
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {[
                  { label: "All Units", count: 74, active: true },
                  { label: "Pending", count: 6 },
                  { label: "Preparing", count: 4 },
                  { label: "Transit", count: 8 },
                  { label: "Success", count: 52 },
                  { label: "Aborted", count: 4 },
                ].map((s) => (
                  <button
                    key={s.label}
                    className={`flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all font-inter ${s.active ? "bg-shrimart-black text-shrimart-yellow shadow-premium" : "bg-white border border-gray-100 text-gray-400 hover:bg-slate-50"}`}
                  >
                    {s.label}
                    <span className={`px-2 py-0.5 rounded-lg text-[8px] ${s.active ? "bg-shrimart-yellow text-shrimart-black" : "bg-slate-100"}`}>{s.count}</span>
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-[2.5rem] shadow-premium border border-gray-100/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50/50 font-inter border-b border-gray-100">
                          {["Mission Key", "Recipient", "Cargo", "Amount", "Operator", "Timestamp", "Status", "Command"].map((h) => (
                            <th key={h} className="px-8 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-50/50 hover:bg-slate-50/30 transition-all group font-inter">
                          <td className="px-8 py-6 text-sm font-bold text-shrimart-black uppercase tracking-tight whitespace-nowrap">{order.id}</td>
                          <td className="px-8 py-6 whitespace-nowrap">
                            <p className="text-[14px] font-bold text-shrimart-black uppercase tracking-tight leading-none mb-1">{order.customer}</p>
                            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Authorized</p>
                          </td>
                          <td className="px-8 py-6 text-[12px] font-medium text-gray-500 uppercase tracking-tight whitespace-nowrap max-w-[140px] truncate">{order.items}</td>
                          <td className="px-8 py-6 text-sm font-bold text-shrimart-black whitespace-nowrap">₹{order.amount}</td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                               <div className="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase">{order.rider[0]}</div>
                               <span className="text-[10px] font-medium text-gray-600 uppercase tracking-tight">{order.rider}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-[10px] font-medium text-gray-400 uppercase tracking-widest whitespace-nowrap">{order.time}</td>
                          <td className="px-8 py-6 whitespace-nowrap">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5 ${statusColors[order.status]}`}>
                              <span className="w-1 h-1 rounded-full bg-current" />
                              {order.status}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex gap-2">
                              <button className="w-9 h-9 bg-slate-50 border border-gray-100 rounded-xl flex items-center justify-center hover:bg-shrimart-yellow hover:text-shrimart-black transition-all active:scale-90 group">
                                <Eye size={14} className="text-gray-400 group-hover:text-shrimart-black" />
                              </button>
                              <button className="w-9 h-9 bg-slate-50 border border-gray-100 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-all active:scale-90">
                                <Edit size={14} className="text-gray-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── PRODUCTS ── */}
          {tab === "products" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-[22px] font-bold text-shrimart-black uppercase tracking-tighter leading-none font-poppins">Inventory Vault</h2>
                  <p className="text-[12px] font-normal text-gray-400 uppercase tracking-widest mt-2 font-inter">{products.length} SKU nodes in catalogue</p>
                </div>
                <button className="flex items-center gap-3 bg-shrimart-yellow text-shrimart-black px-8 py-4 rounded-[1.5rem] font-bold uppercase text-[12px] tracking-widest shadow-glow active:scale-95 transition-all font-inter">
                  <Plus size={18} />
                  Add New SKU
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-gray-100/50 hover:shadow-glow transition-all group relative overflow-hidden"
                    whileHover={{ y: -6 }}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-shrimart-yellow/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="flex items-start justify-between mb-6 relative z-10">
                      <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-4xl shadow-inner border border-gray-100/50">
                        {product.emoji}
                      </div>
                      <div className="flex gap-2">
                        <button className="w-10 h-10 bg-slate-50 border border-gray-100 rounded-2xl flex items-center justify-center hover:bg-shrimart-yellow hover:text-shrimart-black transition-all active:scale-90">
                          <Edit size={16} />
                        </button>
                        <button className="w-10 h-10 bg-slate-50 border border-gray-100 rounded-2xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all active:scale-90">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-bold text-shrimart-black uppercase tracking-tight text-[18px] mb-1 leading-tight font-poppins">{product.name}</h3>
                    <div className="flex items-center justify-between mb-6 font-inter">
                      <span className="text-[10px] font-bold bg-shrimart-black text-shrimart-yellow px-4 py-1.5 rounded-xl uppercase tracking-widest">{product.category}</span>
                      <span className="font-bold text-shrimart-black text-[22px] tracking-tighter leading-none">₹{product.price}</span>
                    </div>

                     <div className="flex items-center justify-between pt-6 border-t border-gray-50/50 font-inter">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Availability</p>
                        <p className={`text-[12px] font-bold uppercase tracking-tight ${product.stock < 50 ? "text-red-500" : "text-[#10B981]"}`}>{product.stock} units</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? "bg-[#10B981]" : "bg-red-500"} shadow-glow animate-pulse`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── RIDERS ── */}
          {tab === "riders" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-[22px] font-bold text-shrimart-black uppercase tracking-tighter leading-none font-poppins">Vanguard Command</h2>
                  <p className="text-[12px] font-normal text-gray-400 uppercase tracking-widest mt-2 font-inter">{riders.filter(r => r.status !== "Offline").length} Operational Units active</p>
                </div>
                <button className="flex items-center gap-3 bg-shrimart-black text-shrimart-yellow px-8 py-4 rounded-[1.5rem] font-bold uppercase text-[12px] tracking-widest shadow-premium active:scale-95 transition-all font-inter">
                  <Plus size={18} />
                  Authorize Operator
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {riders.map((rider, i) => (
                  <motion.div
                    key={rider.id}
                    className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-gray-100/50 hover:shadow-glow transition-all relative overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-shrimart-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex items-start gap-6 mb-8 relative z-10 font-inter">
                      <div className="w-20 h-20 bg-shrimart-yellow rounded-[1.5rem] flex items-center justify-center font-bold text-shrimart-black text-3xl shadow-glow">
                        {rider.name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-shrimart-black uppercase tracking-tight text-xl leading-none font-poppins">{rider.name}</h3>
                          <span className={`text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5 ${statusColors[rider.status]} shadow-inner font-inter`}>
                            <span className="w-1 h-1 rounded-full bg-current" />
                            {rider.status}
                          </span>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 font-inter">ID Node: #VG00{rider.id}</p>
                         <div className="flex items-center gap-3 font-inter">
                            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-gray-100">
                              <Star size={10} className="fill-shrimart-yellow text-shrimart-yellow" />
                              <span className="text-[10px] font-bold text-shrimart-black leading-none">{rider.rating}</span>
                            </div>
                            <p className="text-[10px] font-medium text-gray-300 uppercase tracking-widest">+91 {rider.phone}</p>
                         </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-50/50 relative z-10 font-inter">
                      <div>
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">Success Rate</p>
                        <p className="font-bold text-shrimart-black text-[18px] leading-none">{rider.deliveries}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">Total Yield</p>
                        <p className="font-bold text-[#10B981] text-[18px] leading-none">{rider.earnings}</p>
                      </div>
                      <div className="flex items-end justify-end">
                         <button className="bg-slate-50 hover:bg-shrimart-black hover:text-shrimart-yellow transition-all px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-gray-100 active:scale-90 font-inter">
                            Node Details
                         </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}