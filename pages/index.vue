<template>
  <div class="text-center">
    <!-- Mascot -->
    <div class="mb-6 mt-2">
      <div
        class="text-8xl animate-float inline-block cursor-pointer select-none"
        :class="{ 'animate-wiggle': pandaWiggle }"
        @click="greet"
      >🐼</div>
      <h1 class="kid-title text-purple-600 mt-2">Hello Nanaty! 👋</h1>
      <p class="kid-text text-gray-500 mt-1">{{ message }}</p>
    </div>

    <!-- Three system cards -->
    <div class="grid grid-cols-1 gap-5 mb-8 max-w-sm mx-auto">
      <NuxtLink
        to="/learn"
        class="kid-card bg-gradient-to-br from-blue-400 to-purple-500 text-center group"
        @click="speak('Let\'s learn!')"
      >
        <div class="text-6xl mb-2">📚</div>
        <div class="font-fredoka text-3xl text-white drop-shadow">Learn</div>
        <div class="font-nunito text-white/80 text-sm mt-1">Letters, Numbers, Colors and more</div>
      </NuxtLink>

      <NuxtLink
        to="/practice"
        class="kid-card bg-gradient-to-br from-pink-400 to-red-400 text-center group"
        @click="speak('Let\'s play!')"
      >
        <div class="text-6xl mb-2">🎮</div>
        <div class="font-fredoka text-3xl text-white drop-shadow">Practice</div>
        <div class="font-nunito text-white/80 text-sm mt-1">Quiz and Matching games</div>
      </NuxtLink>

      <NuxtLink
        to="/progress"
        class="kid-card bg-gradient-to-br from-yellow-400 to-orange-400 text-center group"
        @click="speak('Let\'s see your stars!')"
      >
        <div class="text-6xl mb-2">⭐</div>
        <div class="font-fredoka text-3xl text-white drop-shadow">My Stars</div>
        <div class="font-nunito text-white/80 text-sm mt-1">See how much you've learned</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { speak } = useAudio()
const { sayWelcome, sayStart } = usePanda()

const hints = [
  'Tap 📚 Learn to start! ',
  'Tap 🎮 Practice to play!',
  'Tap ⭐ My Stars to check your score!',
  'Tap the panda anytime to hear me! 🐼',
]
const message = ref(hints[0])
const pandaWiggle = ref(false)

const welcomeScript = [
  { text: "Hello Nanaty! I am Panda, your best learning friend!", delay: 800 },
  { text: "Tap the blue Learn button to learn letters, numbers, and animals.", delay: 4500 },
  { text: "Tap the pink Practice button to play fun quiz and matching games!", delay: 9000 },
  { text: "Every time you finish something, you earn stars. You are going to do amazing! Let us go!", delay: 13500 },
]

onMounted(() => {
  playWelcome()
})

function playWelcome() {
  pandaWiggle.value = true
  setTimeout(() => { pandaWiggle.value = false }, 500)

  welcomeScript.forEach(({ text, delay }) => {
    setTimeout(() => {
      speak(text, { pitch: 1.2, rate: 0.82 })
      message.value = text
    }, delay)
  })

  setTimeout(() => {
    message.value = hints[Math.floor(Math.random() * hints.length)]
  }, 19000)
}

function greet() {
  pandaWiggle.value = true
  setTimeout(() => { pandaWiggle.value = false }, 500)
  speak(
    'Hi Nanaty! You are so smart and brave! Tap Learn to start, or tap Practice to play a game. I believe in you!',
    { pitch: 1.2, rate: 0.82 },
  )
}
</script>
