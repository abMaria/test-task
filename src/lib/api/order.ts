import type { OrderItem } from "@/lib/api/types";
import { get, set } from "@/lib/storage/local";

export const getOrderItems = async (): Promise<OrderItem[]> => {
  const customers = await get<OrderItem[]>("orderItems", []);

  return customers;
};

export const putOrderItems = async (val: OrderItem[]): Promise<void> => {
  await set<OrderItem[]>("orderItems", val);
};
