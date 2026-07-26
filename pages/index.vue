<template>
  <div class="text-center">
    <!-- Mascot -->
    <div class="mb-6 mt-2">
      <div
        class="text-8xl inline-block cursor-pointer select-none"
        :class="pandaWiggle ? 'animate-wiggle' : 'animate-float'"
        @click="greet"
      >🐼</div>
      <h1 class="kid-title text-purple-600 mt-2">Hello Nanaty! 👋</h1>
      <p class="kid-text text-gray-500 mt-1 min-h-[2rem] transition-all duration-500">{{ message }}</p>
    </div>

    <!-- Star milestone celebration overlay -->
    <Transition name="pop">
      <div v-if="showMilestone" class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
        @click="showMilestone = false">
        <div class="bg-white rounded-5xl p-10 text-center shadow-2xl mx-4 max-w-xs w-full animate-popIn" @click.stop>
          <div class="text-8xl mb-3">🎉</div>
          <div class="kid-title text-purple-600 mb-1">{{ milestoneStars }} Stars!</div>
          <div class="kid-text text-gray-500 mb-4">You are incredible, Nanaty!</div>
          <button class="kid-btn bg-purple-500" @click="showMilestone = false">Keep going! 🚀</button>
        </div>
      </div>
    </Transition>

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
const { getStars } = useProgress()
const { sayIdle, sayTimeGreeting, sayMilestone } = usePanda()

const message = ref('Tap the panda to hear me! 🐼')
const pandaWiggle = ref(false)
const hasVisited = ref(false)
const showMilestone = ref(false)
const milestoneStars = ref(0)

// Idle timer — if no interaction for 35s, panda encourages her
let idleTimer: ReturnType<typeof setTimeout> | null = null

function resetIdle() {
  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    if (useRoute().path === '/') {
      sayIdle()
      message.value = 'Tap Learn or Practice when you are ready! 🐼'
    }
  }, 35000)
}

// First time welcome script
const firstVisitScript = [
  { text: "Hello Nanaty! I am Panda, your best learning friend!", delay: 800 },
  { text: "Tap the blue Learn button to learn letters, numbers, and animals.", delay: 5200 },
  { text: "Tap the pink Practice button to play fun quiz and matching games!", delay: 10000 },
  { text: "You earn stars every time you finish something. You are going to do amazing! Let us go!", delay: 14500 },
]

// Return visit phrases
const returnPhrases = [
  { speech: `Welcome back, Nanaty! I missed you so much! You are my favorite student!`, display: 'Welcome back! I missed you! 🐼' },
  { speech: `Nanaty is back! You are doing such a great job every day! I am so proud of you!`, display: 'You are doing so great! 🌟' },
  { speech: `Oh Nanaty! You came back! You are so smart and I love learning with you!`, display: 'You are so smart! 💜' },
  { speech: `Hello again, Nanaty! Every time you come back, you get smarter! Let us keep going!`, display: 'Getting smarter every day! 🚀' },
  { speech: `Look who is here! My favorite learner! You make Panda so happy, Nanaty!`, display: 'My favorite learner is back! 🎉' },
]

function wiggle() {
  pandaWiggle.value = true
  setTimeout(() => { pandaWiggle.value = false }, 500)
}

function playFirstVisit() {
  wiggle()
  firstVisitScript.forEach(({ text, delay }) => {
    setTimeout(() => {
      speak(text, { pitch: 1.2, rate: 0.82 })
      message.value = text
    }, delay)
  })
  setTimeout(() => { message.value = 'Tap the panda anytime! 🐼' }, 19000)
}

function playReturnVisit() {
  wiggle()
  const stars = getStars()
  const pick = returnPhrases[Math.floor(Math.random() * returnPhrases.length)]
  let speech = pick.speech
  if (stars > 0) speech += ` You already have ${stars} stars! Amazing!`
  message.value = pick.display
  setTimeout(() => speak(speech, { pitch: 1.2, rate: 0.82 }), 400)
}

function greet() {
  wiggle()
  resetIdle()
  const stars = getStars()
  const phrases = [
    `Hi Nanaty! You are so smart and brave! Keep learning, I believe in you!`,
    `Hello my star! You are doing so amazing! Panda is proud of you!`,
    `Nanaty! You are my favorite! Tap Learn to start, you can do it!`,
    `You have ${stars} star${stars !== 1 ? 's' : ''} already! You are incredible, Nanaty!`,
    `Panda loves you so much, Nanaty! Let us go learn something new today!`,
  ]
  speak(phrases[Math.floor(Math.random() * phrases.length)], { pitch: 1.2, rate: 0.82 })
}

onMounted(() => {
  if (!hasVisited.value) {
    hasVisited.value = true
    playFirstVisit()
  }
  resetIdle()

  // Listen for star milestones from anywhere in the app
  window.addEventListener('stars-milestone', (e: Event) => {
    const stars = (e as CustomEvent).detail?.stars
    if (sayMilestone(stars)) {
      milestoneStars.value = stars
      showMilestone.value = true
    }
  })

  // Listen for any user interaction to reset idle
  window.addEventListener('click', resetIdle)
  window.addEventListener('touchstart', resetIdle)
})

// Detect return navigation to home
const router = useRouter()
router.afterEach((to, from) => {
  if (to.path === '/' && from.path !== '/' && hasVisited.value) {
    setTimeout(() => playReturnVisit(), 300)
  }
})
</script>

<style scoped>
.pop-enter-active,.pop-leave-active { transition: all 0.3s; }
.pop-enter-from,.pop-leave-to { opacity: 0; transform: scale(0.85); }
</style>
