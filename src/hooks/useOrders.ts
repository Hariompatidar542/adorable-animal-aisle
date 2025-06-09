
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface OrderData {
  email: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: string;
  notes?: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export const useOrders = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { user } = useAuth();

  const createOrder = async (orderData: OrderData, items: CartItem[], total: number) => {
    setIsCreating(true);
    
    try {
      // Generate order number
      const { data: orderNumberData, error: orderNumberError } = await supabase
        .rpc('generate_order_number');
        
      if (orderNumberError) throw orderNumberError;

      const shippingCost = orderData.paymentMethod === 'cod' ? 5 : 0;
      const subtotal = total;
      const finalTotal = subtotal + shippingCost;

      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id || null,
          order_number: orderNumberData,
          email: orderData.email,
          full_name: orderData.fullName,
          phone: orderData.phone,
          address: orderData.address,
          city: orderData.city,
          postal_code: orderData.postalCode,
          payment_method: orderData.paymentMethod,
          notes: orderData.notes || null,
          subtotal: subtotal,
          shipping_cost: shippingCost,
          total: finalTotal,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        product_image: item.image,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return { order, success: true };
    } catch (error) {
      console.error('Error creating order:', error);
      return { error, success: false };
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createOrder,
    isCreating
  };
};
