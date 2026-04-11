"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
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
 * 3. Provider: ส่วนหน้าบ้านที่ดูแล State ตะกร้าสินค้า
 * 
 * ⚠️ ปัญหา Hydration Mismatch: 
 * Next.js จะพยายามสร้าง HTML ขึ้นมาล่วงหน้าบน Server แต่ Server ไม่รู้จัก `localStorage` นอกเบราว์เซอร์
 * หากเราอ่าน `localStorage` ทันที React จะตกใจเพราะภาพที่วาดบน Server กับ Client ไม่เหมือนกัน
 * 
 * ✅ วิธีแก้ (Best Practice): Two-Pass Rendering
 * - Pass 1 (Server): เรนเดอร์ตะกร้าเปล่าๆ เสมอ เพื่อให้ HTML ตรงกันเป๊ะ
 * - Pass 2 (Client): เมื่อคอมโพเนนต์ถูกแปะลงเบราว์เซอร์สมบูรณ์ (Mounted) ค่อยไปอ่าน LocalStorage 
 *   ทำให้ React ไม่บ่นเรื่องของไม่ตรงกัน
 */
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // [Pass 2]: เมื่อ UI ถือกำเนิดขึ้นบน Browser (Client-side)
  // จังหวะนี้ปลอดภัยที่จะไปคุ้ย LocalStorage แล้วครับ
  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("next-modular-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("กระบวนการแปลงตะกร้าพัง:", error);
      }
    }
  }, []);

  // Sync Storage: เมื่อไหร่ก็ตามที่รายการในตะกร้า (items) หน้าตาเปลี่ยนไป 
  // ให้เอาของใหม่ไปยัดใส่ LocalStorage ทันที
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("next-modular-cart", JSON.stringify(items));
    }
  }, [items, isMounted]);

  // --- Core Business Logic (ฟังก์ชันจัดการตะกร้า) ---

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
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
          if (newQty > 0 && newQty <= item.product.stock) {
            return { ...item, quantity: newQty };
          }
        }
        return item;
      })
    );
  };

  const clearCart = () => setItems([]);

  // --- Derived State (สรุปค่าจากสิ่งที่มีอยู่) ---
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
  );

  /**
   * จังหวะบล็อค Hydration:
   * เพื่อความเนมียนกริบ ถ้าระบบยังไม่ตื่นเต็มที่ (!isMounted) เราจะไม่เรนเดอร์อะไรเลย
   * ทำให้ไม่เกิดจังหวะ "หน้ากระพริบจาก 0 ไป 3" (แต่เป็นหน้าขาวแป็บนึงแทน ซึ่งเสี้ยววินาทีเดียว)
   */
  if (!isMounted) {
    return null; // ระมัดระวัง: การดึง UI ออกไปเลยบางครั้งอาจขัดแย้งกับ Layout ของแอป 
                 // แต่ในระดับ Workshop ถือเป็นวิธีที่ "กันพัง" ได้ง่ายสุดครับ
  }

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
