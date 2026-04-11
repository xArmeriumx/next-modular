import { Order } from "../interfaces/order.interface";
import { IOrderDB } from "./order.db.interface";

let localOrders: Order[] = [];

export class MemoryOrderDatabase implements IOrderDB {
  async create(order: Order): Promise<Order> {

    localOrders = [order, ...localOrders];
    return order;
  }

  async getAll(): Promise<Order[]> {
    return [...localOrders];
  }
}
