<template>
  <div class="text-center">

    <!-- Mascot hero section -->
    <div class="mb-8 mt-2">
      <div
        class="text-9xl inline-block cursor-pointer select-none drop-shadow-2xl"
        :class="pandaWiggle ? 'animate-wiggle' : 'animate-float'"
        @click="greet"
      >🐼</div>

      <h1 class="font-fredoka text-5xl md:text-6xl mt-3 drop-shadow-lg"
        style="background: linear-gradient(135deg,#fff,#ffe0f7); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">
        Hello Nanaty! 👋
      </h1>

      <!-- Speech bubble -->
      <div class="relative inline-block mt-3 mx-auto max-w-xs">
        <div class="bg-white/90 backdrop-blur rounded-2xl px-5 py-3 shadow-lg border-2 border-purple-200">
          <p class="font-nunito font-bold text-purple-700 text-lg leading-snug min-h-[28px] transition-all duration-500">
            {{ message }}
          </p>
        </div>
        <!-- Triangle pointer -->
        <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0"
          style="border-left:12px solid transparent;border-right:12px solid transparent;border-bottom:12px solid rgba(255,255,255,0.9);" />
      </div>
    </div>

    <!-- Three big system cards -->
    <div class="grid grid-cols-1 gap-5 mb-8 max-w-sm mx-auto">
      <!-- Learn -->
      <NuxtLink to="/learn" class="kid-card-color text-center relative overflow-hidden"
        style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <div class="absolute top-0 right-0 text-6xl opacity-10 -rotate-12 translate-x-4 -translate-y-2">📚</div>
        <div class="relative">
          <div class="text-6xl mb-2 drop-shadow-lg">📚</div>
          <div class="font-fredoka text-4xl text-white drop-shadow-lg">Learn</div>
          <div class="font-nunito text-white/90 text-sm mt-1 font-bold">
            ABC · Numbers · Animals · Colors
          </div>
          <div class="mt-3 inline-block bg-white/20 rounded-full px-4 py-1 text-white font-fredoka text-sm">
            Tap to start →
          </div>
        </div>
      </NuxtLink>

      <!-- Practice -->
      <NuxtLink to="/practice" class="kid-card-color text-center relative overflow-hidden"
        style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
        <div class="absolute top-0 right-0 text-6xl opacity-10 -rotate-12 translate-x-4 -translate-y-2">🎮</div>
        <div class="relative">
          <div class="text-6xl mb-2 drop-shadow-lg">🎮</div>
          <div class="font-fredoka text-4xl text-white drop-shadow-lg">Play</div>
          <div class="font-nunito text-white/90 text-sm mt-1 font-bold">
            Quiz · Matching Game
          </div>
          <div class="mt-3 inline-block bg-white/20 rounded-full px-4 py-1 text-white font-fredoka text-sm">
            Tap to play →
          </div>
        </div>
      </NuxtLink>

      <!-- Stars -->
      <NuxtLink to="/progress" class="kid-card-color text-center relative overflow-hidden"
        style="background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);">
        <div class="absolute top-0 right-0 text-6xl opacity-10 -rotate-12 translate-x-4 -translate-y-2">⭐</div>
        <div class="relative">
          <div class="text-6xl mb-2 drop-shadow-lg animate-pulse-glow">⭐</div>
          <div class="font-fredoka text-4xl text-white drop-shadow-lg">My Stars</div>
          <div class="font-nunito text-white/90 text-sm mt-1 font-bold">
            {{ stars }} stars earned so far!
          </div>
          <div class="mt-3 inline-block bg-white/20 rounded-full px-4 py-1 text-white font-fredoka text-sm">
            See progress →
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>

  <!-- Star milestone celebration modal -->
  <Transition name="pop">
    <div v-if="showMilestone" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      @click="showMilestone = false">
      <div class="bg-white rounded-5xl p-10 text-center shadow-2xl mx-4 max-w-xs w-full animate-popIn" @click.stop>
        <div class="text-8xl mb-3 animate-bounce-custom">🎉</div>
        <div class="font-fredoka text-5xl text-purple-600 mb-1">{{ milestoneStars }}!</div>
        <div class="font-fredoka text-2xl text-gray-600 mb-1">Stars, Nanaty!</div>
        <div class="font-nunito text-gray-500 mb-5">You are absolutely incredible!</div>
        <button class="kid-btn w-full justify-center" style="background:linear-gradient(135deg,#667eea,#764ba2)"
          @click="showMilestone = false">
          Keep going! 🚀
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { speak, queue } = useAudio()
const { getStars } = useProgress()
const { sayIdle, sayMilestone } = usePanda()

