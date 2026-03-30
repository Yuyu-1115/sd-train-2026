import type { searchData } from '@/type/searchData'
import type { sortOption } from '@/type/sortOption'
import { sortType } from '@/type/sortType'

const sortByPopularity = (a: searchData, b: searchData) => a.popularity - b.popularity

const sortByTitle = (a: searchData, b: searchData) => a.title.localeCompare(b.title)

const sortByTime = (a: searchData, b: searchData) => {
  const timeA = new Date(a.created_at).getTime()
  const timeB = new Date(b.created_at).getTime()
  return timeB - timeA
}

export const sortBy = (type: sortType) => {
  switch (type) {
    case sortType.POPULARITY:
      return sortByPopularity
    case sortType.TITLE:
      return sortByTitle
    case sortType.TIME:
      return sortByTime
  }
}

export const sortOptions: sortOption[] = [
  { type: sortType.POPULARITY, name: '人氣' },
  { type: sortType.TITLE, name: '標題' },
  { type: sortType.TIME, name: '時間' },
]
