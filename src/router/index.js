import Vue from 'vue'
import VueRouter from 'vue-router'
import Transaction from '../views/Transaction.vue'
import MainTransaction from '../views/MainTransaction'
import Goods from '../views/Goods'
import Kpm from '../views/Kpm'
import KpmDetail from '../views/KpmDetail'

window.Vue = Vue

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Transaction',
    component: Transaction
  },
  {
    path: '/main-transaction',
    name: 'Main Transaction',
    component: MainTransaction,
  },
  {
    path: '/goods',
    name: "Goods",
    component: Goods
  },
  {
    path: '/kpm',
    name: "KPM",
    component: Kpm
  },
  {
    path: '/kpm-detail',
    name: "KPM Detail",
    component: KpmDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router