import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, MessageSquare, Phone, HelpCircle, ChevronRight, FileText } from "lucide-react";

export function HelpPage() {
  const navigate = useNavigate();

  const faqs = [
    "How to track my order?",
    "Can I cancel my delivery?",
    "Refund status and policy",
    "Partner with Shrimart",
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-6 py-6 flex items-center gap-4 border-b border-gray-100 sticky top-0 bg-white z-10">
        <button onClick={() => navigate(-1)} className="w-11 h-11 bg-amber-50 rounded-2xl flex items-center justify-center">
          <ArrowLeft size={20} className="text-amber-700" />
        </button>
        <h2 className="font-bold text-shrimart-black text-[22px] uppercase tracking-tight font-poppins">Support</h2>
      </div>

      <div className="px-6 py-8 space-y-10">
        {/* Support Options */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-amber-50 p-6 rounded-[2.5rem] flex flex-col items-center text-center space-y-3 border border-amber-100">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-amber-600">
              <MessageSquare size={24} />
            </div>
            <p className="font-bold text-[12px] uppercase tracking-tight text-amber-900">Chat with us</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-[2.5rem] flex flex-col items-center text-center space-y-3 border border-slate-100">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-shrimart-black">
              <Phone size={24} />
            </div>
            <p className="font-bold text-[12px] uppercase tracking-tight text-shrimart-black">Call support</p>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Common Questions</h3>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <button
                key={i}
                className="w-full flex items-center justify-between p-5 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white transition-all group"
              >
                <span className="text-[13px] font-medium text-gray-700">{f}</span>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-shrimart-yellow transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="pt-4 space-y-4">
          <button className="w-full flex items-center gap-4 px-2 py-1 text-gray-400 hover:text-shrimart-black transition-colors">
            <FileText size={18} />
            <span className="text-[12px] font-bold uppercase tracking-widest">Terms of Service</span>
          </button>
          <button className="w-full flex items-center gap-4 px-2 py-1 text-gray-400 hover:text-shrimart-black transition-colors">
            <HelpCircle size={18} />
            <span className="text-[12px] font-bold uppercase tracking-widest">Privacy Policy</span>
          </button>
        </div>
      </div>
    </div>
  );
}
