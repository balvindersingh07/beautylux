import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const footerLinks = {
    shop: [
      { name: 'Skincare', action: () => onNavigate('category-skincare') },
      { name: 'Makeup', action: () => onNavigate('category-makeup') },
      { name: 'Haircare', action: () => onNavigate('category-haircare') },
      { name: 'Fragrance', action: () => onNavigate('category-fragrance') },
      { name: 'New Arrivals', action: () => onNavigate('category-all') },
      { name: 'Best Sellers', action: () => onNavigate('category-all') }
    ],
    help: [
      { name: 'Contact Us', action: () => {} },
      { name: 'Shipping Info', action: () => {} },
      { name: 'Returns & Exchanges', action: () => {} },
      { name: 'Size Guide', action: () => {} },
      { name: 'FAQ', action: () => {} },
      { name: 'Track Your Order', action: () => onNavigate('account') }
    ],
    company: [
      { name: 'About Us', action: () => {} },
      { name: 'Careers', action: () => {} },
      { name: 'Press', action: () => {} },
      { name: 'Sustainability', action: () => {} },
      { name: 'Gift Cards', action: () => {} },
      { name: 'Affiliate Program', action: () => {} }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-gray-700">
          <div className="text-center mb-8">
            <h2 className="text-2xl mb-4">Stay Beautiful</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive offers, beauty tips, and early access to new products
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            />
            <Button variant="secondary" className="whitespace-nowrap">
              Subscribe
            </Button>
          </div>
          
          <p className="text-sm text-gray-400 text-center mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-2xl">BeautyLux</h3>
            <p className="text-gray-300 max-w-md">
              Discover premium beauty products crafted with the finest ingredients to enhance your natural beauty. 
              Quality, sustainability, and innovation are at the heart of everything we do.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+91-9460403092</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="h-4 w-4" />
                <span>balvindersinghsoni99@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>sri-ganganagar</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-lg mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="text-lg mb-4">Help</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © 2024 BeautyLux. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms of Service</button>
              <button className="hover:text-white transition-colors">Cookie Policy</button>
              <button className="hover:text-white transition-colors">Accessibility</button>
            </div>
          </div>
        </div>

        {/* Payment & Security */}
        <div className="py-6 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              🔒 Secure payments powered by SSL encryption
            </div>
            
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>We accept:</span>
              <div className="flex gap-2">
                <div className="px-2 py-1 bg-gray-800 rounded text-xs">VISA</div>
                <div className="px-2 py-1 bg-gray-800 rounded text-xs">MC</div>
                <div className="px-2 py-1 bg-gray-800 rounded text-xs">AMEX</div>
                <div className="px-2 py-1 bg-gray-800 rounded text-xs">UPI</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}