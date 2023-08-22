<template>
  <font-awesome-icon :icon="icon" class="icon" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  iconFamily: {
    type: String,
    default: 'classic'
  },
  iconType: {
    type: String,
    default: 'solid'
  },
  iconColor: {
    type: String,
    default: 'white'
  },
  iconName: String
})

const icon = computed(() => `fa-${props.iconType} fa-${props.iconName}`)
const color = computed(() => props.iconColor)
</script>

<style scoped>
.icon {
  font-size: 0.75rem;
  color: v-bind(color);
}
</style>
