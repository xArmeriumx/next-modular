export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description?: string;
  image?: string; // เพิ่มฟิลด์รูปภาพ
}

// Type สำหรับสถานะสี 
export type ProductVariant = "success" | "danger" | "warning";

export const ProductUtils = {
  formatPrice: (price: number): string => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  },

  isOutOfStock: (product: Product): boolean => {
    return product.stock <= 0;
  },

  /**
   * 2. เพิ่มฟังก์ชันตัดสินใจเรื่อง Variant (สี)
   * แยก Logic ออกจาก UI อย่างชัดเจน
   */
  getVariant: (product: Product): ProductVariant => {
    if (product.stock <= 0) return "danger";
    if (product.stock < 5) return "warning";
    return "success";
  },

  getStockStatus: (product: Product): string => {
    if (product.stock <= 0) return "สินค้าหมด";
    if (product.stock < 5) return `เหลือเพียง ${product.stock} ชิ้น!`;
    return "มีสินค้า";
  }
};
