<template>
  <div class="bg-gray-50 p-4">
    <div class="w-full mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">发音能力图</h1>
        <span class="text-orange-500 text-sm">最后更新时间：2024-06-14</span>
      </div>

      <!-- Current Level Card -->
      <div class="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-gray-500 text-sm mb-1">当前等级</p>
            <h2 class="text-2xl font-bold text-gray-800">母语水平</h2>
            <div class="w-16 h-1 bg-gray-300 rounded mt-2"></div>
          </div>
          <div class="text-right">
            <div class="flex items-center mb-2">
              <div class="w-4 h-4 bg-blue-500 rounded mr-2"></div>
              <span class="text-sm text-gray-600">我的能力构成</span>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-4 bg-gray-300 rounded mr-2"></div>
              <span class="text-sm text-gray-400">升级所需能力构成</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="bg-white rounded-lg p-8 shadow-sm">
        <!-- Detail View -->
        <div v-if="selectedCategory" class="mb-8">
          <div class="flex justify-between items-center mb-8">
            <button
              @click="selectedCategory = null"
              class="text-blue-500 hover:text-blue-700 flex items-center text-sm transition-colors duration-200"
            >
              ← 返回总览
            </button>
            <div class="text-right">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">
                知识点掌握程度说明
              </h3>
              <div class="flex gap-3">
                <span
                  class="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-sm"
                  >未掌握</span
                >
                <span
                  class="px-3 py-1 bg-teal-200 text-teal-700 rounded-full text-sm"
                  >部分掌握</span
                >
                <span
                  class="px-3 py-1 bg-teal-400 text-white rounded-full text-sm"
                  >完全掌握</span
                >
              </div>
            </div>
          </div>

          <!-- Detailed Breakdown for Phonetics -->
          <div v-if="selectedCategory.key === 'phonetics'" class="mb-8">
            <div class="flex justify-center items-center">
              <div class="grid grid-cols-3 gap-8 items-center w-full max-w-4xl">
                <div class="space-y-4">
                  <div
                    class="bg-teal-300 text-white px-4 py-3 rounded-full text-center font-medium"
                  >
                    🔊 /e/
                  </div>
                  <div
                    class="bg-teal-300 text-white px-4 py-3 rounded-full text-center font-medium"
                  >
                    🔊 /æ/
                  </div>
                  <div
                    class="bg-teal-300 text-white px-4 py-3 rounded-full text-center font-medium"
                  >
                    🔊 /ər/
                  </div>
                  <div class="text-center mt-4">
                    <p class="text-gray-600 font-medium">元音音准</p>
                  </div>
                </div>
                <div class="flex flex-col items-center">
                  <div class="w-2 h-32 bg-teal-400 rounded"></div>
                  <div class="flex gap-2 my-2">
                    <div class="w-6 h-6 bg-teal-400 rounded-full"></div>
                    <div class="w-6 h-6 bg-teal-400 rounded-full"></div>
                  </div>
                  <div class="w-2 h-32 bg-teal-400 rounded"></div>
                </div>
                <div class="space-y-4">
                  <div
                    class="bg-teal-300 text-white px-4 py-3 rounded-full text-center font-medium"
                  >
                    🔊 /f/ ↗ 3
                  </div>
                  <div
                    class="bg-teal-300 text-white px-4 py-3 rounded-full text-center font-medium"
                  >
                    🔊 /w/ ↗ 8
                  </div>
                  <div
                    class="bg-teal-300 text-white px-4 py-3 rounded-full text-center font-medium"
                  >
                    🔊 /n/ ↗ 8
                  </div>
                  <div class="text-center mt-4">
                    <p class="text-gray-600 font-medium">辅音音准</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center mb-6">
            <div class="flex items-center justify-center mb-2">
              <div
                class="w-4 h-4 rounded mr-2"
                :style="{ backgroundColor: selectedCategory.color }"
              ></div>
              <h3 class="text-xl font-bold text-gray-800">
                {{ selectedCategory.name }}
              </h3>
            </div>
            <p class="text-gray-500">
              掌握度
              <span class="text-3xl font-bold text-blue-600">{{
                selectedCategory.score
              }}</span>
            </p>
          </div>
        </div>

        <!-- Radar Chart -->
        <div v-else class="flex justify-center">
          <div class="relative flex justify-center items-center">
            <!-- 扩大容器以容纳所有标签 -->
            <div
              class="relative"
              :style="{
                width: containerSize + 'px',
                height: containerSize + 'px',
              }"
            >
              <canvas
                ref="radarCanvas"
                :width="chartSize * 2"
                :height="chartSize * 2"
                :class="[
                  'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
                  'transition-transform duration-[600ms] ease-[cubic-bezier(0.42,0,0.58,1)]',
                  isAnimated ? 'rotate-[360deg]' : 'rotate-0',
                ]"
                :style="{
                  width: chartSize + 'px',
                  height: chartSize + 'px',
                }"
              />

              <!-- Skill Labels -->
              <div
                v-for="(skill, index) in skillData"
                :key="skill.key"
                class="absolute cursor-pointer transition-transform duration-200 hover:scale-105"
                :style="getLabelPosition(index)"
                @click="selectCategory(skill)"
              >
                <div
                  class="flex items-center bg-white px-3 py-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 mb-1 text-sm font-medium text-gray-700 border-l-4 whitespace-nowrap"
                  :style="{ borderColor: skill.color }"
                >
                  <div
                    class="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                    :style="{ backgroundColor: skill.color }"
                  ></div>
                  <span class="flex-shrink-0">{{ skill.name }}</span>
                  <span class="ml-2 text-gray-400 flex-shrink-0">→</span>
                </div>
                <div class="text-center">
                  <span class="block text-xs text-gray-500 mb-1">掌握度</span>
                  <div class="text-base font-bold text-gray-900">
                    {{ skill.score }}
                  </div>
                </div>
              </div>

              <!-- Center label -->
              <div
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded text-sm text-gray-400 font-medium z-10"
              >
                100
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed } from "vue"

