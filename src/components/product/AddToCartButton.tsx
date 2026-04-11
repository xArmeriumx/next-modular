"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/core/interfaces/product.interface";

interface AddToCartButtonProps {
  product: Product; // เปลี่ยนจากรับแค่ชื่อ เป็นรับทั้ง object เพื่อเอาไปใส่ในตะกร้า
  disabled?: boolean;
}

/**
 * AddToCartButton - Client Component
 * เชื่อมต่อกับ useCart hook เพื่อเพิ่มสินค้าลงใน Global State
 */
export const AddToCartButton = ({ product, disabled }: AddToCartButtonProps) => {
  const { addItem } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // กันไม่ให้เผลอไปกดโดน Link ของการ์ด
    addItem(product);
    // เราอาจจะเพิ่ม Toast หรือ Feedback อื่นๆ ตรงนี้ได้ครับ
  };

  return (
    <button 
      onClick={handleAdd}
      className="btn-primary w-full"
      disabled={disabled}
    >
      ใส่รถเข็น
    </button>
  );
};
