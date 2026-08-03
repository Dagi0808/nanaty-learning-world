/**
 * usePanda — Simple, warm, beginner-friendly English only.
 * Short words. Short sentences. Easy for age 4-6.
 */

const CHILD_NAME = 'Nanaty'

function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function timeOfDay(): 'morning' | 'afternoon' | 'evening' {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

// ✅ Correct — short, happy, easy words
const correctPhrases = [
  `Yes! Good job!`,
  `Wow! You did it!`,
  `Great! That is right!`,
  `Yes! You are so smart!`,
  `Good job, ${CHILD_NAME}!`,
  `That is right! Well done!`,
  `Yes yes! Very good!`,
  `You did it! I am happy!`,
  `So good! Keep going!`,
  `Right! You are the best!`,
]

// ❌ Wrong — gentle, never shaming, very simple
const wrongPhrases = [
  `Oh! Try again!`,
  `Not this one. Try again!`,
  `Almost! One more time!`,
  `Try again, ${CHILD_NAME}!`,
  `Keep trying! You can do it!`,
  `No problem. Try one more time!`,
  `Look again. You can do it!`,
]

// 🎉 Lesson complete
const completePhrases = [
  `You did it, ${CHILD_NAME}! Well done!`,
  `Lesson done! You are so good!`,
  `Great work, ${CHILD_NAME}! I am proud!`,
  `You finished! You are very smart!`,
  `All done! Great job today!`,
]

// 💪 Lesson start — simple welcome
const startPhrases = [
  `Let us learn, ${CHILD_NAME}!`,
  `Ready? Let us go!`,
  `Let us start! This is fun!`,
  `Come on! Let us learn together!`,
  `Let us go, ${CHILD_NAME}!`,
]

// ⭐ Star milestones — simple numbers
const milestonePhrases: Record<number, string> = {
  10:  `Ten stars! Good job, ${CHILD_NAME}!`,
  20:  `Twenty stars! Wow! Keep going!`,
  30:  `Thirty stars! You are so good!`,
  50:  `Fifty stars! Amazing, ${CHILD_NAME}!`,
  100: `One hundred stars! You are the best!`,
}

// ⏰ Idle
const idlePhrases = [
  `${CHILD_NAME}! Come learn with me!`,
  `Tap Learn or Play. I am here!`,
  `Come on! Let us learn!`,
  `I am waiting, ${CHILD_NAME}!`,
]

// 🌅 Time greetings — very simple
const timeGreetings = {
  morning:   `Good morning, ${CHILD_NAME}! Let us learn!`,
  afternoon: `Hello, ${CHILD_NAME}! Ready to learn?`,
  evening:   `Good evening, ${CHILD_NAME}! Let us learn!`,
}

export function usePanda() {
  const { speak } = useAudio()

  // Slow, clear rate for all panda speech
  const RATE  = 0.72
  const PITCH = 1.05

  function sayCorrect() {
    const text = random(correctPhrases)
    speak(text, { pitch: PITCH, rate: RATE })
    return text
  }

  function sayWrong() {
    const text = random(wrongPhrases)
    speak(text, { pitch: PITCH, rate: RATE })
    return text
  }

  function sayComplete(lessonName?: string) {
    const base = random(completePhrases)
    const extra = lessonName ? ` You learned ${lessonName}!` : ''
    speak(base + extra, { pitch: PITCH, rate: RATE })
    return base
  }

  function sayStart(lessonName?: string) {
    const base = random(startPhrases)
    const extra = lessonName ? ` Today we learn ${lessonName}!` : ''
    speak(base + extra, { pitch: PITCH, rate: RATE })
    return base
  }

  function sayMilestone(stars: number) {
    const milestones = [10, 20, 30, 50, 100]
    const hit = milestones.find(m => stars === m)
    if (hit && milestonePhrases[hit]) {
      speak(milestonePhrases[hit], { pitch: PITCH, rate: RATE })
      return true
    }
    return false
  }

  function sayIdle() {
    speak(random(idlePhrases), { pitch: PITCH, rate: RATE })
  }

  function sayTimeGreeting() {
    const text = timeGreetings[timeOfDay()]
    speak(text, { pitch: PITCH, rate: RATE })
    return text
  }

  function sayStreak(count: number) {
    if (count < 2) return
    const phrases = [
      `${count} lessons done! Great job!`,
      `Wow! ${count} in a row! So good!`,
    ]
    speak(random(phrases), { pitch: PITCH, rate: RATE })
  }

  function say(text: string) {
    speak(text, { pitch: PITCH, rate: RATE })
  }

  return {
    sayCorrect, sayWrong, sayComplete, sayStart,
    sayMilestone, sayIdle, sayTimeGreeting, sayStreak, say,
  }
}
