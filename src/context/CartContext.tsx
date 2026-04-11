"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/core/interfaces/product.interface";

/**
 * 1. กำหนดโครงสร้างของสินค้าที่อยู่ในตะกร้า 
 * เราใช้ Item เพราะในตะกร้าต้องบอก 'จำนวน' (quantity) ด้วย
 */
interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * 2. สัญญา (Contract) ของข้อมูลที่เราจะเอื้ออำนวยให้คนอื่นใช้
 */
interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * 3. Provider: ส่วนที่ทำหน้าที่ "หุ้ม" แอปเพื่อให้ข้อมูลกระจายไปทั่ว
 */
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      
      if (existing) {
        // เช็คว่าถ้าเพิ่มอีก 1 จะเกินสต็อกไหม?
        if (existing.quantity + 1 > product.stock) {
          alert("ขออภัย สินค้าในคลังไม่พอครับ");
          return prev;
        }

        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // กรณีเพิ่มสินค้าใหม่เข้าตะกร้า
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          // เช็คสต็อกและห้ามค่าติดลบ
          if (newQty > 0 && newQty <= item.product.stock) {
            return { ...item, quantity: newQty };
          }
        }
        return item;
      })
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
  );

  return (
    <CartContext.Provider value={{ 
      items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * 4. Custom Hook: เพื่อให้เรียกใช้ง่ายและอ่านโค้ดได้ "Clean" ที่สุด
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
