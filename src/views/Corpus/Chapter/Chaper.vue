<template>
  <div class="h-full py-5 flex flex-col">
    <header>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ title }}</h1>
      <p class="text-gray-600 mb-8">选择章节开始学习</p>
    </header>
    <!-- Chapters Section -->
    <section class="flex-1 w-full overflow-y-auto">
      <chapter-item :chapters="chapters" @test-paper-click="goToWordList" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import { type Word } from "@/stores/vocabulary"
import { getCorpusList } from "@/api/corpus"
import ChapterItem from "./ChapterItem.vue"
const route = useRoute()
const bookId = Number(route?.query?.bookId || 0)
const regex = /^(Chapter\s*\d+)\s*(.*)$/

const router = useRouter()

// const { chapters, setChapters } = vocabularyStore
const chapters = ref<Word[]>([])
const title = ref("")

const goToWordList = (unitId: string, lessonId: string) => {
  router.push(
    `/corpus/wordlist?bookId=${bookId}&unitId=${unitId}&lessonId=${lessonId}`
  )
}

onMounted(async () => {
  try {
    const res = await getCorpusList({
      book_id: bookId,
    })
    chapters.value = res.data?.list?.map((item: any) => ({
      ...item,
      subtitle: item.intro,
      testPapers: item.list.map((paper: any) => ({
        ...paper,
        title: paper.name.match(regex)?.[1] || "",
        accuracy: paper.accuracy,
        words: paper.words,
      })),
    }))
    title.value = res?.data?.title
  } catch (error) {
    console.error("Failed to fetch corpus list:", error)
  }
})
</script>
