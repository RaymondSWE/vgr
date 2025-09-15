import { useQuery } from '@tanstack/react-query'
import { getAllArticles } from '@/lib/services/articles'

export function useArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: getAllArticles,
    staleTime: 60000, 
  })
}

