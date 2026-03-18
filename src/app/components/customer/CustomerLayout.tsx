import { Outlet, NavLink, useNavigate, useLocation } from "react-router";
import { ShoppingCart, Home, Clock, History, MapPin, User, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../../context/CartContext";

export function CustomerLayout() {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Hide nav on sub-pages or transactional pages
  const hideNavPaths = ["/customer/cart", "/customer/address", "/customer/confirmation", "/customer/tracking"];
  const isProductDetail = location.pathname.startsWith("/customer/product/");
  const showNav = !hideNavPaths.includes(location.pathname) && !isProductDetail;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-40 transition-all">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            className="flex items-center gap-2.5 group" 
            onClick={() => navigate("/customer")}
          >
            <motion.div 
              className="w-10 h-10 bg-shrimart-black rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all border border-shrimart-yellow/20 font-poppins"
              whileHover={{ rotate: 8, scale: 1.05 }}
            >
              <span className="text-xl font-bold text-shrimart-yellow">S</span>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-shrimart-black text-[26px] leading-[1.2] uppercase font-poppins">ShriMart</span>
              <span className="text-[12px] font-normal text-gray-400 tracking-widest uppercase mt-0.5 font-inter">Premium Groceries</span>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 py-2 px-3 bg-slate-50 border border-gray-100 rounded-2xl hover:bg-white hover:border-shrimart-yellow transition-all group">
              <MapPin size={14} className="text-shrimart-yellow group-hover:scale-110 transition-transform" />
              <div className="flex flex-col items-start font-inter">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Deliver To</span>
                <span className="text-[12px] font-semibold text-shrimart-black truncate max-w-[80px]">Shrimadhopur</span>
              </div>
            </button>
            
            <div className="flex items-center gap-2">
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className={`flex-1 max-w-2xl mx-auto w-full ${showNav ? 'pb-24' : 'pb-0'}`}>
        <Outlet />
      </main>

      {/* Floating Modern Navigation */}
      <AnimatePresence>
        {showNav && (
          <motion.nav 
            initial={{ y: 100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: 100, x: "-50%", opacity: 0 }}
            className="fixed bottom-8 left-1/2 w-[90%] max-w-md z-50"
          >
            <div className="bg-shrimart-black/90 backdrop-blur-2xl rounded-[2.5rem] px-6 py-3 flex items-center justify-around shadow-2xl border border-white/10 relative overflow-hidden">
              {/* Top glow line */}
              <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-shrimart-yellow/30 to-transparent" />
              
              <BottomNavItem to="/customer" icon={<Home size={22} />} label="HOME" end />
              <BottomNavItem to="/customer/search" icon={<Search size={22} />} label="SEARCH" />
              <BottomNavItem to="/customer/cart" icon={<ShoppingCart size={22} />} label="CART" badge={cartCount} />
              <BottomNavItem to="/customer/profile" icon={<User size={22} />} label="PROFILE" />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}

function BottomNavItem({
  to,
  icon,
  label,
  end,
  badge,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  end?: boolean;
  badge?: number;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `relative flex flex-col items-center gap-1.5 py-2 transition-all duration-500 ${
          isActive ? "text-shrimart-yellow scale-110" : "text-gray-500 hover:text-gray-300"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.div
              layoutId="customerNavActive"
              className="absolute inset-0 -z-10 bg-shrimart-yellow/10 rounded-2xl scale-125 blur-md"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <div className="relative">
            {icon}
            {badge !== undefined && badge > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2.5 -right-2.5 min-w-[18px] h-[18px] bg-shrimart-yellow text-shrimart-black text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-shrimart-black shadow-sm font-inter"
              >
                {badge}
              </motion.span>
            )}
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-300 font-inter ${isActive ? "opacity-100" : "opacity-0 h-0"}`}>
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
}
