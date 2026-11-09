<script setup>
defineProps({ days: { type: Number, required: true } })
</script>

<template>
  <!-- TODO: add flame icon -->
  <span class="text-sm text-green-700">Streak: {{ days }} days</span>
</template>
