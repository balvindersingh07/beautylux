import { useState, useMemo } from 'react';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { ProductCard } from './ProductCard';
import { products } from '../data/mockData';
import { Product } from '../types';

interface ProductListingPageProps {
  category?: string;
  onProductClick: (product: Product) => void;
}

interface Filters {
  brands: string[];
  priceRange: [number, number];
  categories: string[];
  rating: number;
  inStock: boolean;
}

export function ProductListingPage({ category, onProductClick }: ProductListingPageProps) {
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<Filters>({
    brands: [],
    priceRange: [0, 100],
    categories: category ? [category] : [],
    rating: 0,
    inStock: false
  });

  // Get unique brands from products
  const availableBrands = [...new Set(products.map(p => p.brand))];
  const availableCategories = [...new Set(products.map(p => p.category))];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Rating filter
      if (product.rating < filters.rating) {
        return false;
      }

      // Stock filter
      if (filters.inStock && !product.inStock) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default: // popular
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return filtered;
  }, [filters, sortBy]);

  const handleBrandChange = (brand: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      brands: checked
        ? [...prev.brands, brand]
        : prev.brands.filter(b => b !== brand)
    }));
  };

  const handleCategoryChange = (cat: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      categories: checked
        ? [...prev.categories, cat]
        : prev.categories.filter(c => c !== cat)
    }));
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="mb-3">Categories</h3>
        <div className="space-y-2">
          {availableCategories.map(cat => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${cat}`}
                checked={filters.categories.includes(cat)}
                onCheckedChange={(checked) => handleCategoryChange(cat, checked as boolean)}
              />
              <Label htmlFor={`category-${cat}`} className="capitalize">
                {cat}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="mb-3">Brands</h3>
        <div className="space-y-2">
          {availableBrands.map(brand => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
              />
              <Label htmlFor={`brand-${brand}`}>
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-3">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
            max={100}
            min={0}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="mb-3">Minimum Rating</h3>
        <Select value={filters.rating.toString()} onValueChange={(value) => setFilters(prev => ({ ...prev, rating: Number(value) }))}>
          <SelectTrigger>
            <SelectValue placeholder="Any rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any rating</SelectItem>
            <SelectItem value="1">1+ stars</SelectItem>
            <SelectItem value="2">2+ stars</SelectItem>
            <SelectItem value="3">3+ stars</SelectItem>
            <SelectItem value="4">4+ stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* In Stock */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="in-stock"
          checked={filters.inStock}
          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, inStock: checked as boolean }))}
        />
        <Label htmlFor="in-stock">
          In stock only
        </Label>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl capitalize">
            {category ? `${category} Products` : 'All Products'}
          </h1>
          <p className="text-gray-600 mt-1">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="hidden sm:flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5" />
                <h2 className="text-lg">Filters</h2>
              </div>
              <FilterContent />
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters & Sort
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters & Sort</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={onProductClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No products found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => setFilters({
                  brands: [],
                  priceRange: [0, 100],
                  categories: category ? [category] : [],
                  rating: 0,
                  inStock: false
                })}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}