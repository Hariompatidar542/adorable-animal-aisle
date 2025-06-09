
import { useState } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ProductGrid } from '../components/ProductGrid';
import { Footer } from '../components/Footer';
import { Cart } from '../components/Cart';
import { ProductModal } from '../components/ProductModal';
import { CartProvider } from '../contexts/CartContext';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header onCartClick={() => setIsCartOpen(true)} />
        <Hero />
        <ProductGrid onProductClick={setSelectedProduct} />
        <Footer />
        
        <Cart 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
        
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </CartProvider>
  );
};

export default Index;
