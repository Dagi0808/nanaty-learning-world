<template>
  <Transition name="pop">
    <div
      v-if="show"
      class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
      @click="$emit('close')"
    >
      <div class="bg-white rounded-5xl p-10 text-center shadow-2xl mx-4 max-w-xs w-full animate-popIn" @click.stop>
        <div class="text-8xl mb-3">{{ icon }}</div>
        <div class="kid-title text-purple-600 mb-1">{{ title }}</div>
        <div class="kid-text text-gray-500 mb-2">{{ message }}</div>
        <div v-if="stars" class="font-fredoka text-3xl text-yellow-500 mb-4">⭐ +{{ stars }}</div>
        <button class="kid-btn bg-purple-500" @click="$emit('close')">{{ cta }}</button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
  icon?: string
  title?: string
  message?: string
  stars?: number
  cta?: string
}>()
defineEmits(['close'])
</script>

<style scoped>
.pop-enter-active, .pop-leave-active { transition: all 0.3s; }
.pop-enter-from, .pop-leave-to { opacity: 0; transform: scale(0.8); }
</style>
