import { Star, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { useCart } from '../hooks/useCart';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card 
      className="group cursor-pointer transition-all duration-200 hover:shadow-lg"
      onClick={() => onProductClick(product)}
    >
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <ImageWithFallback
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge variant="secondary" className="text-xs">
                New
              </Badge>
            )}
            {discountPercent > 0 && (
              <Badge variant="destructive" className="text-xs">
                -{discountPercent}%
              </Badge>
            )}
          </div>

          {/* Wishlist button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Quick add to cart */}
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              size="sm"
              className="w-full"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="space-y-2">
            {/* Brand */}
            <p className="text-sm text-muted-foreground">{product.brand}</p>
            
            {/* Product Name */}
            <h3 className="line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Variants preview */}
            {product.variants?.shades && product.variants.shades.length > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">
                  {product.variants.shades.length} shades
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}