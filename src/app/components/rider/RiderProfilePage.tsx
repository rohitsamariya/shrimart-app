import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { 
  ChevronLeft, 
  Settings, 
  Wallet, 
  CheckCircle2, 
  MapPin, 
  Star, 
  Bike, 
  FileText, 
  Info, 
  HelpCircle, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function RiderProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login/rider");
  };

  const riderStats = [
    { icon: <CheckCircle2 className="text-amber-500" size={20} />, label: "ORDERS", value: "1,284" },
    { icon: <MapPin className="text-amber-500" size={20} />, label: "DIST.", value: "4.1k km" },
    { icon: <Star className="text-amber-500" size={20} />, label: "RATING", value: "4.9" },
  ];

  const menuItems = [
    { icon: <FileText className="text-amber-500" />, label: "Documents & KYC" },
    { icon: <Bike className="text-amber-500" />, label: "Vehicle Information" },
    { icon: <HelpCircle className="text-amber-500" />, label: "Help & Support" },
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-32">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between sticky top-0 bg-[#F9F9F9]/80 backdrop-blur-md z-20">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm text-shrimart-black active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-[18px] font-bold text-shrimart-black uppercase tracking-tight font-poppins">Rider Profile</h1>
        <button className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm text-shrimart-black active:scale-95">
          <Settings size={20} />
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center pt-6 pb-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-shrimart-yellow p-1 shadow-lg bg-white overflow-hidden">
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center relative">
              {/* Simple Rider Illustration Placeholder */}
              <div className="text-6xl">🚴</div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-shrimart-yellow text-shrimart-black px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md border-2 border-white font-inter"
          >
            Platinum
          </motion.div>
        </div>

        <h2 className="mt-6 text-[26px] font-bold text-shrimart-black uppercase tracking-tight font-poppins">Rahul Sharma</h2>
        <p className="text-gray-400 font-normal text-[12px] mt-1 uppercase tracking-widest font-inter">
          Rider ID: #SMF8829 • Joined Jan 2023
        </p>
      </div>

      {/* Earnings Card */}
      <div className="px-6">
        <motion.div 
          className="bg-shrimart-yellow rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden group"
          whileHover={{ y: -4 }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-medium text-shrimart-black/60 uppercase tracking-[0.2em] font-inter">Weekly Earnings</p>
              <h3 className="text-[30px] font-bold text-shrimart-black mt-1 font-inter">₹12,450.00</h3>
            </div>
            <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center text-shrimart-black shadow-sm group-hover:scale-110 transition-transform">
              <Wallet size={24} />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium text-shrimart-black/40 uppercase tracking-widest font-inter">Payout Date</p>
              <p className="text-[12px] font-semibold text-shrimart-black uppercase mt-0.5 font-inter">Monday, 24 Oct</p>
            </div>
            <button className="bg-shrimart-black text-white px-6 py-3 rounded-2xl text-[12px] font-semibold uppercase tracking-widest hover:shadow-lg active:scale-95 transition-all font-inter">
              Withdraw
            </button>
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 mt-6 grid grid-cols-3 gap-4">
        {riderStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-3xl p-5 flex flex-col items-center justify-center text-center shadow-sm border border-gray-100 font-inter">
            <div className="mb-3">{stat.icon}</div>
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-[14px] font-bold text-shrimart-black uppercase leading-none">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Vehicle Info Card */}
      <div className="px-6 mt-6">
        <button className="w-full bg-white rounded-[2rem] p-5 flex items-center gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
          <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 shadow-sm border border-white">
            <Bike size={24} />
          </div>
          <div className="flex-1 text-left font-inter">
            <p className="font-bold text-shrimart-black text-[14px] uppercase tracking-tight">Honda Activa 6G</p>
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.2em] mt-1">RJ-45-SX-8829</p>
          </div>
          <ChevronRight size={20} className="text-gray-200 group-hover:text-amber-500 transition-colors" />
        </button>
      </div>

      {/* Navigation List */}
      <div className="px-6 mt-8 space-y-4">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-2 font-poppins">Account & Support</h3>
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          {menuItems.map((item, idx) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-4 px-6 py-5 hover:bg-slate-50 transition-all group ${
                idx !== menuItems.length - 1 ? "border-b border-gray-50/50" : ""
              }`}
            >
              <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-amber-50 transition-colors shadow-sm border border-gray-100/50">
                {item.icon}
              </div>
              <span className="flex-1 text-left font-semibold text-shrimart-black text-[14px] uppercase tracking-tight font-inter">{item.label}</span>
              <ChevronRight size={18} className="text-gray-200 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-6 py-5 bg-amber-50/50 rounded-[2.5rem] border border-amber-100/50 transition-all hover:bg-amber-100/50 text-red-500 group mt-4"
        >
           <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform border border-red-100/20">
            <LogOut size={18} />
          </div>
          <span className="font-bold text-[12px] uppercase tracking-tight font-inter">Logout</span>
        </button>
      </div>
    </div>
  );
}
