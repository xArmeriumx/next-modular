"use client"; // <--- ต้องเป็น Client Component เพื่อใช้ Hooks

import Link from "next/link";
import { addProductAction } from "../actions/product.actions";
import { Card } from "@/components/ui/Card";
import { useActionState, useEffect } from "react"; 
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [state, action, isPending] = useActionState(addProductAction, null);

  // ดักฟังว่า Action ส่งสถานะ success = true กลับมาเมื่อไหร่ ให้ย้ายหน้าเองทางฝั่ง Client
  useEffect(() => {
    if (state?.success) {
      router.push("/");
    }
  }, [state, router]);

  return (
    <main className="min-h-screen bg-gradient-surface p-8 md:p-16">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-slate-400 hover:text-primary transition-colors block mb-8">
          ← ยกเลิกและกลับหน้าหลัก
        </Link>

        <h1 className="text-4xl font-black text-white mb-8 tracking-tight italic">
          ADD NEW PRODUCT
        </h1>

        <Card>
          {/* แสดงข้อความแจ้งเตือน Error ถ้ามี (Zod เป็นคนส่งมา) */}
          {state?.error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 font-bold flex items-center gap-3 animate-pulse">
              <span>🚨</span> {state.error}
            </div>
          )}

          <form action={action} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
                ชื่อสินค้า
              </label>
              <input
                name="name"
                type="text"
                required
                defaultValue={state?.fields?.name as string} // <--- จำค่าชื่อไว้
                placeholder="เช่น iPhone 16 Pro Max"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
                  ราคา (บาท)
                </label>
                <input
                  name="price"
                  type="number"
                  required
                  defaultValue={state?.fields?.price as number} // <--- จำค่าราคาไว้
                  placeholder="0"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
                  จำนวนในคลัง
                </label>
                <input
                  name="stock"
                  type="number"
                  required
                  defaultValue={state?.fields?.stock as number} // <--- จำค่าสต็อกไว้
                  placeholder="0"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
                รายละเอียด
              </label>
              <textarea
                name="description"
                rows={4}
                defaultValue={state?.fields?.description as string} // <--- จำรายละเอียดไว้
                placeholder="คุณสมบัติเด่นของสินค้า..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              type="submit"
              disabled={isPending} // <--- ป้องกันการกดซ้ำระหว่างรอ
              className={`w-full btn-primary text-xl py-4 shadow-xl shadow-primary/20 transition-all ${
                isPending ? "opacity-50 cursor-not-allowed scale-95" : "hover:scale-[1.02]"
              }`}
            >
              {isPending ? "กำลังบันทึกหน้า..." : "บันทึกสินค้า"}
            </button>
          </form>
        </Card>
      </div>
    </main>
  );
}
