<script setup>
import { computed } from 'vue'
import StreakCounter from './StreakCounter.vue'
import { currentStreak, isDoneOn, frequencyLabel } from '../composables/useHabits'
import { todayKey } from '../utils/date'

const props = defineProps({ habit: { type: Object, required: true } })
defineEmits(['toggle', 'delete'])

const done = computed(() => isDoneOn(props.habit, todayKey()))
const streak = computed(() => currentStreak(props.habit))
</script>

<template>
  <!-- TODO: style like Figma card (icon, round check button) -->
  <div class="rounded border p-3">
    <div class="flex justify-between">
      <div>
        <p class="font-semibold">{{ habit.name }}</p>
        <p class="text-sm text-gray-500">
          <span v-if="habit.note">{{ habit.note }} - </span>{{ frequencyLabel(habit.frequency) }}
        </p>
        <StreakCounter :days="streak" />
      </div>
      <div class="flex flex-col gap-1">
        <button @click="$emit('toggle', habit.id)" class="rounded px-3 py-1 text-sm"
          :class="done ? 'bg-green-600 text-white' : 'border border-green-600 text-green-700'">
          {{ done ? 'Done ✓' : 'Check in' }}
        </button>
        <button @click="$emit('delete', habit.id)" class="text-xs text-red-600">Delete</button>
      </div>
    </div>
  </div>
</template>
