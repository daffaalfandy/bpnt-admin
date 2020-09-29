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
import Purchase from '../views/Purchase'
import PurchaseTransaction from '../views/PurchaseTransaction'
import Employees from '../views/Employees'
import Login from '../Login'
import Dash from '../Dash'
import store from '../store'
import Logout from '../views/Logout'

window.Vue = Vue

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (from.name == "Logout") next()
      if (store.getters.admin.name) {
        next({
          name: 'Transaction'
        })
      } else next()
    }
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
        beforeEnter: (to, from, next) => {
          if (from.name !== "Transaction") next({
            name: "Transaction"
          })
          else next()
        }
      },
      {
        path: 'employees',
        name: 'Employees',
        component: Employees,
        beforeEnter: (to, from, next) => {
          if (store.getters.admin.role !== 1) next({
            name: "Transaction"
          })
          else next()
        }
      },
      {
        path: 'purchase',
        name: "Purchase",
        component: Purchase,
      },
      {
        path: 'purchase-transaction',
        name: "Purchase Transaction",
        component: PurchaseTransaction,
        beforeEnter: (to, from, next) => {
          if (from.name !== "Purchase") next({
            name: "Purchase"
          })
          else next()
        }
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
        component: KpmDetail,
        beforeEnter: (to, from, next) => {
          if (from.name !== "KPM") next({
            name: "KPM"
          })
          else next()
        }
      },
      {
        path: 'transaction-history',
        name: "History Transaction",
        component: HistoryTransaction
      },
      {
        path: 'final-report',
        name: "Final Report",
        component: FinalReport,
        beforeEnter: (to, from, next) => {
          if (store.getters.admin.role !== 1) next({
            name: "Transaction"
          })
          else next()
        }
      },
      {
        path: 'income-statement',
        name: "Income Statement",
        component: IncomeStatement,
        beforeEnter: (to, from, next) => {
          if (store.getters.admin.role !== 1) next({
            name: "Transaction"
          })
          else next()
        }
      },
      {
        path: 'logout',
        name: "Logout",
        component: Logout
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.getters.admin.name) next({
    name: 'Login'
  })
  else {
    next()
  }
})

export default router