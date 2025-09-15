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

