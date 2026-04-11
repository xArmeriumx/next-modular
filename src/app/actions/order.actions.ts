"use server";

import { orderService } from "@/core/services/order.service";
import { checkoutPayloadSchema } from "@/core/schemas/order.schema";

export async function checkoutAction(prevState: any, rawPayload: any) {

  const validation = checkoutPayloadSchema.safeParse(rawPayload);

  if (!validation.success) {
    return {
      error: validation.error.issues[0].message,
      success: false
    };
  }

  const safeData = validation.data;
  const response = await orderService.checkout(safeData);

  if (!response.success) {
    return { error: response.error, success: false };
  }

  return {
    success: true,
    data: response.data
  };
}
