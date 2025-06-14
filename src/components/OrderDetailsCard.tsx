
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { OrderStatusTimeline } from '@/components/OrderStatusTimeline';
import { Package, CreditCard, Truck, MapPin, Phone, Mail } from 'lucide-react';

interface OrderDetailsCardProps {
  order: any;
}

export const OrderDetailsCard: React.FC<OrderDetailsCardProps> = ({ order }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Package className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <Package className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  return (
    <Card className="bg-slate-200 overflow-hidden">
      <CardHeader className="bg-slate-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div>
            <CardTitle className="text-lg md:text-xl">Order #{order.order_number}</CardTitle>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Placed on {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
            </p>
          </div>
          <Badge className={`${getStatusColor(order.status)} flex items-center gap-1 self-start text-xs`}>
            {getStatusIcon(order.status)}
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6 bg-slate-200">
        {/* Order Summary */}
        <div>
          <h3 className="font-medium mb-3 flex items-center gap-2 text-sm md:text-base">
            <Package className="w-4 h-4" />
            Order Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs md:text-sm font-medium">Subtotal</p>
              <p className="text-base md:text-lg">₹{order.subtotal.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs md:text-sm font-medium">Shipping</p>
              <p className="text-base md:text-lg">₹{order.shipping_cost.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs md:text-sm font-medium">Total</p>
              <p className="text-base md:text-lg font-semibold">₹{order.total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Customer Information */}
        <div>
          <h3 className="font-medium mb-3 flex items-center gap-2 text-sm md:text-base">
            <Mail className="w-4 h-4" />
            Customer Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs md:text-sm font-medium">Name</p>
              <p className="text-xs md:text-sm text-slate-900 break-words">{order.full_name}</p>
            </div>
            <div>
              <p className="text-xs md:text-sm font-medium">Email</p>
              <p className="text-xs md:text-sm text-slate-900 break-all">{order.email}</p>
            </div>
            <div>
              <p className="text-xs md:text-sm font-medium">Phone</p>
              <p className="text-xs md:text-sm text-slate-900 break-all">{order.phone}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Delivery Information */}
        <div>
          <h3 className="font-medium mb-3 flex items-center gap-2 text-sm md:text-base">
            <MapPin className="w-4 h-4" />
            Delivery Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs md:text-sm font-medium">Address</p>
              <p className="text-xs md:text-sm text-slate-900 break-words">
                {order.address}<br />
                {order.city}, {order.postal_code}
              </p>
            </div>
            <div>
              <p className="text-xs md:text-sm font-medium">Payment Method</p>
              <p className="text-xs md:text-sm flex items-center gap-1 text-slate-900">
                <CreditCard className="w-3 h-3" />
                {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Card Payment'}
              </p>
            </div>
          </div>
          
          {order.tracking_number && (
            <div className="mt-4">
              <p className="text-xs md:text-sm font-medium">Tracking Number</p>
              <p className="text-xs md:text-sm text-muted-foreground font-mono break-all">{order.tracking_number}</p>
            </div>
          )}
          
          {order.estimated_delivery_date && (
            <div className="mt-4">
              <p className="text-xs md:text-sm font-medium">Estimated Delivery</p>
              <p className="text-xs md:text-sm text-muted-foreground">
                {new Date(order.estimated_delivery_date).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {order.notes && (
          <>
            <Separator />
            <div>
              <h3 className="font-medium mb-2 text-sm md:text-base">Special Instructions</h3>
              <p className="text-xs md:text-sm text-muted-foreground break-words">{order.notes}</p>
            </div>
          </>
        )}

        <Separator />

        {/* Order Timeline */}
        <OrderStatusTimeline orderId={order.id} currentStatus={order.status} />
      </CardContent>
    </Card>
  );
};
