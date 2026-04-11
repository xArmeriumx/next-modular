import { Product } from "../interfaces/product.interface";

export interface IProductDB {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  create(product: Omit<Product, "id">): Promise<Product>;
  update(id: string, partial: Partial<Product>): Promise<Product | null>;
}
