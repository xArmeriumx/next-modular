import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "ชื่อสินค้าต้องมีอย่างน้อย 2 ตัวอักษร"),

  price: z.number()
    .positive("ราคาต้องมากกว่า 0")
    .max(1000000, "ราคาไม่ควรเกิน 1 ล้านบาท"),

  stock: z.number()
    .int("สต็อกต้องเป็นตัวเลขจำนวนเต็ม (ห้ามมีทศนิยม)")
    .nonnegative("สต็อกสินค้าติดลบไม่ได้"),

  description: z.string().optional(),
});

export type CreateProductDTO = z.infer<typeof createProductSchema>;
