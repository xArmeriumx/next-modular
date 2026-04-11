import { Product } from "../interfaces/product.interface";
import { ServiceResponse } from "../interfaces/common.interface";

let localProducts: Product[] = [];

export interface ProductFilter {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
}

interface DummyProduct {
  id: number;
  title: string;
  price: number;
  stock: number;
  description: string;
  thumbnail: string;
  category: string;
}

export class ProductService {
  private readonly API_URL = "https://dummyjson.com/products";

  /**
   * ดึงสินค้าแบบ Hybrid
   */
  async getAllProducts(filters: ProductFilter = {}): Promise<ServiceResponse<Product[]>> {
    try {
      const response = await fetch(`${this.API_URL}?limit=12`);
      const data = await response.json();
      const apiProducts = data.products.map(this.mapToProduct); // using lambda context safely mapped

      // รวมข้อมูลโดยใช้ localProducts จากระดับ Module
      const combined = [...localProducts, ...apiProducts];
      const filtered = this.applyFilters(combined, filters);

      return { 
        success: true, 
        data: filtered,
        metadata: { total: filtered.length }
      };
    } catch (error) {
      const filtered = this.applyFilters(localProducts, filters);
      return { 
        success: false, 
        data: filtered, 
        error: "Failed to fetch from API. Showing local products only." 
      };
    }
  }

  /**
   * สร้างสินค้า และเก็บไว้ในตัวแปร Global ของ Module
   */
  async createProduct(data: Omit<Product, "id">): Promise<ServiceResponse<Product>> {
    try {
      const newProduct: Product = {
        ...data,
        id: `local-${Math.random().toString(36).substring(7)}`,
      };

      localProducts = [newProduct, ...localProducts]; // เอาของใหม่ไว้หน้าสุด
      return { success: true, data: newProduct };
    } catch (error) {
      return { success: false, error: "Failed to create product" };
    }
  }

  /**
   * ดึงตาม ID
   */
  async getProductById(id: string): Promise<ServiceResponse<Product>> {
    const local = localProducts.find(p => p.id === id);
    if (local) return { success: true, data: local };

    try {
      const response = await fetch(`${this.API_URL}/${id}`);
      if (!response.ok) return { success: false, error: "Product not found" };
      const data = await response.json();
      return { success: true, data: this.mapToProduct(data) };
    } catch {
      return { success: false, error: "Network error occurred" };
    }
  }

  private mapToProduct(apiData: DummyProduct): Product {
    return {
      id: String(apiData.id),
      name: apiData.title,
      price: apiData.price,
      stock: apiData.stock,
      description: apiData.description,
      image: apiData.thumbnail,
    };
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

export const productService = new ProductService();
