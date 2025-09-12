export interface Article {
  id: number
  name: string
  quantity: number
  unit: string
  lowThreshold: number
}


export interface UpdateArticleRequest {
  quantity: number
}

export interface ApiError {
  timestamp: string
  status: number
  error: string
  message: string
  fieldErrors?: Record<string, string>
}