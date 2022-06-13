import type { Customer } from "@/lib/api/types";
import { get, set } from "@/lib/storage/local";

export const getCustomers = async (): Promise<Customer[]> => {
  const customers = await get<Customer[]>("customers", []);

  return customers;
};

export const putCustomers = async (val: Customer[]): Promise<void> => {
  await set<Customer[]>("customers", val);
};
