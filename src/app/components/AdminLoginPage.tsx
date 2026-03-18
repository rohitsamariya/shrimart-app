import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Lock, Mail, ChevronRight, ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const { adminLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError("");
    try {
      await adminLogin(email, password);
      navigate("/admin");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50 font-inter">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-shrimart-yellow/20 blur-[120px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-premium border border-white/50 overflow-hidden p-8 sm:p-10"
        >
          <button onClick={() => navigate("/login")} className="mb-8 flex items-center gap-2 text-gray-400 hover:text-shrimart-black transition-colors text-sm font-bold group">
            <ArrowLeft size={16} /> Back to Portal
          </button>

          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-shrimart-black rounded-2xl flex items-center justify-center shadow-glow mb-4">
              <Lock size={30} className="text-shrimart-yellow" />
            </div>
            <h1 className="font-bold text-shrimart-black text-[24px] uppercase tracking-tight font-poppins">Admin Access</h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Authorized Personnel Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Email Terminal</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input
                  type="email"
                  className="w-full bg-slate-50 border border-gray-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold outline-none focus:bg-white focus:border-shrimart-yellow focus:ring-4 focus:ring-shrimart-yellow/10 transition-all font-inter"
                  placeholder="admin@shrimart.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Security Key</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input
                  type="password"
                  className="w-full bg-slate-50 border border-gray-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold outline-none focus:bg-white focus:border-shrimart-yellow focus:ring-4 focus:ring-shrimart-yellow/10 transition-all font-inter"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 text-red-500 p-4 rounded-xl text-xs font-bold uppercase tracking-widest text-center border border-red-100">
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-shrimart-black text-shrimart-yellow rounded-2xl font-bold text-sm uppercase tracking-widest shadow-glow flex items-center justify-center gap-2 hover:bg-slate-900 transition-all active:scale-95 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none"
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>Authorize Access <ChevronRight size={18} /></>
              )}
            </motion.button>
          </form>

          <p className="mt-10 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-loose opacity-60 px-4">
            Security audit log is active. All login attempts are recorded and monitored.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
