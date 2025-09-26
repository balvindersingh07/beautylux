import { useState } from 'react';
import { CreditCard, Truck, MapPin, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { useCart } from '../hooks/useCart';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

export function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { items, getSubtotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [shippingInfo, setShippingInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: ''
  });

  const subtotal = getSubtotal();
  const shippingCost = shippingMethod === 'express' ? 15.99 : (subtotal > 50 ? 0 : 9.99);
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const shippingOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: '5-7 business days',
      price: subtotal > 50 ? 0 : 9.99
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: '2-3 business days',
      price: 15.99
    }
  ];

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    clearCart();
    setIsProcessing(false);
    onNavigate('order-confirmation');
  };

  const handleInputChange = (section: 'shipping' | 'payment', field: string, value: string) => {
    if (section === 'shipping') {
      setShippingInfo(prev => ({ ...prev, [field]: value }));
    } else {
      setPaymentInfo(prev => ({ ...prev, [field]: value }));
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <h1 className="text-2xl mb-4">No items to checkout</h1>
        <p className="text-gray-600 mb-8">Add some items to your cart first.</p>
        <Button onClick={() => onNavigate('home')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => onNavigate('cart')}>
          ← Back to Cart
        </Button>
        <h1 className="text-3xl">Checkout</h1>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {[1, 2].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              step >= stepNumber ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-600'
            }`}>
              {stepNumber}
            </div>
            <span className={`ml-2 ${step >= stepNumber ? 'text-primary' : 'text-gray-600'}`}>
              {stepNumber === 1 ? 'Shipping' : 'Payment'}
            </span>
            {stepNumber < 2 && <div className="w-12 h-px bg-gray-300 mx-4" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {step === 1 && (
            <form onSubmit={handleShippingSubmit} className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input
                      id="apartment"
                      value={shippingInfo.apartment}
                      onChange={(e) => handleInputChange('shipping', 'apartment', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select value={shippingInfo.state} onValueChange={(value) => handleInputChange('shipping', 'state', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                    {shippingOptions.map((option) => (
                      <div key={option.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <Label htmlFor={option.id} className="flex-1">
                            <div>
                              <div>{option.name}</div>
                              <div className="text-sm text-muted-foreground">{option.description}</div>
                            </div>
                          </Label>
                        </div>
                        <div className="text-right">
                          {option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full">
                Continue to Payment
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex-1">UPI</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="razorpay" id="razorpay" />
                      <Label htmlFor="razorpay" className="flex-1">Razorpay</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {paymentMethod === 'card' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Card Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={paymentInfo.cvv}
                          onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input
                        id="nameOnCard"
                        value={paymentInfo.nameOnCard}
                        onChange={(e) => handleInputChange('payment', 'nameOnCard', e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back to Shipping
                </Button>
                <Button type="submit" size="lg" className="flex-1" disabled={isProcessing}>
                  <Lock className="h-4 w-4 mr-2" />
                  {isProcessing ? 'Processing...' : `Complete Order - $${total.toFixed(2)}`}
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={`${item.productId}-${JSON.stringify(item.selectedVariant)}`} className="flex gap-3">
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm line-clamp-2">{item.product.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                      {item.selectedVariant && (
                        <div className="text-xs text-muted-foreground">
                          {item.selectedVariant.shade && `Shade: ${item.selectedVariant.shade}`}
                          {item.selectedVariant.size && `Size: ${item.selectedVariant.size}`}
                        </div>
                      )}
                      <div className="text-sm">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-sm">${(item.product.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Badge */}
          <Card>
            <CardContent className="p-4 text-center">
              <Lock className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <div className="text-sm">Secure SSL Encryption</div>
              <div className="text-xs text-muted-foreground">Your information is protected</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}