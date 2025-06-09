
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface OrderStatusHistory {
  id: string;
  status: string;
  created_at: string;
  notes: string;
}

interface OrderDetails {
  id: string;
  order_number: string;
  email: string;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  payment_method: string;
  notes: string | null;
  subtotal: number;
  shipping_cost: number;
  total: number;
  status: string;
  created_at: string;
  estimated_delivery_date: string | null;
  tracking_number: string | null;
}

export const useOrderTracking = () => {
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const fetchUserOrders = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrderStatusHistory = async (orderId: string) => {
    try {
      const { data, error } = await supabase
        .from('order_status_history')
        .select('*')
        .eq('order_id', orderId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching order status history:', error);
      return [];
    }
  };

  const trackOrderByNumber = async (orderNumber: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', orderNumber)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error tracking order:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [user]);

  return {
    orders,
    isLoading,
    fetchUserOrders,
    fetchOrderStatusHistory,
    trackOrderByNumber
  };
};
