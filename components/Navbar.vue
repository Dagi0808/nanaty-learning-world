<template>
  <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm">
    <div class="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
      <NuxtLink to="/" class="font-fredoka text-2xl text-purple-600 hover:scale-105 transition-transform">
        🐼 Nanaty
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-3">
        <NuxtLink v-for="item in nav" :key="item.to" :to="item.to"
          class="font-fredoka text-lg px-4 py-2 rounded-full transition-all"
          :class="$route.path.startsWith(item.to) && item.to !== '/'
            ? 'bg-purple-100 text-purple-700'
            : 'text-gray-600 hover:bg-gray-100'">
          {{ item.icon }} {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Stars badge -->
      <div class="flex items-center gap-1 bg-yellow-100 rounded-full px-3 py-1 shadow-sm">
        <span class="text-xl">⭐</span>
        <span class="font-fredoka text-lg text-yellow-600">{{ stars }}</span>
      </div>
    </div>

    <!-- Mobile bottom nav -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-100 shadow-lg z-40">
      <div class="flex justify-around py-2">
        <NuxtLink v-for="item in nav" :key="item.to" :to="item.to"
          class="flex flex-col items-center gap-0.5 px-3 py-1 rounded-2xl transition-all"
          :class="$route.path === item.to || ($route.path.startsWith(item.to) && item.to !== '/')
            ? 'text-purple-700 bg-purple-50'
            : 'text-gray-500'">
          <span class="text-2xl">{{ item.icon }}</span>
          <span class="text-xs font-bold">{{ item.label }}</span>
        </NuxtLink>
      </div>
    </nav>
    <div class="h-16 md:hidden" />
  </header>
</template>

<script setup lang="ts">
const { getStars } = useProgress()
const stars = ref(0)

const nav = [
  { to: '/', icon: '🏠', label: 'Home' },
  { to: '/learn', icon: '📚', label: 'Learn' },
  { to: '/practice', icon: '🎮', label: 'Play' },
  { to: '/progress', icon: '⭐', label: 'Stars' },
]

onMounted(() => {
  stars.value = getStars()
  window.addEventListener('progress-updated', () => { stars.value = getStars() })
})
</script>
