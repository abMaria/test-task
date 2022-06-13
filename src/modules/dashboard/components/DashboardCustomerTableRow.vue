<template>
  <tr>
    <td class="py-2">{{ modelValue.id }}</td>
    <td class="py-2">
      <input
        type="text"
        class="mx-auto block text-center border border-black outline-none"
        v-model="name"
      />
    </td>
    <td class="py-2">
      <common-number-control v-model="share" :min="0" />
    </td>
    <td class="py-2">
      <div class="flex gap-1 items-center justify-center">
        <input
          type="number"
          v-model="amount"
          min="0"
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
import type { Customer } from "@/lib/api/types";
import CommonNumberControl from "@/lib/components/CommonNumberControl.vue";
import { computed, type PropType } from "vue";

const props = defineProps({
  modelValue: {
    type: Object as PropType<Customer>,
    required: true,
  },
});

const emit = defineEmits(["remove", "update:modelValue"]);

const name = computed({
  get: () => props.modelValue.name,
  set: (val: string) =>
    emit("update:modelValue", { ...props.modelValue, name: val }),
});

const share = computed({
  get: () => props.modelValue.share,
  set: (val: number) =>
    emit("update:modelValue", { ...props.modelValue, share: val }),
});

const amount = computed({
  get: () => props.modelValue.amount,
  set: (val: number) =>
    emit("update:modelValue", {
      ...props.modelValue,
      amount: Math.max(0, val),
      share: 0,
    }),
});
</script>
