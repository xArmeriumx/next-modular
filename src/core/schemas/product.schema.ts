import { z } from "zod";

/**
 * 🧱 พิมพ์เขียว (Schema) สำหรับการป้อนข้อมูลเพิ่มสินค้า
 * เราสามารถเขียนกฎต่างๆ พร้อมระบุ "ข้อความแจ้งเตือนภาษาไทย" ได้ตรงนี้เลยครับ
 */
export const createProductSchema = z.object({
  name: z.string().min(2, "ชื่อสินค้าต้องมีอย่างน้อย 2 ตัวอักษร"),
  
  price: z.number()
    .positive("ราคาต้องมากกว่า 0")
    .max(1000000, "ราคาไม่ควรเกิน 1 ล้านบาท"),
    
  stock: z.number()
    .int("สต็อกต้องเป็นตัวเลขจำนวนเต็ม (ห้ามมีทศนิยม)")
    .nonnegative("สต็อกสินค้าติดลบไม่ได้"),
    
  description: z.string().optional(), // อันนี้คือบอกว่า "มีหรือไม่มีก็ได้" ไม่บังคับ
});

/**
 * 🪄 พระเอกของงานนี้: การ "เสก" Type ออกมาจาก Schema
 * เราจะได้ Type 'CreateProductDTO' ไปใช้งาน โดยไม่ต้องเขียน Interface ขึ้นมาเองเลย!
 */
export type CreateProductDTO = z.infer<typeof createProductSchema>;
