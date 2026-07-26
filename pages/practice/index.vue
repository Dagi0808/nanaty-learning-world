<template>
  <div>
    <div class="text-center mb-6">
      <h1 class="kid-title text-pink-600">🎮 Practice Time!</h1>
      <p class="kid-text text-gray-400">Ready to play?</p>
    </div>

    <div class="grid grid-cols-1 gap-5 max-w-sm mx-auto">
      <NuxtLink to="/practice/quiz" class="kid-card bg-gradient-to-br from-amber-400 to-yellow-500 text-center">
        <div class="text-6xl mb-2">❓</div>
        <div class="font-fredoka text-3xl text-white drop-shadow">Quiz</div>
        <div class="font-nunito text-white/80 text-sm mt-1">Answer questions and earn stars!</div>
      </NuxtLink>

      <NuxtLink to="/practice/matching" class="kid-card bg-gradient-to-br from-pink-400 to-rose-500 text-center">
        <div class="text-6xl mb-2">🧩</div>
        <div class="font-fredoka text-3xl text-white drop-shadow">Match It!</div>
        <div class="font-nunito text-white/80 text-sm mt-1">Match words to pictures!</div>
      </NuxtLink>
    </div>
  </div>
</template>
