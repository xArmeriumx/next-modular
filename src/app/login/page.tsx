"use client";

import { useActionState } from "react";
import { loginAction } from "../actions/auth.actions";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  const [state, action, isPending] = useActionState(loginAction, null);

  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-gradient-surface">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white italic tracking-tight uppercase">
            Secure Login
          </h1>
          <p className="text-slate-400 mt-2">
            ระบบเข้าสู่ระบบแบบ Manual Auth & Argon2
          </p>
        </div>

        <Card>
          {state?.error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 font-bold flex items-center gap-3 animate-pulse">
              <span>🚨</span> {state.error}
            </div>
          )}

          <form action={action} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
                อีเมล
              </label>
              <input
                name="email"
                type="email"
                required
                defaultValue="test@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
                รหัสผ่าน
              </label>
              <input
                name="password"
                type="password"
                required
                defaultValue="password123"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={`w-full btn-primary text-xl py-4 shadow-xl shadow-primary/20 transition-all ${
                isPending ? "opacity-50 cursor-not-allowed scale-95" : "hover:scale-[1.02]"
              }`}
            >
              {isPending ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            <p>Mock User: <span className="text-primary font-bold">test@example.com</span></p>
            <p>Password: <span className="text-primary font-bold">password123</span></p>
          </div>
        </Card>
      </div>
    </main>
  );
}
