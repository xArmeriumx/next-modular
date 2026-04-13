import { IProductDB } from "../database/product.db.interface";
import { MemoryDatabase } from "../database/memory.db";
import { IOrderDB } from "../database/order.db.interface";
import { MemoryOrderDatabase } from "../database/memory_order.db";
import { ServiceResponse } from "../interfaces/common.interface";
import { CheckoutPayload } from "../schemas/order.schema";
import { Order, OrderItemSnapshot } from "../interfaces/order.interface";

export class OrderService {
  // รับ Database ทั้ง 2 ตัวเข้ามาทำงานร่วมกัน (Product เอาไว้ตัดสต็อก, Order เอาไว้จดบิล)
  constructor(
    private productDb: IProductDB,
    private orderDb: IOrderDB
  ) {}

  async checkout(payload: CheckoutPayload, userId: string): Promise<ServiceResponse<{ orderId: string; totalPaid: number }>> {
    let totalPaid = 0;
    const orderItems: OrderItemSnapshot[] = []; // เตรียมลิสต์สินค้าที่จะถ่าย Snapshot

    // ---------------------------------------------------------
    // Phase 1: Validation (ตรวจก่อน ห้ามหักสต็อกเลยเด็ดขาด!)
    // ---------------------------------------------------------
    for (const item of payload) {
      const product = await this.productDb.getById(item.productId);

      if (!product) {
        return { success: false, error: `ไม่พบสินค้ารหัส ${item.productId} ในระบบ` };
      }

      if (product.stock < item.quantity) {
        return { success: false, error: `สินค้า "${product.name}" มีจำนวนไม่พอ (เหลือแค่ ${product.stock} ชิ้น)` };
      }

      totalPaid += product.price * item.quantity;

      // ถ่าย Snapshot เก็บไว้ในลิสต์ (จดชื่อ และราคา ณ เสี้ยววินาทีนี้ไว้)
      orderItems.push({
        productId: product.id,
        productName: product.name,
        priceAtPurchase: product.price,
        quantity: item.quantity
      });
    }

    // ---------------------------------------------------------
    // Phase 2: Committing (ของครบ สต็อกพอ เริ่มลุยตัดสต็อกได้!)
    // ---------------------------------------------------------
    for (const item of payload) {
      const product = await this.productDb.getById(item.productId);
      if (product) {
        const newStock = product.stock - item.quantity;
        await this.productDb.update(product.id, { stock: newStock });
      }
    }

    // ---------------------------------------------------------
    // Phase 3: สร้างบิลและบันทึกลงโกดัง (Order History)
    // ---------------------------------------------------------
    const orderId = `ORD-${Math.random().toString(36).substring(7).toUpperCase()}`;

    const newOrder: Order = {
      id: orderId,
      userId, // เชื่อมโยงออเดอร์กับผู้ซื้อ
      items: orderItems,
      totalAmount: totalPaid,
      createdAt: new Date()
    };

    // ส่งให้โกดังออเดอร์จัดการเซฟ
    await this.orderDb.create(newOrder);

    return {
      success: true,
      data: { orderId, totalPaid }
    };
  }

  /**
   * ดึงประวัติการสั่งซื้อ
   * @param userId ถ้าใส่มา จะดึงเฉพาะของคนนั้น ถ้าไม่ใส่จะดึงทั้งหมด (Admin)
   */
  async getHistory(userId?: string): Promise<ServiceResponse<Order[]>> {
    try {
      const orders = userId
        ? await this.orderDb.findByUserId(userId)
        : await this.orderDb.getAll();

      return { success: true, data: orders };
    } catch {
      return { success: false, error: "ไม่สามารถดึงประวัติการสั่งซื้อได้" };
    }
  }
}

// ผูก Database ทั้ง 2 ตัว
export const orderService = new OrderService(
  new MemoryDatabase(),
  new MemoryOrderDatabase()
);
