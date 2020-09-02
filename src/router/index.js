import Vue from 'vue'
import VueRouter from 'vue-router'
import Transaction from '../views/Transaction.vue'
import InputKpm from '../views/InputKpm'
import Goods from '../views/Goods'

window.Vue = Vue

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Transaction',
    component: Transaction
  },
  {
    path: '/input-kpm',
    name: 'Input KPM',
    component: InputKpm
  },
  {
    path: '/goods',
    name: "Goods",
    component: Goods
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router