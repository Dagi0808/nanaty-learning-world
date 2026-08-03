<template>
  <div class="max-w-lg mx-auto">

    <!-- Header -->
    <div class="text-center mb-5">
      <h1 class="kid-title" :style="{ color: config.titleColor }">
        {{ config.icon }} {{ config.label }}
      </h1>
    </div>

    <!-- Main card -->
    <div class="flex justify-center mb-5">
      <div
        class="w-full rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-transform duration-300 active:scale-95"
        :style="`background: ${config.cardGradient}`"
        @click="playCard"
      >
        <!-- Real image (animals) -->
        <div v-if="current.image" class="w-full overflow-hidden" style="height:280px;">
          <img
            :src="current.image"
            :alt="current.name"
            class="w-full h-full object-cover transition-transform duration-500"
            :class="{ 'scale-110': wiggling }"
          />
        </div>

        <!-- Big letter (alphabet) -->
        <div v-else-if="category === 'letters'"
          class="flex items-center justify-center"
          style="height:220px;">
          <div class="font-fredoka drop-shadow-2xl select-none"
            :class="{ 'animate-wiggle': wiggling }"
            style="font-size:10rem; line-height:1; color:white; text-shadow: 0 6px 20px rgba(0,0,0,0.3);">
            {{ current.letter }}
          </div>
        </div>

        <!-- Big number -->
        <div v-else-if="category === 'numbers'"
          class="flex items-center justify-center"
          style="height:220px;">
          <div class="font-fredoka drop-shadow-2xl select-none"
            :class="{ 'animate-wiggle': wiggling }"
            style="font-size:10rem; line-height:1; color:white; text-shadow: 0 6px 20px rgba(0,0,0,0.3);">
            {{ current.num }}
          </div>
        </div>

        <!-- Emoji fallback (colors, shapes, fruits) -->
        <div v-else
          class="flex items-center justify-center"
          style="height:220px;">
          <div class="select-none drop-shadow-2xl"
            :class="{ 'animate-wiggle': wiggling }"
            style="font-size:9rem; line-height:1;">
            {{ current.emoji }}
          </div>
        </div>

        <!-- Text info section -->
        <div class="p-5 text-white text-center">
          <div class="font-fredoka drop-shadow mb-1"
            style="font-size:2.6rem; line-height:1.1; text-shadow:0 2px 8px rgba(0,0,0,0.25);">
            {{ current.name || current.word || current.num }}
          </div>
          <div class="font-nunito font-bold text-white/90 text-lg leading-snug">
            {{ current.sound || current.subtitle || current.example || current.description || '' }}
          </div>
          <!-- Tap hint -->
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
        :style="`background: ${config.cardGradient}`"
        :disabled="idx === items.length - 1"
        :class="{ 'opacity-40 cursor-not-allowed': idx === items.length - 1 }"
        @click="next"
      >Next →</button>
    </div>

    <!-- Mini thumbnail grid -->
    <div class="grid gap-2 mb-6"
      :class="items.length <= 6 ? 'grid-cols-6' : 'grid-cols-6 md:grid-cols-8'">
      <button
        v-for="(item, i) in items"
        :key="i"
        class="rounded-2xl aspect-square transition-all duration-200 overflow-hidden shadow active:scale-90"
        :class="i === idx ? 'ring-4 ring-white ring-offset-2 scale-110' : 'hover:scale-105'"
        :style="`background: ${config.cardGradient}`"
        @click="goTo(i)"
      >
        <!-- Thumbnail image -->
        <img v-if="item.image" :src="item.image" :alt="item.name"
          class="w-full h-full object-cover" />
        <!-- Letter thumbnail -->
        <span v-else-if="category === 'letters'"
          class="font-fredoka text-2xl text-white flex items-center justify-center h-full">
          {{ item.letter }}
        </span>
        <!-- Number thumbnail -->
        <span v-else-if="category === 'numbers'"
          class="font-fredoka text-2xl text-white flex items-center justify-center h-full">
          {{ item.num }}
        </span>
        <!-- Emoji thumbnail -->
        <span v-else class="text-2xl flex items-center justify-center h-full">
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

    <!-- Reward modal -->
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
  letters:  alphabetData,
  numbers:  numbersData,
  colors:   colorsData,
  animals:  animalsData,
  fruits:   fruitsData,
  shapes:   shapesData,
}

const configMap: Record<string, {
  label: string; icon: string; titleColor: string
  cardGradient: string; btnColor: string
}> = {
  letters: {
    label: 'Letters', icon: '🅰', titleColor: '#EF4444',
    cardGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    btnColor: 'bg-red-500',
  },
  numbers: {
    label: 'Numbers', icon: '🔢', titleColor: '#3B82F6',
    cardGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    btnColor: 'bg-blue-500',
  },
  colors: {
    label: 'Colors', icon: '🎨', titleColor: '#F97316',
    cardGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    btnColor: 'bg-orange-500',
  },
  animals: {
    label: 'Animals', icon: '🐶', titleColor: '#16a34a',
    cardGradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    btnColor: 'bg-green-500',
  },
  fruits: {
    label: 'Fruits', icon: '🍎', titleColor: '#EF4444',
    cardGradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    btnColor: 'bg-red-500',
  },
  shapes: {
    label: 'Shapes', icon: '⭐', titleColor: '#A855F7',
    cardGradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    btnColor: 'bg-purple-500',
  },
}

const items  = computed(() => dataMap[category.value] ?? [])
const config = computed(() => configMap[category.value] ?? configMap.letters)

const idx       = ref(0)
const wiggling  = ref(false)
const showReward = ref(false)

const current = computed(() => items.value[idx.value] ?? {})

function playCard() {
  wiggling.value = true
  setTimeout(() => { wiggling.value = false }, 700)

  const item = current.value
  let text = ''
  if (category.value === 'letters')  text = `${item.letter} ... ${item.word} ... ${item.letter} for ${item.word}`
  else if (category.value === 'numbers')  text = `${item.num} ... ${item.word}`
  else if (category.value === 'colors')   text = `${item.name} ... ${item.example}`
  else if (category.value === 'animals')  text = `${item.name} ... ${item.sound}`
  else if (category.value === 'fruits')   text = `${item.name} ... ${item.description}`
  else if (category.value === 'shapes')   text = `${item.name} ... ${item.description}`

  // Slow, clear pronunciation for beginners
  speak(text, { pitch: 1.05, rate: 0.7 })
}

function next() {
  if (idx.value < items.value.length - 1) {
    idx.value++
    setTimeout(() => playCard(), 300)
  }
}
function prev() {
  if (idx.value > 0) {
    idx.value--
    setTimeout(() => playCard(), 300)
  }
}
function goTo(i: number) {
  idx.value = i
  setTimeout(() => playCard(), 200)
}

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
    setTimeout(() => playCard(), 2800)
  }
})

watch(category, () => { idx.value = 0 })
</script>
