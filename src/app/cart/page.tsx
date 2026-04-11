"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ProductUtils } from "@/core/interfaces/product.interface";
import { Card } from "@/components/ui/Card";
import { checkoutAction } from "@/app/actions/order.actions";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const [isPending, startTransition] = useTransition();

  const handleCheckout = () => {
    // 1. แปลงข้อมูลตะกร้าหน้าเว็บ ให้เป็น Payload แบบเกราะป้องกัน (ไม่ส่งราคาไปเลย)
    const payload = items.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }));

    // 2. เรียกใช้ Server Action 
    startTransition(async () => {
      const response = await checkoutAction(null, payload);
      
      if (response?.success && response.data) {
        alert(`🎉 สั่งซื้อสำเร็จเรียบร้อย!\nหมายเลขออเดอร์: ${response.data.orderId}\nขอบคุณที่ใช้บริการครับ`);
        clearCart();
        router.push("/");
      } else {
        alert(`❌ พบข้อผิดพลาด:\n${response?.error}`);
      }
    });
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen p-8 md:p-16 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">ตะกร้าของคุณยังว่างอยู่</h1>
        <p className="text-slate-400 mb-8 text-xl">ลองเลือกช้อปสินค้าที่คุณชอบดูก่อนมั้ยครับ?</p>
        <Link href="/" className="btn-primary py-4 px-8 text-xl">
          ไปเลือกซื้อสินค้า
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 md:p-16 bg-gradient-surface">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-black italic text-white tracking-tight">YOUR CART</h1>
            <p className="text-slate-400 mt-2 text-xl font-medium">มีสินค้าทั้งหมด {totalItems} รายการ</p>
          </div>
          <button 
            onClick={() => {
               if(confirm("ล้างตะกร้าทั้งหมดใช่หรือไม่?")) clearCart();
            }}
            className="text-red-400 hover:text-red-300 text-sm font-bold uppercase tracking-widest transition-colors mb-2"
          >
            ล้างตะกร้า
          </button>
        </div>

        <div className="space-y-4 mb-12">
          {items.map((item) => (
            <Card key={item.product.id} className="!p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-1">{item.product.name}</h3>
                  <p className="text-primary font-bold">{ProductUtils.formatPrice(item.product.price)}</p>
                </div>

                <div className="flex items-center gap-6">
                  {/* ตัวปรับจำนวน */}
                  <div className="flex items-center bg-white/5 rounded-xl border border-white/10 p-1">
                    <button 
                      onClick={() => updateQuantity(item.product.id, -1)}
                      className="w-10 h-10 flex items-center justify-center text-xl hover:bg-white/10 rounded-lg transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-black text-xl">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, 1)}
                      className="w-10 h-10 flex items-center justify-center text-xl hover:bg-white/10 rounded-lg transition-colors text-primary"
                    >
                      +
                    </button>
                  </div>

                  {/* ลบรายการ */}
                  <button 
                    onClick={() => removeItem(item.product.id)}
                    className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                    title="ลบรายการ"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* ยอดรวม */}
        <div className="bg-brand-dark/50 backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl shadow-primary/5">
          <div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-1">ยอดรวมสุทธิ</p>
            <p className="text-5xl font-black text-primary tracking-tight">
              {ProductUtils.formatPrice(totalPrice)}
            </p>
          </div>
          <button 
            disabled={isPending}
            className={`btn-primary px-12 py-5 text-2xl shadow-xl shadow-primary/20 w-full md:w-auto transition-all ${
              isPending ? "opacity-50 cursor-not-allowed scale-95" : "hover:scale-[1.02]"
            }`}
            onClick={handleCheckout}
          >
            {isPending ? "PROCESSING..." : "ORDER NOW"}
          </button>
        </div>
      </div>
    </main>
  );
}
