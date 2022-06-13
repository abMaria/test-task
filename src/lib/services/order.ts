import type { OrderItem } from "../api/types";

export const orderAdd = (items: OrderItem[]): OrderItem[] => [
  ...items,
  {
    id: items.length ? items[items.length - 1].id + 1 : 1,
    name: "",
    qty: 1,
    price: 1,
  },
];

export const orderUpdate = (
  items: OrderItem[],
  item: OrderItem
): OrderItem[] => {
  return items.map((val) => (val.id === item.id ? item : val));
};

export const orderRemove = (
  items: OrderItem[],
  item: OrderItem
): OrderItem[] => {
  return items.filter((val) => val.id !== item.id);
};
