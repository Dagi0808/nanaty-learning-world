<!--
  LearningCard — the single reusable card for ALL lesson types.
  Feed it different data, same component.
-->
<template>
  <div
    class="kid-card text-center select-none"
    :class="[color, active ? 'ring-4 ring-white ring-offset-2 scale-105' : '']"
    @click="$emit('select')"
  >
    <div class="text-6xl mb-2 transition-transform" :class="{ 'animate-wiggle': wiggle }">
      {{ emoji }}
    </div>
    <div v-if="title" class="font-fredoka text-2xl text-white drop-shadow mb-1">{{ title }}</div>
    <div v-if="subtitle" class="font-nunito text-sm text-white/80">{{ subtitle }}</div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  emoji: string
  title?: string
  subtitle?: string
  color?: string
  active?: boolean
  wiggle?: boolean
}>()
defineEmits(['select'])
</script>
