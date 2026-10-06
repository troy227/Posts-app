import { createRouter, createWebHistory } from 'vue-router';
import FeedView from '@/views/FeedView.vue';
import LoginView from '@/views/LoginView.vue';
import { getUserId } from '@/lib/user-id.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: LoginView },
    { path: '/feed', name: 'feed', component: FeedView },
    { path: '/', redirect: '/feed' },
  ],
});

router.beforeEach((to) => {
  if (to.path === '/login') {
    return true;
  }
  if (getUserId() == null) {
    return { path: '/login' };
  }
  return true;
});

export default router;
