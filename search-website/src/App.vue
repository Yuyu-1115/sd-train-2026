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
    <div class="flex justify-between min-h-1/3 p-10">
      <div class="text-3xl">SD Search</div>
      <input type="text" :value="searchPrompt" class="w-1/2 border-2 rounded-full p-2" />
      <div>*A cool user profile icon*</div>
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
      <SearchItem v-for="data in repository" :key="data.title" :data="data" />
    </div>
  </div>
</template>

<style scoped></style>
