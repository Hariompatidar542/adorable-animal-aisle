
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
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card 
      className={`group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}
      onClick={onClick}
      style={style}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-secondary text-white px-2 py-1 rounded-full text-xs font-semibold">
            -{discount}%
          </div>
        )}
        
        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-4 space-y-3">
        {/* Rating */}
        <div className="flex items-center space-x-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews})
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full gradient-primary text-white hover:opacity-90 transition-opacity"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};
