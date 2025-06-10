
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Auth } from './Auth';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose
}) => {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      setShowAuth(true);
      return;
    }
    onClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 animate-fade-in">
        <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl animate-slide-in-right">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-slate-50">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Shopping Cart</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
              {items.length === 0 ? (
                <div className="text-center py-12 bg-slate-200">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <Button onClick={onClose} className="mt-4 gradient-primary bg-slate-100 text-slate-900">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(item => (
                    <Card key={item.id} className="p-4 bg-slate-200">
                      <div className="flex space-x-3">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <h4 className="font-medium line-clamp-2">{item.name}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-slate-950">
                              ₹{item.price}
                            </span>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-destructive hover:text-destructive">
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 bg-slate-50">
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="font-medium">{item.quantity}</span>
                            <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 bg-slate-50">
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-6 space-y-4 bg-slate-50">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-slate-950">₹{total.toFixed(2)}</span>
                </div>
                <div className="space-y-2">
                  <Button onClick={handleCheckout} size="lg" className="w-full gradient-primary hover:opacity-90 text-slate-900 bg-slate-300 hover:bg-slate-200">
                    {user ? 'Checkout' : 'Sign In to Checkout'}
                  </Button>
                  <Button variant="outline" className="w-full" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Auth isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
};
