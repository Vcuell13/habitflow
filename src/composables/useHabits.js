import { ref, computed, watch } from 'vue'
import { toKey, todayKey, addDays } from '../utils/date'

const STORAGE_KEY = 'habitflow:v1'

export const FREQUENCIES = [
  { value: 'daily', label: 'Every day' },
  { value: 'weekdays', label: 'Weekdays' },
  { value: 'weekly', label: 'Once a week' },
]

export const frequencyLabel = (value) =>
  FREQUENCIES.find((f) => f.value === value)?.label ?? 'Every day'

// Picks an icon from the habit name so the user doesn't have to choose one.
export function guessIcon(name = '') {
  const n = name.toLowerCase()
  if (/water|drink|hydrat/.test(n)) return 'drop'
  if (/read|book|study|page|learn/.test(n)) return 'book'
  if (/walk|run|step|jog|hike/.test(n)) return 'steps'
  if (/gym|workout|lift|stretch|yoga|exercise/.test(n)) return 'dumbbell'
  if (/sleep|bed|rest/.test(n)) return 'moon'
  return 'leaf'
}

function seedHabits() {
  const today = new Date()
  const days = (count, skipToday = false) =>
    Array.from({ length: count }, (_, i) => toKey(addDays(today, -(i + (skipToday ? 1 : 0)))))
  return [
    { id: crypto.randomUUID(), name: 'Drink water', note: '8 glasses', frequency: 'daily', icon: 'drop', createdAt: toKey(addDays(today, -20)), completions: days(8) },
    { id: crypto.randomUUID(), name: 'Read 10 pages', note: 'A little time to unwind', frequency: 'daily', icon: 'book', createdAt: toKey(addDays(today, -20)), completions: days(4, true) },
    { id: crypto.randomUUID(), name: 'Take a walk', note: '20 minutes', frequency: 'daily', icon: 'steps', createdAt: toKey(addDays(today, -20)), completions: days(6) },
  ]
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* storage unavailable or corrupted – fall back to sample data */
  }
  return seedHabits()
}

// Module-level state = one shared store for every component that calls useHabits().
const habits = ref(load())

watch(
  habits,
  (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } catch {
      /* ignore quota / private-mode errors */
    }
  },
  { deep: true },
)

export function isDoneOn(habit, key) {
  return habit.completions.includes(key)
}

// Consecutive days completed, counting back from today.
// If today isn't checked yet, the streak is still "alive" from yesterday.
export function currentStreak(habit) {
  const set = new Set(habit.completions)
  let cursor = new Date()
  if (!set.has(toKey(cursor))) cursor = addDays(cursor, -1)
  let streak = 0
  while (set.has(toKey(cursor))) {
    streak++
    cursor = addDays(cursor, -1)
  }
  return streak
}

// Start/end dates of the current streak, for the history page.
export function streakRange(habit) {
  const length = currentStreak(habit)
  if (!length) return null
  const set = new Set(habit.completions)
  const end = set.has(todayKey()) ? new Date() : addDays(new Date(), -1)
  return { start: addDays(end, -(length - 1)), end, length }
}

export function useHabits() {
  const doneToday = computed(() => habits.value.filter((h) => isDoneOn(h, todayKey())).length)

  function addHabit({ name, note = '', frequency = 'daily' }) {
    const habit = {
      id: crypto.randomUUID(),
      name: name.trim(),
      note: note.trim(),
      frequency,
      icon: guessIcon(name),
      createdAt: todayKey(),
      completions: [],
    }
    habits.value.push(habit)
    return habit
  }

  function deleteHabit(id) {
    habits.value = habits.value.filter((h) => h.id !== id)
  }

  function toggleToday(id) {
    const habit = habits.value.find((h) => h.id === id)
    if (!habit) return
    const key = todayKey()
    habit.completions = isDoneOn(habit, key)
      ? habit.completions.filter((k) => k !== key)
      : [...habit.completions, key]
  }

  return { habits, doneToday, addHabit, deleteHabit, toggleToday }
}
