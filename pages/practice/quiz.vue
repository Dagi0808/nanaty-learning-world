<template>
  <div>
    <div class="text-center mb-6">
      <h1 class="kid-title text-amber-500">❓ Quiz Time!</h1>
    </div>

    <!-- Category picker -->
    <div v-if="!started" class="text-center">
      <div class="text-7xl mb-4 animate-float">🐼</div>
      <p class="kid-text text-gray-500 mb-5">Pick a topic, Nanaty!</p>
      <div class="flex flex-wrap gap-3 justify-center mb-6">
        <button
          v-for="cat in categories" :key="cat.id"
          class="kid-btn text-lg"
          :class="selected === cat.id ? 'bg-amber-500 ring-4 ring-amber-300' : 'bg-gray-400'"
          @click="selected = cat.id"
        >{{ cat.icon }} {{ cat.label }}</button>
      </div>
      <button class="kid-btn bg-amber-500 text-2xl" @click="start">🚀 Start!</button>
    </div>

    <!-- Question -->
    <div v-else-if="!done">
      <div class="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div class="bg-amber-400 h-3 rounded-full transition-all" :style="{ width: `${((qIdx+1)/qs.length)*100}%` }" />
      </div>
      <p class="text-center font-nunito text-gray-400 mb-3">{{ qIdx+1 }} / {{ qs.length }}</p>

      <div class="kid-card bg-amber-50 text-center mb-4">
        <div class="text-7xl mb-2">{{ qs[qIdx].emoji }}</div>
        <p class="font-fredoka text-2xl text-gray-700">{{ qs[qIdx].question }}</p>
      </div>

      <div class="grid grid-cols-1 gap-3">
        <button
          v-for="choice in qs[qIdx].choices" :key="choice"
          class="kid-card font-fredoka text-xl text-center transition-all"
          :class="choiceClass(choice)"
          :disabled="answered"
          @click="answer(choice)"
        >{{ choice }}</button>
      </div>

      <Transition name="fade">
        <div v-if="answered" class="text-center mt-4">
          <div class="text-5xl mb-1">{{ lastOk ? '🎉' : '😊' }}</div>
          <p class="font-fredoka text-xl" :class="lastOk ? 'text-green-600' : 'text-orange-400'">
            {{ lastOk ? 'Great job!' : `It's: ${qs[qIdx].correct}` }}
          </p>
          <button class="kid-btn bg-amber-500 mt-3" @click="next">
            {{ qIdx < qs.length-1 ? 'Next →' : 'See results!' }}
          </button>
        </div>
      </Transition>
    </div>

    <!-- Results -->
    <div v-else class="text-center">
      <div class="text-8xl mb-3 animate-popIn">{{ score === qs.length ? '🏆' : score >= qs.length*0.6 ? '🌟' : '💪' }}</div>
      <h2 class="kid-title text-amber-500 mb-1">Done!</h2>
      <p class="kid-text text-gray-600 mb-1">
        <span class="text-green-600 font-fredoka text-4xl">{{ score }}</span> / {{ qs.length }} correct!
      </p>
      <p class="font-fredoka text-xl text-yellow-500 mb-5">⭐ +{{ starsEarned }} stars!</p>
      <div class="flex gap-3 justify-center flex-wrap">
        <button class="kid-btn bg-amber-500" @click="restart">🔄 Again</button>
        <NuxtLink to="/" class="kid-btn bg-purple-500">🏠 Home</NuxtLink>
      </div>
    </div>

    <RewardModal :show="showReward" icon="🏆" title="Perfect!" message="You got everything right!" :stars="starsEarned" cta="Yay!" @close="showReward = false" />
  </div>
</template>

<script setup lang="ts">
import animalsData from '~/data/animals.json'
import fruitsData from '~/data/fruits.json'
import colorsData from '~/data/colors.json'
import alphabetData from '~/data/alphabet.json'

const { speak } = useAudio()
const { sayCorrect, sayWrong, sayComplete } = usePanda()
const { addStars } = useProgress()

const categories = [
  { id: 'animals', icon: '🐶', label: 'Animals' },
  { id: 'fruits', icon: '🍎', label: 'Fruits' },
  { id: 'colors', icon: '🎨', label: 'Colors' },
  { id: 'abc', icon: '🅰', label: 'ABC' },
]

type Q = { question: string; emoji: string; choices: string[]; correct: string }

const selected = ref('animals')
const started = ref(false)
const done = ref(false)
const qs = ref<Q[]>([])
const qIdx = ref(0)
const score = ref(0)
const answered = ref(false)
const lastOk = ref(false)
const picked = ref('')
const starsEarned = ref(0)
const showReward = ref(false)

function shuffle<T>(a: T[]) { return [...a].sort(() => Math.random() - 0.5) }

function buildQs(): Q[] {
  const builds: Record<string, () => Q[]> = {
    animals: () => animalsData.slice(0, 5).map(a => ({
      question: 'Which animal is this?', emoji: a.emoji,
      choices: shuffle([a.name, ...animalsData.filter(x => x.name !== a.name).slice(0, 2).map(x => x.name)]),
      correct: a.name,
    })),
    fruits: () => fruitsData.slice(0, 5).map(f => ({
      question: 'Which fruit is this?', emoji: f.emoji,
      choices: shuffle([f.name, ...fruitsData.filter(x => x.name !== f.name).slice(0, 2).map(x => x.name)]),
      correct: f.name,
    })),
    colors: () => colorsData.slice(0, 5).map(c => ({
      question: 'What color is this?', emoji: c.emoji,
      choices: shuffle([c.name, ...colorsData.filter(x => x.name !== c.name).slice(0, 2).map(x => x.name)]),
      correct: c.name,
    })),
    abc: () => alphabetData.slice(0, 5).map(a => ({
      question: `What starts with ${a.letter}?`, emoji: a.emoji,
      choices: shuffle([a.word, ...alphabetData.filter(x => x.letter !== a.letter).slice(0, 2).map(x => x.word)]),
      correct: a.word,
    })),
  }
  return builds[selected.value]()
}

function start() { qs.value = buildQs(); qIdx.value = 0; score.value = 0; answered.value = false; done.value = false; started.value = true; speak(qs.value[0].question, { pitch: 1.1 }) }

function answer(choice: string) {
  if (answered.value) return
  answered.value = true; picked.value = choice
  lastOk.value = choice === qs.value[qIdx.value].correct
  if (lastOk.value) { score.value++; sayCorrect() }
  else sayWrong()
}

function next() {
  if (qIdx.value < qs.value.length - 1) { qIdx.value++; answered.value = false; picked.value = ''; speak(qs.value[qIdx.value].question, { pitch: 1.1 }) }
  else finish()
}

function finish() {
  done.value = true
  starsEarned.value = Math.max(1, score.value * 2)
  addStars(starsEarned.value)
  if (score.value === qs.value.length) showReward.value = true
  sayComplete()
}

function restart() { started.value = false; done.value = false }

function choiceClass(choice: string) {
  if (!answered.value) return 'bg-white border-2 border-amber-200 hover:border-amber-500'
  if (choice === qs.value[qIdx.value].correct) return 'bg-green-100 border-2 border-green-500 text-green-700'
  if (choice === picked.value) return 'bg-red-100 border-2 border-red-400 text-red-600'
  return 'bg-white border-2 border-gray-200 opacity-40'
}
</script>

<style scoped>
.fade-enter-active,.fade-leave-active{transition:opacity .3s}
.fade-enter-from,.fade-leave-to{opacity:0}
</style>
