<template>
  <li class="user-list__row">
    <div class="user-avatar">
      <img :src="user.avatar" :alt="user.first_name" class="avatar" />
    </div>
    <div class="user-name" v-text="userName" />
    <div class="user-actions">
      <Icon icon-name="pen-to-square" icon-color="#b3b3b3" class="icon" @click="editUser" />
      <Icon icon-name="trash" icon-color="#b3b3b3" class="icon" @click="deleteUser" />
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import Icon from './Icon.vue'
import { UserModel } from '../models/users'

const props = defineProps({
  user: {
    type: Object as PropType<UserModel>,
    required: true
  }
})
const emit = defineEmits(['editUser', 'deleteUser'])

const userName = computed(() => `${props.user.first_name} ${props.user.last_name}`)
const editUser = () => emit('editUser', props.user.id)
const deleteUser = () => emit('deleteUser', props.user.id)
</script>

<style lang="scss" scoped>
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
  max-height: 60px;
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
}
.user-actions {
  flex-grow: 2;
}
.icon {
  margin-right: 0.5rem;
  &:hover {
    cursor: pointer;
    transform: translateY(0.05rem);
  }
}
</style>
