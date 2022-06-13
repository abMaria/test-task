<template>
  <div class="inline-flex gap-2 items-center justify-center">
    <button
      class="border border-black w-7 disabled:border-gray"
      :disabled="disabled || hasReachedMin"
      @click="$emit('update:modelValue', modelValue - 1)"
    >
      -
    </button>
    <div
      class="border outline-none text-center w-20 select-none"
      :class="[disabled ? 'border-gray' : 'border-black']"
    >
      {{ modelValue }}
    </div>
    <button
      class="border border-b w-7 disabled:border-gray"
      :disabled="disabled || hasReachedMax"
      @click="$emit('update:modelValue', modelValue + 1)"
    >
      +
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: -Infinity,
  },
  max: {
    type: Number,
    default: Infinity,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);

const hasReachedMax = computed(() => props.modelValue >= props.max);
const hasReachedMin = computed(() => props.modelValue <= props.min);
</script>
