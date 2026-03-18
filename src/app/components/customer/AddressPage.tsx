import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, MapPin, CheckCircle, User, Phone, Home, Navigation } from "lucide-react";
import { useCart } from "../../context/CartContext";

export function AddressPage() {
  const navigate = useNavigate();
  const { cartTotal } = useCart();

  const [form, setForm] = useState({ name: "", phone: "", address: "", landmark: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const delivery = cartTotal >= 199 ? 0 : 20;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) errs.phone = "Enter valid 10-digit number";
    if (!form.address.trim()) errs.address = "Address is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) navigate("/customer/confirmation");
  };

  const fields = [
    { key: "name", label: "Full Name", placeholder: "e.g. Ramesh Sharma", icon: <User size={18} />, type: "text" },
    { key: "phone", label: "Phone Number", placeholder: "e.g. +91 98765 43210", icon: <Phone size={18} />, type: "tel" },
    { key: "address", label: "Complete Address", placeholder: "House No., Street, Area...", icon: <Home size={18} />, type: "text" },
    { key: "landmark", label: "Landmark (Optional)", placeholder: "Near temple, school...", icon: <Navigation size={18} />, type: "text" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl px-6 py-6 flex items-center gap-4 border-b border-gray-100/50 sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="w-11 h-11 bg-slate-50 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-all active:scale-90"
        >
          <ArrowLeft size={20} className="text-shrimart-black" />
        </button>
        <div>
          <h2 className="font-bold text-shrimart-black text-[22px] uppercase tracking-tight font-poppins">Checkout</h2>
          <p className="text-[12px] font-normal text-gray-400 uppercase tracking-widest mt-0.5 font-inter">Step 2: Delivery Details</p>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Location notice */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 bg-shrimart-black text-white rounded-[2rem] p-5 shadow-premium overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-shrimart-yellow/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="w-12 h-12 bg-shrimart-yellow rounded-2xl flex items-center justify-center flex-shrink-0 shadow-glow relative z-10">
            <MapPin size={22} className="text-shrimart-black" />
          </div>
          <div className="flex-1 relative z-10 font-inter">
            <p className="font-bold text-shrimart-yellow text-[10px] uppercase tracking-widest mb-1">Delivering To</p>
            <p className="font-bold text-[18px] leading-tight uppercase font-poppins">Shrimadhopur</p>
            <p className="text-[12px] font-normal text-gray-400 uppercase tracking-tighter opacity-70">Sikar District, Rajasthan</p>
          </div>
          <div className="bg-shrimart-yellow/10 p-2 rounded-xl">
            <CheckCircle size={20} className="text-shrimart-yellow" />
          </div>
        </motion.div>

        {/* Address Form */}
        <div className="bg-white rounded-[2.5rem] shadow-premium border border-gray-100 p-8 space-y-6">
          <h3 className="text-[10px] font-bold text-shrimart-black uppercase tracking-[0.2em] mb-4 opacity-40 font-inter">Recipient Information</h3>
          <div className="space-y-6">
            {fields.map((field) => (
              <div key={field.key} className="space-y-2 font-inter">
                <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase ml-1">{field.label}</label>
                <div className={`flex items-center gap-4 bg-slate-50 rounded-2xl px-5 py-4 border-2 transition-all ${errors[field.key] ? "border-red-500 bg-red-50/30" : "border-transparent focus-within:border-shrimart-yellow focus-within:bg-white shadow-inner"}`}>
                  <span className={`${errors[field.key] ? "text-red-500" : "text-shrimart-black/30"}`}>{field.icon}</span>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, [field.key]: e.target.value }));
                      if (errors[field.key]) setErrors((e) => ({ ...e, [field.key]: "" }));
                    }}
                    className="flex-1 bg-transparent text-[14px] font-medium outline-none text-shrimart-black placeholder:text-gray-300"
                  />
                </div>
                {errors[field.key] && (
                  <motion.p 
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] font-bold text-red-500 uppercase tracking-tight ml-2"
                  >
                    ⚠ {errors[field.key]}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary mini */}
        <div className="bg-shrimart-black text-white rounded-[2.5rem] shadow-premium p-8 space-y-4 font-inter">
          <div className="flex justify-between items-center group">
            <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest group-hover:text-white transition-colors">Total Payable</span>
            <span className="font-bold text-[22px]">₹{cartTotal + delivery}</span>
          </div>
          <p className="text-[10px] font-bold text-shrimart-yellow uppercase tracking-[0.2em] text-center bg-shrimart-yellow/10 py-2 rounded-xl border border-shrimart-yellow/20">
            ⚡ Pay on Delivery Enabled
          </p>
        </div>

        {/* Premium Sticky Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent -top-12 pointer-events-none" />
          <div className="bg-slate-50 px-6 pb-10 pt-2 relative">
            <motion.button
              className="w-full max-w-md mx-auto bg-shrimart-yellow text-shrimart-black py-4.5 rounded-[2rem] font-bold text-[16px] uppercase flex items-center justify-center gap-3 shadow-glow hover:bg-shrimart-yellow-dark transition-all active:scale-95 font-inter"
              whileHover={{ scale: 1.02 }}
              onClick={handleSubmit}
            >
              Place Order 🎉
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
