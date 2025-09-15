import { useQuery } from '@tanstack/react-query'
import { getAllArticles } from '@/lib/services/articles'
import type { ApiError, Article } from '../types/article'
import { useEffect, useState } from 'react'

export function useArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: getAllArticles,
    staleTime: 60000, 
  })
}

