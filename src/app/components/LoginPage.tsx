import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Bike, ArrowLeft, ChevronRight, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { OTPInput } from "input-otp";

type Step = "role" | "phone" | "otp";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [step, setStep] = useState<Step>("role");
  const [phoneInput, setPhoneInput] = useState("");
  const [otp, setOtp] = useState("");
  const [localRole, setLocalRole] = useState<"customer" | "rider" | null>(null);

  const handleRoleSelect = (r: "customer" | "rider") => {
    setLocalRole(r);
    setStep("phone");
  };

  const handleSendOtp = () => {
    if (phoneInput.length < 10) return;
    setStep("otp");
  };

  const handleVerify = async () => {
    try {
      await login(phoneInput, localRole || "customer");
      if (localRole === "customer") navigate("/customer");
      else navigate("/rider");
    } catch (err) {
      alert("Login failed. Please try again.");
    }
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1.05, y: -10 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-shrimart-yellow/20 blur-[120px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-shrimart-yellow-dark/10 blur-[130px]"
          animate={{ x: [0, -40, 0], y: [0, -60, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="w-full max-w-md px-2 sm:px-0 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] shadow-premium border border-white/50 overflow-hidden">
          {/* Header/Logo */}
          <div className="flex flex-col items-center pt-10 pb-4">
            <motion.div 
              className="w-16 h-16 bg-shrimart-yellow rounded-2xl flex items-center justify-center shadow-glow mb-4"
              whileHover={{ rotate: 10, scale: 1.05 }}
            >
              <span className="text-3xl">🛒</span>
            </motion.div>
            <h1 className="font-bold text-shrimart-black text-[26px] tracking-tight uppercase text-center px-4 font-poppins">ShriMart</h1>
          </div>

          <div className="p-5 sm:p-8 pt-2 sm:pt-4">
            <AnimatePresence mode="wait">
              {/* ── ROLE SELECTION ── */}
              {step === "role" && (
                <motion.div key="role" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                  <div className="text-center mb-10">
                    <h2 className="text-[22px] font-bold text-shrimart-black mb-2 font-poppins">Welcome Back 👋</h2>
                    <p className="text-gray-500 font-medium font-inter">Choose your role to continue</p>
                  </div>

                  <div className="flex flex-col gap-5">
                    <motion.button
                      className="group relative w-full flex items-center gap-5 p-6 bg-white border border-gray-100 rounded-[2rem] transition-all hover:bg-shrimart-yellow-light/30 hover:border-shrimart-yellow shadow-sm hover:shadow-md"
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRoleSelect("customer")}
                    >
                      <div className="w-16 h-16 bg-shrimart-yellow rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                        <ShoppingBag size={32} className="text-shrimart-black" />
                      </div>
                      <div className="flex-1 text-left font-inter">
                        <p className="font-semibold text-shrimart-black text-[20px] mb-0.5">Customer</p>
                        <p className="text-gray-500 text-sm font-medium">Shop fresh groceries</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-shrimart-yellow transition-colors">
                        <ChevronRight size={20} className="text-gray-300 group-hover:text-shrimart-black" />
                      </div>
                    </motion.button>

                    <motion.button
                      className="group relative w-full flex items-center gap-5 p-6 bg-white border border-gray-100 rounded-[2rem] transition-all hover:bg-slate-50 hover:border-shrimart-black shadow-sm hover:shadow-md"
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRoleSelect("rider")}
                    >
                      <div className="w-16 h-16 bg-shrimart-black rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                        <Bike size={32} className="text-shrimart-yellow" />
                      </div>
                      <div className="flex-1 text-left font-inter">
                        <p className="font-semibold text-shrimart-black text-[20px] mb-0.5">Delivery Rider</p>
                        <p className="text-gray-500 text-sm font-medium">Deliver & earn daily</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-shrimart-black transition-colors">
                        <ChevronRight size={20} className="text-gray-300 group-hover:text-shrimart-yellow" />
                      </div>
                    </motion.button>

                    <motion.button
                      className="group relative w-full flex items-center gap-5 p-6 bg-white border border-gray-100 rounded-[2rem] transition-all hover:bg-shrimart-black hover:border-shrimart-black shadow-sm hover:shadow-md"
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate("/login/admin")}
                    >
                      <div className="w-16 h-16 bg-shrimart-black rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                        <Lock size={30} className="text-shrimart-yellow" />
                      </div>
                      <div className="flex-1 text-left font-inter">
                        <p className="font-semibold text-shrimart-black group-hover:text-white text-[20px] mb-0.5">Admin Portal</p>
                        <p className="text-gray-500 group-hover:text-shrimart-yellow/80 text-sm font-medium">Manage Mart Ops</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-shrimart-yellow transition-colors">
                        <ChevronRight size={20} className="text-gray-300 group-hover:text-shrimart-black" />
                      </div>
                    </motion.button>
                  </div>

                  <p className="text-center text-gray-400 text-[11px] font-medium mt-10 uppercase tracking-widest px-8 font-inter">
                    By continuing, you agree to our <span className="text-shrimart-black underline">Terms</span> & <span className="text-shrimart-black underline">Privacy</span>
                  </p>
                </motion.div>
              )}

              {/* ── PHONE ── */}
              {step === "phone" && (
                <motion.div key="phone" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                  <button onClick={() => setStep("role")} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-shrimart-black transition-colors text-sm font-semibold group font-inter">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                      <ArrowLeft size={16} />
                    </div>
                    Back
                  </button>

                  <div className="mb-6 sm:mb-8 font-poppins">
                    <h2 className="text-[22px] font-bold text-shrimart-black mb-1 sm:mb-2 uppercase tracking-tight">Verification</h2>
                    <p className="text-gray-500 text-xs sm:text-base font-medium font-inter">Enter phone number to proceed</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 mb-3 block tracking-[0.2em] uppercase font-inter">Phone Number</label>
                      <div className="flex gap-3 font-inter">
                        <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-50 border border-gray-100 rounded-xl sm:rounded-2xl px-3 sm:px-5 py-3 sm:py-4 font-bold text-shrimart-black text-sm sm:base shadow-sm">
                          <span className="text-lg">🇮🇳</span>
                          <span className="text-gray-200">|</span>
                          <span className="tracking-tight">+91</span>
                        </div>
                        <input
                          type="tel"
                          inputMode="numeric"
                          className="flex-1 min-w-0 bg-slate-50 border border-gray-100 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base outline-none font-bold text-shrimart-black placeholder:text-gray-300 focus:bg-white focus:border-shrimart-yellow focus:ring-4 focus:ring-shrimart-yellow/10 transition-all shadow-sm"
                          placeholder="00000 00000"
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                          autoFocus
                        />
                      </div>
                    </div>

                    <motion.button
                      className={`w-full py-5 rounded-2xl font-semibold text-[16px] transition-all flex items-center justify-center gap-2 font-inter ${phoneInput.length === 10 ? "bg-shrimart-yellow text-shrimart-black shadow-glow hover:bg-shrimart-yellow-dark" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                      onClick={handleSendOtp}
                      disabled={phoneInput.length !== 10}
                      whileHover={phoneInput.length === 10 ? { scale: 1.02 } : {}}
                      whileTap={phoneInput.length === 10 ? { scale: 0.98 } : {}}
                    >
                      Send OTP
                      <ChevronRight size={20} />
                    </motion.button>
                  </div>

                  <p className="mt-8 text-center text-gray-400 text-xs font-medium font-inter">
                    You'll receive a 4-digit code via SMS
                  </p>
                </motion.div>
              )}

              {/* ── OTP ── */}
              {step === "otp" && (
                <motion.div key="otp" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                  <button onClick={() => setStep("phone")} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-shrimart-black transition-colors text-sm font-bold group">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                      <ArrowLeft size={16} />
                    </div>
                    Change Number
                  </button>

                   <div className="mb-8 font-poppins">
                    <h2 className="text-[22px] font-bold text-shrimart-black mb-2">Enter OTP 🔐</h2>
                    <p className="text-gray-500 font-medium font-inter">
                      Sent to <span className="text-shrimart-black font-bold">+91 {phoneInput}</span>
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div className="flex justify-center">
                      <OTPInput
                        maxLength={4}
                        containerClassName="flex gap-2 sm:gap-4 justify-center"
                        value={otp}
                        onChange={(val) => {
                          setOtp(val);
                          if (val.length === 4) {
                            setTimeout(handleVerify, 500);
                          }
                        }}
                        render={({ slots }) => (
                          <div className="flex gap-2 sm:gap-4">
                            {slots.map((slot, idx) => (
                              <div
                                key={idx}
                                className={`w-14 h-18 sm:w-16 sm:h-20 bg-slate-50 border-2 rounded-xl sm:rounded-[1.25rem] flex items-center justify-center text-2xl sm:text-3xl font-bold text-shrimart-black transition-all shadow-sm ${slot.isActive ? "border-shrimart-yellow bg-white ring-4 ring-shrimart-yellow/10" : "border-gray-100"}`}
                              >
                                {slot.char || (slot.isActive ? <motion.div className="w-0.5 h-6 sm:h-8 bg-shrimart-yellow" animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} /> : <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gray-200" />)}
                              </div>
                            ))}
                          </div>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                       <motion.button
                        className={`w-full py-5 rounded-2xl font-semibold text-[16px] transition-all font-inter ${otp.length === 4 ? "bg-shrimart-yellow text-shrimart-black shadow-glow hover:bg-shrimart-yellow-dark" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                        onClick={handleVerify}
                        disabled={otp.length !== 4}
                        whileHover={otp.length === 4 ? { scale: 1.02 } : {}}
                        whileTap={otp.length === 4 ? { scale: 0.98 } : {}}
                      >
                        Verify & Continue
                      </motion.button>

                      <div className="text-center">
                        <p className="text-gray-400 text-sm font-medium">
                          Didn't receive?{" "}
                          <button className="text-shrimart-yellow-dark font-bold hover:underline" onClick={() => setOtp("")}>
                            Resend
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>

                   <div className="mt-10 bg-shrimart-yellow-light/50 border border-shrimart-yellow/20 rounded-[1.5rem] px-5 py-4 text-center">
                    <p className="text-xs text-shrimart-black font-bold opacity-60 uppercase tracking-widest leading-loose font-inter">
                      Demo Mode • Enter Any 4 Digits
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
