<template>
  <div class="relative z-10">
    <div class="text-center mb-8">
      <h1 class="kid-title bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
        📚 What to Learn?
      </h1>
      <p class="kid-text text-gray-600 mt-1">Pick something fun!</p>
    </div>

    <div class="grid grid-cols-2 gap-4 max-w-md mx-auto">
      <NuxtLink
        v-for="cat in categories"
        :key="cat.id"
        :to="`/learn/${cat.id}`"
        class="kid-card text-center group"
        :style="`background: ${cat.gradient}`"
        @click="speak(cat.label)"
      >
        <div class="text-5xl mb-2 group-hover:animate-bounce_custom transition-transform">
          {{ cat.icon }}
        </div>
        <div class="font-fredoka text-2xl text-white drop-shadow mb-1">{{ cat.label }}</div>
        <div v-if="isCompleted(cat.id)"
          class="inline-block bg-white/30 text-white text-sm font-bold px-3 py-1 rounded-full mt-1">
          ✅ Done!
        </div>
        <div v-else class="inline-block bg-white/20 text-white text-xs px-3 py-1 rounded-full mt-1">
          Tap to start!
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { speak } = useAudio()
const { isCompleted } = useProgress()

const categories = [
  {
    id: 'letters', icon: '🅰', label: 'Letters',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 'numbers', icon: '🔢', label: 'Numbers',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 'colors', icon: '🎨', label: 'Colors',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    id: 'animals', icon: '🐶', label: 'Animals',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
  {
    id: 'fruits', icon: '🍎', label: 'Fruits',
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  },
  {
    id: 'shapes', icon: '⭐', label: 'Shapes',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  },
]
</script>
