"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

/**
 * Navbar - UI Module
 * แสดง Logo และจำนวนสินค้าในตะกร้าแบบ Real-time
 */
export const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/50 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black italic tracking-tighter hover:text-primary transition-colors">
          NEXT<span className="text-primary italic">SHOP</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/add-product" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
            + เพิ่มสินค้า
          </Link>
          
          <Link href="/cart" className="relative cursor-pointer group">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 group-hover:border-primary transition-all">
              <span className="text-xl">🛒</span>
              <span className="font-bold text-primary">{totalItems}</span>
            </div>
            
            {/* Tooltip เล็กๆ */}
            <div className="absolute top-full right-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-slate-800 text-xs py-2 px-4 rounded-lg border border-white/10 whitespace-nowrap">
                {totalItems > 0 ? `ดูรายการในตะกร้า (${totalItems})` : "ตะกร้าว่างเปล่า"}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};
