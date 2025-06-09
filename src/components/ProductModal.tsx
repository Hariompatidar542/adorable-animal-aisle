
import { X, Heart, ShoppingCart, Star, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '../contexts/CartContext';

interface ProductModalProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviews: number;
  };
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    onClose();
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white"
          >
            <X className="w-5 h-5" />
          </Button>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{discount}%
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl font-bold text-primary">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6">
                  Premium quality pet product designed with your furry friend's comfort and happiness in mind. 
                  Made from high-quality materials that are safe, durable, and perfect for daily use.
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  <h3 className="font-semibold">Features:</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Premium quality materials</li>
                    <li>Safe for all pets</li>
                    <li>Easy to clean and maintain</li>
                    <li>Durable construction</li>
                  </ul>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Quantity:</label>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-medium text-lg w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className="flex-1 gradient-primary text-white hover:opacity-90"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
