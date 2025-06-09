
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
  user_id: string | null;
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
      
      // Transform the data to match our OrderDetails interface
      const transformedOrders: OrderDetails[] = (data || []).map(order => ({
        ...order,
        estimated_delivery_date: null, // Set default since field doesn't exist yet
        tracking_number: null, // Set default since field doesn't exist yet
      }));
      
      setOrders(transformedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrderStatusHistory = async (orderId: string): Promise<OrderStatusHistory[]> => {
    try {
      // Since the order_status_history table and function don't exist yet,
      // return a mock status based on the current order status
      const { data: order, error } = await supabase
        .from('orders')
        .select('status, created_at')
        .eq('id', orderId)
        .single();

      if (error) {
        console.error('Error fetching order:', error);
        return [];
      }

      // Return a simple status history based on current status
      const statusHistory: OrderStatusHistory[] = [
        {
          id: `${orderId}-pending`,
          status: 'pending',
          created_at: order.created_at,
          notes: 'Order placed successfully'
        }
      ];

      // Add more statuses based on current status
      if (['processing', 'shipped', 'delivered'].includes(order.status)) {
        statusHistory.push({
          id: `${orderId}-processing`,
          status: 'processing',
          created_at: order.created_at,
          notes: 'Order is being processed'
        });
      }

      if (['shipped', 'delivered'].includes(order.status)) {
        statusHistory.push({
          id: `${orderId}-shipped`,
          status: 'shipped',
          created_at: order.created_at,
          notes: 'Order has been shipped'
        });
      }

      if (order.status === 'delivered') {
        statusHistory.push({
          id: `${orderId}-delivered`,
          status: 'delivered',
          created_at: order.created_at,
          notes: 'Order has been delivered'
        });
      }

      return statusHistory;
    } catch (error) {
      console.error('Error fetching order status history:', error);
      return [];
    }
  };

  const trackOrderByNumber = async (orderNumber: string): Promise<OrderDetails | null> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', orderNumber)
        .single();

      if (error) throw error;
      
      // Transform the data to match our OrderDetails interface
      const transformedOrder: OrderDetails = {
        ...data,
        estimated_delivery_date: null, // Set default since field doesn't exist yet
        tracking_number: null, // Set default since field doesn't exist yet
      };
      
      return transformedOrder;
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
