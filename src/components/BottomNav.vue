<template>
  <!-- TODO: replace with icon nav from Figma -->
  <nav class="fixed bottom-0 left-0 right-0 border-t bg-gray-100">
    <div class="mx-auto flex max-w-xl justify-around p-3">
      <RouterLink to="/" exact-active-class="font-bold underline">Today</RouterLink>
      <RouterLink to="/add" exact-active-class="font-bold underline">Add Habit</RouterLink>
      <RouterLink to="/history" exact-active-class="font-bold underline">History</RouterLink>
    </div>
  </nav>
</template>
