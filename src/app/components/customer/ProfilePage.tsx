import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { 
  User, 
  MapPin, 
  Bell, 
  Shield, 
  LogOut, 
  ChevronRight,
  ShoppingBag,
  HelpCircle,
  CreditCard,
  Edit2,
  ArrowLeft
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login/customer");
  };

  const menuSections = [
    {
      title: "ACCOUNT ACTIVITY",
      items: [
        { icon: <ShoppingBag size={18} />, label: "My Orders", sub: "Ongoing and past deliveries", color: "bg-amber-100 text-amber-600" },
        { icon: <MapPin size={18} />, label: "Saved Addresses", sub: "Home, Work, Other", color: "bg-amber-100 text-amber-600" },
        { icon: <CreditCard size={18} />, label: "Payment Methods", sub: "Cards, UPI, and Wallets", color: "bg-amber-100 text-amber-600" },
      ]
    },
    {
      title: "PREFERENCES",
      items: [
        { icon: <HelpCircle size={18} />, label: "Help & Support", sub: "FAQs, Customer Care", color: "bg-amber-100 text-amber-600" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between sticky top-0 bg-white z-20">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-700"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-[18px] font-bold text-shrimart-black uppercase tracking-tight font-poppins">Profile</h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="flex flex-col items-center pt-4 pb-8 px-6">
        {/* Profile Image Section */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-shrimart-yellow p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-amber-100 flex items-center justify-center overflow-hidden border-2 border-white">
              <span className="text-5xl">👤</span>
            </div>
          </div>
          <button className="absolute bottom-1 right-1 w-8 h-8 bg-shrimart-yellow rounded-full border-2 border-white flex items-center justify-center shadow-md">
            <Edit2 size={14} className="text-shrimart-black" />
          </button>
        </div>

        <h2 className="mt-4 text-[26px] font-bold text-shrimart-black uppercase font-poppins">
          {user?.name || "New User"}
        </h2>
        <p className="text-gray-400 font-normal text-[12px] mt-1 uppercase tracking-widest font-inter">
          {user?.phone_number}
        </p>
      </div>

      {/* Menu Sections */}
      <div className="px-6 space-y-8">
        {menuSections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1 font-poppins">{section.title}</h3>
            <div className="bg-slate-50/50 rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
              {section.items.map((item, idx) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-4 px-6 py-4 transition-all hover:bg-white active:scale-[0.99] ${
                    idx !== section.items.length - 1 ? "border-b border-white" : ""
                  }`}
                >
                  <div className={`w-10 h-10 ${item.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                    {item.icon}
                  </div>
                   <div className="flex-1 text-left font-inter">
                    <p className="font-bold text-shrimart-black text-[14px] uppercase leading-none">{item.label}</p>
                    <p className="text-[10px] text-gray-400 font-medium mt-1">{item.sub}</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Section */}
        <div className="pt-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 bg-red-50/50 rounded-3xl border border-red-100/50 transition-all hover:bg-red-50 text-red-500 group"
          >
             <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <LogOut size={18} />
            </div>
            <span className="font-bold text-[14px] uppercase font-inter">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
