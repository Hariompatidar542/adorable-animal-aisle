
import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';

const categories = ['All', 'Dogs', 'Cats', 'Birds', 'Fish'];

interface ProductGridProps {
  onProductClick: (product: any) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  onProductClick
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleProducts, setVisibleProducts] = useState(6);
  
  const { products, isLoading } = useProducts();

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
  const displayedProducts = filteredProducts.slice(0, visibleProducts);

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Featured <span className="text-primary">Products</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-950">
              Discover our carefully curated selection of premium pet products, 
              designed to keep your furry friends happy and healthy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted h-48 rounded-t-lg"></div>
                <div className="p-4 bg-card rounded-b-lg">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded mb-4"></div>
                  <div className="h-10 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Featured <span className="text-primary">Products</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-950">
            Discover our carefully curated selection of premium pet products, 
            designed to keep your furry friends happy and healthy.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
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
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.original_price || undefined,
                image: product.image || '/placeholder.svg',
                rating: product.rating || 0,
                reviews: product.reviews || 0,
              }}
              onClick={() => onProductClick(product)}
              className="animate-fade-in"
              style={{
                animationDelay: `${index * 100}ms`
              }}
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
