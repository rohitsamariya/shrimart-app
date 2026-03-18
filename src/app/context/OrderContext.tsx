import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { API_BASE } from "../config/api";
import { useAuth } from "./AuthContext";

export interface OrderItem {
  product_name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  status: "pending" | "confirmed" | "preparing" | "out_for_delivery" | "delivered" | "cancelled";
  total_amount: number;
  payment_method: string;
  payment_status: string;
  created_at: string;
  order_items: OrderItem[];
  addresses?: { line1: string; city: string; pincode: string };
}

interface OrderContextType {
  myOrders: Order[];
  ordersLoading: boolean;
  fetchMyOrders: () => Promise<void>;
  createOrder: (address_id: string, payment_method: string) => Promise<Order>;
  trackOrder: (id: string) => Promise<Order | null>;
}

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const fetchMyOrders = useCallback(async () => {
    if (!token) return;
    try {
      setOrdersLoading(true);
      const res = await fetch(`${API_BASE}/orders/my-orders`, { headers: authHeaders });
      const data = await res.json();
      if (data.status === "success") setMyOrders(data.data || []);
    } catch (e) {
      console.error("Failed to fetch orders:", e);
    } finally {
      setOrdersLoading(false);
    }
  }, [token]);

  const createOrder = async (address_id: string, payment_method: string): Promise<Order> => {
    const res = await fetch(`${API_BASE}/orders/create`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({ address_id, payment_method }),
    });
    const data = await res.json();
    if (data.status !== "success") throw new Error(data.message || "Failed to create order");
    await fetchMyOrders();
    return data.data;
  };

  const trackOrder = async (id: string): Promise<Order | null> => {
    try {
      const res = await fetch(`${API_BASE}/orders/${id}`, { headers: authHeaders });
      const data = await res.json();
      return data.status === "success" ? data.data : null;
    } catch {
      return null;
    }
  };

  return (
    <OrderContext.Provider value={{ myOrders, ordersLoading, fetchMyOrders, createOrder, trackOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
}
