import { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { useCart } from '../hooks/useCart';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export function CartPage({ onNavigate }: CartPageProps) {
  const { items, updateQuantity, removeItem, getSubtotal, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);

  const subtotal = getSubtotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const discount = appliedPromo ? subtotal * (appliedPromo.discount / 100) : 0;
  const tax = (subtotal - discount) * 0.08; // 8% tax
  const total = subtotal + shipping + tax - discount;

  const handleApplyPromo = () => {
    // Mock promo codes
    const promoCodes: { [key: string]: number } = {
      'WELCOME10': 10,
      'SAVE20': 20,
      'BEAUTY15': 15
    };

    if (promoCodes[promoCode.toUpperCase()]) {
      setAppliedPromo({
        code: promoCode.toUpperCase(),
        discount: promoCodes[promoCode.toUpperCase()]
      });
      setPromoCode('');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-2xl mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button onClick={() => onNavigate('home')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={`${item.productId}-${JSON.stringify(item.selectedVariant)}`}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="line-clamp-2">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                        
                        {/* Variants */}
                        {item.selectedVariant && (
                          <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                            {item.selectedVariant.shade && (
                              <span>Shade: {item.selectedVariant.shade}</span>
                            )}
                            {item.selectedVariant.size && (
                              <span>Size: {item.selectedVariant.size}</span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.productId, item.selectedVariant)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.selectedVariant)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-12 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.selectedVariant)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg">${(item.product.price * item.quantity).toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">${item.product.price} each</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Clear Cart */}
          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
            <Button variant="outline" onClick={() => onNavigate('home')}>
              Continue Shopping
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Promo Code */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3>Promo Code</h3>
              
              {appliedPromo ? (
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <span className="text-green-700">{appliedPromo.code}</span>
                    <div className="text-sm text-green-600">
                      {appliedPromo.discount}% off applied
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleRemovePromo}>
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button onClick={handleApplyPromo} disabled={!promoCode.trim()}>
                    Apply
                  </Button>
                </div>
              )}
              
              <div className="text-xs text-muted-foreground">
                Try: WELCOME10, SAVE20, BEAUTY15
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3>Order Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                </div>
              )}

              <Button 
                size="lg" 
                className="w-full"
                onClick={() => onNavigate('checkout')}
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Security Info */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <div className="text-sm">🔒 Secure Checkout</div>
                <div className="text-xs text-muted-foreground">
                  Your payment information is encrypted and secure
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}