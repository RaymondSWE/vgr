import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteArticle, updateArticleQuantity, createArticle, updateArticle } from '@/lib/services/articles'
import type { Article } from '@/lib/types/article'
import { toast } from 'sonner'
import { useState } from 'react'

export function useArticleMutations() {
  const queryClient = useQueryClient()
  const [deleteDialogState, setDeleteDialogState] = useState({
    open: false,
    articleId: null as number | null
  })

  const invalidateArticles = () => {
    queryClient.invalidateQueries({ queryKey: ['articles'] })
  }

  const deleteArticleMutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess: invalidateArticles,
    onError: () => toast.error("Failed to delete article")
  })

  const updateQuantityMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: number, quantity: number }) => 
      updateArticleQuantity(id, { quantity }),
    onSuccess: invalidateArticles,
    onError: () => toast.error("Failed to update quantity")
  })

  const createArticleMutation = useMutation({
    mutationFn: (article: Omit<Article, 'id'>) => createArticle(article),
    onSuccess: invalidateArticles,
    onError: () => toast.error("Failed to create article")
  })

  const updateArticleMutation = useMutation({
    mutationFn: ({ id, article }: { id: number, article: Omit<Article, 'id'> }) => 
      updateArticle(id, article),
    onSuccess: invalidateArticles,
    onError: () => toast.error("Failed to update article")
  })

  const openDeleteDialog = (id: number) => {
    setDeleteDialogState({ open: true, articleId: id })
  }

  const confirmDelete = () => {
    if (deleteDialogState.articleId) {
      deleteArticleMutation.mutate(deleteDialogState.articleId)
      setDeleteDialogState({ open: false, articleId: null })
    }
  }

  return {
    deleteArticle: deleteArticleMutation,
    updateQuantity: updateQuantityMutation,
    createArticle: createArticleMutation,
    updateArticle: updateArticleMutation,
    deleteDialog: {
      open: deleteDialogState.open,
      onOpenChange: (open: boolean) => {
        if (!open) setDeleteDialogState({ open: false, articleId: null })
      },
      onConfirm: confirmDelete,
      onTrigger: openDeleteDialog,
      isPending: deleteArticleMutation.isPending
    }
  }
}