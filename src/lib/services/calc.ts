import type { Customer, OrderItem } from "../api/types";

export const calcOrderTotal = (order: OrderItem[]): number =>
  order.reduce((sum, item) => sum + item.price * item.qty, 0);

export const calcCustomerTotal = (customers: Customer[]): number =>
  customers.reduce((sum, customer) => sum + customer.amount, 0);

export const calcCustomerShare = (
  customers: Customer[],
  order: OrderItem[]
): Customer[] => {
  // First of all we need to calculate order totals and shared total.
  // Customer may pay due to its shares or a custom amount, if custom amount
  // is selected the shares property is set to 0, which means that the customer
  // will pay only fixed amount of money, and the rest will be splitted in shares
  const total = calcOrderTotal(order);
  const sharedTotal =
    total -
    customers.reduce((agg, c) => agg + (c.share === 0 ? c.amount : 0), 0);

  // Calculate amount of shares and singe share money unit
  const shares = customers.reduce((agg, c) => agg + c.share, 0);
  const shareUnit = sharedTotal / shares;

  const result: Customer[] = [];

  let remainder = total;
  let amount = 0;

  for (let i = 0; i < customers.length; i++) {
    // If customer has share > 0, this means that we will assign
    // shared amount of money equal to shareUnit * share, otherwise
    // we will assign a custom amount not bigger than a remainder

    const customer = customers[i];

    if (customer.share === 0) {
      amount = Math.min(customer.amount, remainder);
    } else {
      amount = Math.max(0, Number((shareUnit * customer.share).toFixed(2)));
    }

    remainder -= amount;

    result.push({ ...customers[i], amount });
  }

  return result;
};
