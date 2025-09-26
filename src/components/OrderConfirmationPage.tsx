import { CheckCircle, Package, Truck, MapPin, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

interface OrderConfirmationPageProps {
  onNavigate: (page: string) => void;
}

export function OrderConfirmationPage({ onNavigate }: OrderConfirmationPageProps) {
  // Mock order data
  const order = {
    id: 'ORD-2024-001',
    date: new Date().toLocaleDateString(),
    trackingNumber: 'TRK123456789',
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    total: 89.97,
    shippingAddress: {
      name: 'Sarah Johnson',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    items: [
      {
        id: '1',
        name: 'Hydrating Vitamin C Serum',
        brand: 'GlowLab',
        quantity: 2,
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1585232350744-974fc9804d65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGNyZWFtJTIwbW9pc3R1cml6ZXJ8ZW58MXx8fHwxNzU4NzgxOTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: '2',
        name: 'Matte Liquid Lipstick',
        brand: 'VelvetKiss',
        quantity: 1,
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1584013544027-acfe4d8ca478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBsaXBzdGljayUyMGV5ZXNoYWRvd3xlbnwxfHx8fDE3NTg3ODE5ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl">Order Confirmed!</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Thank you for your purchase! We've received your order and will process it shortly. 
          You'll receive a confirmation email with tracking details.
        </p>
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Order Number:</span>
                  <div className="text-lg">{order.id}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Order Date:</span>
                  <div>{order.date}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Tracking Number:</span>
                  <div className="text-primary">{order.trackingNumber}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Amount:</span>
                  <div className="text-lg">${order.total.toFixed(2)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-sm">Estimated Delivery</div>
                  <div className="text-lg text-blue-700">{order.estimatedDelivery}</div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Shipping Address</span>
                </div>
                <div className="ml-6 text-sm space-y-1">
                  <div>{order.shippingAddress.name}</div>
                  <div>{order.shippingAddress.street}</div>
                  <div>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Items Ordered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="line-clamp-2">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.brand}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">Qty: {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Track Your Order
              </Button>
              <Button variant="outline" className="w-full" onClick={() => onNavigate('account')}>
                View Order History
              </Button>
              <Button className="w-full" onClick={() => onNavigate('home')}>
                Continue Shopping
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-3">
              <h3 className="text-lg">Need Help?</h3>
              <p className="text-sm text-muted-foreground">
                Have questions about your order? Our support team is here to help.
              </p>
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-3">
              <h3 className="text-lg">Love Your Purchase?</h3>
              <p className="text-sm text-muted-foreground">
                Share your experience and help others discover great products.
              </p>
              <Button variant="outline" size="sm">
                Write a Review
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Email Confirmation Notice */}
      <Card className="bg-gray-50">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg mb-2">Check Your Email</h3>
          <p className="text-sm text-muted-foreground">
            We've sent a confirmation email with your order details and tracking information to your registered email address.
            If you don't see it in your inbox, please check your spam folder.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}