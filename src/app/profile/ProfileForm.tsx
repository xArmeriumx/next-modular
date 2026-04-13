"use client";

import { useActionState, useState, ChangeEvent } from "react";
import { updateProfileAction } from "../actions/user.actions";
import { Card } from "@/components/ui/Card";

interface ProfilePageProps {
  initialUser: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}

export default function ProfilePage({ initialUser }: ProfilePageProps) {
  const [state, action, isPending] = useActionState(updateProfileAction, null);
  const [preview, setPreview] = useState<string | null>(initialUser.image || null);
  const [base64, setBase64] = useState<string | null>(initialUser.image || null);

  // ฟังก์ชันแปลงรูปภาพเป็น Base64
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        setBase64(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="min-h-screen p-8 md:p-16 bg-gradient-surface">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-8 tracking-tight italic uppercase">
          User Settings
        </h1>

        <Card>
          {state?.message && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl mb-6 font-bold">
              ✅ {state.message}
            </div>
          )}
          {state?.error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 font-bold">
              🚨 {state.error}
            </div>
          )}

          <form action={action} className="space-y-8">
            {/* ส่วนจัดรูปโปรไฟล์ (Avatar) */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 bg-white/5 flex items-center justify-center text-4xl shadow-2xl transition-all group-hover:border-primary/50">
                  {preview ? (
                    <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    "👤"
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-primary text-brand-dark p-2 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg">
                  📷
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <input type="hidden" name="image" value={base64 || ""} />
              <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">
                คลิกที่ไอคอนกล้องเพื่อเปลี่ยนรูป
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
                  ชื่อที่ใช้แสดงผล
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={initialUser.name}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 opacity-50">
                  อีเมล (ไม่สามารถเปลี่ยนได้)
                </label>
                <input
                  type="email"
                  disabled
                  value={initialUser.email}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-slate-500 cursor-not-allowed outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={`w-full btn-primary text-xl py-4 shadow-xl shadow-primary/20 transition-all ${
                isPending ? "opacity-50 cursor-not-allowed scale-95" : "hover:scale-[1.02]"
              }`}
            >
              {isPending ? "กำลังบันทึกหน้า..." : "บันทึกการเปลี่ยนแปลง"}
            </button>
          </form>
        </Card>
      </div>
    </main>
  );
}
