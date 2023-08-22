<template>
  <header class="route-title" v-text="currentTitle" />
  <RouterView />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import router from './router'

const currentTitle = computed(() => {
  return router.currentRoute.value.meta?.title || ''
})
</script>

<style scoped>
.route-title {
  font-size: 2rem;
}
@media (max-width: 576px) {
  .route-title {
    text-align: center;
  }
}
</style>
