import { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ProductListingPage } from './components/ProductListingPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { AccountPage } from './components/AccountPage';
import { OrderConfirmationPage } from './components/OrderConfirmationPage';
import { Footer } from './components/Footer';
import { Product } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    
    // Reset selected product when navigating away from product detail
    if (page !== 'product-detail') {
      setSelectedProduct(null);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onNavigate={handleNavigation}
            onProductClick={handleProductClick}
          />
        );
      
      case 'category-skincare':
        return (
          <ProductListingPage 
            category="skincare"
            onProductClick={handleProductClick}
          />
        );
      
      case 'category-makeup':
        return (
          <ProductListingPage 
            category="makeup"
            onProductClick={handleProductClick}
          />
        );
      
      case 'category-haircare':
        return (
          <ProductListingPage 
            category="haircare"
            onProductClick={handleProductClick}
          />
        );
      
      case 'category-fragrance':
        return (
          <ProductListingPage 
            category="fragrance"
            onProductClick={handleProductClick}
          />
        );
      
      case 'category-all':
        return (
          <ProductListingPage 
            onProductClick={handleProductClick}
          />
        );
      
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetailPage 
            product={selectedProduct}
            onProductClick={handleProductClick}
          />
        ) : (
          <div className="text-center py-16">
            <p>Product not found</p>
            <button onClick={() => handleNavigation('home')}>
              Go back to home
            </button>
          </div>
        );
      
      case 'cart':
        return <CartPage onNavigate={handleNavigation} />;
      
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigation} />;
      
      case 'account':
        return <AccountPage onNavigate={handleNavigation} />;
      
      case 'order-confirmation':
        return <OrderConfirmationPage onNavigate={handleNavigation} />;
      
      default:
        return (
          <HomePage 
            onNavigate={handleNavigation}
            onProductClick={handleProductClick}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onNavigate={handleNavigation} currentPage={currentPage} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {renderCurrentPage()}
        </div>
      </main>
      
      <Footer onNavigate={handleNavigation} />
    </div>
  );
}