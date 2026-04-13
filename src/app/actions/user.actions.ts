"use server";

import { authService } from "@/core/services/auth.service";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

/**
 * Action สำหรับอัปเดตข้อมูล Profile
 */
export async function updateProfileAction(prevState: any, formData: FormData) {
  const name = formData.get("name")?.toString();
  const image = formData.get("image")?.toString(); // รับเป็น Base64 string

  // 1. ดึง ID ผู้ใช้ปัจจุบันจาก Cookie
  const cookieStore = await cookies();
  const sessionStr = cookieStore.get("auth_session")?.value;
  if (!sessionStr) return { error: "กรุณาเข้าสู่ระบบก่อนอัปเดต" };

  const currentSession = JSON.parse(sessionStr);
  const userId = currentSession.id;

  // 2. ส่งให้ Service จัดการหลังบ้าน
  const response = await authService.updateProfile(userId, { name, image });

  if (!response.success || !response.data) {
    return { error: response.error };
  }

  const updatedUser = response.data;

  // 3. 🚨 Key Step: อัปเดตตั๋ว (Cookie) ใหม่เพื่อให้ Navbar และ UI ส่วนอื่นเปลี่ยนชื่อตามทันที
  const newSessionData = JSON.stringify({
    id: updatedUser.id,
    email: updatedUser.email,
    name: updatedUser.name,
    role: updatedUser.role,
    image: updatedUser.image // เก็บรูปไว้ในเซสชันด้วยเพื่อความเร็ว
  });

  cookieStore.set("auth_session", newSessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  // 4. ล้างแคชเพื่อให้ระบบดึงข้อมูลใหม่มาโชว์
  revalidatePath("/");
  
  return { success: true, message: "อัปเดตโปรไฟล์เรียบร้อยแล้ว" };
}
