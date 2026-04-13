import { orderService } from "@/core/services/order.service";
import { cookies } from "next/headers";
import { OrderCard } from "./OrderCard";
import { redirect } from "next/navigation";

export default async function OrdersHistoryPage() {
  // 1. ดึง ID ผู้ใช้จาก Cookie เพื่อดึงประวัติเฉพาะคน
  const cookieStore = await cookies();
  const sessionStr = cookieStore.get("auth_session")?.value;

  if (!sessionStr) {
    redirect("/login");
  }

  const user = JSON.parse(sessionStr);

  // 2. ดึงประวัติการสั่งซื้อ (ดึงเฉพาะของ User คนนี้)
  const response = await orderService.getHistory(user.id);
  const orders = response.success && response.data ? response.data : [];

  return (
    <main className="min-h-screen p-8 md:p-16 bg-gradient-surface">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black italic text-white tracking-tight mb-8 uppercase">
          MY ORDERS
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
            <span className="text-6xl mb-6 block">📦</span>
            <h2 className="text-2xl text-slate-400 font-bold">คุณยังไม่มีประวัติการสั่งซื้อ</h2>
            <p className="text-slate-500 mt-2">เริ่มช้อปปิ้งเพื่อสร้างประวัติการสั่งซื้อครั้งแรกของคุณ!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
