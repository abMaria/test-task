<template>
  <tr>
    <td class="py-2">{{ modelValue.id }}</td>
    <td class="py-2">
      <input
        v-model="name"
        type="text"
        class="mx-auto block text-center border border-black outline-none"
      />
    </td>
    <td class="py-2">
      <common-number-control v-model="qty" :min="1" :max="5" />
    </td>
    <td class="py-2">
      <div class="flex gap-1 items-center justify-center">
        <input
          type="number"
          v-model="price"
          min="1"
          step="0.01"
          class="border border-black text-center outline-none w-20"
        />
      </div>
    </td>
    <td>
      <button @click="$emit('remove')">&#10006;</button>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import type { OrderItem } from "@/lib/api/types";
import CommonNumberControl from "@/lib/components/CommonNumberControl.vue";
import { computed, type PropType } from "vue";

const props = defineProps({
  modelValue: {
    type: Object as PropType<OrderItem>,
    required: true,
  },
});

const emit = defineEmits(["remove", "update:modelValue"]);

const name = computed({
  get: () => props.modelValue.name,
  set: (val: string) =>
    emit("update:modelValue", { ...props.modelValue, name: val }),
});

const qty = computed({
  get: () => props.modelValue.qty,
  set: (val: number) =>
    emit("update:modelValue", { ...props.modelValue, qty: val }),
});

const price = computed({
  get: () => props.modelValue.price,
  set: (val: number) =>
    emit("update:modelValue", {
      ...props.modelValue,
      price: Math.max(1, val),
    }),
});
</script>
