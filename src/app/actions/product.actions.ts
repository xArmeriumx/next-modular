"use server"; // <--- ระบุว่าเป็น Server Action

import { productService } from "@/core/services/product.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Action สำหรับเพิ่มสินค้า
 * รับค่าจาก HTML Form โดยตรง (FormData)
 */
export async function addProductAction(formData: FormData) {
  // 1. ดึงข้อมูลจาก Form
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const description = formData.get("description") as string;

  // 2. เรียกใช้ Service (OOP Logic)
  try {
    await productService.createProduct({
      name,
      price,
      stock,
      description,
    });
  } catch (error) {
    console.error("Failed to create product:", error);
    // ไม่ต้อง return object ออกไปเพื่อให้ Type สอดคล้องกับ <form action>
  }

  // 3. สั่งให้ Next.js อัปเดตข้อมูลที่หน้าแรก (Revalidate)
  revalidatePath("/");
  
  // 4. ส่ง User กลับไปหน้าแรก
  redirect("/");
}
