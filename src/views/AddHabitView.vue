<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useHabits, FREQUENCIES } from '../composables/useHabits'

const router = useRouter()
const { addHabit } = useHabits()
const name = ref('')
const note = ref('')
const frequency = ref('daily')

function save() {
  if (!name.value.trim()) return
  addHabit({ name: name.value, note: note.value, frequency: frequency.value })
  router.push('/')
}
</script>

<template>
  <h1 class="text-2xl font-bold">Add Habit</h1>

  <!-- TODO: match Figma form styling + tip box -->
  <form @submit.prevent="save" class="mt-4 space-y-3">
    <div>
      <label class="block text-sm font-medium">Habit name</label>
      <input v-model="name" class="w-full rounded border p-2" placeholder="e.g. Stretch for 5 minutes" required />
    </div>
    <div>
      <label class="block text-sm font-medium">Note (optional)</label>
      <input v-model="note" class="w-full rounded border p-2" placeholder="e.g. 8 glasses" />
    </div>
    <div>
      <label class="block text-sm font-medium">Frequency</label>
      <select v-model="frequency" class="w-full rounded border p-2">
        <option v-for="f in FREQUENCIES" :key="f.value" :value="f.value">{{ f.label }}</option>
      </select>
    </div>
    <button type="submit" class="rounded bg-green-600 px-4 py-2 text-white">Save Habit</button>
  </form>
</template>
