import { UserDocument } from "../interfaces/user.interface";
import { UserDatabase } from "../interfaces/user.db.interface";
import * as argon2 from "argon2";

// จำลองการเก็บข้อมูลใน RAM (In-Memory)
const MOCK_USERS: Map<string, UserDocument> = new Map();

/**
 * ฟังก์ชันจำลองการใส่ข้อมูล User ตั้งต้นเข้าไปในระบบ
 * ทันทีที่เซิร์ฟเวอร์ตื่น มันจะแอบสร้าง Admin 1 คน และ User ทั่วไปบัญชีนึงรอไว้เลย
 */
const seedData = async () => {
  // เข้ารหัสรหัสผ่านที่ตั้งใจไว้ (รหัสผ่านคือ "password123")
  const defaultPassword = await argon2.hash("password123");
  
  MOCK_USERS.set("user-1", {
    id: "user-1",
    email: "test@example.com",
    name: "John Tester",
    role: "customer",
    hashedPassword: defaultPassword,
    createdAt: new Date()
  });

  MOCK_USERS.set("admin-1", {
    id: "admin-1",
    email: "admin@example.com",
    name: "Admin Supergod",
    role: "admin",
    hashedPassword: defaultPassword,
    createdAt: new Date()
  });
};

// เรียกใช้งานตอนไฟล์นี้โดนโหลด (จะวิ่งแบบเบื้องหลัง)
seedData();

/**
 * ตัวแทนของฐานข้อมูล (Repository)
 * หน้าที่เดียวของมันคือไปควานหาของมาคืนให้ตรงตามสัญญา
 */
export const memoryUserDB: UserDatabase = {
  findByEmail: async (email: string) => {
    // หาใน Map ว่ามี User คนไหนใช้เมลนี้ไหม
    return Array.from(MOCK_USERS.values()).find((u) => u.email === email) || null;
  },
  
  findById: async (id: string) => {
    return MOCK_USERS.get(id) || null;
  }
};