const message = ref('Tap the panda to hear me! 🐼')
const pandaWiggle = ref(false)
const hasVisited = ref(false)
const showMilestone = ref(false)
const milestoneStars = ref(0)
const stars = ref(0)

let idleTimer: ReturnType<typeof setTimeout> | null = null

function resetIdle() {
  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    if (useRoute().path === '/') {
      sayIdle()
      message.value = 'Tap Learn or Practice! 🐼'
    }
  }, 35000)
}

const firstVisitScript = [
  { text: "Hello Nanaty! I am Panda, your best learning friend!", delay: 800 },
  { text: "Tap the purple Learn card to learn letters, numbers, and animals.", delay: 5200 },
  { text: "Tap the pink Play card for fun quiz and matching games!", delay: 10000 },
  { text: "Every time you finish, you earn stars. Let us go, Nanaty!", delay: 14500 },
]

const returnPhrases = [
  { speech: `Welcome back, Nanaty! I missed you so much! You are my favorite student!`, display: 'Welcome back! 🐼💜' },
  { speech: `Nanaty is back! You are doing such a great job every day!`, display: 'You are amazing! 🌟' },
  { speech: `Oh Nanaty! You came back! You are so smart!`, display: 'So smart! 💜' },
  { speech: `Hello again, Nanaty! Every time you come back you get smarter!`, display: 'Getting smarter! 🚀' },
  { speech: `My favorite learner is here! You make Panda so happy!`, display: 'My favorite learner! 🎉' },
]

function wiggle() {
  pandaWiggle.value = true
  setTimeout(() => { pandaWiggle.value = false }, 500)
}

function playFirstVisit() {
  wiggle()
  firstVisitScript.forEach(({ text, delay }) => {
    setTimeout(() => {
      queue(text, { pitch: 1.2, rate: 0.82 })
      message.value = text
    }, delay)
  })
  setTimeout(() => { message.value = 'Tap the panda anytime! 🐼' }, 19000)
}

function playReturnVisit() {
  wiggle()
  stars.value = getStars()
  const starsCount = stars.value
  const pick = returnPhrases[Math.floor(Math.random() * returnPhrases.length)]
  let speech = pick.speech
  if (starsCount > 0) speech += ` You already have ${starsCount} stars! Amazing!`
  message.value = pick.display
  setTimeout(() => speak(speech, { pitch: 1.2, rate: 0.82 }), 400)
}

function greet() {
  wiggle()
  resetIdle()
  stars.value = getStars()
  const s = stars.value
  const phrases = [
    `Hi Nanaty! You are so smart and brave! I believe in you!`,
    `Hello my star! You are doing so amazing! Panda is proud!`,
    `Nanaty! You are my favorite! Tap Learn to start!`,
    `You have ${s} star${s !== 1 ? 's' : ''} already! Incredible, Nanaty!`,
    `Panda loves you so much, Nanaty! Let us go learn!`,
  ]
  speak(phrases[Math.floor(Math.random() * phrases.length)], { pitch: 1.2, rate: 0.82 })
}

onMounted(() => {
  stars.value = getStars()
  if (!hasVisited.value) {
    hasVisited.value = true
    playFirstVisit()
  }
  resetIdle()

  window.addEventListener('progress-updated', () => { stars.value = getStars() })
  window.addEventListener('stars-milestone', (e: Event) => {
    const s = (e as CustomEvent).detail?.stars
    if (sayMilestone(s)) {
      milestoneStars.value = s
      showMilestone.value = true
    }
  })
  window.addEventListener('click', resetIdle)
  window.addEventListener('touchstart', resetIdle)
})

const router = useRouter()
router.afterEach((to, from) => {
  if (to.path === '/' && from.path !== '/' && hasVisited.value) {
    setTimeout(() => playReturnVisit(), 300)
  }
})
</script>

<style scoped>
.pop-enter-active, .pop-leave-active { transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1); }
.pop-enter-from, .pop-leave-to { opacity: 0; transform: scale(0.7); }
</style>
