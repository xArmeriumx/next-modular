import { z } from "zod";

export const cartItemValidationSchema = z.object({
  productId: z.string().min(1, "รหัสสินค้าสั้นเกินไป"),
  quantity: z
    .number()
    .int("จำนวนต้องเป็นจำนวนเต็ม")
    .positive("จำนวนต้องมากกว่า 0"),
});

export const checkoutPayloadSchema = z.array(cartItemValidationSchema).min(1, "ตะกร้าว่างเปล่า ไม่สามารถชำระเงินได้");

export type CartItemPayload = z.infer<typeof cartItemValidationSchema>;
export type CheckoutPayload = z.infer<typeof checkoutPayloadSchema>;
