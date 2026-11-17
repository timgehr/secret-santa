import Vue from 'vue'
import VueRouter from 'vue-router'
import Encrypt from '../views/Encrypt.vue'
import Decrypt from '../views/Decrypt.vue'
import Generated from '../views/Generated.vue'
import PastAssignments from '../views/PastAssignments.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Encrypt',
    component: Encrypt
  },
  {
    path: '/decrypt/:id',
    name: 'Decrypt',
    component: Decrypt
  },
  {
    path: '/history',
    name: 'PastAssignments',
    component: PastAssignments
  },
  {
    path: '/generated',
    name: 'generated',
    component: Generated
  }
]

const router = new VueRouter({
  routes
})

export default router
