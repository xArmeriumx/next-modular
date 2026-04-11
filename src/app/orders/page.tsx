import React from "react";
import { orderService } from "@/core/services/order.service";
import { ProductUtils } from "@/core/interfaces/product.interface";
import { Card } from "@/components/ui/Card";

export default async function OrdersHistoryPage() {
  // ดึงประวัติการสั่งซื้อจาก Service โดยตรง (Server Component ทำแบบนี้ได้เลย โคตร Clean!)
  const response = await orderService.getHistory();
  const orders = response.success && response.data ? response.data : [];

  return (
    <main className="min-h-screen p-8 md:p-16 bg-gradient-surface">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black italic text-white tracking-tight mb-8">
          ORDER HISTORY
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl text-slate-400 font-bold">คุณยังไม่มีประวัติการสั่งซื้อ</h2>
            <p className="text-slate-500 mt-2">ประวัติการช้อปปิ้งของคุณจะแสดงที่นี่</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="!p-8 border-l-4 border-l-primary">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm font-bold text-slate-400 tracking-wider mb-1">
                      ออเดอร์
                    </p>
                    <h3 className="text-2xl font-black text-white">{order.id}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-400 mb-1">
                      วันที่สั่งซื้อ
                    </p>
                    <p className="text-white font-medium">
                      {order.createdAt.toLocaleString("th-TH")}
                    </p>
                  </div>
                </div>

                {/* รายการสินค้าในออเดอร์นี้ (โชว์ Snapshot ราคาเป๊ะๆ) */}
                <div className="bg-black/20 rounded-xl p-6 mb-6 space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <span className="bg-white/10 text-white font-bold px-3 py-1 rounded-lg text-sm">
                          {item.quantity}x
                        </span>
                        <span className="text-white">{item.productName}</span>
                      </div>
                      <span className="text-slate-300 font-medium">
                        {ProductUtils.formatPrice(item.priceAtPurchase * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* ยอดรวมสุทธิบิลนี้ */}
                <div className="flex justify-between items-center pt-6 border-t border-white/10">
                  <span className="text-lg font-bold text-slate-400 uppercase tracking-widest">
                    ยอดรวมสุทธิ
                  </span>
                  <span className="text-3xl font-black text-primary">
                    {ProductUtils.formatPrice(order.totalAmount)}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
