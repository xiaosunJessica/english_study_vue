<template>
  <div class="h-full py-5 flex flex-col mx-auto">
    <div class="text-3xl font-bold text-gray-900 mb-2">
      {{ wordData?.name }}
    </div>
    <div class="flex gap-2 mb-6">
      <button
        class="px-6 py-3 rounded-full text-base backdrop-blur-sm transition-all cursor-pointer"
        :class="
          activeTab === 'all'
            ? 'bg-gradient-to-r from-pink-400 to-red-400 text-white font-bold'
            : 'bg-white/70 hover:bg-white/90'
        "
        @click="activeTab = 'all'"
      >
        全部({{ wordData?.word_count }})
      </button>
      <button
        class="px-6 py-3 rounded-full text-base backdrop-blur-sm transition-all cursor-pointer"
        :class="
          activeTab === 'wrong'
            ? 'bg-gradient-to-r from-pink-400 to-red-400 text-white font-bold'
            : 'bg-white/70 hover:bg-white/90'
        "
        @click="activeTab = 'wrong'"
      >
        近期错词({{ wordData?.error_count }})
      </button>
    </div>

    <div
      class="flex-1 bg-white/90 rounded-xl p-6 mb-6 backdrop-blur-sm overflow-y-auto"
    >
      <div
        v-for="(word, index) in displayWords.value"
        :key="word.id"
        class="flex items-center gap-4 py-4 border-b border-black/5 last:border-b-0 cursor-pointer"
        @click="onPlay(word.url)"
      >
        <div class="text-lg font-bold text-gray-600 min-w-[30px]">
          {{ index + 1 }}.
        </div>
        <div class="flex-1">
          <div class="text-xl font-bold text-gray-800 mb-1">
            <span>{{ word.text }}</span>
            <span class="ml-1 text-gray-400 text-xs">/{{ word.voice }}/</span>
          </div>
          <div class="text-base text-gray-600">{{ word.note }}</div>
        </div>
        <div
          v-if="word.is_wrong"
          class="bg-red-400 text-white rounded-full px-3 py-1 text-xs font-bold"
        >
          错过{{ word.error_num }}次
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">学习统计</h3>
      <div class="space-y-4 mb-8">
        <div
          class="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
        >
          <span class="text-gray-600">总单词数</span>
          <span class="font-semibold text-gray-800">{{
            wordData?.word_count
          }}</span>
        </div>
        <div class="flex justify-between items-center p-4 bg-red-50 rounded-lg">
          <span class="text-gray-600">错词数</span>
          <span class="font-semibold text-red-600">{{
            wordData?.error_count
          }}</span>
        </div>
        <div
          v-show="wordData?.status == 1"
          class="flex justify-between items-center p-4 bg-green-50 rounded-lg"
        >
          <span class="text-gray-600">掌握率</span>
          <span class="font-semibold text-green-600">
            {{
              Math.round(
                ((Number(wordData?.word_count || 0) -
                  Number(wordData?.error_count || 0)) /
                  Number(wordData?.word_count)) *
                  100
              )
            }}%
          </span>
        </div>
      </div>

      <div class="space-y-3">
        <button
          class="w-full bg-pink-500 text-white px-6 py-4 rounded-xl font-medium shadow-md hover:bg-pink-600 transition-colors transform hover:scale-105 cursor-pointer"
          @click="startStudy"
        >
          开始学习
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import { getCorpusItem } from "../../api/corpus"
import { useAudio } from "../../hooks/useAudio"
import { parseQueryNumber } from "@/utils/util"
import { type Word, type TestPaper } from "@/stores/vocabulary"

const router = useRouter()
const route = useRoute()
const { bookId, unitId, lessonId } = route?.query || {}

const activeTab = ref<"all" | "wrong">("all")

const audio = useAudio()
const wordData = ref<TestPaper>()
const allWords = ref<Word[]>([])
const wrongWords = ref<Word[]>([])

// const allWords = computed(() => vocabularyStore.testPaper?.list || [])
// const wrongWords = computed(() => allWords.value.filter(word => word.is_wrong == 2))

const displayWords = computed(() => {
  console.log(activeTab.value, "activeTab.valueactiveTab.value")
  return activeTab.value === "all" ? allWords : wrongWords
})

const startStudy = () => {
  // router.push(`/corpus/study?bookId=${bookId}&unitId=${unitId}&lessonId=${lessonId}&tabId=${activeTab.value}`)
  router.push(
    `/corpus/practice?bookId=${bookId}&unitId=${unitId}&lessonId=${lessonId}&tabId=${activeTab.value}`
  )
}

const onPlay = (url: string) => {
  audio.play(url)
}

onMounted(async () => {
  const res = await getCorpusItem({
    book_id: parseQueryNumber(bookId),
    unit_id: parseQueryNumber(unitId),
    lesson_id: parseQueryNumber(lessonId),
  })
  wordData.value = res?.data
  allWords.value = res.data?.list
  wrongWords.value = res?.data?.list.filter(
    (word: { is_wrong: number }) => word.is_wrong == 2
  )
})
</script>
