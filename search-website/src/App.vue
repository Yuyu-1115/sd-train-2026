<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import SearchItem from './components/SearchItem.vue'
import { sortType } from './type/sortType'
import { sortOptions } from './helper/sort_helper'
import { useRoute, useRouter } from 'vue-router'
import type { searchData } from './type/searchData'
import { createSearchSession } from './helper/search_helper'

const router = useRouter()
const route = useRoute()

const searchQuery = ref((route.query.q as string) || '')
const sortOption = ref((route.query.s as unknown as sortType) || sortType.POPULARITY)

const searcher = ref<Generator<searchData[]>>()
const result = ref<searchData[]>([])
const hasMore = ref(true)
const totalResults = ref(0)

const startSearch = () => {
  const session = createSearchSession(searchQuery.value, sortOption.value)
  totalResults.value = session.total
  searcher.value = session.pages
  const firstChunk = searcher.value.next()
  result.value = firstChunk.value || []
  hasMore.value = !firstChunk.done
}

const updateUrl = () =>
  router.push({
    query: {
      q: searchQuery.value,
      s: sortOption.value,
    },
  })

const loadMore = () => {
  if (!searcher.value) {
    return
  }
  const nextChunk = searcher.value.next()
  if (!nextChunk.done) {
    result.value.push(...nextChunk.value)
  } else {
    hasMore.value = false
  }
}

watch(
  () => route.query,
  (newQuery) => {
    searchQuery.value = (newQuery.q as string) || ''
    sortOption.value = (newQuery.s as sortType) || sortType.POPULARITY
    startSearch()
  },
  { deep: true },
)

onMounted(() => startSearch())
</script>

<template>
  <div class="box-border flex-col min-h-screen h-full p-5">
    <div class="flex flex-wrap items-center justify-between min-h-1/3 px-3 py-2 gap-1 md:p-10">
      <div class="text-3xl order-1">SD Search</div>
      <div class="flex w-full md:w-auto md:flex-1 md:mx-4 order-3 md:order-2 items-center gap-2">
        <input
          type="text"
          v-model="searchQuery"
          @change="updateUrl"
          class="w-full h-10 border border-gray-300 rounded-full px-4 outline-none focus:ring-2"
        />
        <button
          @click="updateUrl"
          class="h-10 px-5 border rounded-full border-gray-300 font-medium whitespace-nowrap"
        >
          搜尋
        </button>
      </div>
      <img
        src="/NCULogo.svg"
        alt="NCU Logo"
        class="w-10 h-10 border border-gray-300 rounded-full order-2 md:order-3 object-contain"
      />
    </div>
    <div class="flex flex-col grow h-full gap-5">
      <p>共找到 {{ totalResults }} 筆結果</p>
      <div class="flex gap-2">
        <p>排序方式</p>
        <select v-model="sortOption" @change="updateUrl" class="border rounded-sm">
          <option v-for="option in sortOptions" :key="option.type" :value="option.type">
            {{ option.name }}
          </option>
        </select>
      </div>
      <SearchItem v-for="data in result" :key="data.url_path" :data="data" />
      <button v-if="hasMore" class="w-full border rounded-sm" @click="loadMore">載入更多</button>
    </div>
  </div>
</template>

<style scoped></style>
