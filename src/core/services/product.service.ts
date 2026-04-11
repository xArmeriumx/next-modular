import { Product } from "../interfaces/product.interface";
import { ServiceResponse } from "../interfaces/common.interface";
import { IProductDB } from "../database/product.db.interface";
import { MemoryDatabase } from "../database/memory.db";

export interface ProductFilter {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
}

export class ProductService {

  constructor(private db: IProductDB) { }

  async getAllProducts(filters: ProductFilter = {}): Promise<ServiceResponse<Product[]>> {
    try {
      const allProducts = await this.db.getAll();

      const filtered = this.applyFilters(allProducts, filters);

      return {
        success: true,
        data: filtered,
        metadata: { total: filtered.length }
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch products from the database layer."
      };
    }
  }

  async createProduct(data: Omit<Product, "id">): Promise<ServiceResponse<Product>> {
    try {
      // โยนข้อมูลปลอดภัย (ผ่าน Zod มาแล้ว) ไปให้โกดังบันทึก
      const newProduct = await this.db.create(data);
      return { success: true, data: newProduct };
    } catch (error) {
      return { success: false, error: "Failed to construct product in database." };
    }
  }

  async getProductById(id: string): Promise<ServiceResponse<Product>> {
    try {
      const product = await this.db.getById(id);
      if (!product) return { success: false, error: "Product not found." };
      return { success: true, data: product };
    } catch {
      return { success: false, error: "Database reading error." };
    }
  }

  private applyFilters(products: Product[], filters: ProductFilter): Product[] {
    const { query } = filters;
    if (!query) return products;

    const lowerQuery = query.toLowerCase();
    return products.filter((p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description?.toLowerCase().includes(lowerQuery)
    );
  }
}


export const productService = new ProductService(new MemoryDatabase());
