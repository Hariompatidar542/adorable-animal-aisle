
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Package, Truck, Gift, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-16">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        {/* Success Animation */}
        <div className="mb-12 relative">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl animate-scale-in">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          
          {/* Floating celebration elements */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gradient">
            Order Confirmed! 🎉
          </h1>
          <p className="text-xl text-gray-600 max-w-lg mx-auto leading-relaxed">
            Thank you for choosing us! Your furry friend's happiness is on its way.
          </p>
        </div>

        {/* Enhanced What's Next Card */}
        <Card className="mb-12 border-0 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white pb-8">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <Gift className="w-6 h-6" />
              What happens next?
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8 bg-white">
            <div className="flex items-start space-x-6 text-left group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2 text-gray-800">Order Processing</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our team is carefully preparing your items with love and attention. 
                  We'll have everything ready within 1-2 business days.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6 text-left group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2 text-gray-800">Fast Delivery</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your order will be delivered within 3-5 business days. 
                  You'll receive tracking information via email so you can follow your package's journey.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={() => navigate('/track-order')}
            className="gradient-primary text-white hover:opacity-90 transition-all duration-300 rounded-2xl px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl group"
            size="lg"
          >
            <Package className="w-5 h-5 mr-3 group-hover:animate-bounce" />
            Track Your Order
          </Button>
          
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            size="lg"
            className="border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 rounded-2xl px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Continue Shopping
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="mt-16 flex justify-center space-x-8 text-4xl opacity-50">
          <span className="animate-bounce" style={{ animationDelay: '0s' }}>🐕</span>
          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🐱</span>
          <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🐦</span>
          <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>🐹</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
