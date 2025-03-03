"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextProps {
  price: number;
  setPrice: (price: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [price, setPrice] = useState(0);

  return (
    <CartContext.Provider value={{ price, setPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};