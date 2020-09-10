import Vue from 'vue'
import VueRouter from 'vue-router'
import Transaction from '../views/Transaction.vue'
import MainTransaction from '../views/MainTransaction'
import Goods from '../views/Goods'
import Kpm from '../views/Kpm'
import KpmDetail from '../views/KpmDetail'
import HistoryTransaction from '../views/HistoryTransaction'
import FinalReport from '../views/FinalReport'
import IncomeStatement from '../views/IncomeStatement'
import Login from '../Login'
import Dash from '../Dash'

window.Vue = Vue

let isAuthenticated = false



Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: "Login",
    component: Login
  },
  {
    path: '/',
    component: Dash,
    children: [{
        path: '',
        name: 'Transaction',
        component: Transaction
      },
      {
        path: 'main-transaction',
        name: 'Main Transaction',
        component: MainTransaction,
      },
      {
        path: 'goods',
        name: "Goods",
        component: Goods
      },
      {
        path: 'kpm',
        name: "KPM",
        component: Kpm
      },
      {
        path: 'kpm-detail',
        name: "KPM Detail",
        component: KpmDetail
      },
      {
        path: 'transaction-history',
        name: "History Transaction",
        component: HistoryTransaction
      },
      {
        path: 'final-report',
        name: "Final Report",
        component: FinalReport
      },
      {
        path: 'income-statement',
        name: "Income Statement",
        component: IncomeStatement
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({
    name: 'Login'
  })
  else next()
})

export default router