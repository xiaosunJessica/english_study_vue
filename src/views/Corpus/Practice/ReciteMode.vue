<template>
  <div class="h-full bg-gray-50 flex flex-col">
    <slot name="header-extra"></slot>
    <Progress
      :current-index="currentIndex"
      :words="words"
      :is-start="true">
      <template #countdown>
        <Countdown :seconds="countdown.timeLeft?.value" :is-active="countdown.isActive?.value" />
      </template>
      <template #content>
        <div class="mt-6">
          <h1 class="text-red-600">
            <span class="text-6xl font-bold">{{currentWord.text}}</span>
            <button class="ml-2 text-red-500 text-4xl">🔊</button>
          </h1>
          <p class="text-gray-600 mt-1 text-md">{{currentWord.voice}}</p>
          <p class="text-black mt-2 text-xl my-4">{{currentWord.note}}</p>
        </div>
      </template>
    </Progress>

    <div class="flex-1">
      <div class="bg-gray-100 p-4 rounded-md my-8 py-4 text-md" v-if="currentWord.template?.cn">
        <p class="my-2" v-html="highlightedEn"></p>
        <p class="my-2">{{currentWord.template?.cn}}</p>
      </div>
      <div class="flex" v-show="currentWord.memory?.length">
        <span class="bg-pink-100 text-black px-3 font-bold text-sm">记</span>
        <div>
          <p class="text-gray-500 text-sm mt-1" v-for="item in currentWord.memory" :key="item.cn">{{item?.en}}{{item?.cn}}</p>
        </div>
      </div>
      <img v-show="currentWord.image" :src="currentWord.image" alt="word image" class="object-contain mx-auto my-6" />
    </div>
    <BtnGroup
      :current-index="currentIndex"
      :words="words"
      :is-playing="isPlaying"
      @prev="prevWord"
      @toggle-play="togglePlay"
      @next="nextWord"
      @repeat="handleRepeat"/>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import BtnGroup from './components/BtnGroup.vue'
import { useWordPlayer } from '@/hooks/useWordPlayer'
import Countdown from './components/Countdown.vue'
import { onUnmounted } from 'vue'
import { usePracticeStore } from '@/stores/practiceStore'
import Progress from './components/Progress.vue'
const practiceStore = usePracticeStore()
const {
  currentIndex,
  isPlaying,
  words,
  audio,
  countdown,
  currentWord,
  prevWord,
  nextWord,
  togglePlay,
  handleRepeat,
  cleanup,
} = useWordPlayer({})

const highlightedEn = computed(() => {
  const en = currentWord.value.template?.en || ''
  const text = currentWord.value?.text || ''

  if (!text) return en

  // 替换目标单词为带红色 span 的版本（区分大小写）
  const regex = new RegExp(`(${text})`, 'gi') // 不区分大小写
  return en.replace(regex, '<span class="text-red-500 font-bold">$1</span>')
})

watch(() => practiceStore.currentSpeed, () => {
  audio.changePlaybackRate(practiceStore.currentSpeed)
})

onUnmounted(() => {
  cleanup?.()
})
</script>
