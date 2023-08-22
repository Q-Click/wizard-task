<template>
  <div class="searchbar">
    <input type="text" class="searchbar-input" placeholder="Search for users..." />
    <Icon icon-name="magnifying-glass" icon-color="grey" class="blended-icon" />
  </div>
</template>

<script setup lang="ts">
import Icon from './Icon.vue'
</script>

<style scoped>
.searchbar {
  position: relative;
}
.searchbar-input {
  background-color: #eeeeee;
  border-radius: 8px;
  border: none;
  height: 30px;
  padding: 0.5rem;
  width: 300px;
}
.blended-icon {
  position: absolute;
  right: 0.25rem;
  top: 0.5rem;
  margin-right: 0.5rem;
}
@media (max-width: 576px) {
  .searchbar-input {
    width: 100%;
  }
}
</style>
