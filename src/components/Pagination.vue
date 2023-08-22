<template>
  <div class="pagination">
    <button :class="{ '-disabled': currentPage === 1 }" class="pagination-button" @click="prevPage">
      <Icon iconName="angles-left" iconColor="#2d884b" />
    </button>
    <button
      v-for="page in pages"
      :key="page"
      :class="{ '-active': currentPage === page }"
      class="pagination-button"
      @click="selectPage(page)"
      v-text="page"
    />

    <button
      :class="{ '-disabled': currentPage === pages }"
      class="pagination-button"
      @click="nextPage"
    >
      <Icon iconName="angles-right" iconColor="#2d884b" />
    </button>
  </div>
</template>

<script setup lang="ts">
import Icon from './Icon.vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  pages: { type: Number, required: true }
})
const emit = defineEmits(['selectPage'])

const prevPage = () => {
  if (props.currentPage === 1) return
  const selectedPage = props.currentPage - 1
  emit('selectPage', selectedPage)
}

const selectPage = (page: number) => {
  if (props.currentPage === page) return
  emit('selectPage', page)
}

const nextPage = () => {
  if (props.currentPage === props.pages) return
  const selectedPage = props.currentPage + 1
  emit('selectPage', selectedPage)
}
</script>

<style lang="scss" scoped>
.pagination-button {
  width: 1.5rem;
  height: 1.5rem;
  color: #2d884b;
  border: 1px #e3e3e3 solid;
  background-color: #fff;
  &.-active {
    color: #fff;
    background-color: #2d884b;
    &:hover {
      cursor: default;
      background-color: #2d884b;
    }
  }
  &.-disabled {
    background-color: #e3e3e3;
    &:hover {
      cursor: default;
    }
  }
  &:hover {
    cursor: pointer;
    background-color: #e3e3e3;
  }
}
@media (max-width: 576px) {
  .pagination {
    margin: auto;
  }
}
</style>
