<template>
  <!-- Left-aligned Control Panel -->
  <div class="rounded-2xl bg-white mb-6 p-4 shadow-sm border border-gray-100">
    <div class="flex items-center space-x-8">
      <!-- Learning Mode -->
      <Select
        :modelValue="practiceStore.learningMode"
        :options="learningOptions"
        @update:modelValue="updateLearningMode"
        label="学习模式"
      />

      <!-- Playback Speed -->
      <Select
        :modelValue="practiceStore.currentSpeed"
        :options="speedOptions"
        @update:modelValue="updateCurrentSpeed"
        label="播放速度"
      />

      <!-- Feedback Mode -->
      <Switch
        :modelValue="practiceStore.feedbackEnabled"
        label="对错反馈"
        @update:modelValue="updateFeedbackEnabled"
      />
    </div>
  </div>
</template>

<script setup>
import Select from "@/components/BaseSelect.vue";
import Switch from "@/components/BaseSwitch.vue";
import { usePracticeStore } from "@/stores/practiceStore";

const practiceStore = usePracticeStore();

// v-model 绑定到 store 里的值
const updateLearningMode = (val) => practiceStore.setLearningMode(val);
const updateCurrentSpeed = (val) => practiceStore.setCurrentSpeed(val);
const updateFeedbackEnabled = (val) => practiceStore.setFeedbackEnabled(val);

// Reactive data
const learningOptions = [
  {
    label: "背词模式",
    value: "recite",
  },
  {
    label: "在线拼写",
    value: "spelling",
  },
];

const speedOptions = [
  {
    label: "x1",
    value: 1,
  },
  {
    label: "x1.2",
    value: 1.2,
  },
  {
    label: "x1.4",
    value: 1.4,
  },
  {
    label: "x1.6",
    value: 1.6,
  },
];
</script>

<style scoped></style>
