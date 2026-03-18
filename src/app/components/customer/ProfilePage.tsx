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
  Loader2,
  Check,
  X
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useRef, useState, ChangeEvent } from "react";

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updating, setUpdating] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  
  const [showOtp, setShowOtp] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleEditClick = () => {
    setEditName(user?.name || "");
    setEditPhone(user?.phone_number || "");
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (editPhone !== user?.phone_number) {
      // Show OTP modal if phone number changed
      setOtpInput("");
      setOtpError("");
      setShowOtp(true);
    } else {
      // Just update name directly
      try {
        setUpdating(true);
        await updateProfile({ name: editName });
        setIsEditing(false);
      } catch (err) {
        alert("Failed to update profile");
      } finally {
        setUpdating(false);
      }
    }
  };

  const handleOtpVerify = async () => {
    if (otpInput === "123456") {
      try {
        setUpdating(true);
        await updateProfile({ name: editName, phone_number: editPhone });
        setShowOtp(false);
        setIsEditing(false);
      } catch (err) {
        alert("Failed to update profile");
      } finally {
        setUpdating(false);
      }
    } else {
      setOtpError("Invalid OTP. Try 123456");
    }
  };

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

        <div className="mt-4 flex flex-col items-center w-full max-w-xs">
          {isEditing ? (
            <div className="w-full space-y-3 bg-slate-50 p-4 rounded-3xl border border-gray-100 shadow-sm">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Full Name</label>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-2 text-[14px] font-semibold text-shrimart-black focus:outline-none focus:border-shrimart-yellow transition-all text-center uppercase font-poppins mt-1"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Mobile Number</label>
                <input
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-2 text-[13px] font-medium text-gray-600 focus:outline-none focus:border-shrimart-yellow transition-all text-center tracking-widest mt-1"
                  placeholder="10-digit number"
                />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-2.5 bg-red-50 text-red-600 rounded-2xl text-[12px] font-bold uppercase tracking-wide flex items-center justify-center gap-1 hover:bg-red-100 transition-colors"
                >
                  <X size={14} /> Cancel
                </button>
                <button
                  onClick={handleSaveClick}
                  disabled={updating}
                  className="flex-1 py-2.5 bg-shrimart-black text-white rounded-2xl text-[12px] font-bold uppercase tracking-wide flex items-center justify-center gap-1 shadow-md hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {updating ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} Save
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-[26px] font-bold text-shrimart-black uppercase font-poppins text-center">
                  {user?.name || "New User"}
                </h2>
                <button onClick={handleEditClick} className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors hover:text-amber-700 text-gray-400">
                  <Edit2 size={12} />
                </button>
              </div>
              <p className="text-gray-400 font-normal text-[12px] mt-1 uppercase tracking-widest font-inter text-center bg-slate-50 px-3 py-1 rounded-full border border-gray-100 inline-block">
                {user?.phone_number}
              </p>
            </>
          )}
        </div>
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
      {/* OTP Modal */}
      {showOtp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-shrimart-black/40 backdrop-blur-sm" onClick={() => setShowOtp(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl flex flex-col items-center border border-white/20"
          >
            <div className="w-16 h-16 bg-shrimart-yellow/20 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm">
              <Shield size={28} className="text-shrimart-black" />
            </div>
            <h3 className="text-[20px] font-bold text-shrimart-black uppercase font-poppins tracking-tight mb-2">Verify New Number</h3>
            <p className="text-[13px] text-gray-500 font-medium text-center leading-relaxed px-2 mb-6">
              Please enter the 6-digit OTP sent to <span className="font-bold text-shrimart-black">{editPhone}</span> to confirm this change.
            </p>
            
            <div className="w-full space-y-4">
              <input
                type="text"
                maxLength={6}
                value={otpInput}
                onChange={(e) => { setOtpInput(e.target.value.replace(/\D/g, '')); setOtpError(""); }}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-[18px] font-bold text-center tracking-[0.5em] text-shrimart-black focus:border-shrimart-yellow focus:bg-white transition-all outline-none"
                placeholder="000000"
              />
              {otpError && <p className="text-red-500 text-[11px] font-bold text-center uppercase tracking-widest">{otpError}</p>}
              <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">Dummy OTP: 123456</p>
              
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowOtp(false)}
                  className="flex-1 py-3.5 bg-slate-100 text-gray-500 rounded-2xl font-bold text-[13px] uppercase tracking-wide hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleOtpVerify}
                  disabled={updating || otpInput.length < 6}
                  className="flex-[2] py-3.5 bg-shrimart-black text-white rounded-2xl font-bold text-[13px] uppercase tracking-wide hover:bg-gray-800 transition-colors shadow-lg shadow-black/10 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {updating ? <Loader2 size={16} className="animate-spin" /> : "Verify OTP"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

