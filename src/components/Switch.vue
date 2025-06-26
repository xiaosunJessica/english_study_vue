<template>
  <div class="flex items-center space-x-3">
    <label class="text-sm font-medium text-gray-700 whitespace-nowrap">对错反馈</label>
    <div
      @click="toggle"
      class="flex items-center space-x-2 px-3 py-1.5 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white text-sm"
      :class="{ 'bg-pink-50 border-pink-300': modelValue }"
    >
      <div class="relative inline-flex items-center">
        <div
          class="w-10 h-6 bg-gray-200 rounded-full shadow-inner transition-colors duration-200"
          :class="{ 'bg-pink-500': modelValue }"
        >
          <div
            class="w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 mt-1 ml-0.5"
            :class="{ 'translate-x-4': modelValue }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    modelValue: boolean
    label?: string
    customClass?: string
  }>()
  const emit = defineEmits(['update:modelValue'])
  const toggle = () => emit('update:modelValue', !props.modelValue)
</script>