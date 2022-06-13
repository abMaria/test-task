import type { Customer } from "../api/types";

export const customerAdd = (items: Customer[]): Customer[] => [
  ...items,
  {
    id: items.length ? items[items.length - 1].id + 1 : 1,
    name: "",
    share: 1,
    amount: 0,
  },
];

export const customerUpdate = (
  items: Customer[],
  item: Customer
): Customer[] => {
  return items.map((val) => (val.id === item.id ? item : val));
};

export const customerRemove = (
  items: Customer[],
  item: Customer
): Customer[] => {
  return items.filter((val) => val.id !== item.id);
};
