<template>
  <div class="view">
    <div class="container container-form">
      <div class="form">
        <div class="form-cell">
          <label class="form-cell__label" v-text="'First Name'" />
          <input class="form-cell__input" placeholder="Adam" type="text" v-model="state.userName" />
        </div>
        <div class="form-cell">
          <label class="form-cell__label" v-text="'Last Name'" />
          <input
            class="form-cell__input"
            placeholder="Kukliński"
            type="text"
            v-model="state.userSurname"
          />
        </div>
      </div>
      <div
        v-if="state.errors.length > 0"
        class="error-message"
        style="color: red"
        v-text="'There are some errors in form'"
      />
      <div>
        <ActionButton
          title="Update Details"
          event="updateDetails"
          class="details-button"
          @updateDetails="updateDetails"
        />
      </div>
    </div>
    <div class="container container-avatar">
      <input
        type="file"
        ref="file_input"
        accept="image/*"
        style="display: none"
        @change="onChange"
      />
      <img :src="currentAvatarSrc" alt="avatar" class="avatar" />
      <ActionButton
        icon="camera"
        iconColor="grey"
        textColor="grey"
        title="Change Photo"
        event="changePhoto"
        class="avatar-button"
        @changePhoto="changePhoto"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import ActionButton from '../components/ActionButton.vue'
import placeholderUrl from '../assets/placeholder.png'
import router from '@/router'
import axios from 'axios'

const state = reactive({
  loading: true,
  user: {},
  userName: '',
  userSurname: '',
  errors: []
})
const file_input = ref()
const currentUserID = computed(() => router.currentRoute.value.params?.id)
const currentAvatarSrc = computed(() => (currentUserID.value ? state.user.avatar : placeholderUrl))

const changePhoto = () => {
  file_input.value.click()
}
const onChange = (e: any) => {
  const file = e.target.files[0]
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = (e) => {
    state.user.avatar = e?.target?.result
  }
}
const updateDetails = async () => {
  if (!state.userName || !state.userSurname) return state.errors.push('err')
  state.errors = []
  // Form also should have more developed form checking and throwing errors but becasue its recruitment task i will omit this
  const id = currentUserID.value
  const payload = {
    first_name: state.userName,
    last_name: state.userSurname
    // Avatar is still not correct link to resource so it is just for representation
    // avatar: state.user.avatar
  }
  id
    ? await axios.patch(`https://reqres.in/api/users/${currentUserID.value}`, payload)
    : await axios.post(`https://reqres.in/api/users`, payload)
  router.push({ name: 'userList' })
}
const getUser = async () => {
  try {
    if (currentUserID.value) {
      const { data } = await axios.get(`https://reqres.in/api/users/${currentUserID.value}`)
      state.user = data.data
      state.userName = state.user.first_name
      state.userSurname = state.user.last_name
    }
  } catch (error) {
    console.error(error)
  } finally {
    state.loading = false
  }
}

onMounted(async () => {
  await getUser()
})
</script>
<style scoped lang="scss">
.view {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.container {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1.5rem 1rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 1px 1px 1px #e3e3e3;
  flex-grow: 2;
}
.container-form {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.form {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-cell {
  display: flex;
  flex-direction: column;
  width: 48%;
}
.form-cell__label {
  color: grey;
  font-weight: bold;
  font-size: 0.8rem;
}
.form-cell__input {
  margin-top: 0.5rem;
  height: 1.7rem;
  padding: 0.75rem;
  font-size: 0.7rem;
  color: #585858;
  border-radius: 4px;
  border: 1px solid grey;
}

.details-button {
  display: inline-block !important;
}
.container-avatar {
  margin-left: 1rem;
  flex-grow: 1;
  text-align: center;
}
.avatar {
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
  margin: 2rem 0;
}
.avatar-button {
  justify-content: center;
  background-color: #fff !important;
  border: 1px grey solid;
  &:hover {
    background-color: #e3e3e3 !important;
  }
}
@media (max-width: 768px) {
  .view {
    flex-direction: column;
  }
  .container-avatar {
    margin-left: 0;
  }
  .details-button {
    display: inline-block !important;
    margin-top: 1rem;
  }
}
@media (max-width: 576px) {
  .form {
    margin-top: 0;
    flex-direction: column;
  }
  .form-cell {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
