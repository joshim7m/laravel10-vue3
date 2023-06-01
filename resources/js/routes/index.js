
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress';

import GuestLayout from '../layouts/Guest.vue'
import AuthenticatedLayout from '../layouts/Authenticated.vue'

import Login from '../components/Login.vue'

import PostsIndex from '../components/Posts/Index.vue'
import CreatePost from '../components/Posts/Create.vue'
import EditPost from '../components/Posts/Edit.vue'



function auth(to, from, next){
  if(JSON.parse(localStorage.getItem('loggedIn'))){
    next()
  }
  next('/login')
}

const routes = [
    {
      path: '/',
      redirect: { name: 'login' },
      component: GuestLayout,
      children: [
          {
            path: '/login',
            name: 'login',
            component: Login
          }
        ]
    },

    {
    component: AuthenticatedLayout,
    beforeEnter: auth,
    children: [
        {
          path: '/posts',
          name: 'posts.index',
          component: PostsIndex,
          meta: { title: 'All posts' }
        },
        {
          path: '/posts/create',
          name: 'posts.create',
          component: CreatePost,
          meta: { title: 'Create post' }
        },
        {
          path: '/posts/edit:id',
          name: 'posts.edit',
          component: EditPost,
          meta: { title: 'Edit post' }
        }
      ]
    }
  ]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;