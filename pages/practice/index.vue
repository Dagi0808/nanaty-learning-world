<template>
  <div class="relative z-10">
    <div class="text-center mb-8">
      <h1 class="kid-title bg-gradient-to-r from-pink-600 via-red-500 to-orange-400 bg-clip-text text-transparent">
        🎮 Practice Time!
      </h1>
      <p class="kid-text text-gray-600 mt-1">Ready to play?</p>
    </div>

    <div class="grid grid-cols-1 gap-5 max-w-sm mx-auto">
      <NuxtLink to="/practice/quiz"
        class="kid-card text-center group"
        style="background: linear-gradient(135deg, #f6d365 0%, #fda085 100%)">
        <div class="text-7xl mb-3 group-hover:animate-bounce_custom">❓</div>
        <div class="font-fredoka text-3xl text-white drop-shadow mb-1">Quiz Time!</div>
        <div class="font-nunito text-white/80 text-base">Answer questions and earn stars!</div>
        <div class="flex gap-2 justify-center mt-3">
          <span v-for="e in ['🐶','🍎','🎨','🅰']" :key="e"
            class="text-xl bg-white/20 rounded-xl px-2 py-1">{{ e }}</span>
        </div>
      </NuxtLink>

      <NuxtLink to="/practice/matching"
        class="kid-card text-center group"
        style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
        <div class="text-7xl mb-3 group-hover:animate-bounce_custom">🧩</div>
        <div class="font-fredoka text-3xl text-white drop-shadow mb-1">Match It!</div>
        <div class="font-nunito text-white/80 text-base">Match words to pictures!</div>
        <div class="flex gap-2 justify-center mt-3">
          <span v-for="e in ['🐱','🍌','🔴','🐘']" :key="e"
            class="text-xl bg-white/20 rounded-xl px-2 py-1">{{ e }}</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
