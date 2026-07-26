<template>
  <div>
    <!-- Header -->
    <div class="text-center mb-4">
      <h1 class="kid-title" :style="{ color: config.titleColor }">
        {{ config.icon }} {{ config.label }}
      </h1>
    </div>

    <!-- Card viewer -->
    <div class="flex justify-center mb-4">
      <div
        class="kid-card w-full max-w-sm text-center cursor-pointer"
        :class="current.color || config.defaultColor"
        @click="playCard"
      >
        <!-- Big letter (alphabet only) -->
        <div v-if="category === 'letters'" class="font-fredoka text-9xl text-white drop-shadow mb-1">
          {{ current.letter }}
        </div>
        <!-- Number + emoji dots -->
        <div v-else-if="category === 'numbers'" class="font-fredoka text-9xl text-white drop-shadow mb-1">
          {{ current.num }}
        </div>

        <div class="text-6xl mb-2" :class="{ 'animate-wiggle': wiggling }">{{ current.emoji }}</div>

        <div class="font-fredoka text-2xl text-white drop-shadow mb-1">
          {{ current.word || current.name || current.num && current.word }}
        </div>
        <div v-if="current.subtitle || current.sound || current.description || current.example"
          class="font-nunito text-sm text-white/80 italic">
          {{ current.subtitle || current.sound || current.description || current.example }}
        </div>

        <AudioButton class="mt-4" label="Speak" @speak="playCard" />
      </div>
    </div>

    <!-- Prev / counter / Next -->
    <div class="flex items-center justify-center gap-4 mb-6">
      <button class="kid-btn bg-gray-400 text-xl" :disabled="idx === 0" @click="prev">← Back</button>
      <span class="font-fredoka text-lg text-gray-500">{{ idx + 1 }} / {{ items.length }}</span>
      <button class="kid-btn text-xl" :class="config.btnColor" :disabled="idx === items.length - 1" @click="next">Next →</button>
    </div>

    <!-- Mini grid of all items -->
    <div class="grid grid-cols-5 md:grid-cols-8 gap-2 mb-6">
      <button
        v-for="(item, i) in items"
        :key="i"
        class="rounded-2xl p-2 text-2xl transition-transform active:scale-90 hover:scale-110 shadow"
        :class="[item.color || config.defaultColor, i === idx ? 'ring-4 ring-white ring-offset-2 scale-110' : '']"
        @click="goTo(i)"
      >
        {{ item.emoji }}
      </button>
    </div>

    <!-- Complete button -->
    <div class="text-center">
      <button class="kid-btn bg-green-500 text-xl" @click="complete">
        🎉 I learned this! (+5 ⭐)
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
const { addStars, setScore } = useProgress()

const category = computed(() => route.params.category as string)

const dataMap: Record<string, any[]> = {
  letters: alphabetData,
  numbers: numbersData,
  colors: colorsData,
  animals: animalsData,
  fruits: fruitsData,
  shapes: shapesData,
}

const configMap: Record<string, { label: string; icon: string; titleColor: string; defaultColor: string; btnColor: string }> = {
  letters: { label: 'Letters', icon: '🅰', titleColor: '#EF4444', defaultColor: 'bg-red-400', btnColor: 'bg-red-500' },
  numbers: { label: 'Numbers', icon: '🔢', titleColor: '#3B82F6', defaultColor: 'bg-blue-400', btnColor: 'bg-blue-500' },
  colors: { label: 'Colors', icon: '🎨', titleColor: '#F97316', defaultColor: 'bg-orange-400', btnColor: 'bg-orange-500' },
  animals: { label: 'Animals', icon: '🐶', titleColor: '#22C55E', defaultColor: 'bg-green-400', btnColor: 'bg-green-500' },
  fruits: { label: 'Fruits', icon: '🍎', titleColor: '#EF4444', defaultColor: 'bg-red-400', btnColor: 'bg-red-500' },
  shapes: { label: 'Shapes', icon: '⭐', titleColor: '#A855F7', defaultColor: 'bg-purple-400', btnColor: 'bg-purple-500' },
}

const items = computed(() => dataMap[category.value] ?? [])
const config = computed(() => configMap[category.value] ?? configMap.letters)

const idx = ref(0)
const wiggling = ref(false)
const showReward = ref(false)

const current = computed(() => items.value[idx.value] ?? {})

function playCard() {
  wiggling.value = true
  setTimeout(() => { wiggling.value = false }, 500)

  const item = current.value
  let text = ''
  if (category.value === 'letters') text = `${item.letter}. ${item.word}`
  else if (category.value === 'numbers') text = `${item.num}. ${item.word}`
  else if (category.value === 'colors') text = `${item.name}. ${item.example}`
  else if (category.value === 'animals') text = `${item.name}. ${item.sound}`
  else if (category.value === 'fruits') text = `${item.name}. ${item.description}`
  else if (category.value === 'shapes') text = `${item.name}. ${item.description}`

  speak(text, { pitch: 1.1, rate: 0.8 })
}

function next() { if (idx.value < items.value.length - 1) { idx.value++; playCard() } }
function prev() { if (idx.value > 0) { idx.value--; playCard() } }
function goTo(i: number) { idx.value = i; playCard() }

function complete() {
  addStars(5)
  setScore(category.value, 100)
  showReward.value = true
  speak(`Amazing! You finished ${config.value.label}! You earned 5 stars, Nanaty!`, { pitch: 1.2 })
}

onMounted(() => {
  if (items.value.length) playCard()
})

watch(category, () => { idx.value = 0 })
</script>
