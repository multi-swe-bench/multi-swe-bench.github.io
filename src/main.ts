import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './Home.vue'
import Submit from './Submit.vue'
import Viewer from './Viewer.vue'
import 'uno.css'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/submit',
      component: Submit,
    },
    {
      path: '/viewer',
      component: Viewer,
    },
  ],
})

app.use(router)

app.mount('#app')