const props = defineProps({
  data: {
    type: Array,
    default: () => [
      {
        key: "syllableStress",
        name: "音节与重音",
        score: 85,
        color: "#EEC952",
      },
      { key: "intonation", name: "语调", score: 100, color: "#6AC3EA" },
      { key: "phonetics", name: "音准", score: 87, color: "#42AEA6" },
      { key: "linking", name: "连读", score: 81, color: "#FFAC60" },
      { key: "rhythm", name: "节奏", score: 75, color: "#E958A3" },
    ],
  },
  size: {
    type: Number,
    default: 280,
  },
})

const radarCanvas = ref(null)
const selectedCategory = ref(null)
const isAnimated = ref(false)

const skillData = ref(props.data)
const chartSize = computed(() => props.size)
// 容器大小需要比图表大，为标签留出空间
const containerSize = computed(() => chartSize.value + 200)

// 绘制雷达图
const drawRadarChart = () => {
  if (!radarCanvas.value) return

  const canvas = radarCanvas.value
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const radius = Math.min(centerX, centerY) - 60

  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 绘制背景网格
  drawGrid(ctx, centerX, centerY, radius)

  // 绘制数据区域
  drawDataArea(ctx, centerX, centerY, radius)

  // 绘制数据点
  drawDataPoints(ctx, centerX, centerY, radius)
}

// 绘制网格
const drawGrid = (ctx, centerX, centerY, radius) => {
  const levels = 5
  const angleStep = (Math.PI * 2) / skillData.value.length

  // 绘制同心圆
  ctx.strokeStyle = "#e5e7eb"
  ctx.lineWidth = 1

  for (let i = 1; i <= levels; i++) {
    ctx.beginPath()
    ctx.arc(centerX, centerY, (radius / levels) * i, 0, Math.PI * 2)
    ctx.stroke()
  }

  // 绘制射线
  for (let i = 0; i < skillData.value.length; i++) {
    const angle = angleStep * i - Math.PI / 2
    const x = centerX + Math.cos(angle) * radius
    const y = centerY + Math.sin(angle) * radius

    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}

// 绘制数据区域
const drawDataArea = (ctx, centerX, centerY, radius) => {
  const angleStep = (Math.PI * 2) / skillData.value.length

  ctx.beginPath()

  skillData.value.forEach((skill, index) => {
    const angle = angleStep * index - Math.PI / 2
    const value = skill.score / 100
    const x = centerX + Math.cos(angle) * radius * value
    const y = centerY + Math.sin(angle) * radius * value

    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })

  ctx.closePath()
  ctx.fillStyle = "rgba(99, 102, 241, 0.3)"
  ctx.fill()
  ctx.strokeStyle = "rgba(99, 102, 241, 0.8)"
  ctx.lineWidth = 2
  ctx.stroke()
}

// 绘制数据点
const drawDataPoints = (ctx, centerX, centerY, radius) => {
  const angleStep = (Math.PI * 2) / skillData.value.length

  skillData.value.forEach((skill, index) => {
    const angle = angleStep * index - Math.PI / 2
    const value = skill.score / 100
    const x = centerX + Math.cos(angle) * radius * value
    const y = centerY + Math.sin(angle) * radius * value

    ctx.beginPath()
    ctx.arc(x, y, 4, 0, Math.PI * 2)
    ctx.fillStyle = "#6366f1"
    ctx.fill()
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 2
    ctx.stroke()
  })
}

// 修复标签位置计算
const getLabelPosition = (index) => {
  const angleStep = (Math.PI * 2) / skillData.value.length
  const angle = angleStep * index - Math.PI / 2
  // 减少距离，确保标签在容器内
  const distance = chartSize.value / 2 + 80

  const x = Math.cos(angle) * distance
  const y = Math.sin(angle) * distance

  // 调整定位，确保标签完全在容器内
  const labelWidth = 120 // 估算标签宽度
  const labelHeight = 60 // 估算标签高度

  let left = containerSize.value / 2 + x - labelWidth / 2
  let top = containerSize.value / 2 + y - labelHeight / 2

  // 边界检查，确保不超出容器
  left = Math.max(10, Math.min(left, containerSize.value - labelWidth - 10))
  top = Math.max(10, Math.min(top, containerSize.value - labelHeight - 10))

  return {
    left: `${left}px`,
    top: `${top}px`,
  }
}

// 选择类别
const selectCategory = (category) => {
  selectedCategory.value = category
}

// 监听数据变化
watch(
  () => props.data,
  (newData) => {
    skillData.value = newData
    nextTick(() => {
      drawRadarChart()
    })
  },
  { deep: true }
)

watch(
  () => props.size,
  () => {
    nextTick(() => {
      drawRadarChart()
    })
  }
)

// 组件挂载后绘制图表
onMounted(() => {
  nextTick(() => {
    drawRadarChart()

    // 添加旋转动画
    setTimeout(() => {
      isAnimated.value = true
    }, 500)
  })
})
</script>

<style scoped>
/* 确保标签不会被截断 */
.skill-label {
  z-index: 10;
}
</style>
