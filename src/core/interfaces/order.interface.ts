
export interface OrderItemSnapshot {
  productId: string;
  productName: string;
  priceAtPurchase: number; // ราคา 'ณ ตอนที่จ่ายเงิน'
  quantity: number;
}

export interface Order {
  id: string;               // รหัสออเดอร์ เช่น ORD-XYZ123
  items: OrderItemSnapshot[];
  totalAmount: number;
  createdAt: Date;          // วันเวลาที่ซื้อ
}
