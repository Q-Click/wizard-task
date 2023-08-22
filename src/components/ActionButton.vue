<template>
  <div :class="{ '-rounded': rounded }" class="button" @click="click">
    <Icon v-if="icon" :iconName="icon" :iconColor="iconColor" style="margin-right: 0.5rem" />
    <div class="button-text" v-text="title" />
  </div>
</template>

<script setup lang="ts">
import Icon from './Icon.vue'

const props = defineProps({
  title: String,
  icon: String,
  iconColor: String,
  rounded: { type: Boolean, default: false },
  textColor: { type: String, default: '#fff' },
  event: String
})

// normally it should be passed object with button props - which allows button to be more generic
const emit = defineEmits(['addUser', 'changePhoto', 'updateDetails'])
const click = () => emit(props.event)
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  background-color: #2d884b;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  &.-rounded {
    border-radius: 50px;
  }
}
.button:hover {
  cursor: pointer;
  background-color: #206236;
}
.button-text {
  font-size: 0.75rem;
  color: v-bind(textColor);
  margin-right: 0.25rem;
}
</style>
