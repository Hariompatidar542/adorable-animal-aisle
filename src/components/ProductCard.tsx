import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '../contexts/CartContext';
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
  const {
    addItem
  } = useCart();
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };
  const discount = product.originalPrice ? Math.round((product.originalPrice - product.price) / product.originalPrice * 100) : 0;
  return <Card className={`group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white rounded-3xl modern-shadow ${className}`} onClick={onClick} style={style}>
      <div className="relative overflow-hidden rounded-t-3xl">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
        
        {/* Enhanced Discount Badge */}
        {discount > 0 && <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            -{discount}%
          </div>}
        
        {/* Enhanced Wishlist Button */}
        <Button variant="ghost" size="icon" className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full" onClick={e => e.stopPropagation()}>
          <Heart className="w-4 h-4 hover:text-pink-500 transition-colors" />
        </Button>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6 space-y-4">
        {/* Enhanced Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}
            </div>
            <span className="text-sm text-gray-500 font-medium">
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-lg line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
          {product.name}
        </h3>

        {/* Enhanced Price */}
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-bold text-purple-600">
            ₹{product.price}
          </span>
          {product.originalPrice && <span className="text-sm text-gray-400 line-through bg-gray-100 px-2 py-1 rounded-full">
              ₹{product.originalPrice}
            </span>}
        </div>

        {/* Enhanced Add to Cart Button */}
        <Button onClick={handleAddToCart} className="w-full gradient-primary hover:opacity-90 transition-all duration-300 rounded-2xl py-3 font-semibold shadow-lg hover:shadow-xl group text-slate-900 bg-slate-50">
          <ShoppingCart className="w-4 h-4 mr-2 group-hover:animate-bounce" />
          Add to Cart
        </Button>
      </div>
    </Card>;
};
