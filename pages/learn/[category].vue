<template>
  <div class="max-w-lg mx-auto">

    <!-- Back to Learn hub -->
    <div class="mb-4">
      <NuxtLink to="/learn"
        class="inline-flex items-center gap-2 font-fredoka text-white/90 hover:text-white text-lg bg-white/20 hover:bg-white/30 rounded-full px-4 py-2 transition-all">
        ← All Subjects
      </NuxtLink>
    </div>

    <!-- Header -->
    <div class="text-center mb-5">
      <h1 class="kid-title" :style="{ color: config.titleColor }">
        {{ config.icon }} {{ config.label }}
      </h1>
    </div>

    <!-- Main card -->
    <div class="flex justify-center mb-5">
      <div
        class="w-full rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 active:scale-95"
        :style="cardBackground"
        @click="playCard"
      >
        <!-- Image categories (animals & colors): background-image fills card, spacer gives height -->
        <div v-if="current.image" style="height: 260px;" />

        <!-- Big letter (alphabet) -->
        <div v-else-if="category === 'letters'"
          class="flex items-center justify-center"
          style="height:240px;">
          <div class="font-fredoka drop-shadow-2xl select-none"
            :class="{ 'animate-wiggle': wiggling }"
            style="font-size:11rem; line-height:1; color:white; text-shadow: 0 6px 20px rgba(0,0,0,0.3);">
            {{ current.letter }}
          </div>
        </div>

        <!-- Big number -->
        <div v-else-if="category === 'numbers'"
          class="flex items-center justify-center"
          style="height:240px;">
          <div class="font-fredoka drop-shadow-2xl select-none"
            :class="{ 'animate-wiggle': wiggling }"
            style="font-size:11rem; line-height:1; color:white; text-shadow: 0 6px 20px rgba(0,0,0,0.3);">
            {{ current.num }}
          </div>
        </div>

        <!-- Emoji fallback (fruits, shapes) -->
        <div v-else
          class="flex items-center justify-center"
          style="height:240px;">
          <div class="select-none drop-shadow-2xl"
            :class="{ 'animate-wiggle': wiggling }"
            style="font-size:9rem; line-height:1;">
            {{ current.emoji }}
          </div>
        </div>

        <!-- Text info section -->
        <div class="p-5 text-white text-center"
          :style="current.image ? 'background: rgba(0,0,0,0.52)' : ''">
          <div class="font-fredoka drop-shadow mb-1"
            style="font-size:2.8rem; line-height:1.1; text-shadow:0 2px 8px rgba(0,0,0,0.4);">
            {{ current.name || current.word || current.num }}
          </div>
          <div class="font-nunito font-bold text-white text-lg leading-snug"
            style="text-shadow: 0 1px 4px rgba(0,0,0,0.5);">
            {{ current.sound || current.subtitle || current.example || current.description || '' }}
          </div>
          <!-- Repeat prompt for letters/numbers -->
          <div v-if="category === 'letters' || category === 'numbers'"
            class="mt-2 font-fredoka text-white/80 text-base animate-pulse">
            🗣 Say it after Panda!
          </div>
          <div class="mt-3 inline-block bg-white/20 rounded-full px-4 py-1 font-fredoka text-base">
            👆 Tap to hear!
          </div>
        </div>
      </div>
    </div>

    <!-- Prev / counter / Next -->
    <div class="flex items-center justify-center gap-4 mb-5">
      <button
        class="kid-btn text-xl"
        style="background: rgba(255,255,255,0.3); color:white;"
        :disabled="idx === 0"
        :class="{ 'opacity-40 cursor-not-allowed': idx === 0 }"
        @click="prev"
      >← Back</button>
      <span class="font-fredoka text-2xl text-white drop-shadow">
        {{ idx + 1 }} / {{ items.length }}
      </span>
      <button
        class="kid-btn text-xl"
        :style="cardBackground"
        :disabled="idx === items.length - 1"
        :class="{ 'opacity-40 cursor-not-allowed': idx === items.length - 1 }"
        @click="next"
      >Next →</button>
    </div>

    <!-- Mini thumbnail grid — fixed height, no overflow -->
    <div class="grid gap-1 mb-6 grid-cols-6 overflow-hidden" style="max-height: 60px;">
      <button
        v-for="(item, i) in items"
        :key="i"
        class="rounded-lg overflow-hidden shadow active:scale-90 transition-all duration-200"
        style="height: 44px; width: 100%; display: block;"
        :class="i === idx ? 'ring-2 ring-white scale-110' : 'hover:scale-105 opacity-80'"
        :style="item.image
          ? `background-image: url('${item.image}'); background-size: cover; background-position: center;`
          : item.hex
            ? `background: ${item.hex}`
            : `background: ${config.cardGradient}`"
        @click="goTo(i)"
      >
        <span v-if="category === 'letters'"
          class="font-fredoka text-sm text-white w-full h-full flex items-center justify-center drop-shadow">
          {{ item.letter }}
        </span>
        <span v-else-if="category === 'numbers'"
          class="font-fredoka text-sm text-white w-full h-full flex items-center justify-center drop-shadow">
          {{ item.num }}
        </span>
        <span v-else-if="!item.image && !item.hex"
          class="text-sm w-full h-full flex items-center justify-center">
          {{ item.emoji }}
        </span>
      </button>
    </div>

    <!-- Complete button -->
    <div class="text-center mb-8">
      <button
        class="kid-btn text-xl"
        style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
        @click="complete"
      >
        🎉 I learned this! &nbsp; +5 ⭐
      </button>
    </div>

    <RewardModal
      :show="showReward"
      icon="🎉"
      title="Amazing!"
      :message="`You finished ${config.label}!`"
      :stars="5"
      cta="Keep going! 🚀"
      @close="showReward = false"
    />
  </div>
