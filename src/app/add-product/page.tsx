import Link from "next/link";
import { addProductAction } from "../actions/product.actions";
import { Card } from "@/components/ui/Card";


export default function AddProductPage() {
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
          {/* สังเกตการใช้ action={...} นี่คือความว้าวของ Server Actions ครับ */}
          <form action={addProductAction} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
                ชื่อสินค้า
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="เช่น iPhone 16 Pro Max"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all"
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
                  placeholder="0"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all"
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
                  placeholder="0"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all"
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
                placeholder="คุณสมบัติเด่นของสินค้า..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary text-xl py-4 shadow-xl shadow-primary/20"
            >
              🚀 บันทึกสินค้า
            </button>
          </form>
        </Card>
      </div>
    </main>
  );
}
