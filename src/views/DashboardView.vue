<script setup>
import HabitCard from '../components/HabitCard.vue'
import { useHabits } from '../composables/useHabits'
import { formatLong } from '../utils/date'

const { habits, doneToday, toggleToday, deleteHabit } = useHabits()
const today = formatLong(new Date())
</script>

<template>
  <h1 class="text-2xl font-bold">HabitFlow</h1>
  <p class="text-sm text-gray-500">{{ today }}</p>

  <!-- TODO: progress bar card + motivational quote -->
  <p class="mt-4">Completed today: {{ doneToday }} / {{ habits.length }}</p>

  <h2 class="mt-6 mb-2 text-lg font-semibold">Today's Habits</h2>
  <div v-if="habits.length" class="space-y-2">
    <HabitCard v-for="h in habits" :key="h.id" :habit="h" @toggle="toggleToday" @delete="deleteHabit" />
  </div>
  <p v-else class="text-gray-500">No habits yet.</p>

  <RouterLink to="/add" class="mt-4 inline-block rounded bg-green-600 px-4 py-2 text-white">+ Add Habit</RouterLink>
</template>