</template>

<script setup lang="ts">
import alphabetData from '~/data/alphabet.json'
import numbersData from '~/data/numbers.json'
import colorsData from '~/data/colors.json'
import animalsData from '~/data/animals.json'
import fruitsData from '~/data/fruits.json'
import shapesData from '~/data/shapes.json'

const route = useRoute()
const { speak } = useAudio()
const { addStars, setScore, getStreak } = useProgress()
const { sayComplete, sayStart, sayStreak } = usePanda()

const category = computed(() => route.params.category as string)

const dataMap: Record<string, any[]> = {
  letters: alphabetData,
  numbers: numbersData,
  colors:  colorsData,
  animals: animalsData,
  fruits:  fruitsData,
  shapes:  shapesData,
}

const configMap: Record<string, {
  label: string; icon: string; titleColor: string
  cardGradient: string
}> = {
  letters: { label: 'Letters', icon: '🅰', titleColor: '#EF4444', cardGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  numbers: { label: 'Numbers', icon: '🔢', titleColor: '#3B82F6', cardGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  colors:  { label: 'Colors',  icon: '🎨', titleColor: '#F97316', cardGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  animals: { label: 'Animals', icon: '🐶', titleColor: '#16a34a', cardGradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
  fruits:  { label: 'Fruits',  icon: '🍎', titleColor: '#EF4444', cardGradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' },
  shapes:  { label: 'Shapes',  icon: '⭐', titleColor: '#A855F7', cardGradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
}

const items   = computed(() => dataMap[category.value] ?? [])
const config  = computed(() => configMap[category.value] ?? configMap.letters)
const idx     = ref(0)
const wiggling = ref(false)
const showReward = ref(false)
const current = computed(() => items.value[idx.value] ?? {})

// Card background: animals & colors use real photo, others use gradient
const cardBackground = computed(() => {
  if (current.value.image) {
    return `background-image: url('${current.value.image}'); background-size: cover; background-position: center;`
  }
  return `background: ${config.value.cardGradient}`
})

// Speak a sequence of short phrases with timed gaps — no cancellation between steps
function speakSequence(steps: { text: string; rate: number; delay: number }[]) {
  steps.forEach(({ text, rate, delay }) => {
    setTimeout(() => speak(text, { pitch: 1.05, rate, interrupt: false }), delay)
  })
}

function playCard() {
  wiggling.value = true
  setTimeout(() => { wiggling.value = false }, 700)
  const item = current.value

  if (category.value === 'letters') {
    // letter → word → "say it!" → letter again
    speakSequence([
      { text: item.letter,       rate: 0.55, delay: 0    },
      { text: item.word,         rate: 0.58, delay: 2200 },
      { text: 'Say it!',         rate: 0.65, delay: 4200 },
      { text: item.letter,       rate: 0.52, delay: 7000 },
    ])
  } else if (category.value === 'numbers') {
    speakSequence([
      { text: String(item.num),  rate: 0.55, delay: 0    },
      { text: item.word,         rate: 0.58, delay: 2200 },
      { text: 'Say it!',         rate: 0.65, delay: 4200 },
      { text: String(item.num),  rate: 0.52, delay: 7000 },
    ])
  } else if (category.value === 'animals') {
    speakSequence([
      { text: item.name,   rate: 0.60, delay: 0    },
      { text: item.sound,  rate: 0.62, delay: 2400 },
    ])
  } else if (category.value === 'colors') {
    speakSequence([
      { text: item.name,    rate: 0.58, delay: 0    },
      { text: item.example, rate: 0.62, delay: 2200 },
    ])
  } else if (category.value === 'fruits') {
    speakSequence([
      { text: item.name,        rate: 0.58, delay: 0    },
      { text: item.description, rate: 0.62, delay: 2200 },
    ])
  } else if (category.value === 'shapes') {
    speakSequence([
      { text: item.name,        rate: 0.58, delay: 0    },
      { text: item.description, rate: 0.62, delay: 2200 },
    ])
  }
}

function next() {
  if (idx.value < items.value.length - 1) { idx.value++; setTimeout(playCard, 300) }
}
function prev() {
  if (idx.value > 0) { idx.value--; setTimeout(playCard, 300) }
}
function goTo(i: number) { idx.value = i; setTimeout(playCard, 200) }

function complete() {
  addStars(5)
  setScore(category.value, 100)
  showReward.value = true
  sayComplete(config.value.label)
  setTimeout(() => {
    const streak = getStreak()
    if (streak >= 2) sayStreak(streak)
  }, 4000)
}

onMounted(() => {
  if (items.value.length) {
    sayStart(config.value.label)
    setTimeout(playCard, 2800)
  }
})

watch(category, () => { idx.value = 0 })
</script>
