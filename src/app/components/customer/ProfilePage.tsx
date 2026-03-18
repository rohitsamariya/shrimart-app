import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { 
  User as UserIcon, 
  MapPin, 
  Bell, 
  Shield, 
  LogOut, 
  ChevronRight,
  ShoppingBag,
  HelpCircle,
  CreditCard,
  Edit2,
  ArrowLeft,
  Loader2
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useRef, useState, ChangeEvent } from "react";

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updating, setUpdating] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login/customer");
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image is too large. Please select an image smaller than 2MB.");
      return;
    }

    try {
      setUpdating(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        await updateProfile({ profile_image: base64String });
        setUpdating(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Failed to update profile image:", err);
      setUpdating(false);
      alert("Failed to update profile image. Please try again.");
    }
  };

  const menuSections = [
    {
      title: "ACCOUNT ACTIVITY",
      items: [
        { icon: <ShoppingBag size={18} />, label: "My Orders", sub: "Ongoing and past deliveries", color: "bg-amber-100 text-amber-600", path: "/customer/history" },
        { icon: <MapPin size={18} />, label: "Saved Addresses", sub: "Home, Work, Other", color: "bg-amber-100 text-amber-600", path: "/customer/address" },
        { icon: <CreditCard size={18} />, label: "Payment Methods", sub: "Cards, UPI, and Wallets", color: "bg-amber-100 text-amber-600", path: "/customer/payment" },
      ]
    },
    {
      title: "PREFERENCES",
      items: [
        { icon: <HelpCircle size={18} />, label: "Help & Support", sub: "FAQs, Customer Care", color: "bg-amber-100 text-amber-600", path: "/customer/help" },
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
        <div className="relative group cursor-pointer" onClick={handleImageClick}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="w-32 h-32 rounded-full border-4 border-shrimart-yellow p-1 shadow-lg overflow-hidden group-hover:opacity-80 transition-all">
            <div className="w-full h-full rounded-full bg-amber-100 flex items-center justify-center overflow-hidden border-2 border-white">
              {updating ? (
                <Loader2 size={32} className="animate-spin text-shrimart-yellow" />
              ) : user?.profile_image ? (
                <img src={user.profile_image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-5xl">👤</span>
              )}
            </div>
          </div>
          <div className="absolute bottom-1 right-1 w-8 h-8 bg-shrimart-yellow rounded-full border-2 border-white flex items-center justify-center shadow-md">
            <Edit2 size={14} className="text-shrimart-black" />
          </div>
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
                  onClick={() => item.path && navigate(item.path)}
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
