<template>
  <div class="relative min-h-screen">
    <!-- Decorative floating bubbles -->
    <div class="bg-bubble w-64 h-64 bg-white top-10 -left-20" style="animation-delay:0s" />
    <div class="bg-bubble w-48 h-48 bg-yellow-200 top-1/3 -right-16" style="animation-delay:1.5s" />
    <div class="bg-bubble w-32 h-32 bg-pink-200 bottom-1/4 left-1/4" style="animation-delay:3s" />
    <div class="bg-bubble w-56 h-56 bg-blue-200 bottom-10 -right-10" style="animation-delay:0.8s" />
    <div class="bg-bubble w-20 h-20 bg-green-200 top-1/2 left-10" style="animation-delay:2s" />

    <!-- App content -->
    <div class="relative z-10">
      <Navbar />
      <main class="max-w-3xl mx-auto px-4 py-6 pb-28 md:pb-8">
        <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
      </main>
    </div>
  </div>
</template>

<style>
/* Page transition — fade only, no blank white flash */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
.page-enter-to,
.page-leave-from {
  opacity: 1;
}
</style>
