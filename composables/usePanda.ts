/**
 * usePanda — Panda mascot voice and encouragement system.
 * All phrases are warm, inspiring, and never discouraging.
 * Nanaty should always feel proud, never ashamed of a wrong answer.
 */

const { speak } = useAudio()

// ✅ Correct answer phrases — celebrate her!
const correctPhrases = [
  "Yes! You got it! I knew you could do it, Nanaty!",
  "Wow! You are so smart! That is exactly right!",
  "Amazing! You are a superstar today!",
  "Perfect! I am so proud of you, Nanaty!",
  "Fantastic! You are getting better and better!",
  "Yes yes yes! That is correct! You are brilliant!",
  "Wonderful! Nothing can stop you, Nanaty!",
  "You did it! Give yourself a big hug, you deserve it!",
  "Incredible! You remembered that so well!",
  "That is right! You make Panda so happy!",
]

// ❌ Wrong answer phrases — gentle, encouraging, never shaming
const wrongPhrases = [
  "Oops! That is okay, Nanaty. Let us try again together!",
  "Good try! You are so brave for trying. Let us look again!",
  "Almost! Do not worry, even Panda makes mistakes. Try one more time!",
  "Keep going, Nanaty! Every try makes you smarter!",
  "That was a great guess! Let us try again, I believe in you!",
  "Do not give up! You are doing so well. One more try!",
  "It is okay! Learning takes practice. You can do this!",
  "Panda still loves you so much! Let us try together!",
  "You are so close! Take a deep breath and try again!",
  "Every mistake is how we learn. You are doing amazing, Nanaty!",
]

// 🌟 Lesson complete phrases
const completePhrases = [
  "You finished it! You are incredible, Nanaty!",
  "Lesson complete! Panda is dancing with happiness for you!",
  "You did the whole lesson! I am so proud of you!",
  "Brilliant work today, Nanaty! You earned your stars!",
  "You are unstoppable! Look how much you learned today!",
]

// 👋 Welcome phrases for home page
const welcomePhrases = [
  "Hello Nanaty! I am Panda, your best learning friend!",
  "Welcome back, Nanaty! I missed you! Ready to learn?",
  "Nanaty is here! Today is going to be a great learning day!",
  "Hello my favorite student! Let us learn something amazing today!",
]

// 💪 Motivational phrases when she starts a lesson
const startPhrases = [
  "Let us go, Nanaty! You are going to love this!",
  "Here we go! You are so smart, you will get this fast!",
  "Ready? You are already the best student Panda has ever had!",
  "Let us learn together! I will be with you every step!",
]

function random(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function usePanda() {
  function sayCorrect() {
    speak(random(correctPhrases), { pitch: 1.25, rate: 0.85 })
    return random(correctPhrases)
  }

  function sayWrong() {
    speak(random(wrongPhrases), { pitch: 1.1, rate: 0.85 })
    return random(wrongPhrases)
  }

  function sayComplete() {
    speak(random(completePhrases), { pitch: 1.2, rate: 0.85 })
    return random(completePhrases)
  }

  function sayWelcome() {
    speak(random(welcomePhrases), { pitch: 1.2, rate: 0.82 })
    return random(welcomePhrases)
  }

  function sayStart() {
    speak(random(startPhrases), { pitch: 1.15, rate: 0.85 })
    return random(startPhrases)
  }

  function say(text: string) {
    speak(text, { pitch: 1.15, rate: 0.85 })
  }

  return { sayCorrect, sayWrong, sayComplete, sayWelcome, sayStart, say }
}
