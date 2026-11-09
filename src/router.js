import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from './views/DashboardView.vue'

const routes = [
  { path: '/', name: 'dashboard', component: DashboardView, meta: { title: 'Today' } },
  { path: '/add', name: 'add', component: () => import('./views/AddHabitView.vue'), meta: { title: 'Add habit' } },
  { path: '/history', name: 'history', component: () => import('./views/HistoryView.vue'), meta: { title: 'History' } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.afterEach((to) => {
  document.title = `${to.meta.title} · HabitFlow`
})

export default router
