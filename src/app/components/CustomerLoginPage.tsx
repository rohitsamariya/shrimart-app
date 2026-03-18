import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, ArrowLeft, ChevronRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { OTPInput } from "input-otp";

type Step = "phone" | "otp";

export function CustomerLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [step, setStep] = useState<Step>("phone");
  const [phoneInput, setPhoneInput] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = () => {
    if (phoneInput.length < 10) return;
    setStep("otp");
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      await login(phoneInput, "customer");
      navigate("/customer");
    } catch (err) {
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1.05, y: -10 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50 font-inter">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-shrimart-yellow/20 blur-[120px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="w-full max-w-md px-2 sm:px-0 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-premium border border-white/50 overflow-hidden font-poppins">
          {/* Header/Logo */}
          <div className="flex flex-col items-center pt-10 pb-4">
            <motion.div 
              className="w-16 h-16 bg-shrimart-yellow rounded-2xl flex items-center justify-center shadow-glow mb-4"
              whileHover={{ rotate: 10, scale: 1.05 }}
            >
              <ShoppingBag size={30} className="text-shrimart-black" />
            </motion.div>
            <h1 className="font-bold text-shrimart-black text-[24px] tracking-tight uppercase text-center px-4">ShriMart Shop</h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1 font-inter">Customer Login</p>
          </div>

          <div className="p-5 sm:p-8 pt-2 sm:pt-4">
            <AnimatePresence mode="wait">
              {/* ── PHONE ── */}
              {step === "phone" && (
                <motion.div key="phone" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
                  <button onClick={() => navigate("/login")} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-shrimart-black transition-colors text-sm font-semibold group font-inter">
                     <ArrowLeft size={16} /> Back
                  </button>

                  <div className="mb-6 sm:mb-8 text-center sm:text-left">
                    <h2 className="text-[22px] font-bold text-shrimart-black mb-1 sm:mb-2 uppercase tracking-tight">Shopping Terminal</h2>
                    <p className="text-gray-500 text-xs sm:text-base font-medium font-inter">Enter phone number to enter store</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 mb-3 block tracking-[0.2em] uppercase font-inter">Phone Number</label>
                      <div className="flex gap-3 font-inter">
                        <div className="flex items-center gap-1.5 bg-slate-50 border border-gray-100 rounded-2xl px-5 py-4 font-bold text-shrimart-black text-sm shadow-sm">
                          <span className="text-lg">🇮🇳</span>
                          <span className="text-gray-200">|</span>
                          <span className="tracking-tight">+91</span>
                        </div>
                        <input
                          type="tel"
                          inputMode="numeric"
                          className="flex-1 min-w-0 bg-slate-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm sm:text-base outline-none font-bold text-shrimart-black placeholder:text-gray-300 focus:bg-white focus:border-shrimart-yellow focus:ring-4 focus:ring-shrimart-yellow/10 transition-all shadow-sm"
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
                      Authenticate Access
                      <ChevronRight size={20} />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* ── OTP ── */}
              {step === "otp" && (
                <motion.div key="otp" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
                  <button onClick={() => setStep("phone")} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-shrimart-black transition-colors text-sm font-bold group font-inter">
                    <ArrowLeft size={16} /> Change Number
                  </button>

                   <div className="mb-8 text-center sm:text-left">
                    <h2 className="text-[22px] font-bold text-shrimart-black mb-2">Access Key 🔐</h2>
                    <p className="text-gray-500 font-medium font-inter">
                      Sent to <span className="text-shrimart-black font-bold">+91 {phoneInput}</span>
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div className="flex justify-center">
                      <OTPInput
                        maxLength={4}
                        containerClassName="flex gap-4 justify-center"
                        value={otp}
                        onChange={(val) => {
                          setOtp(val);
                          if (val.length === 4) {
                            setTimeout(handleVerify, 500);
                          }
                        }}
                        render={({ slots }) => (
                          <div className="flex gap-4">
                            {slots.map((slot, idx) => (
                              <div
                                key={idx}
                                className={`w-14 h-18 bg-slate-50 border-2 rounded-xl flex items-center justify-center text-2xl font-bold text-shrimart-black transition-all shadow-sm ${slot.isActive ? "border-shrimart-yellow bg-white ring-4 ring-shrimart-yellow/10" : "border-gray-100"}`}
                              >
                                {slot.char || (slot.isActive ? <motion.div className="w-0.5 h-6 bg-shrimart-yellow" animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} /> : <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />)}
                              </div>
                            ))}
                          </div>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                       <motion.button
                        className={`w-full py-5 rounded-2xl font-semibold text-[16px] transition-all font-inter ${otp.length === 4 ? "bg-shrimart-black text-white shadow-glow hover:bg-slate-900" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                        onClick={handleVerify}
                        disabled={otp.length !== 4 || loading}
                        whileHover={otp.length === 4 ? { scale: 1.02 } : {}}
                        whileTap={otp.length === 4 ? { scale: 0.98 } : {}}
                      >
                        {loading ? "Verifying..." : "Verify & Shop"}
                      </motion.button>

                      <div className="text-center font-inter">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                          Not Received?{" "}
                          <button className="text-shrimart-yellow-dark hover:underline" onClick={() => setOtp("")}>
                            Resend Access Key
                          </button>
                        </p>
                      </div>
                    </div>
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
