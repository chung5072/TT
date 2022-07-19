import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView/HomeView.vue')
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LogIn/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignUp/SignupView.vue')
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('@/views/Info/InfoView.vue')
  },
  {
    path: '/notice',
    name: 'notice',
    component: () => import('@/views/Notice/NoticeView.vue')
  },
  {
    path: '/recruiting',
    name: 'recruiting',
    component: () => import('@/views/Recruiting/RecruitingView.vue')
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('@/views/GameView/GameView.vue')
  },
  {
    path: '/article1',
    name: 'artlcle1',
    component: () => import('@/views/Article/ArticleDetailOne.vue')
  },
  {
    path: '/article2',
    name: 'artlcle2',
    component: () => import('@/views/Article/ArticleDetailTwo.vue')
  },
  {
    path: '/article3',
    name: 'artlcle3',
    component: () => import('@/views/Article/ArticleDetailThree.vue')
  },
  {
    path: '/createarticle',
    name: 'createarticle',
    component: () => import('@/views/Article/ArticleForm.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
