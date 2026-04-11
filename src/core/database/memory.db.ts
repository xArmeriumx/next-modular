import { Product } from "../interfaces/product.interface";
import { IProductDB } from "./product.db.interface";

let localProducts: Product[] = [];

export class MemoryDatabase implements IProductDB {
  private readonly API_URL = "https://dummyjson.com/products";

  async getAll(): Promise<Product[]> {
    try {
      const response = await fetch(`${this.API_URL}?limit=12`);
      const data = await response.json();

      const apiProducts = data.products.map((apiData: any) => ({
        id: String(apiData.id),
        name: apiData.title,
        price: apiData.price,
        stock: apiData.stock,
        description: apiData.description,
        image: apiData.thumbnail,
      }));

      const newApiProducts = apiProducts.filter(
        (apiP: Product) => !localProducts.some(localP => localP.id === apiP.id)
      );

      return [...localProducts, ...newApiProducts];
    } catch {
      return [...localProducts];
    }
  }

  async getById(id: string): Promise<Product | null> {
    const local = localProducts.find(p => p.id === id);
    if (local) return local;

    try {
      const response = await fetch(`${this.API_URL}/${id}`);
      if (!response.ok) return null;

      const apiData = await response.json();
      return {
        id: String(apiData.id),
        name: apiData.title,
        price: apiData.price,
        stock: apiData.stock,
        description: apiData.description,
        image: apiData.thumbnail,
      };
    } catch {
      return null;
    }
  }

  async create(data: Omit<Product, "id">): Promise<Product> {
    const newProduct: Product = {
      ...data,
      id: `local-${Math.random().toString(36).substring(7)}`,
    };
    localProducts = [newProduct, ...localProducts];
    return newProduct;
  }

  async update(id: string, partial: Partial<Product>): Promise<Product | null> {
    // 1. หาใน Local ก่อน
    const index = localProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      localProducts[index] = { ...localProducts[index], ...partial };
      return localProducts[index];
    }

    // 2. ถ้ามาจาก API (ไม่มีใน Local) ให้ดึงมาเพื่อดัดแปลง แล้วก๊อปปี้เก็บไว้ใน Local
    const apiProduct = await this.getById(id);
    if (apiProduct) {
      const updatedProduct = { ...apiProduct, ...partial };
      localProducts = [updatedProduct, ...localProducts]; // เอามาทับไว้ด้านหน้า
      return updatedProduct;
    }

    return null;
  }
}
