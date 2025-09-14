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


// Example of custom hook for presentation purpose only
export function useArticles_Example() {
  const [data, setData] = useState<Article[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<ApiError | null>(null)
  const [isPending, setIsPending] = useState<boolean>(false)

  const fetchArticles = async () => {
    try {
      setIsLoading(true)
      const articles = await getAllArticles()
      setData(articles)
    } catch (error) {
      setError(error as ApiError)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  return { data, isLoading, error, isPending, refetch: fetchArticles }
}