<template>
  <div class="h-full bg-gray-50 flex flex-col">
    <slot name="header-extra"></slot>
    <Progress
      :current-index="currentIndex"
      :words="words"
      :is-start="isStart">
      <template #countdown>
        <Countdown :seconds="countdown.timeLeft?.value" :is-active="countdown.isActive?.value" />
      </template>
    </Progress>
    <SpellingInput
      ref="spellingInputRef"
      v-model="userInput"
      :current-word="currentWord"
      :is-start="isStart"
      :is-check="practiceStore.feedbackEnabled"
      @submit="handleSubmitAnswer"
      @toggle-play="togglePlay"
      />
    <btn-group
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
import { ref, onUnmounted, watch } from 'vue'
import { type Word } from '@/stores/vocabulary'
import Countdown from './components/Countdown.vue'
import SpellingInput from './components/SpellingInput.vue'
import Progress from './components/Progress.vue'
import BtnGroup from './components/BtnGroup.vue'
import { useWordPlayer } from '@/hooks/useWordPlayer'
import { setErrorWord } from '@/api/corpus'
import { useRouter, useRoute } from 'vue-router'
import {parseQueryNumber} from '@/utils/util'
import { usePracticeStore } from '@/stores/practiceStore'
const practiceStore = usePracticeStore()
// props属性

const spellingInputRef = ref()

const route = useRoute()
const { bookId, unitId, lessonId, } = route?.query || {}
const router = useRouter()

// 是否开始，因为浏览器不允许自动播放，需要点击才执行
const callback = async () => {
  await setErrorWord({
      lesson_id: parseQueryNumber(lessonId),
      unit_id: parseQueryNumber(unitId),
      errorWords: Object.fromEntries(vocabularyErrorMap.value.entries())
    })
    // Practice completed
    router.push(`/corpus/wordlist?bookId=${bookId}&unitId=${unitId}&lessonId=${lessonId}`)
}
const {
  currentIndex,
  isStart,
  isPlaying,
  countdown,
  words,
  audio,
  userInput,
  currentWord,
  prevWord,
  nextWord,
  togglePlay,
  handleRepeat,
  cleanup,
} = useWordPlayer({
  cb: callback,
  spellingInputRef,
})

// 记录错误结果
const vocabularyErrorMap = ref(new Map<string, string>())


// handle submit answer
const handleSubmitAnswer = (answer: Partial<Word & {inputValue: string}>) => {
  console.log(vocabularyErrorMap, 'vocabularyErrorMap', answer)
  // 如果校验正确，且之前错误，清除
  if (answer.inputValue == answer.text && answer.id && vocabularyErrorMap.value.get(`${answer.id}`)) {
    vocabularyErrorMap.value.delete(`${answer.id}`)
  }

  // 如果错误，不管以前是否存在，直接替换
  if (answer.inputValue != answer.text && answer.id) {
    vocabularyErrorMap.value.set(`${answer.id}`, answer.inputValue || '')
  }
}

watch(() => practiceStore.currentSpeed, () => {
  audio.changePlaybackRate(practiceStore.currentSpeed)
})

onUnmounted(() => {
  cleanup?.()
})


</script>

<style scoped>

</style>