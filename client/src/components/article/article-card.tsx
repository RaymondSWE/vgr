import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
  CardFooter,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { TypographySmall, TypographyMuted } from "@/components/ui/typography"
import type { Article } from "@/lib/types/article"
import { MoreVertical, Edit, Trash2, AlertTriangle, Plus, Minus } from "lucide-react"
import { ArticleForm } from "./article-form"

interface ArticleCardProps {
  article: Article
  onEdit?: (id: number, data: Article) => void
  onDelete?: (id: number) => void
  onUpdateQuantity?: (id: number, quantity: number) => void
}

export function ArticleCard({ article, onEdit, onDelete, onUpdateQuantity }: ArticleCardProps) {
  const isLowStock = article.quantity <= article.lowThreshold

   const handleEditSubmit = async (data: any) => {
    if (onEdit) {
      await onEdit(article.id, data)
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{article.name}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <span>{article.quantity} {article.unit}</span>
          {isLowStock && (
            <Badge variant="destructive" >
              <AlertTriangle />
              Lågt lager
            </Badge>
          )}
        </CardDescription>
        
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical  />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
            <ArticleForm
                initialData={article}
                onSubmit={handleEditSubmit}
                trigger={
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Edit  />
                    Redigera artikel
                  </DropdownMenuItem>
                }
              />
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onUpdateQuantity?.(article.id, article.quantity + 5)}
              >
                <Plus />
                Lägg till 5 {article.unit}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onUpdateQuantity?.(article.id, Math.max(0, article.quantity - 5))}
                disabled={article.quantity < 5}
              >
                <Minus />
                Ta bort 5 {article.unit}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDelete?.(article.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2  className=" text-destructive"/>
                Ta bort artikel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <TypographyMuted>Nuvarande lager:</TypographyMuted>
          <TypographySmall className={`font-medium ${isLowStock ? 'text-destructive' : 'text-foreground'}`}>
            {article.quantity} {article.unit}
          </TypographySmall>
        </div>
        
        <div className="flex justify-between text-sm">
          <TypographyMuted>Lågt lager-gräns:</TypographyMuted>
          <TypographySmall>{article.lowThreshold} {article.unit}</TypographySmall>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => onUpdateQuantity?.(article.id, article.quantity - 1)}
            disabled={article.quantity <= 0}
            className="w-full sm:flex-1 sm:min-w-0"
          >
            <span>Förbruka 1</span>
            <Minus />
          </Button>
          
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => onUpdateQuantity?.(article.id, article.quantity + 10)}
            className="w-full sm:flex-1 sm:min-w-0"
          >
            <span>Påfyllnad 10</span>
            <Plus />
          </Button>
      </CardFooter>
    </Card>
  )
}