"use client";

import { useState } from "react";
import { Order } from "@/core/interfaces/order.interface";
import { ProductUtils } from "@/core/interfaces/product.interface";
import { Card } from "@/components/ui/Card";

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mb-4 overflow-hidden">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
            {order.id}
          </p>
          <p className="text-lg font-bold text-white">
            {new Date(order.createdAt).toLocaleDateString("th-TH", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}
          </p>
        </div>
        <div className="text-right flex items-center gap-4">
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold">ยอดสุทธิ</p>
            <p className="text-xl font-black text-white">
              {ProductUtils.formatPrice(order.totalAmount)}
            </p>
          </div>
          <span className={`text-2xl transition-transform ${isOpen ? "rotate-180" : ""}`}>
            👇
          </span>
        </div>
      </div>

      {/* ส่วนรายละเอียด (Expandable) */}
      {isOpen && (
        <div className="mt-8 pt-8 border-t border-white/10 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            รายการสินค้าในบิลนี้
          </p>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
              <div>
                <p className="font-bold text-white">{item.productName}</p>
                <p className="text-xs text-slate-400">
                  {ProductUtils.formatPrice(item.priceAtPurchase)} x {item.quantity}
                </p>
              </div>
              <p className="font-bold text-primary">
                {ProductUtils.formatPrice(item.priceAtPurchase * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
