<template>
  <div class="relative z-10">
    <div class="text-center mb-6">
      <h1 class="kid-title bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
        ⭐ My Stars
      </h1>
    </div>

    <!-- Stars total — big hero card -->
    <div class="kid-card text-center mb-6 mx-auto max-w-xs"
      style="background: linear-gradient(135deg, #f6d365 0%, #fda085 100%)">
      <div class="text-7xl mb-1 animate-bounce_custom">⭐</div>
      <div class="font-fredoka text-7xl text-white drop-shadow">{{ state.stars ?? 0 }}</div>
      <div class="font-nunito text-white/90 text-xl font-bold">Total Stars</div>
      <div v-if="state.stars >= 10" class="mt-2 font-fredoka text-white text-lg">
        🏆 You are a star champion!
      </div>
    </div>

    <!-- Lesson progress -->
    <h2 class="font-fredoka text-2xl text-gray-700 mb-3 text-center">📚 Lessons</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
      <NuxtLink
        v-for="cat in categories" :key="cat.id"
        :to="`/learn/${cat.id}`"
        class="kid-card text-center transition-all"
        :style="state.completed?.[cat.id]
          ? `background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)`
          : 'background: white'"
      >
        <div class="text-4xl mb-1">{{ cat.icon }}</div>
        <div class="font-fredoka text-lg" :class="state.completed?.[cat.id] ? 'text-white' : 'text-gray-700'">
          {{ cat.label }}
        </div>
        <div class="font-fredoka text-sm mt-1"
          :class="state.completed?.[cat.id] ? 'text-white' : 'text-gray-400'">
          {{ state.completed?.[cat.id] ? '✅ Done!' : '▶ Start' }}
        </div>
      </NuxtLink>
    </div>

    <!-- Quiz scores -->
    <h2 class="font-fredoka text-2xl text-gray-700 mb-3 text-center">🏆 Quiz Scores</h2>
    <div class="space-y-3 mb-8 max-w-sm mx-auto">
      <div v-for="cat in quizCats" :key="cat.id"
        class="kid-card flex items-center gap-3 py-3">
        <span class="text-3xl">{{ cat.icon }}</span>
        <div class="flex-1">
          <div class="font-fredoka text-lg text-gray-700">{{ cat.label }}</div>
          <div class="w-full bg-gray-100 rounded-full h-4 mt-1 overflow-hidden">
            <div class="h-4 rounded-full transition-all duration-700"
              :style="{
                width: `${state.scores?.[cat.id] ?? 0}%`,
                background: scoreGradient(state.scores?.[cat.id])
              }" />
          </div>
        </div>
        <span class="font-fredoka text-xl text-gray-600 min-w-[50px] text-right">
          {{ state.scores?.[cat.id] != null ? state.scores[cat.id] + '%' : '—' }}
        </span>
      </div>
    </div>

    <!-- Reset -->
    <div class="text-center mt-4">
      <p class="font-nunito text-xs text-gray-400 mb-2">— For parents —</p>
      <button class="kid-btn text-base"
        style="background: linear-gradient(135deg, #ff6b6b, #ee0979)"
        @click="confirmReset = true">
        🔄 Reset Progress
      </button>
    </div>

    <!-- Confirm modal -->
    <Transition name="pop">
      <div v-if="confirmReset"
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
        @click.self="confirmReset = false">
        <div class="bg-white rounded-5xl p-8 text-center shadow-2xl mx-4 max-w-sm w-full animate-popIn border-4 border-red-200">
          <div class="text-6xl mb-3">⚠️</div>
          <p class="font-fredoka text-2xl text-gray-700 mb-5">Reset all progress?</p>
          <div class="flex gap-3 justify-center">
            <button class="kid-btn" style="background:linear-gradient(135deg,#ff6b6b,#ee0979)" @click="doReset">
              Yes, reset
            </button>
            <button class="kid-btn bg-gray-400" @click="confirmReset = false">Cancel</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { getAll, reset } = useProgress()
const state = ref(getAll())
const confirmReset = ref(false)

const categories = [
  { id: 'letters', icon: '🅰', label: 'Letters' },
  { id: 'numbers', icon: '🔢', label: 'Numbers' },
  { id: 'colors', icon: '🎨', label: 'Colors' },
  { id: 'animals', icon: '🐶', label: 'Animals' },
  { id: 'fruits', icon: '🍎', label: 'Fruits' },
  { id: 'shapes', icon: '⭐', label: 'Shapes' },
]

const quizCats = [
  { id: 'animals', icon: '🐶', label: 'Animals Quiz' },
  { id: 'fruits', icon: '🍎', label: 'Fruits Quiz' },
  { id: 'colors', icon: '🎨', label: 'Colors Quiz' },
  { id: 'abc', icon: '🅰', label: 'ABC Quiz' },
]

function scoreGradient(s?: number) {
  if (!s) return '#e5e7eb'
  if (s >= 80) return 'linear-gradient(90deg, #43e97b, #38f9d7)'
  if (s >= 60) return 'linear-gradient(90deg, #f6d365, #fda085)'
  return 'linear-gradient(90deg, #f093fb, #f5576c)'
}

function doReset() {
  reset()
  state.value = getAll()
  confirmReset.value = false
}

onMounted(() => {
  state.value = getAll()
  window.addEventListener('progress-updated', () => { state.value = getAll() })
})
</script>

<style scoped>
.pop-enter-active,.pop-leave-active{transition:all .3s}
.pop-enter-from,.pop-leave-to{opacity:0;transform:scale(.9)}
</style>
