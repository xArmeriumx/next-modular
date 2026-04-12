"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/core/interfaces/product.interface";

interface AddToCartButtonProps {
  product: Product;
  disabled?: boolean;
}
export const AddToCartButton = ({ product, disabled }: AddToCartButtonProps) => {
  const { addItem } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
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
