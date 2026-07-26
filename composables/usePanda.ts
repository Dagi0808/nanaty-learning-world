/**
 * usePanda — Panda mascot voice and encouragement system.
 * All phrases are warm, inspiring, and never discouraging.
 * Nanaty should always feel proud, never ashamed of a wrong answer.
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

// ✅ Correct answer phrases
const correctPhrases = [
  `Yes! You got it! I knew you could do it, ${CHILD_NAME}!`,
  `Wow! You are so smart! That is exactly right!`,
  `Amazing! You are a superstar, ${CHILD_NAME}!`,
  `Perfect! I am so proud of you!`,
  `Fantastic! You are getting better and better every second!`,
  `Yes yes yes! That is correct! You are brilliant!`,
  `Wonderful! Nothing can stop you, ${CHILD_NAME}!`,
  `You did it! You deserve a big hug!`,
  `Incredible! You remembered that so well!`,
  `That is right! You make Panda so happy, ${CHILD_NAME}!`,
  `Oh my! You are so clever! Great job!`,
  `Superstar answer! ${CHILD_NAME} is the best!`,
]

// ❌ Wrong answer phrases — gentle, never shaming
const wrongPhrases = [
  `Oops! That is okay, ${CHILD_NAME}. Let us try again together!`,
  `Good try! You are so brave for trying. Let us look again!`,
  `Almost! Do not worry, even Panda makes mistakes. Try one more time!`,
  `Keep going, ${CHILD_NAME}! Every try makes you smarter!`,
  `That was a great guess! Let us try again, I believe in you!`,
  `Do not give up! You are doing so well. One more try!`,
  `It is okay! Learning takes practice. You can do this, ${CHILD_NAME}!`,
  `Panda still loves you so much! Let us try together!`,
  `You are so close! Take a deep breath and try again!`,
  `Every mistake is how we learn. You are doing amazing!`,
  `No problem! The best learners always try again. Go for it!`,
  `Panda believes in you, ${CHILD_NAME}! You will get it this time!`,
]

// 🎉 Lesson complete phrases — personal and celebratory
const completePhrases = [
  `${CHILD_NAME} finished the lesson! You are absolutely incredible!`,
  `Lesson complete! Panda is doing a happy dance just for you, ${CHILD_NAME}!`,
  `You did the whole lesson! I am so so proud of you!`,
  `Brilliant work today, ${CHILD_NAME}! You earned your stars and you deserve them!`,
  `You are unstoppable! Look how much you learned just now!`,
  `${CHILD_NAME}! You finished it! You are the smartest student in the whole world!`,
  `Amazing work! You should feel so proud of yourself right now!`,
]

// 💪 Lesson start phrases
const startPhrases = [
  `Let us go, ${CHILD_NAME}! You are going to love this!`,
  `Here we go! You are so smart, you will get this really fast!`,
  `Ready? You are already the best student Panda has ever had!`,
  `Let us learn together! I will be with you every step of the way!`,
  `This is going to be so fun, ${CHILD_NAME}! Let us start!`,
]

// ⭐ Star milestone phrases
const milestonePhrases: Record<number, string> = {
  10: `Ten stars, ${CHILD_NAME}! You are on fire! Keep going!`,
  20: `Twenty stars! Panda cannot believe how amazing you are!`,
  30: `Thirty stars! You are a learning champion, ${CHILD_NAME}!`,
  50: `Fifty stars! You are extraordinary! Panda is so proud!`,
  100: `One hundred stars! ${CHILD_NAME}, you are a genius! Incredible!`,
}

// ⏰ Idle encouragement phrases
const idlePhrases = [
  `${CHILD_NAME}, Panda is waiting for you! Let us learn something fun!`,
  `Hey! Tap Learn or Practice when you are ready. I am right here!`,
  `Are you there, ${CHILD_NAME}? Panda misses you! Come learn with me!`,
  `Whenever you are ready, I am here for you, ${CHILD_NAME}!`,
]

// 🌅 Time-aware greetings
const timeGreetings = {
  morning: `Good morning, ${CHILD_NAME}! What a wonderful day to learn something new!`,
  afternoon: `Good afternoon, ${CHILD_NAME}! Let us have a great learning session!`,
  evening: `Good evening, ${CHILD_NAME}! You are so dedicated to come learn now!`,
}

export function usePanda() {
  const { speak, queue } = useAudio()

  function sayCorrect() {
    const text = random(correctPhrases)
    speak(text, { pitch: 1.25, rate: 0.85 })
    return text
  }

  function sayWrong() {
    const text = random(wrongPhrases)
    speak(text, { pitch: 1.1, rate: 0.85 })
    return text
  }

  function sayComplete(lessonName?: string) {
    const base = random(completePhrases)
    const extra = lessonName ? ` You just finished ${lessonName}!` : ''
    speak(base + extra, { pitch: 1.2, rate: 0.85 })
    return base
  }

  function sayStart(lessonName?: string) {
    const base = random(startPhrases)
    const extra = lessonName ? ` Today we are learning about ${lessonName}!` : ''
    speak(base + extra, { pitch: 1.15, rate: 0.85 })
    return base
  }

  function sayMilestone(stars: number) {
    // Find the nearest milestone at or below current stars
    const milestones = [10, 20, 30, 50, 100]
    const hit = milestones.find(m => stars === m)
    if (hit && milestonePhrases[hit]) {
      speak(milestonePhrases[hit], { pitch: 1.3, rate: 0.85 })
      return true
    }
    return false
  }

  function sayIdle() {
    const text = random(idlePhrases)
    speak(text, { pitch: 1.1, rate: 0.85 })
  }

  function sayTimeGreeting() {
    const text = timeGreetings[timeOfDay()]
    speak(text, { pitch: 1.2, rate: 0.82 })
    return text
  }

  function sayStreak(count: number) {
    if (count < 2) return
    const streakPhrases = [
      `${count} lessons in a row, ${CHILD_NAME}! You are on fire! 🔥`,
      `Wow! ${count} in a row! You cannot be stopped!`,
      `${count} lessons done! Panda is jumping with joy!`,
    ]
    speak(random(streakPhrases), { pitch: 1.25, rate: 0.85 })
  }

  function say(text: string) {
    speak(text, { pitch: 1.15, rate: 0.85 })
  }

  return {
    sayCorrect,
    sayWrong,
    sayComplete,
    sayStart,
    sayMilestone,
    sayIdle,
    sayTimeGreeting,
    sayStreak,
    say,
  }
}
