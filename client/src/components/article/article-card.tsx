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
            <Badge variant="destructive" className="text-xs flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Low Stock
            </Badge>
          )}
        </CardDescription>
        
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
            <ArticleForm
                initialData={article}
                onSubmit={handleEditSubmit}
                trigger={
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Article
                  </DropdownMenuItem>
                }
              />
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onUpdateQuantity?.(article.id, article.quantity + 5)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add 5 {article.unit}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onUpdateQuantity?.(article.id, Math.max(0, article.quantity - 5))}
                disabled={article.quantity < 5}
              >
                <Minus className="h-4 w-4 mr-2" />
                Remove 5 {article.unit}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDelete?.(article.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Article
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Current Stock:</span>
          <span className={`font-medium ${isLowStock ? 'text-destructive' : 'text-foreground'}`}>
            {article.quantity} {article.unit}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Low Threshold:</span>
          <span>{article.lowThreshold} {article.unit}</span>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onUpdateQuantity?.(article.id, article.quantity - 1)}
            disabled={article.quantity <= 0}
            className="w-full sm:flex-1 sm:min-w-0"
          >
            <span >Use 1</span>
            <Minus />
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => onUpdateQuantity?.(article.id, article.quantity + 10)}
            className="w-full sm:flex-1 sm:min-w-0"
          >
            <span> Restock 10</span>
            <Plus />
          </Button>
      </CardFooter>
    </Card>
  )
}