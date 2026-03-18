import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import { LayoutGrid, Wallet, History, User } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../../context/AuthContext";

export function RiderLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

      {/* Page Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full pb-32">
        <Outlet context={{ isOnline, setIsOnline }} />
      </main>

      {/* Floating Modern Navigation (Pill Style) */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
        <div className="bg-white/95 backdrop-blur-2xl rounded-[3rem] px-8 py-4 flex items-center justify-around shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 relative">
          {[
            { to: "/rider", icon: <LayoutGrid size={24} />, label: "Home", end: true },
            { to: "/rider/earnings", icon: <Wallet size={24} />, label: "Earnings", end: false },
            { to: "/rider/history", icon: <History size={24} />, label: "History", end: false },
            { to: "/rider/profile", icon: <User size={24} />, label: "Profile", end: false },
          ].map((nav) => (
            <NavLink
              key={nav.to}
              to={nav.to}
              end={nav.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 transition-all duration-300 relative ${
                  isActive ? "text-shrimart-yellow" : "text-slate-400 hover:text-slate-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>
                    {nav.icon}
                  </div>
                  <span className="text-[11px] font-bold font-inter">
                    {nav.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="riderNavDot"
                      className="absolute -bottom-2 w-1 h-1 bg-shrimart-yellow rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
