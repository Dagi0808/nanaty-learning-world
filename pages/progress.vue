<template>
  <div>
    <div class="text-center mb-6">
      <h1 class="kid-title text-yellow-500">⭐ My Stars</h1>
    </div>

    <!-- Stars total -->
    <div class="kid-card bg-gradient-to-br from-yellow-400 to-amber-500 text-center mb-5">
      <div class="text-6xl mb-1">⭐</div>
      <div class="font-fredoka text-6xl text-white drop-shadow">{{ state.stars ?? 0 }}</div>
      <div class="font-nunito text-white text-lg">Total Stars</div>
    </div>

    <!-- Lesson progress -->
    <h2 class="font-fredoka text-2xl text-gray-600 mb-3">📚 Lessons</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
      <NuxtLink
        v-for="cat in categories" :key="cat.id"
        :to="`/learn/${cat.id}`"
        class="kid-card text-center"
        :class="state.completed?.[cat.id] ? 'bg-green-50 border-2 border-green-400' : 'bg-white border-2 border-gray-200'"
      >
        <div class="text-4xl mb-1">{{ cat.icon }}</div>
        <div class="font-fredoka text-lg text-gray-700">{{ cat.label }}</div>
        <div class="font-fredoka text-sm mt-1" :class="state.completed?.[cat.id] ? 'text-green-600' : 'text-gray-400'">
          {{ state.completed?.[cat.id] ? '✅ Done' : '▶ Start' }}
        </div>
      </NuxtLink>
    </div>

    <!-- Quiz scores -->
    <h2 class="font-fredoka text-2xl text-gray-600 mb-3">🏆 Quiz Scores</h2>
    <div class="space-y-3 mb-6">
      <div v-for="cat in quizCats" :key="cat.id" class="kid-card flex items-center gap-3">
        <span class="text-3xl">{{ cat.icon }}</span>
        <div class="flex-1">
          <div class="font-fredoka text-lg text-gray-700">{{ cat.label }}</div>
          <div class="w-full bg-gray-200 rounded-full h-3 mt-1">
            <div class="h-3 rounded-full transition-all duration-700"
              :class="scoreColor(state.scores?.[cat.id])"
              :style="{ width: `${state.scores?.[cat.id] ?? 0}%` }" />
          </div>
        </div>
        <span class="font-fredoka text-lg text-gray-600 min-w-[48px] text-right">
          {{ state.scores?.[cat.id] != null ? state.scores[cat.id] + '%' : '—' }}
        </span>
      </div>
    </div>

    <!-- Reset (parent area) -->
    <div class="text-center mt-8">
      <p class="font-nunito text-xs text-gray-400 mb-2">— For parents —</p>
      <button class="kid-btn bg-red-400 text-base" @click="confirm = true">🔄 Reset Progress</button>
    </div>

    <!-- Confirm modal -->
    <Transition name="pop">
      <div v-if="confirm" class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center" @click.self="confirm = false">
        <div class="bg-white rounded-4xl p-8 text-center shadow-2xl mx-4 max-w-sm w-full">
          <div class="text-5xl mb-3">⚠️</div>
          <p class="font-fredoka text-2xl text-gray-700 mb-4">Reset all progress?</p>
          <div class="flex gap-3 justify-center">
            <button class="kid-btn bg-red-500" @click="doReset">Yes, reset</button>
            <button class="kid-btn bg-gray-400" @click="confirm = false">Cancel</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { getAll, reset } = useProgress()
const state = ref(getAll())
const confirm = ref(false)

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

function scoreColor(s?: number) {
  if (!s) return 'bg-gray-300'
  return s >= 80 ? 'bg-green-500' : s >= 60 ? 'bg-yellow-400' : 'bg-orange-400'
}

function doReset() {
  reset()
  state.value = getAll()
  confirm.value = false
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
