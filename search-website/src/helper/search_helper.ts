import { searchDataSet } from '@/dataset'
import type { searchData } from '@/type/searchData'
import type { sortType } from '@/type/sortType'
import { sortBy } from './sort_helper'

export interface SearchSession {
  total: number
  pages: Generator<searchData[]>
}

function getMatches(query: string, type: sortType): searchData[] {
  return searchDataSet.filter((item) => item.title.includes(query)).sort(sortBy(type))
}

export function* paginateSearch(
  query: string,
  type: sortType,
  pageSize: number = 10,
): Generator<searchData[]> {
  const matches = getMatches(query, type)

  for (let i = 0; i < matches.length; i += pageSize) {
    yield matches.slice(i, i + pageSize)
  }
}

export function createSearchSession(
  query: string,
  type: sortType,
  pageSize: number = 10,
): SearchSession {
  const matches = getMatches(query, type)

  return {
    total: matches.length,
    pages: paginateSearch(query, type, pageSize),
  }
}
