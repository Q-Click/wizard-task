import { createRouter, createWebHistory } from 'vue-router'
import UserList from '../views/UserList.vue'
import AddUser from '../views/AddUser.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'userList',
      component: UserList,
      meta: { title: 'User list' }
    },
    {
      path: '/addUser',
      name: 'addUser',
      component: AddUser,
      meta: { title: 'Add user' }
    },
    {
      path: '/addUser/:id',
      name: 'editUser',
      component: AddUser,
      meta: { title: 'Add user' }
    }
  ]
})

export default router
