
import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';

const categories = ['All', 'Dogs', 'Cats', 'Birds', 'Fish'];

const products = [
  {
    id: 1,
    name: "Premium Dog Food",
    price: 49.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=400&q=80",
    category: "Dogs",
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Interactive Cat Toy",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=400&q=80",
    category: "Cats",
    rating: 4.6,
    reviews: 89
  },
  {
    id: 3,
    name: "Cozy Pet Bed",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80",
    category: "Dogs",
    rating: 4.9,
    reviews: 156
  },
  {
    id: 4,
    name: "Bird Cage Deluxe",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=400&q=80",
    category: "Birds",
    rating: 4.7,
    reviews: 67
  },
  {
    id: 5,
    name: "Aquarium Filter Pro",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=400&q=80",
    category: "Fish",
    rating: 4.5,
    reviews: 43
  },
  {
    id: 6,
    name: "Cat Scratching Post",
    price: 39.99,
    originalPrice: 49.99,
    image: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?auto=format&fit=crop&w=400&q=80",
    category: "Cats",
    rating: 4.8,
    reviews: 92
  },
  {
    id: 7,
    name: "Dog Training Treats",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=400&q=80",
    category: "Dogs",
    rating: 4.6,
    reviews: 178
  },
  {
    id: 8,
    name: "Colorful Bird Toys",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1544523849-9bb5bf25c944?auto=format&fit=crop&w=400&q=80",
    category: "Birds",
    rating: 4.4,
    reviews: 56
  }
];

interface ProductGridProps {
  onProductClick: (product: any) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onProductClick }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleProducts, setVisibleProducts] = useState(6);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const displayedProducts = filteredProducts.slice(0, visibleProducts);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Featured <span className="text-primary">Products</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of premium pet products, 
            designed to keep your furry friends happy and healthy.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => {
                setActiveCategory(category);
                setVisibleProducts(6);
              }}
              className={`${
                activeCategory === category 
                  ? 'gradient-primary text-white' 
                  : 'hover:bg-muted/50'
              } transition-all duration-200`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick(product)}
              className={`animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>

        {/* Load More Button */}
        {visibleProducts < filteredProducts.length && (
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setVisibleProducts(prev => prev + 6)}
              className="hover:bg-muted/50"
            >
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
