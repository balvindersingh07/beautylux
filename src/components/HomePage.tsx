import { ArrowRight, Star, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ProductCard } from './ProductCard';
import { products, categories } from '../data/mockData';
import { Product } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onProductClick: (product: Product) => void;
}

export function HomePage({ onNavigate, onProductClick }: HomePageProps) {
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);
  const newProducts = products.filter(p => p.isNew).slice(0, 4);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing products! My skin has never looked better. The vitamin C serum is a game-changer.',
      verified: true
    },
    {
      id: 2,
      name: 'Emily Chen',
      rating: 5,
      comment: 'Fast shipping and excellent customer service. Love the quality of every product I\'ve tried.',
      verified: true
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      rating: 5,
      comment: 'The makeup collection is incredible. Colors are vibrant and long-lasting.',
      verified: true
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1643379850623-7eb6442cd262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBiZWF1dHklMjBza2luY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1ODc0NDUwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Beauty products hero"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <Badge variant="secondary" className="mb-4">
            New Collection Available
          </Badge>
          <h1 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Discover Your Natural Glow
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Premium beauty products crafted with the finest ingredients to enhance your natural beauty
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => onNavigate('category-skincare')}>
              Shop Skincare
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => onNavigate('category-makeup')}>
              Explore Makeup
            </Button>
          </div>
        </div>
      </section>

      {/* Category Highlights */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated collections designed to meet all your beauty needs
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="group cursor-pointer transition-all duration-200 hover:shadow-lg"
              onClick={() => onNavigate(`category-${category.id}`)}
            >
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.productCount} products
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-3xl">Trending Now</h2>
            </div>
            <p className="text-gray-600">Most popular products this week</p>
          </div>
          <Button variant="outline" onClick={() => onNavigate('category-all')}>
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl mb-2">New Arrivals</h2>
            <p className="text-gray-600">Fresh additions to our collection</p>
          </div>
          <Button variant="outline" onClick={() => onNavigate('category-all')}>
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 rounded-lg p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real reviews from real customers who love our products
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  {testimonial.verified && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                <p className="text-sm">– {testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-3xl mb-4">Stay in the Loop</h2>
        <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter for exclusive offers, beauty tips, and early access to new products
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-white text-black"
          />
          <Button variant="secondary" className="whitespace-nowrap">
            Subscribe
          </Button>
        </div>
        
        <p className="text-sm text-primary-foreground/60 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </section>
    </div>
  );
}