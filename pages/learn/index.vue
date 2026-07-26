<template>
  <div>
    <div class="text-center mb-6">
      <h1 class="kid-title text-blue-600">📚 What to Learn?</h1>
      <p class="kid-text text-gray-400">Pick a category!</p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <NuxtLink
        v-for="cat in categories"
        :key="cat.id"
        :to="`/learn/${cat.id}`"
        class="kid-card text-center"
        :class="cat.color"
        @click="speak(cat.label)"
      >
        <div class="text-5xl mb-2">{{ cat.icon }}</div>
        <div class="font-fredoka text-2xl text-white drop-shadow">{{ cat.label }}</div>
        <div v-if="isCompleted(cat.id)" class="mt-1 text-lg">✅</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { speak } = useAudio()
const { isCompleted } = useProgress()

const categories = [
  { id: 'letters', icon: '🅰', label: 'Letters', color: 'bg-gradient-to-br from-red-400 to-pink-500' },
  { id: 'numbers', icon: '🔢', label: 'Numbers', color: 'bg-gradient-to-br from-blue-400 to-cyan-500' },
  { id: 'colors', icon: '🎨', label: 'Colors', color: 'bg-gradient-to-br from-yellow-400 to-orange-500' },
  { id: 'animals', icon: '🐶', label: 'Animals', color: 'bg-gradient-to-br from-green-400 to-teal-500' },
  { id: 'fruits', icon: '🍎', label: 'Fruits', color: 'bg-gradient-to-br from-orange-400 to-red-500' },
  { id: 'shapes', icon: '⭐', label: 'Shapes', color: 'bg-gradient-to-br from-purple-400 to-indigo-500' },
]
</script>
