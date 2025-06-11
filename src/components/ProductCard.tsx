
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { Auth } from './Auth';
import { ImageCarousel } from '@/components/ui/image-carousel';
import { useProductImages } from '@/hooks/useProductImages';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviews: number;
  };
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  className = '',
  style
}) => {
  const { addItem } = useCart();
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const { images } = useProductImages(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      setShowAuth(true);
      return;
    }
    
    addItem(product);
  };

  const discount = product.originalPrice ? Math.round((product.originalPrice - product.price) / product.originalPrice * 100) : 0;

  // Use product images if available, otherwise fallback to the single image
  const displayImages = images.length > 0 
    ? images.map(img => img.image_url)
    : [product.image];

  return (
    <>
      <Card className={`group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white rounded-3xl modern-shadow w-full ${className}`} onClick={onClick} style={style}>
        <div className="relative overflow-hidden rounded-t-3xl">
          <ImageCarousel
            images={displayImages}
            className="w-full h-40 sm:h-48"
            autoPlay={false}
            showControls={true}
            showDots={images.length > 1}
          />
          
          {/* Enhanced Discount Badge */}
          {discount > 0 && <div className="absolute top-2 md:top-3 left-2 md:left-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
              -{discount}%
            </div>}
          
          {/* Enhanced Wishlist Button */}
          <Button variant="ghost" size="icon" className="absolute top-2 md:top-3 right-2 md:right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full z-10 w-8 h-8 md:w-10 md:h-10" onClick={e => e.stopPropagation()}>
            <Heart className="w-3 h-3 md:w-4 md:h-4 hover:text-pink-500 transition-colors" />
          </Button>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-4 md:p-6 space-y-3 md:space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 md:w-4 md:h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}
              </div>
              <span className="text-xs md:text-sm text-gray-500 font-medium">
                ({product.reviews})
              </span>
            </div>
          </div>

          <h3 className="font-bold text-base md:text-lg line-clamp-2 group-hover:text-purple-600 transition-colors duration-300 leading-tight">
            {product.name}
          </h3>

          <div className="flex items-center space-x-2 md:space-x-3">
            <span className="text-xl md:text-2xl font-bold text-purple-600">
              ₹{product.price}
            </span>
            {product.originalPrice && <span className="text-xs md:text-sm text-gray-400 line-through bg-gray-100 px-2 py-1 rounded-full">
                ₹{product.originalPrice}
              </span>}
          </div>

          <Button onClick={handleAddToCart} className="w-full gradient-primary hover:opacity-90 transition-all duration-300 rounded-2xl py-2 md:py-3 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl group text-slate-900 bg-slate-50">
            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-2 group-hover:animate-bounce" />
            {user ? 'Add to Cart' : 'Sign In to Purchase'}
          </Button>
        </div>
      </Card>

      <Auth isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
};
