<template>
  <header class="sticky top-0 z-40 shadow-lg"
    style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)">
    <div class="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 hover:scale-105 transition-transform">
        <span class="text-3xl animate-float">🐼</span>
        <span class="font-fredoka text-xl text-white drop-shadow">Nanaty's World</span>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-2">
        <NuxtLink v-for="item in nav" :key="item.to" :to="item.to"
          class="font-fredoka text-lg px-4 py-2 rounded-full transition-all text-white/80 hover:text-white hover:bg-white/20"
          :class="isActive(item.to) ? 'bg-white/30 text-white' : ''">
          {{ item.icon }} {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Stars badge -->
      <div class="star-badge animate-pulse_glow">
        ⭐ {{ stars }}
      </div>
    </div>

    <!-- Mobile bottom nav -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 z-40 shadow-2xl"
      style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)">
      <div class="flex justify-around py-2 px-2">
        <button v-for="item in nav" :key="item.to"
          class="flex flex-col items-center gap-0.5 px-4 py-2 rounded-2xl transition-all min-w-[60px]"
          :class="isActive(item.to)
            ? 'bg-white/30 scale-110'
            : 'text-white/70 hover:text-white hover:bg-white/20'"
          @click="navigate(item.to)">
          <span class="text-2xl">{{ item.icon }}</span>
          <span class="text-xs font-bold text-white">{{ item.label }}</span>
        </button>
      </div>
    </nav>
    <div class="h-16 md:hidden" />
  </header>
</template>

<script setup lang="ts">
const { getStars } = useProgress()
const router = useRouter()
const route = useRoute()
const stars = ref(0)

const nav = [
  { to: '/', icon: '🏠', label: 'Home' },
  { to: '/learn', icon: '📚', label: 'Learn' },
  { to: '/practice', icon: '🎮', label: 'Play' },
  { to: '/progress', icon: '⭐', label: 'Stars' },
]

// Always navigate — even if already on a sub-route (e.g. /learn/animals → /learn)
function navigate(to: string) {
  router.push(to)
}

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}

onMounted(() => {
  stars.value = getStars()
  window.addEventListener('progress-updated', () => { stars.value = getStars() })
})
</script>
