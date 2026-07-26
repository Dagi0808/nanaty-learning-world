<template>
  <div class="text-center">
    <!-- Mascot -->
    <div class="mb-6 mt-2">
      <div class="text-8xl animate-float inline-block cursor-pointer select-none" @click="greet">🐼</div>
      <h1 class="kid-title text-purple-600 mt-2">Hello Nanaty! 👋</h1>
      <p class="kid-text text-gray-500 mt-1">{{ message }}</p>
    </div>

    <!-- Three system cards -->
    <div class="grid grid-cols-1 gap-5 mb-8 max-w-sm mx-auto">
      <NuxtLink to="/learn" class="kid-card bg-gradient-to-br from-blue-400 to-purple-500 text-center group">
        <div class="text-6xl mb-2">📚</div>
        <div class="font-fredoka text-3xl text-white drop-shadow">Learn</div>
        <div class="font-nunito text-white/80 text-sm mt-1">Letters, Numbers, Colors and more</div>
      </NuxtLink>

      <NuxtLink to="/practice" class="kid-card bg-gradient-to-br from-pink-400 to-red-400 text-center group">
        <div class="text-6xl mb-2">🎮</div>
        <div class="font-fredoka text-3xl text-white drop-shadow">Practice</div>
        <div class="font-nunito text-white/80 text-sm mt-1">Quiz and Matching games</div>
      </NuxtLink>

      <NuxtLink to="/progress" class="kid-card bg-gradient-to-br from-yellow-400 to-orange-400 text-center group">
        <div class="text-6xl mb-2">⭐</div>
        <div class="font-fredoka text-3xl text-white drop-shadow">My Stars</div>
        <div class="font-nunito text-white/80 text-sm mt-1">See how much you've learned</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { speak } = useAudio()

const messages = [
  'What shall we learn today? 🌈',
  "You're so smart, Nanaty! 🌟",
  "Let's have fun learning! 🎉",
  'Pick something and let\'s go! 🚀',
]
const message = ref(messages[0])

onMounted(() => {
  message.value = messages[Math.floor(Math.random() * messages.length)]
})

function greet() {
  speak('Hello Nanaty! Welcome to your learning world!', { pitch: 1.2, rate: 0.8 })
}
</script>
