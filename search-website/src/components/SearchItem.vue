<script setup lang="ts">
import type { searchData } from '@/type/searchData'

const props = defineProps<{
  data: searchData
}>()

const [title, breadcumbs, description] = props.data.text.split('\n')
const createdAt = new Date(props.data.created_at)
</script>
<template>
  <div class="flex-col p-2">
    <div class="text-sm text-gray-400">
      {{ breadcumbs }}
    </div>
    <a :href="props.data.url" class="text-xl text-blue-600">{{ title }}</a>
    <div>
      <span class="text-sm text-gray-400 px-2">
        {{ createdAt.toDateString() }}
      </span>
      <span class="text-lg text-gray-800 overflow-auto">
        {{ description }}
      </span>
    </div>
  </div>
</template>
