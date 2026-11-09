<script setup>
import { ref, computed } from 'vue'
import { useHabits, currentStreak } from '../composables/useHabits'
import { fromKey } from '../utils/date'

const { habits } = useHabits()
const selectedId = ref(habits.value[0]?.id ?? null)
const habit = computed(() => habits.value.find((h) => h.id === selectedId.value))
const days = computed(() => (habit.value ? [...habit.value.completions].sort().reverse() : []))
</script>

<template>
  <h1 class="text-2xl font-bold">Progress History</h1>

  <p v-if="!habits.length" class="mt-4 text-gray-500">No habits yet.</p>
  <template v-else>
    <select v-model="selectedId" class="mt-4 w-full rounded border p-2">
      <option v-for="h in habits" :key="h.id" :value="h.id">{{ h.name }}</option>
    </select>

    <p class="mt-4">Current streak: {{ habit ? currentStreak(habit) : 0 }} days</p>

    <!-- TODO: replace this list with the calendar view from Figma -->
    <h2 class="mt-4 font-semibold">Completed days</h2>
    <ul v-if="days.length" class="list-disc pl-6">
      <li v-for="d in days" :key="d">{{ fromKey(d).toDateString() }}</li>
    </ul>
    <p v-else class="text-gray-500">No check-ins yet.</p>
  </template>
</template>
