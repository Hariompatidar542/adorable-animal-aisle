import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useOrderTracking } from '@/hooks/useOrderTracking';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Package, Search, Truck, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { OrderStatusTimeline } from '@/components/OrderStatusTimeline';
import { OrderDetailsCard } from '@/components/OrderDetailsCard';
const OrderTracking = () => {
  const {
    user
  } = useAuth();
  const {
    orders,
    isLoading,
    trackOrderByNumber
  } = useOrderTracking();
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const handleTrackOrder = async () => {
    if (!orderNumber.trim()) return;
    setSearchLoading(true);
    const order = await trackOrderByNumber(orderNumber.trim());
    setTrackedOrder(order);
    setSearchLoading(false);
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };
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
  return <div className="min-h-screen py-8 bg-slate-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Button>
          <h1 className="text-3xl font-bold">Track Your Order</h1>
        </div>

        {/* Order Number Search */}
        <Card className="mb-8 bg-slate-200">
          <CardHeader className="bg-slate-200">
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Track by Order Number
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 bg-slate-200">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="orderNumber">Order Number</Label>
                <Input id="orderNumber" placeholder="Enter your order number (e.g., ORD-20241209-1234)" value={orderNumber} onChange={e => setOrderNumber(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleTrackOrder()} className="bg-slate-50" />
              </div>
              <div className="flex items-end">
                <Button onClick={handleTrackOrder} disabled={searchLoading || !orderNumber.trim()} className="gradient-primary text-slate-900">
                  {searchLoading ? 'Tracking...' : 'Track Order'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tracked Order Result */}
        {trackedOrder && <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
            <OrderDetailsCard order={trackedOrder} />
          </div>}

        {trackedOrder === null && orderNumber && !searchLoading && <Card className="mb-8">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">
                No order found with number "{orderNumber}". Please check your order number and try again.
              </p>
            </CardContent>
          </Card>}

        {/* User's Orders (if logged in) */}
        {user && <div>
            <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
            {isLoading ? <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">Loading your orders...</p>
                </CardContent>
              </Card> : orders.length === 0 ? <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                  <Button onClick={() => navigate('/')} className="mt-4 gradient-primary text-white">
                    Start Shopping
                  </Button>
                </CardContent>
              </Card> : <div className="space-y-4">
                {orders.map(order => <Card key={order.id}>
                    <CardHeader className="pb-3 bg-slate-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">Order #{order.order_number}</CardTitle>
                          <p className="text-sm text-slate-900">
                            Placed on {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="bg-slate-200 rounded-none">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium">Total Amount</p>
                          <p className="text-lg font-semibold">${order.total.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Payment Method</p>
                          <p className="text-sm text-slate-900">
                            {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Card Payment'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Delivery Address</p>
                          <p className="text-sm text-slate-900">
                            {order.address}, {order.city}
                          </p>
                        </div>
                      </div>
                      
                      {order.tracking_number && <div className="mb-4">
                          <p className="text-sm font-medium">Tracking Number</p>
                          <p className="text-sm text-muted-foreground font-mono">{order.tracking_number}</p>
                        </div>}
                      
                      <Separator className="my-4" />
                      <OrderStatusTimeline orderId={order.id} currentStatus={order.status} />
                    </CardContent>
                  </Card>)}
              </div>}
          </div>}

        {/* Login prompt for guest users */}
        {!user && <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground mb-4">
                Sign in to view all your orders and get personalized tracking updates.
              </p>
              <Button onClick={() => navigate('/')} className="gradient-primary text-white">
                Sign In
              </Button>
            </CardContent>
          </Card>}
      </div>
    </div>;
};
export default OrderTracking;