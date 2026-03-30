import { searchDataSet } from '@/dataset'
import type { searchData } from '@/type/searchData'
import type { sortType } from '@/type/sortType'
import { sortBy } from './sort_helper'

export function* paginateSearch(
  query: string,
  type: sortType,
  pageSize: number = 10,
): Generator<searchData[]> {
  const matches = searchDataSet.filter((item) => item.title.includes(query)).sort(sortBy(type))

  for (let i = 0; i < matches.length; i += pageSize) {
    yield matches.slice(i, i + pageSize)
  }
}
