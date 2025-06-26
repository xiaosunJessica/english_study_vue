<template>
  <div class="flex items-center space-x-3">
    <label
      v-if="label"
      class="text-sm font-medium text-gray-700 whitespace-nowrap"
      >{{ label }}</label
    >
    <select :value="modelValue" @change="onChange" :class="selectClass">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, type PropType } from "vue";

interface Option {
  value: string | number;
  label: string;
}

defineProps({
  modelValue: [String, Number],
  options: {
    type: Array as PropType<Option[]>,
    required: true,
    // [{ value: 'recite', label: '背词模式' }, ...]
  },
  label: String,
  selectClass: {
    type: String,
    default:
      "px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:outline-none bg-white text-sm min-w-[120px]",
  },
});

const emit = defineEmits(["update:modelValue"]);

function onChange(e: Event) {
  emit("update:modelValue", (e.target as HTMLSelectElement).value);
}
</script>

<style lang="scss" scoped></style>
