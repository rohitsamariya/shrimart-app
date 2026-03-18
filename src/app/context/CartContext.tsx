import { createContext, useContext, useReducer, ReactNode, useMemo } from "react";
import { useProducts } from "./ProductContext";

export interface CartItem { id: number; qty: number; }

interface CartState { items: CartItem[]; }

type CartAction =
  | { type: "ADD"; id: number }
  | { type: "REMOVE"; id: number }
  | { type: "CLEAR" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const ex = state.items.find((i) => i.id === action.id);
      if (ex) return { items: state.items.map((i) => i.id === action.id ? { ...i, qty: i.qty + 1 } : i) };
      return { items: [...state.items, { id: action.id, qty: 1 }] };
    }
    case "REMOVE": {
      const ex = state.items.find((i) => i.id === action.id);
      if (ex && ex.qty > 1) return { items: state.items.map((i) => i.id === action.id ? { ...i, qty: i.qty - 1 } : i) };
      return { items: state.items.filter((i) => i.id !== action.id) };
    }
    case "CLEAR": return { items: [] };
    default: return state;
  }
}

interface CartContextType {
  items: CartItem[];
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getQty: (id: number) => number;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const { products } = useProducts();

  const cartTotal = useMemo(() => {
    return state.items.reduce((sum, item) => {
      const p = products.find((px) => px.id === item.id);
      return sum + (p ? Number(p.price) * item.qty : 0);
    }, 0);
  }, [state.items, products]);

  const cartCount = state.items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      addToCart: (id) => dispatch({ type: "ADD", id }),
      removeFromCart: (id) => dispatch({ type: "REMOVE", id }),
      clearCart: () => dispatch({ type: "CLEAR" }),
      getQty: (id) => state.items.find((i) => i.id === id)?.qty || 0,
      cartCount,
      cartTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
