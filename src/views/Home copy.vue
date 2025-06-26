<template>
  <div class="min-h-screen bg-gray-50">
    <!-- BBC Style Header -->
    <header class="bg-black text-white">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between py-3">
          <div class="flex items-center space-x-6">
            <div class="flex items-center space-x-2">
              <div class="bg-white text-black px-3 py-1 font-bold text-xl">I</div>
              <div class="bg-white text-black px-3 py-1 font-bold text-xl">E</div>
              <div class="bg-white text-black px-3 py-1 font-bold text-xl">L</div>
              <div class="bg-white text-black px-3 py-1 font-bold text-xl">T</div>
              <div class="bg-white text-black px-3 py-1 font-bold text-xl">S</div>
            </div>
            <button class="text-sm hover:underline flex items-center space-x-1">
              <span>👤</span>
              <span>Sign in</span>
            </button>
          </div>
          <nav class="hidden md:flex space-x-6 text-sm">
            <a href="#" class="hover:underline">Home</a>
            <a href="#" class="hover:underline">Listening</a>
            <a href="#" class="hover:underline">Reading</a>
            <a href="#" class="hover:underline">Writing</a>
            <a href="#" class="hover:underline">Speaking</a>
            <a href="#" class="hover:underline">Vocabulary</a>
            <div class="flex items-center space-x-2">
              <span>...</span>
              <button class="text-xs bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">
                🔍 Search IELTS
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-teal-400 via-teal-500 to-green-400 text-white overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="relative max-w-7xl mx-auto px-4 py-20">
        <div class="max-w-2xl">
          <h1 class="text-6xl font-bold mb-4 tracking-tight">IELTS LEARNING</h1>
          <p class="text-xl opacity-90 font-light">COMPREHENSIVE IELTS PREPARATION PLATFORM</p>
        </div>
      </div>
      <!-- Language Selector -->
      <div class="absolute top-4 right-4">
        <button class="bg-teal-800 text-white px-4 py-2 text-sm font-medium hover:bg-teal-700 transition-colors">
          ENGLISH CHANGE LANGUAGE ▼
        </button>
      </div>
    </section>

    <!-- Primary Navigation -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex space-x-8 py-4 overflow-x-auto">
          <button
            v-for="category in primaryCategories"
            :key="category.name"
            @click="setActiveCategory(category.name)"
            :class="[
              'flex items-center space-x-1 text-gray-700 hover:text-teal-600 font-medium whitespace-nowrap transition-colors',
              activeCategory === category.name ? 'text-teal-600 border-b-2 border-teal-600 pb-2' : ''
            ]"
          >
            <span>{{ category.name }}</span>
            <span class="text-xs">▼</span>
          </button>
          <button
            @click="setActiveCategory('More')"
            :class="[
              'flex items-center space-x-1 font-medium whitespace-nowrap px-4 py-2 rounded transition-colors',
              activeCategory === 'More' ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-600 hover:bg-teal-100'
            ]"
          >
            <span>More...</span>
            <span class="text-xs">▲</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Secondary Navigation Bar -->
    <div class="bg-teal-500 text-white">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex space-x-6 py-3 text-sm overflow-x-auto">
          <button
            v-for="item in secondaryMenuItems"
            :key="item"
            @click="setActiveSection(item)"
            :class="[
              'whitespace-nowrap hover:bg-teal-600 px-3 py-2 rounded transition-colors',
              activeSection === item ? 'bg-teal-600 font-medium' : ''
            ]"
          >
            {{ item }}
          </button>
        </div>
      </div>
    </div>
    <!-- Welcome Section -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-8">Welcome to IELTS Learning Platform</h2>
    </div>

    <!-- Main Content Grid -->
    <main class="max-w-7xl mx-auto px-4 pb-12">
      <!-- Featured Modules -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <!-- Listening Module -->
        <div class="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer transform hover:scale-105 transition-transform">
          <div class="bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white h-64 flex flex-col justify-between">
            <div>
              <div class="text-4xl mb-4">🎧</div>
              <h3 class="text-2xl font-bold mb-2">LISTENING</h3>
              <p class="text-sm opacity-90">雅思听力179考点词真经</p>
            </div>
            <div class="text-right">
              <span class="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">179 Words</span>
            </div>
          </div>
        </div>

        <!-- Vocabulary Module -->
        <div class="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer transform hover:scale-105 transition-transform">
          <div class="bg-gradient-to-br from-teal-500 to-blue-600 p-8 text-white h-64 flex flex-col justify-between">
            <div>
              <div class="text-4xl mb-4">📚</div>
              <h3 class="text-2xl font-bold mb-2">VOCABULARY</h3>
              <p class="text-sm opacity-90">22类雅思高频场景词汇</p>
            </div>
            <div class="text-right">
              <span class="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">22 Categories</span>
            </div>
          </div>
        </div>

        <!-- Reading Module -->
        <div class="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer transform hover:scale-105 transition-transform">
          <div class="bg-gradient-to-br from-orange-500 to-red-600 p-8 text-white h-64 flex flex-col justify-between">
            <div>
              <div class="text-4xl mb-4">📖</div>
              <h3 class="text-2xl font-bold mb-2">READING</h3>
              <p class="text-sm opacity-90">雅思阅读538考点词真经</p>
            </div>
            <div class="text-right">
              <span class="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">538 Words</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Modules -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div class="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer transform hover:scale-105 transition-transform">
          <div class="bg-gradient-to-br from-green-500 to-teal-600 p-8 text-white h-64 flex flex-col justify-between">
            <div>
              <div class="text-4xl mb-4">🎤</div>
              <h3 class="text-2xl font-bold mb-2">PRONUNCIATION</h3>
              <p class="text-sm opacity-90">发音技巧与练习</p>
            </div>
          </div>
        </div>

        <div class="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer transform hover:scale-105 transition-transform">
          <div class="bg-gradient-to-br from-purple-500 to-pink-600 p-8 text-white h-64 flex flex-col justify-between">
            <div>
              <div class="text-4xl mb-4">💾</div>
              <h3 class="text-2xl font-bold mb-2">CORPUS</h3>
              <p class="text-sm opacity-90">雅思王听力语料库精华</p>
            </div>
          </div>
        </div>

        <div class="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer transform hover:scale-105 transition-transform">
          <div class="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white h-64 flex flex-col justify-between">
            <div>
              <div class="text-4xl mb-4">🎯</div>
              <h3 class="text-2xl font-bold mb-2">PRACTICE</h3>
              <p class="text-sm opacity-90">模拟考试与练习</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Module List -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h3 class="text-2xl font-bold text-gray-800 mb-6">学习模块详情</h3>
        <div class="space-y-4">
          <div
            v-for="module in detailedModules"
            :key="module.id"
            class="border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-teal-300 transition-all cursor-pointer group"
            @click="selectModule(module)"
          >
            <div class="flex items-start justify-between">
              <div class="flex items-start space-x-4">
                <div class="w-4 h-4 bg-teal-500 rounded-full mt-1 group-hover:bg-teal-600 transition-colors"></div>
                <div class="flex-1">
                  <h4 class="font-bold text-gray-800 text-lg mb-2 group-hover:text-teal-600 transition-colors">
                    {{ module.title }}
                  </h4>
                  <p class="text-gray-600 mb-3">{{ module.description }}</p>
                  <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <span class="flex items-center space-x-1">
                      <span>📊</span>
                      <span>{{ module.level }}</span>
                    </span>
                    <span class="flex items-center space-x-1">
                      <span>⏱️</span>
                      <span>{{ module.duration }}</span>
                    </span>
                    <span class="flex items-center space-x-1">
                      <span>📝</span>
                      <span>{{ module.exercises }} exercises</span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const activeCategory = ref('Courses')
