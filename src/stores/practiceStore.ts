// src/stores/practiceStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
export interface Word {
  id: number;
  text: string;
  note: string;
  voice: string;
  url: string;
  local_url: string;
  word_id: string;
  error_num: number;
  lesson_id: number;
  is_wrong: number;
  template: {
    cn: string;
    en: string;
  },
  memory: {
    cn: string;
    en: string;
  }[],
  image: string
}


export interface Lesson {
  id: string,
  name: string;
  url: string;
  word_count: number;
  error_count: number;
  extra: string;
  more: string;
  status?: number;
  list: Word[];
}

export const usePracticeStore = defineStore('practice', () => {
  // 学习模式
  const learningMode = ref('spelling') // 'spelling', 'recite', ...
  // 播放速度
  const currentSpeed = ref(1.0)
  // 是否开启对错反馈
  const feedbackEnabled = ref(true)


  // 更新模式
  const setLearningMode = (mode: string) => learningMode.value = mode
  // 更新速度
  const setCurrentSpeed = (speed: number) => currentSpeed.value = speed
  // 更新反馈
  const setFeedbackEnabled = (enabled: boolean) => feedbackEnabled.value = enabled


  const practiceData = ref<Lesson>()

  const setPracticeData = (data: Lesson) => {
    practiceData.value = data
  }
  return {
    learningMode,
    currentSpeed,
    feedbackEnabled,
    practiceData,
    setLearningMode,
    setCurrentSpeed,
    setFeedbackEnabled,
    setPracticeData
  }
})