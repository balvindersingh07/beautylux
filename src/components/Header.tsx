import { useState } from 'react';
import { Search, ShoppingBag, User, Menu, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { useCart } from '../hooks/useCart';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { getItemCount } = useCart();

  const navigation = [
    { name: 'Home', page: 'home' },
    { name: 'Skincare', page: 'category', category: 'skincare' },
    { name: 'Makeup', page: 'category', category: 'makeup' },
    { name: 'Haircare', page: 'category', category: 'haircare' },
    { name: 'Fragrance', page: 'category', category: 'fragrance' },
  ];

  const handleNavigation = (item: any) => {
    if (item.category) {
      onNavigate(`category-${item.category}`);
    } else {
      onNavigate(item.page);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className="justify-start"
                      onClick={() => handleNavigation(item)}
                    >
                      {item.name}
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl text-primary"
            >
              BeautyLux
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item)}
                className={`text-sm transition-colors hover:text-primary ${
                  currentPage === item.page || 
                  (item.category && currentPage === `category-${item.category}`)
                    ? 'text-primary' 
                    : 'text-gray-600'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-0"
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile search */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Account */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onNavigate('account')}
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Shopping bag */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => onNavigate('cart')}
            >
              <ShoppingBag className="h-5 w-5" />
              {getItemCount() > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full flex items-center justify-center text-xs"
                >
                  {getItemCount()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-0"
          />
        </div>
      </div>
    </header>
  );
}