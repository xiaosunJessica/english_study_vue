<template>
  <div class="h-screen bg-gray-50 flex flex-col">
    <!-- BBC Style Header -->
    <header class="bg-black text-white">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center">
        <router-link class="flex items-center space-x-2" to="/">
          <div
            class="bg-white text-black px-3 py-1 font-bold text-xl"
            v-for="text in texts"
            :key="text"
          >
            {{ text }}
          </div>
        </router-link>
      </div>
    </header>
    <main class="flex-1 overflow-y-auto w-full max-w-7xl mx-auto px-4">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
// Main app component
const texts = ["I", "E", "L", "T", "S"]
</script>

<style scoped></style>
