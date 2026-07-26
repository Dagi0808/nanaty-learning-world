<template>
  <div>
    <div class="text-center mb-4">
      <h1 class="kid-title text-pink-600">🧩 Match It!</h1>
    </div>

    <!-- Category picker -->
    <div class="flex gap-2 justify-center flex-wrap mb-4">
      <button v-for="cat in categories" :key="cat.id"
        class="kid-btn text-base"
        :class="activeCat === cat.id ? 'bg-pink-500 ring-4 ring-pink-300' : 'bg-gray-400'"
        @click="load(cat.id)">{{ cat.icon }} {{ cat.label }}</button>
    </div>

    <p class="text-center font-nunito text-gray-400 mb-4">✅ {{ matched.size }} / {{ pairs.length }} matched</p>

    <!-- Two column layout -->
    <div v-if="!finished" class="grid grid-cols-2 gap-4">
      <!-- Words -->
      <div class="flex flex-col gap-3">
        <p class="text-center font-fredoka text-gray-500">Words</p>
        <button v-for="p in pairs" :key="'w'+p.id"
          class="kid-card text-center font-fredoka text-xl transition-all"
          :class="wordClass(p.id)" :disabled="matched.has(p.id)" @click="pick('word', p.id)">
          {{ p.word }}
        </button>
      </div>
      <!-- Emojis shuffled -->
      <div class="flex flex-col gap-3">
        <p class="text-center font-fredoka text-gray-500">Pictures</p>
        <button v-for="p in shuffled" :key="'e'+p.id"
          class="kid-card text-center text-5xl transition-all"
          :class="emojiClass(p.id)" :disabled="matched.has(p.id)" @click="pick('emoji', p.id)">
          {{ p.emoji }}
        </button>
      </div>
    </div>

    <!-- Finished -->
    <div v-else class="text-center mt-6">
      <div class="text-8xl mb-3 animate-popIn">🏆</div>
      <h2 class="kid-title text-pink-500 mb-2">All matched!</h2>
      <p class="font-fredoka text-xl text-yellow-500 mb-5">⭐ +{{ pairs.length }} stars!</p>
      <div class="flex gap-3 justify-center">
        <button class="kid-btn bg-pink-500" @click="load(activeCat)">🔄 Again</button>
        <NuxtLink to="/" class="kid-btn bg-purple-500">🏠 Home</NuxtLink>
      </div>
    </div>

    <!-- Feedback toast -->
    <Transition name="slide">
      <div v-if="feedback" class="fixed bottom-24 left-1/2 -translate-x-1/2 rounded-full px-8 py-3 font-fredoka text-xl text-white shadow-lg z-50"
        :class="feedback === 'ok' ? 'bg-green-500' : 'bg-red-400'">
        {{ feedback === 'ok' ? '✅ Match!' : '❌ Try again!' }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import animalsData from '~/data/animals.json'
import fruitsData from '~/data/fruits.json'
import colorsData from '~/data/colors.json'

const { speak } = useAudio()
const { addStars } = useProgress()

const categories = [
  { id: 'animals', icon: '🐶', label: 'Animals' },
  { id: 'fruits', icon: '🍎', label: 'Fruits' },
  { id: 'colors', icon: '🎨', label: 'Colors' },
]

type Pair = { id: string; word: string; emoji: string }

const activeCat = ref('animals')
const pairs = ref<Pair[]>([])
const shuffled = ref<Pair[]>([])
const matched = ref(new Set<string>())
const selWord = ref('')
const selEmoji = ref('')
const feedback = ref('')
const finished = ref(false)

function load(cat: string) {
  activeCat.value = cat
  matched.value = new Set()
  selWord.value = ''; selEmoji.value = ''
  finished.value = false

  let raw: Pair[] = []
  if (cat === 'animals') raw = animalsData.slice(0, 5).map(a => ({ id: a.name, word: a.name, emoji: a.emoji }))
  if (cat === 'fruits') raw = fruitsData.slice(0, 5).map(f => ({ id: f.name, word: f.name, emoji: f.emoji }))
  if (cat === 'colors') raw = colorsData.slice(0, 5).map(c => ({ id: c.name, word: c.name, emoji: c.emoji }))

  pairs.value = raw
  shuffled.value = [...raw].sort(() => Math.random() - 0.5)
}

function pick(side: 'word' | 'emoji', id: string) {
  if (matched.value.has(id)) return
  if (side === 'word') { selWord.value = id; speak(id, { pitch: 1.1 }) }
  else selEmoji.value = id

  if (selWord.value && selEmoji.value) {
    if (selWord.value === selEmoji.value) {
      matched.value.add(selWord.value)
      feedback.value = 'ok'
      speak('Great match!', { pitch: 1.3 })
      selWord.value = ''; selEmoji.value = ''
      if (matched.value.size === pairs.value.length) {
        addStars(pairs.value.length)
        finished.value = true
        speak('Amazing! You matched everything! Well done Nanaty!', { pitch: 1.3 })
      }
    } else {
      feedback.value = 'no'
      speak('Try again!', { pitch: 0.9 })
      setTimeout(() => { selWord.value = ''; selEmoji.value = '' }, 700)
    }
    setTimeout(() => { feedback.value = '' }, 900)
  }
}

function wordClass(id: string) {
  if (matched.value.has(id)) return 'bg-green-100 border-2 border-green-400 opacity-50'
  if (selWord.value === id) return 'bg-pink-100 border-2 border-pink-500 scale-105'
  return 'bg-white border-2 border-gray-200 hover:border-pink-400'
}

function emojiClass(id: string) {
  if (matched.value.has(id)) return 'bg-green-100 border-2 border-green-400 opacity-50'
  if (selEmoji.value === id) return 'bg-pink-100 border-2 border-pink-500 scale-105'
  return 'bg-white border-2 border-gray-200 hover:border-pink-400'
}

onMounted(() => load('animals'))
</script>

<style scoped>
.slide-enter-active,.slide-leave-active{transition:all .3s}
.slide-enter-from,.slide-leave-to{transform:translate(-50%,10px);opacity:0}
</style>
