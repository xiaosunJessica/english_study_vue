<template>
  <!-- Welcome Section -->
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h2 class="text-3xl font-bold text-gray-800 mb-8">
      Welcome to IELTS Learning Platform
    </h2>
  </div>
  <!-- Featured Modules -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
    <router-link
      class="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer transform hover:scale-105 transition-transform"
      v-for="item in detailedModules"
      :key="item.id"
      :to="`/corpus/chapter?bookId=${item.id}`"
    >
      <div
        :class="`bg-gradient-to-br p-8 text-white h-64 flex flex-col justify-between ${item.cls}`"
      >
        <div>
          <!-- 动态 Icon：is 指向 lucide[module.icon] -->
          <!-- <component
            :is="lucide[item.icon]"
            class="w-6 h-6 text-primary-pink-500 mb-4 shrink-0"
          /> -->
          <component
            :is="iconMap[item.icon]"
            class="w-6 h-6 text-primary-pink-500 mb-4 shrink-0"
          />
          <h3 class="text-2xl font-bold mb-2">{{ item.type }}</h3>
          <p class="text-sm opacity-90">{{ item.title }}</p>
        </div>
      </div>
    </router-link>
  </div>

  <!-- Detailed Module List -->
  <div class="bg-white rounded-lg shadow-lg p-8">
    <h3 class="text-2xl font-bold text-gray-800 mb-6">学习模块详情</h3>
    <div class="space-y-4">
      <div
        class="border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-teal-300 transition-all cursor-pointer group"
      >
        <router-link class="flex items-start justify-between" to="/pronounce">
          <div class="flex items-start space-x-4">
            <div
              class="w-4 h-4 bg-teal-500 rounded-full mt-1 group-hover:bg-teal-600 transition-colors"
            ></div>
            <div class="flex-1">
              <h4
                class="font-bold text-gray-800 text-lg mb-2 group-hover:text-teal-600 transition-colors"
              >
                发音能力图
              </h4>
              <p class="text-gray-600 mb-3">description</p>
              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <span class="flex items-center space-x-1">
                  <span>📊</span>
                  <span>level</span>
                </span>
                <span class="flex items-center space-x-1">
                  <span>⏱️</span>
                  <span>duration</span>
                </span>
                <span class="flex items-center space-x-1">
                  <span>📝</span>
                  <span>exercises</span>
                </span>
              </div>
            </div>
          </div>
          <div
            class="text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            →
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getTabsList } from "@/api/corpus"
import { BookOpen, Headphones, AudioWaveform, Pointer } from "lucide-vue-next"
const iconMap: Record<string, any> = {
  BookOpen,
  Headphones,
  AudioWaveform,
  Pointer,
}

interface DetailModule {
  id: number
  type: string
  title: string
  description?: string
  level?: string
  duration?: string
  exercises?: string
  cls?: string
  icon: string
}
const detailedModules = ref<DetailModule[]>([])
onMounted(async () => {
  const res = await getTabsList()
  detailedModules.value = res.data
})
</script>

<style scoped>
/* Custom scrollbar styling */
.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform,
    box-shadow;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
}
</style>
