import { useState } from 'react';
import { User, Package, Heart, MapPin, Settings, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback } from './ui/avatar';

interface AccountPageProps {
  onNavigate: (page: string) => void;
}

export function AccountPage({ onNavigate }: AccountPageProps) {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user data
  const user = {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: '2023-01-15'
  };

  // Mock orders data
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-20',
      status: 'delivered',
      total: 89.97,
      items: 3,
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-002',
      date: '2024-01-15',
      status: 'shipped',
      total: 45.99,
      items: 2,
      trackingNumber: 'TRK987654321'
    },
    {
      id: 'ORD-003',
      date: '2024-01-10',
      status: 'processing',
      total: 129.98,
      items: 4,
      trackingNumber: null
    }
  ];

  // Mock addresses
  const addresses = [
    {
      id: '1',
      name: 'Home',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      isDefault: true
    },
    {
      id: '2',
      name: 'Work',
      street: '456 Office Plaza',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
      isDefault: false
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
      delivered: 'default',
      shipped: 'secondary',
      processing: 'secondary',
      cancelled: 'destructive'
    };
    
    return (
      <Badge variant={variants[status] || 'secondary'} className="capitalize">
        {status}
      </Badge>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-xl">
            {user.firstName[0]}{user.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl">Welcome back, {user.firstName}!</h1>
          <p className="text-muted-foreground">
            Member since {new Date(user.joinDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long' 
            })}
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="addresses" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Addresses
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Wishlist
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue={user.firstName} />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue={user.lastName} />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={user.email} />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue={user.phone} />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-lg">Order {order.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Items:</span>
                        <div>{order.items} items</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total:</span>
                        <div>${order.total.toFixed(2)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tracking:</span>
                        <div>{order.trackingNumber || 'Not available'}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {order.status === 'delivered' && (
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Saved Addresses</CardTitle>
                <Button>Add New Address</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div key={address.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3>{address.name}</h3>
                          {address.isDefault && (
                            <Badge variant="secondary">Default</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {address.street}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.country}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Delete</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Wishlist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl mb-2">Your wishlist is empty</h3>
                <p className="text-gray-600 mb-6">
                  Save your favorite products to view them here later.
                </p>
                <Button onClick={() => onNavigate('home')}>
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Account Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg mb-1">Account Settings</h3>
              <p className="text-sm text-muted-foreground">
                Manage your account preferences and privacy settings
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}