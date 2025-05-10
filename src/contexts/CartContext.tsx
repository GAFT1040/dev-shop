"use client";

import { CartCardProps } from "@/components/CartCard";
import { CartContextInterface, Product } from "@/types/product";
import React, { createContext, useContext, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";

const CartContext = createContext<CartContextInterface>(
  {} as CartContextInterface
);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartList, setCartList] = useState<CartCardProps[]>([]);

  const { user } = useAuth();
  const router = useRouter();

  const addToCart = (product: Product) => {
    let newCartList = [];

    const itemIndex = cartList.findIndex((item) => item.id === product.id);

    if (itemIndex !== -1) {
      newCartList = cartList.map((item, index) => {
        if (index === itemIndex) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
    } else {
      newCartList = [...cartList, { ...product, amount: 1 }];
    }

    if (!user) {
      localStorage.setItem("@cart", JSON.stringify([newCartList]));
      router.push("/login");
      return;
    }

    setCartList(newCartList);
  };

  const removeToCart = (id: number) => {
    let newCartList = [];

    const itemIndex = cartList.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      newCartList = cartList.map((item, index) =>
        index === itemIndex ? { ...item, amount: item.amount - 1 } : item
      );

      newCartList = newCartList.filter((item) => item.amount > 0);

      setCartList(newCartList);
    }
  };

  const clearCart = () => setCartList([]);

  const total = useMemo(() => {
    return cartList.reduce((acc, item) => acc + item.value * item.amount, 0);
  }, [cartList]);

  return (
    <CartContext.Provider
      value={{ cartList, addToCart, removeToCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
