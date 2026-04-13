import { Order } from "../interfaces/order.interface";

export interface IOrderDB {
  create(order: Order): Promise<Order>;
  getAll(): Promise<Order[]>;
  findByUserId(userId: string): Promise<Order[]>;
}
