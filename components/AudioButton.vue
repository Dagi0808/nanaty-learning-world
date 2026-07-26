<template>
  <button
    class="rounded-full bg-white/30 hover:bg-white/50 text-white font-fredoka text-lg px-5 py-2 transition-transform active:scale-90 hover:scale-105 shadow"
    @click.stop="$emit('speak')"
  >
    🔊 {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{ label?: string }>()
defineEmits(['speak'])
</script>
