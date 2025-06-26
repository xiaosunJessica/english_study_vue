<template>
  <SpellingModel v-if="practiceStore.learningMode == 'spelling'">
    <template #header-extra>
      <select-config />
    </template>
  </SpellingModel>
  <ReciteMode v-if="practiceStore.learningMode == 'recite'">
    <template #header-extra>
      <select-config />
    </template>
  </ReciteMode>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { getCorpusItem } from "@/api/corpus"
import ReciteMode from "./ReciteMode.vue"
import SpellingModel from "./SpellingMode.vue"
import { useRoute } from "vue-router"
import { parseQueryNumber } from "@/utils/util"
import SelectConfig from "./components/SelectConfig.vue"

import { usePracticeStore } from "@/stores/practiceStore"

const practiceStore = usePracticeStore()

const route = useRoute()

// 获取url参数
const { bookId, unitId, lessonId } = route?.query || {}

// 获取数据
onMounted(async () => {
  // get data
  const res = await getCorpusItem({
    book_id: parseQueryNumber(bookId),
    unit_id: parseQueryNumber(unitId),
    lesson_id: parseQueryNumber(lessonId),
  })
  console.log(res.data, "0000")
  await practiceStore.setPracticeData(res.data)
})
</script>
<style lang="scss" scoped></style>
