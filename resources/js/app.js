import './bootstrap';

import { createApp } from 'vue'
import { TailwindPagination } from 'laravel-vue-pagination';

import router from './routes/index'


import NProgress from 'nprogress';
import 'nprogress/nprogress.css';





createApp({})
.use(router)
.component('Pagination', TailwindPagination)
.mount('#app')

  