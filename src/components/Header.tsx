
import React, { useState } from 'react';
import { ShoppingCart, User, LogOut, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Auth } from '@/components/Auth';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { itemCount } = useCart();
  const { user, signOut } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };

  return (
    <>
      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gradient cursor-pointer flex items-center gap-2" onClick={() => navigate('/')}>
                <span className="text-2xl">🐾</span>
                Zooland
              </h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group">
                Products
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <button 
                onClick={() => navigate('/track-order')}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group"
              >
                Track Order
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </button>
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="glass-card px-3 py-2 rounded-full">
                    <span className="text-sm text-gray-700 font-medium">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleAdminClick}
                    className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-full"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAuth(true)}
                  className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-full px-4"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onCartClick}
                className="relative text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-full p-3"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                    {itemCount}
                  </span>
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-full"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <Auth isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
};
