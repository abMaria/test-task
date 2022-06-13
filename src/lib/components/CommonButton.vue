<template>
  <button
    class="border border-black transition-colors py-2 px-4 disabled:!bg-white disabled:!text-gray disabled:!border-gray"
    :class="[
      active
        ? 'bg-black text-white cursor-default'
        : 'hover:bg-black hover:text-white',
    ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["click"]);
</script>
