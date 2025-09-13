import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteArticle, updateArticleQuantity, createArticle, updateArticle } from '@/lib/services/articles'
import type { Article } from '@/lib/types/article'
import { toast } from 'sonner'
import { useState } from 'react'

export function useArticleMutations() {
  const queryClient = useQueryClient()
  const [deleteDialogState, setDeleteDialogState] = useState<{
    open: boolean
    articleId: number | null
  }>({
    open: false,
    articleId: null
  })

  const invalidateArticles = () => {
    queryClient.invalidateQueries({ queryKey: ['articles'] })
  }

  const deleteArticleMutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess: invalidateArticles,
    onError: (error) => {
      console.error('Failed to delete article:', error)
      toast.error("Failed to delete article",)
    }
  })

  const updateQuantityMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: number, quantity: number }) => 
      updateArticleQuantity(id, { quantity }),
    onSuccess: invalidateArticles,
    onError: (error) => {
      console.error('Failed to update quantity:', error)
      toast.error("Failed to update quantity")
    }
  })

  const createArticleMutation = useMutation({
    mutationFn: (article: Omit<Article, 'id'>) => createArticle(article),
    onSuccess: invalidateArticles,
    onError: (error) => {
      console.error('Failed to create article:', error)
      toast.error("Failed to create article")
    }
  })

  const updateArticleMutation = useMutation({
    mutationFn: ({ id, article }: { id: number, article: Omit<Article, 'id'> }) => 
      updateArticle(id, article),
    onSuccess: invalidateArticles,
    onError: (error) => {
      console.error('Failed to update article:', error)
      toast.error("Failed to update article")
    }
  })

  const openDeleteDialog = (id: number) => {
    setDeleteDialogState({
      open: true,
      articleId: id
    })
  }

   const closeDeleteDialog = () => {
    setDeleteDialogState({
      open: false,
      articleId: null
    })
  }


  const confirmDelete = () => {
    if (deleteDialogState.articleId) {
      deleteArticleMutation.mutate(deleteDialogState.articleId)
    }
  }

  const updateQuantityWithValidation = (id: number, newQuantity: number) => {
    if (newQuantity >= 0) {
      updateQuantityMutation.mutate({ id, quantity: newQuantity })
    }
  }

  return {
    deleteArticle: {
      mutate: openDeleteDialog,
      isPending: deleteArticleMutation.isPending,
      error: deleteArticleMutation.error,
      reset: deleteArticleMutation.reset
    },
    updateQuantity: {
      mutate: updateQuantityWithValidation,
      isPending: updateQuantityMutation.isPending,
      error: updateQuantityMutation.error,
      reset: updateQuantityMutation.reset
    },
    createArticle: createArticleMutation,
    updateArticle: updateArticleMutation,
    deleteDialog: {
      open: deleteDialogState.open,
      onOpenChange: (open: boolean) => {
        if (!open) closeDeleteDialog()
      },
      onConfirm: confirmDelete,
      isPending: deleteArticleMutation.isPending
    }
  }
}