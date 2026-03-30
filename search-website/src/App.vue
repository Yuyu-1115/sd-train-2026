<script setup lang="ts">
import { computed, ref } from 'vue'
import SearchItem from './components/SearchItem.vue'
import { searchDataSet } from './dataset'
import { sortType } from './type/sortType'
import { sortBy, sortOptions } from './helper/sort_helper'

const searchPrompt = ref('')
const sortOption = ref(sortType.POPULARITY)
const repository = computed(() => searchDataSet.sort(sortBy(sortOption.value)).slice(0, 10))
</script>

<template>
  <div class="box-border flex-col min-h-screen h-full p-5">
    <div class="flex flex-wrap items-center justify-between min-h-1/3 p-10">
      <div class="text-3xl order-1">SD Search</div>
      <div class="w-full md:w-auto md:flex-1 md:mx-4 order-3 md:order-2">
        <input type="text" :value="searchPrompt" class="w-full border rounded-full p-2" />
      </div>
      <div class="w-10 h-10 order-2 md:order-3">Icon</div>
    </div>
    <div class="flex-col grow h-full gap-5">
      <div class="flex">
        <p>排序方式</p>
        <select v-model="sortOption">
          <option v-for="option in sortOptions" :key="option.type" :value="option.type">
            {{ option.name }}
          </option>
        </select>
      </div>
      <SearchItem v-for="data in repository" :key="data.url_path" :data="data" />
    </div>
  </div>
</template>

<style scoped></style>
