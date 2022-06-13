<template>
  <div>
    <h2 class="mb-6 text-2xl font-semibold text-center">Order Summary</h2>
    <div class="flex flex-col gap-4 w-1/2 mx-auto">
      <div class="border-b border-black p-3 flex justify-between items-center">
        <div>Total</div>
        <b>{{ total }}$</b>
      </div>
      <div class="border-b border-black p-3 flex justify-between items-center">
        <div>Payment Method</div>
        <div class="flex gap-4">
          <common-button :active="!isPaypal" @click="isPaypal = false">
            Credit Card
          </common-button>
          <common-button :active="isPaypal" @click="isPaypal = true">
            PayPal
          </common-button>
        </div>
      </div>
      <div class="flex justify-end px-3 gap-4">
        <common-button @click="$router.push({ name: 'dashboard' })">
          Cancel
        </common-button>
        <common-button :disabled="total <= 0" @click="submit">
          Submit Payment
        </common-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { putCustomers } from "@/lib/api/customers";
import { getOrderItems, putOrderItems } from "@/lib/api/order";
import { calcOrderTotal } from "@/lib/services/calc";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import CommonButton from "../../../lib/components/CommonButton.vue";

const router = useRouter();

const isPaypal = ref(false);
const total = ref(0);

async function submit(): Promise<void> {
  await Promise.all([putCustomers([]), putOrderItems([])]);
  await router.push({ name: "dashboard" });
}

onMounted(async () => {
  total.value = calcOrderTotal(await getOrderItems());
});
</script>
