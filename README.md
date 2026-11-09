# HabitFlow

A calm, simple habit tracker built with **Vue 3 (Composition API)**, **Vue Router**, and **Tailwind CSS**. Data is saved in `localStorage`.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build   # output in dist/
```

## Deploy
- **Vercel / Netlify / Cloudflare Pages:** import the GitHub repo → build command `npm run build` → output folder `dist`.
- SPA routing is already handled (`public/_redirects` for Netlify/Cloudflare, `vercel.json` for Vercel).

## Structure
```
src/
  composables/useHabits.js   shared habit state, streak logic, localStorage
  components/                HabitCard, StreakCounter, BottomNav
  views/                     DashboardView, AddHabitView, HistoryView
  utils/date.js              date helpers
```
