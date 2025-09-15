import { useArticles } from '@/lib/hooks/use-articles'
import { ArticleCard } from './article-card'
import { Loader2 } from "lucide-react"
import { useArticleMutations } from '@/lib/hooks/use-article-mutation'
import { DeleteConfirmDialog } from '../ui/delete-confirm-dialog'
import { TypographyMuted, TypographyP } from '../ui/typography'
import { Button } from '../ui/button'

export function ArticleList() {
  const { data: articles, isLoading, error, isPending, refetch, isRefetching } = useArticles()
  const { 
    updateQuantity, 
    updateArticle,
    deleteDialog 
  } = useArticleMutations()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8 gap-4 flex flex-col items-center">
        <p className="text-destructive">Fel vid laddning av artiklar: {error.message}</p>
        <Button variant="secondary" onClick={() => refetch()} disabled={isRefetching}>
          {isRefetching ? "Laddar..." : "Försök igen"}
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto">
        {articles && articles.length === 0 ? (
          <div className="text-center p-8">
            <TypographyMuted>Inga artiklar hittades. Lägg till din första artikel!</TypographyMuted>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {isPending ? (
              <div className="flex items-center justify-center p-8 col-span-full">
                <Loader2 className="h-8 w-8 animate-spin" />
                <TypographyP className='ml-2'>Uppdaterar...</TypographyP>
              </div>
            ) : null}

            {articles?.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onEdit={(id, data) => updateArticle.mutate({ id, article: data })}
                onDelete={deleteDialog.onTrigger}
                onUpdateQuantity={(id, quantity) => updateQuantity.mutate({ id, quantity })}
              />
            ))}
          </div>
        )}
      </div>

      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={deleteDialog.onOpenChange}
        onConfirm={deleteDialog.onConfirm}
        isPending={deleteDialog.isPending}
      />
    </>
  )
}