<template>
  <Transition name="pop">
    <div v-if="show" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      @click="$emit('close')">
      <div class="bg-white rounded-5xl p-10 text-center shadow-2xl mx-4 max-w-xs w-full animate-popIn" @click.stop
        style="box-shadow: 0 25px 60px rgba(0,0,0,0.3), 0 0 0 4px rgba(255,255,255,0.5);">

        <div class="text-8xl mb-3 animate-bounce-custom">{{ icon || '🎉' }}</div>

        <div class="font-fredoka text-4xl mb-1"
          style="background:linear-gradient(135deg,#667eea,#f093fb);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
          {{ title || 'Amazing!' }}
        </div>

        <div class="font-nunito font-bold text-gray-600 mb-3 text-lg">{{ message }}</div>

        <div v-if="stars" class="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-5 font-fredoka text-2xl text-white"
          style="background:linear-gradient(135deg,#f6d365,#fda085);">
          ⭐ +{{ stars }} stars!
        </div>

        <button
          class="kid-btn w-full justify-center text-xl"
          style="background:linear-gradient(135deg,#667eea,#764ba2)"
          @click="$emit('close')">
          {{ cta || 'Yay! 🚀' }}
        </button>
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
.pop-enter-active,.pop-leave-active { transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1); }
.pop-enter-from,.pop-leave-to { opacity: 0; transform: scale(0.7); }
</style>
