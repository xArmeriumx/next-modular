"use server";

import { authService } from "@/core/services/auth.service";
import { loginSchema } from "@/core/schemas/auth.schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ระยะเวลาให้ Cookie อยู่ในเครื่อง (1 วัน)
const SESSION_DURATION = 60 * 60 * 24 * 1000; 

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  // 1. Zod - กรองข้อมูลขยะด่านแรก
  const validation = loginSchema.safeParse({ email, password });
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  // 2. AuthService - ไปเจาะฐานข้อมูลและเอา Argon2 มาสู้
  const response = await authService.login(validation.data);
  if (!response.success || !response.data) {
    return { error: response.error };
  }

  const user = response.data;

  // 3. 🍪 กุญแจสำคัญ: ยัด Session ลง Browser ของผู้ใช้ (Cookie)
  const cookieStore = await cookies();
  
  // *ในระบบสเกลใหญ่ เราจะเอาข้อมูลตรงนี้ไปเข้าเครื่องเข้ารหัส JWT อีกชั้น*
  // *แต่เพื่อความเข้าใจ Session เราจะใช้ Cookie ห่อ JSON สดๆ ก่อน*
  const sessionData = JSON.stringify({
      id: user.id,
      email: user.email,
      role: user.role
  });

  // จังหวะประทับตรา Cookie ที่มาพร้อมโล่ป้องกัน 3 ชั้น
  cookieStore.set("auth_session", sessionData, {
      httpOnly: true,  // โล่ 1: ป้องกัน Browser Javascript มาเจาะข้อมูล ขโมยสิทธิ์ XSS
      secure: process.env.NODE_ENV === "production", // โล่ 2: ยอมส่งข้อมูลผ่านสายมืด (HTTPS) เท่านั้น
      sameSite: "lax", // โล่ 3: ป้องกันเว็บหลอกลวง ส่งคำขอโจมตีมาหาเว็บเรา (CSRF)
      expires: new Date(Date.now() + SESSION_DURATION), // อายุขัย
      path: "/", // ให้หน้าเว็บไหนก็ใช้ตั๋วเดินทางนี้ได้
  });

  // 4. พาผู้โดยสารกลับหน้าหลัก
  redirect("/");
}

/**
 * ฟังก์ชันยึดตั๋วคืน (Logout)
 */
export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("auth_session");
    redirect("/");
}
