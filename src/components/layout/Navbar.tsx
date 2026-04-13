"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { logoutAction } from "@/app/actions/auth.actions";
import { User } from "@/core/interfaces/user.interface";

interface NavbarProps {
  user: User | null;
}

export const Navbar = ({ user }: NavbarProps) => {
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

          <Link href="/orders" className="text-sm font-bold text-slate-400 hover:text-white transition-colors border-l border-white/10 pl-6">
            ประวัติการสั่งซื้อ
          </Link>

          <Link href="/cart" className="relative cursor-pointer group border-l border-white/10 pl-6">
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

          {/* ส่วนของผู้ใช้งาน (User Profile / Auth) */}
          <div className="border-l border-white/10 pl-6 flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                   <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-white/5 flex items-center justify-center text-lg">
                    {user.image ? (
                      <img src={user.image} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      "👤"
                    )}
                  </div>
                  <span className="text-sm font-bold text-white hidden md:block">
                    {user.name}
                  </span>
                </Link>
                <form action={logoutAction}>
                  <button type="submit" className="text-sm font-bold text-red-400 hover:text-red-300 transition-colors bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
                    ออกจากระบบ
                  </button>
                </form>
              </div>
            ) : (
              <Link href="/login" className="text-sm font-bold text-primary hover:text-primary/80 transition-colors bg-primary/10 px-6 py-2 rounded-full border border-primary/20">
                เข้าสู่ระบบ
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
