"use server";

import { orderService } from "@/core/services/order.service";
import { checkoutPayloadSchema } from "@/core/schemas/order.schema";
import { cookies } from "next/headers";

export async function checkoutAction(prevState: any, rawPayload: any) {
  // 1. ดึง ID ผู้ซื้อจากกุญแจ (Cookie)
  const cookieStore = await cookies();
  const sessionStr = cookieStore.get("auth_session")?.value;
  if (!sessionStr) return { error: "กรุณาเข้าสู่ระบบก่อนสั่งซื้อ", success: false };

  const session = JSON.parse(sessionStr);

  // 2. ตรวจสอบข้อมูลสินค้าในตะกร้า (Zod)
  const validation = checkoutPayloadSchema.safeParse(rawPayload);

  if (!validation.success) {
    return {
      error: validation.error.issues[0].message,
      success: false
    };
  }

  const safeData = validation.data;

  // 3. ส่งให้ Service จัดการ (พร้อมบอกว่าใครซื้อ)
  const response = await orderService.checkout(safeData, session.id);

  if (!response.success) {
    return { error: response.error, success: false };
  }

  return {
    success: true,
    data: response.data
  };
}
