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
      <main class="max-w-3xl mx-auto px-4 pt-4 pb-28 md:pb-8">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// Scroll to top on every route change
const router = useRouter()
router.afterEach(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease;
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
