import Vue from 'vue'
import VueRouter from 'vue-router'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/album',
    name: 'album',
    component: () => import('../views/album/index.vue')
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('../views/recommend/index.vue')
  },{
    path:'/*',redirect:'/album'
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