const activeSection = ref('Quizzes')

const primaryCategories = [
  { name: 'Courses' },
  { name: 'Grammar' },
  { name: 'Pronunciation' },
  { name: 'Vocabulary' },
  { name: 'News' }
]

const secondaryMenuItems = [
  'Quizzes', 'Test Your Level', 'Downloads', 'Teachers', 'For Children',
  'Podcasts', 'Drama', 'Business English'
]

const detailedModules = reactive([
  {
    id: 1,
    title: '雅思王听力语料库精华',
    description: 'IELTS King Listening Corpus - Essential materials for comprehensive listening practice with real exam scenarios',
    level: 'Intermediate to Advanced',
    duration: '4-6 weeks',
    exercises: 150
  },
  {
    id: 2,
    title: '22类雅思高频场景词汇',
    description: '22 Categories of High-frequency IELTS Scenario Vocabulary covering all major test topics and situations',
    level: 'All Levels',
    duration: '3-4 weeks',
    exercises: 220
  },
  {
    id: 3,
    title: '雅思听力179考点词真经',
    description: 'IELTS Listening 179 Key Point Words - Critical vocabulary that frequently appears in listening tests',
    level: 'Intermediate',
    duration: '2-3 weeks',
    exercises: 179
  },
  {
    id: 4,
    title: '雅思阅读538考点词真经',
    description: 'IELTS Reading 538 Key Point Words - Essential vocabulary for reading comprehension success',
    level: 'Intermediate to Advanced',
    duration: '4-5 weeks',
    exercises: 538
  },
  {
    id: 5,
    title: 'Advanced Pronunciation Techniques',
    description: 'Master English pronunciation with phonetic training, stress patterns, and intonation practice',
    level: 'All Levels',
    duration: '6-8 weeks',
    exercises: 120
  }
])

const setActiveCategory = (category) => {
  activeCategory.value = category
}

const setActiveSection = (section) => {
  activeSection.value = section
}

const selectModule = (module) => {
  console.log('Selected module:', module.title)
  // Handle module selection logic
}
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
  transition-property: color, background-color, border-color, transform, box-shadow;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
}
</style>