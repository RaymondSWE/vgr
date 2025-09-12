import type { Article, UpdateArticleRequest } from "../types/article"


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

export async function getAllArticles(): Promise<Article[]> {
  const response = await fetch(`${API_BASE_URL}/articles`)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch articles: ${response.status}`)
  }
  
  return response.json()
}

export async function createArticle(article: Article): Promise<Article> {
  const response = await fetch(`${API_BASE_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article)
  })
  
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to create article')
  }
  
  return response.json()
}

export async function updateArticleQuantity(id: number, update: UpdateArticleRequest): Promise<Article> {
  const response = await fetch(`${API_BASE_URL}/articles/${id}/quantity`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(update)
  })
  
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to update article')
  }
  
  return response.json()
}

export async function deleteArticle(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
    method: 'DELETE',
  })
  
  if (!response.ok) {
    throw new Error(`Failed to delete article: ${response.status}`)
  }
}

export async function updateArticle(id: number, article: Omit<Article, 'id'>): Promise<Article> {
  const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article)
  })
  
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to update article')
  }
  
  return response.json()
}