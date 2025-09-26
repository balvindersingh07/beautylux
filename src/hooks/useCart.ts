import { useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity: number = 1, selectedVariant?: { shade?: string; size?: string }) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.productId === product.id && 
        JSON.stringify(item.selectedVariant) === JSON.stringify(selectedVariant)
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.productId === product.id && 
          JSON.stringify(item.selectedVariant) === JSON.stringify(selectedVariant)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, { 
        productId: product.id, 
        product, 
        quantity, 
        selectedVariant 
      }];
    });
  };

  const removeItem = (productId: string, selectedVariant?: { shade?: string; size?: string }) => {
    setItems(prevItems => 
      prevItems.filter(item => 
        !(item.productId === productId && 
          JSON.stringify(item.selectedVariant) === JSON.stringify(selectedVariant))
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, selectedVariant?: { shade?: string; size?: string }) => {
    if (quantity <= 0) {
      removeItem(productId, selectedVariant);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.productId === productId && 
        JSON.stringify(item.selectedVariant) === JSON.stringify(selectedVariant)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    getSubtotal
  };
}