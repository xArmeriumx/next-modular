import { ServiceResponse } from "../interfaces/common.interface";
import { User } from "../interfaces/user.interface";
import { memoryUserDB as db } from "../database/memory_user.db";
import { LoginPayload } from "../schemas/auth.schema";
import * as argon2 from "argon2";

/**
 * สมองหลักของระบบความปลอดภัย (Auth Service)
 * หน้าที่: ตรวจสอบความถูกต้องของบัญชีผู้ใช้และจัดการรหัสผ่าน
 */
export const authService = {

  /**
   * ฟังก์ชันหลักสำหรับเข้าสู่ระบบ (Login)
   */
  async login(payload: LoginPayload): Promise<ServiceResponse<User>> {
    try {
      // 1. ค้นหาผู้ใช้จากฐานข้อมูลด้วยอีเมล
      const userDoc = await db.findByEmail(payload.email);

      if (!userDoc || !userDoc.hashedPassword) {

        return { success: false, error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" };
      }

      const isPasswordValid = await argon2.verify(userDoc.hashedPassword, payload.password);

      if (!isPasswordValid) {
        return { success: false, error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" };
      }

      const { hashedPassword, createdAt, ...safeUser } = userDoc;

      return {
        success: true,
        data: safeUser
      };

    } catch (error: any) {
      console.error("[AuthService] Login Error:", error);
      return { success: false, error: "ระบบยืนยันตัวตนขัดข้องชั่วคราว" };
    }
  }
};
