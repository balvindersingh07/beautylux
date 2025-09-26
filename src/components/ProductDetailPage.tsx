import { useState } from 'react';
import { Star, Heart, ShoppingBag, Truck, Shield, RotateCcw, Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { products, reviews } from '../data/mockData';
import { useCart } from '../hooks/useCart';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailPageProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export function ProductDetailPage({ product, onProductClick }: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedShade, setSelectedShade] = useState(product.variants?.shades?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.variants?.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const productReviews = reviews.filter(r => r.userId === '1'); // Mock filter

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    const selectedVariant = {
      ...(selectedShade && { shade: selectedShade }),
      ...(selectedSize && { size: selectedSize })
    };
    
    addItem(product, quantity, Object.keys(selectedVariant).length > 0 ? selectedVariant : undefined);
  };

  return (
    <div className="space-y-12">
      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <ImageWithFallback
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.isNew && <Badge variant="secondary">New</Badge>}
              {discountPercent > 0 && <Badge variant="destructive">-{discountPercent}%</Badge>}
            </div>
            
            <p className="text-muted-foreground">{product.brand}</p>
            <h1 className="text-3xl mt-1">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600">{product.description}</p>

          {/* Variants */}
          <div className="space-y-4">
            {/* Shade Selection */}
            {product.variants?.shades && (
              <div>
                <Label className="text-sm">Shade</Label>
                <Select value={selectedShade} onValueChange={setSelectedShade}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select shade" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.variants.shades.map(shade => (
                      <SelectItem key={shade} value={shade}>
                        {shade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Size Selection */}
            {product.variants?.sizes && (
              <div>
                <Label className="text-sm">Size</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.variants.sizes.map(size => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Quantity */}
          <div>
            <Label className="text-sm">Quantity</Label>
            <div className="flex items-center gap-3 mt-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              {product.inStock ? `Add to Cart - $${(product.price * quantity).toFixed(2)}` : 'Out of Stock'}
            </Button>
            
            <Button variant="outline" size="lg" className="w-full">
              <Heart className="h-4 w-4 mr-2" />
              Add to Wishlist
            </Button>
          </div>

          {/* Shipping Info */}
          <div className="space-y-3 pt-6 border-t">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-4 w-4 text-green-600" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-4 w-4 text-blue-600" />
              <span>2-year warranty included</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <RotateCcw className="h-4 w-4 text-purple-600" />
              <span>30-day return policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <p>{product.description}</p>
              {product.benefits && (
                <div>
                  <h3 className="mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ingredients" className="mt-6">
          <Card>
            <CardContent className="p-6">
              {product.ingredients ? (
                <div>
                  <h3 className="mb-3">Key Ingredients</h3>
                  <ul className="space-y-2">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Ingredients information will be available soon.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            {productReviews.length > 0 ? (
              productReviews.map(review => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span>{review.userName}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                onProductClick={onProductClick}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}