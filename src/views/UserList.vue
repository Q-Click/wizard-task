<template>
  <div class="view">
    <div class="container">
      <div class="is-flex">
        <Searchbar class="searchbar" @search="searchChanged" />
        <ActionButton
          icon="plus"
          :title="buttonText"
          :rounded="true"
          event="addUser"
          @addUser="addUser"
        />
      </div>
      <!-- List also should be component but for this example task I allowed myself to omit these details -->
      <transition-group tag="div" name="fade">
        <div v-if="state.listLoading" class="list-loader" />
        <div
          v-else-if="state.userList.length === 0"
          class="list-placeholder"
          v-text="'Sorry, currently there are no users. :('"
        />
        <div v-else class="list">
          <transition-group tag="ul" name="slide" class="user-list">
            <li class="user-list__header">
              <div class="user-avatar">
                <div class="avatar" />
              </div>
              <div class="user-name" v-text="'Full name'" />
              <div class="user-actions" v-text="'Actions'" />
            </li>
            <ListUserRow
              v-for="user in state.userList"
              :key="user.id"
              :user="user"
              @editUser="editUser"
              @deleteUser="deleteUser"
            />
          </transition-group>
        </div>
      </transition-group>
    </div>
    <Pagination :currentPage="state.currentPage" :pages="state.pages" @selectPage="changePage" />
  </div>
</template>

<script setup lang="ts">
import Searchbar from '../components/Searchbar.vue'
import ActionButton from '../components/ActionButton.vue'
import Pagination from '../components/Pagination.vue'
import ListUserRow from '../components/ListUserRow.vue'
import { computed, onMounted, reactive } from 'vue'
import axios from 'axios'
import router from '@/router'
const state = reactive({
  userList: [],
  pages: 1,
  currentPage: 1,
  listLoading: true,
  loading: false
})

const buttonText = computed(() => {
  // possibility to add translation or dynamic button name
  return 'Add User'
})

const changePage = (page: number) => {
  getUsers(page)
}
const searchChanged = (name: string) => {
  //  getUser()
  // API doesn't have any option to send sensible query - I could write query for nested object but in my opinion is not worth it for illustrative task
}

const addUser = () => router.push({ name: 'addUser' })
const editUser = (id: number) => router.push({ name: 'editUser', params: { id } })

const deleteUser = async (id: number) => {
  try {
    if (state.loading) return
    state.loading = true
    await axios.delete(`https://reqres.in/api/users/${id}`)
    const index = state.userList.findIndex((u) => u.id === id)
    if (index != -1) state.userList.splice(index, 1)
    // Response is 204 so empty ( also it doesn't change anything in db ) - code with index above is only for representation of deleting users
    // await getUsers()
  } catch (error) {
    console.error(error)
  } finally {
    state.loading = false
  }
}

const getUsers = async (page = state.currentPage) => {
  try {
    state.listLoading = true
    const { data } = await axios.get(`https://reqres.in/api/users?page=${page}`)
    state.pages = data.total_pages
    state.currentPage = data.page
    state.userList = data.data
  } catch (error) {
    console.error(error)
  } finally {
    state.listLoading = false
  }
}
onMounted(async () => {
  await getUsers()
})
</script>
<style scoped lang="scss">
.view {
  display: flex;
  flex-direction: column;
}
.container {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1.5rem 1rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 1px 1px 1px #e3e3e3;
}
.is-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-list {
  margin-top: 2rem;
  padding: 0;
}
.user-list__header {
  .user-name,
  .user-actions {
    font-weight: bold;
  }
}
.user-list__row {
  border-radius: 8px;
  &:nth-child(2n) {
    background-color: #f3f3f3;
  }
}
.user-list__header,
.user-list__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  padding: 0.5rem 0;
}
.user-avatar {
  display: flex;
  flex-grow: 1;
  margin-left: 0.5rem;
  .avatar {
    top: 50%;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
}
.user-name {
  flex-grow: 7;
  /* font-weight:; */
  /* width: 2rem;
  height: 2rem;
  border-radius: 50%; */
}
.user-actions {
  flex-grow: 2;
  /* width: 2rem;
  height: 2rem;
  border-radius: 50%; */
}

.slide-enter {
  transform: translateX(50rem);
  opacity: 1;
}

.slide-enter-active {
  transition: all 1s ease-in-out 0s !important;
}

.slide-leave-to {
  transform: translateX(-50rem);
  opacity: 0;
}

.slide-leave-active {
  transition: all 1s ease-in-out 0s !important;
}

/* animation button random (WITH THE NAME SLIDE) */
.slide-move {
  transition: all 0.5s ease-out 0s !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@media (max-width: 576px) {
  .is-flex {
    flex-direction: column;
  }
  .searchbar {
    margin-bottom: 1rem;
  }
}
</style>
