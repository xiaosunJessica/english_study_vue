import { ref, computed, nextTick, type Ref, watch } from 'vue'
import { useAudio } from '@/hooks/useAudio'
import { useCountdown } from '@/hooks/useCountdown'
import { type Word, usePracticeStore } from '@/stores/practiceStore'
import { useAudioCache } from '@/hooks/useAudioCatch'

export function useWordPlayer({num, cb, spellingInputRef} :{
  num?: number,
  cb?: (params?: any) => void
  spellingInputRef?: Ref<any>
}) {
  const { batchLoadAudios, getAudioUrl } = useAudioCache()
  const practiceStore = usePracticeStore()
  const words = computed(() => practiceStore.practiceData?.list || [])
  const currentIndex = ref(0)
  const isPlaying = ref(false)
  const isStart = ref(false)
  const countdown = useCountdown(num || 5, () => nextWord())
  const audio = useAudio()
  const userInput = ref('')

  const currentWord = computed(() => words.value[currentIndex.value] || {})
  // 监听 currentIndex，预加载后面5条
  watch(currentIndex, (newIndex) => {
    if (newIndex % 5 === 1) {
      const urlsToPreload = words.value
        .slice(newIndex + 1, newIndex + 6)
        .map(word => word.url)
      batchLoadAudios(urlsToPreload)
    }
  })

  const prevWord = () => {
    isStart.value = true
    isPlaying.value = true
    if (currentIndex.value > 0) {
      currentIndex.value--
      userInput.value = ''
      nextTick(() => spellingInputRef?.value?.focus())
      countdown.reset()
      if (currentWord.value?.url) {
        const url = getAudioUrl(currentWord.value?.url)
        audio.play(url)
      }
      countdown.start()
    }
  }

  const nextWord = () => {
    isStart.value = true
    isPlaying.value = true
    // 先提交
    spellingInputRef?.value?.handleSubmit()
    let timeout = 0
    if (practiceStore.feedbackEnabled) {
      timeout = 500
    }

    setTimeout(()=> {
      if (currentIndex.value < words.value.length - 1) {
        currentIndex.value++
        userInput.value = ''
        nextTick(() => spellingInputRef?.value?.focus())
        countdown.reset()
        if (currentWord.value?.url) {
          const url = getAudioUrl(currentWord.value?.url)
          audio.play(url)
        }
        countdown.start()
      } else {
        isPlaying.value = false
        // 这里可以 emit 事件或回调
        if (typeof cb == 'function') {
          cb()
        }
      }
    }, timeout)

  }

  const togglePlay = () => {
    isStart.value = true
    isPlaying.value = !isPlaying.value
    spellingInputRef?.value?.focus()
    if (isPlaying.value) {
      countdown.reset()
      countdown.start()
      const url = getAudioUrl(currentWord.value?.url)
      audio.play(url)
    } else {
      countdown.stop()
      audio.pause()
    }
  }

  const handleRepeat = () => {
    isStart.value = true
    isPlaying.value = true
    countdown.reset()
    countdown.start()
    const url = getAudioUrl(currentWord.value?.url)
    audio.play(url)
  }

  const cleanup = () => {
    audio.cleanup && audio.cleanup()
    countdown.reset && countdown.reset()
  }

  return {
    isStart,
    currentIndex,
    isPlaying,
    countdown,
    audio,
    words,
    userInput,
    spellingInputRef,
    currentWord,
    prevWord,
    nextWord,
    togglePlay,
    handleRepeat,
    cleanup,
  }
}