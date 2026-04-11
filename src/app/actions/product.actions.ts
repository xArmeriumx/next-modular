"use server"; // <--- ระบุว่าเป็น Server Action

import { productService } from "@/core/services/product.service";
import { createProductSchema } from "@/core/schemas/product.schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addProductAction(prevState: any, formData: FormData) {
  // 1. จัดเตรียมข้อมูล
  const rawData = {
    name: formData.get("name"),
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
    description: formData.get("description"),
  };

  // 2. ใช้ Zod ตรวจสอบ (รปภ.)
  const validation = createProductSchema.safeParse(rawData);

  if (!validation.success) {
    const errorMessage = validation.error.issues[0].message;
    // ส่งทั้งข่าวร้าย และ "ข้อมูลที่ User อุตส่าห์พิมพ์มา" กลับไปด้วยครับ
    return { 
      error: errorMessage,
      fields: rawData 
    };
  }

  const safeData = validation.data;

  // 4. ส่งเข้า Service
  const response = await productService.createProduct({
    name: safeData.name,
    price: safeData.price,
    stock: safeData.stock,
    description: safeData.description || "", 
  });

  if (!response.success) {
    // ถ้าฝั่ง Backend พัง (เช่น API หลุด) ก็ส่งข่าวบอก
    return { error: response.error };
  }

  // 5. สั่งล้างแคชเพื่อให้หน้าหลักอัปเดต
  revalidatePath("/");
  
  // ทำการคืนค่า 200 OK (Success) กลับไปให้ฝั่ง Client จัดการต่อเอง
  return { success: true };
}
