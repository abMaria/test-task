<template>
  <div class="w-full flex flex-col gap-12 p-4">
    <div class="flex gap-36">
      <div class="w-1/3 flex-grow">
        <h2 class="mb-6 text-2xl font-semibold text-center">Customers</h2>
        <dashboard-customer-table>
          <dashboard-customer-table-row
            v-for="c in customers"
            :key="c.id"
            :model-value="c"
            @update:model-value="updateCustomer"
            @remove="removeCustomer(c)"
          />
        </dashboard-customer-table>
        <div class="flex justify-end mt-6">
          <common-button @click="addCustomer">Add Customer</common-button>
        </div>
      </div>
      <div class="w-1/3 flex-grow">
        <h2 class="mb-6 text-2xl font-semibold text-center">Order Details</h2>
        <dashboard-order-table>
          <dashboard-order-table-row
            v-for="o in orderItems"
            :key="o.id"
            :model-value="o"
            @update:model-value="updateOrderItem"
            @remove="removeOrderItem(o)"
          />
        </dashboard-order-table>
        <div
          class="flex justify-between items-center gap-4 mt-6 border-t border-black pt-4"
        >
          <div>
            Total: <b>{{ total }}$</b>
          </div>
          <common-button @click="addOrderItem">Add Order Item</common-button>
        </div>
      </div>
    </div>
    <div v-if="isPayable" class="flex justify-center">
      <common-button @click="checkout">Checkout</common-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCustomers, putCustomers } from "@/lib/api/customers";
import { getOrderItems, putOrderItems } from "@/lib/api/order";
import type { Customer, OrderItem } from "@/lib/api/types";
import CommonButton from "@/lib/components/CommonButton.vue";
import {
  calcCustomerShare,
  calcCustomerTotal,
  calcOrderTotal,
} from "@/lib/services/calc";
import {
  customerAdd,
  customerRemove,
  customerUpdate,
} from "@/lib/services/customers";
import { orderAdd, orderRemove, orderUpdate } from "@/lib/services/order";
import { computed } from "@vue/reactivity";
import { debounce } from "lodash";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import DashboardCustomerTable from "../components/DashboardCustomerTable.vue";
import DashboardCustomerTableRow from "../components/DashboardCustomerTableRow.vue";
import DashboardOrderTable from "../components/DashboardOrderTable.vue";
import DashboardOrderTableRow from "../components/DashboardOrderTableRow.vue";

const router = useRouter();
const customers = ref<Customer[]>([]);
const orderItems = ref<OrderItem[]>([]);
const total = computed(() => calcOrderTotal(orderItems.value));
const customerTotal = computed(() => calcCustomerTotal(customers.value));

const isPayable = computed(() => {
  if (!customers.value.length || !orderItems.value.length) {
    return false;
  }

  return total.value === customerTotal.value;
});

function addCustomer(): void {
  customers.value = calcCustomerShare(
    customerAdd(customers.value),
    orderItems.value
  );
}

function updateCustomer(c: Customer): void {
  customers.value = calcCustomerShare(
    customerUpdate(customers.value, c),
    orderItems.value
  );
}

async function removeCustomer(c: Customer): Promise<void> {
  customers.value = calcCustomerShare(
    customerRemove(customers.value, c),
    orderItems.value
  );
}

function addOrderItem(): void {
  orderItems.value = orderAdd(orderItems.value);
  customers.value = calcCustomerShare(customers.value, orderItems.value);
}

function updateOrderItem(item: OrderItem): void {
  orderItems.value = orderUpdate(orderItems.value, item);
  customers.value = calcCustomerShare(customers.value, orderItems.value);
}

async function removeOrderItem(o: OrderItem): Promise<void> {
  orderItems.value = orderRemove(orderItems.value, o);
  customers.value = calcCustomerShare(customers.value, orderItems.value);
}

async function checkout(): Promise<void> {
  await router.push({ name: "checkout" });
}

watch(
  customers,
  debounce(async (val: Customer[]) => {
    await putCustomers(val);
  }, 200),
  { deep: true }
);

watch(
  orderItems,
  debounce(async (val: OrderItem[]) => {
    await putOrderItems(val);
  }, 200),
  { deep: true }
);

onMounted(async () => {
  const [c, o] = await Promise.all([getCustomers(), getOrderItems()]);

  customers.value = c;
  orderItems.value = o;
});
</script>
