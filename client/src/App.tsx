import { TypographyH1, TypographyP } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArticleList } from '@/components/article/article-list'
import { ArticleForm } from './components/article/article-form'
import { useArticleMutations } from './lib/hooks/use-article-mutation'
import { Plus } from 'lucide-react'
import type { ArticleFormValues } from './lib/schemas/article-schema'

function App() {
    const { createArticle } = useArticleMutations()
    
    const handleCreateArticle = async (data: ArticleFormValues) => {
      await createArticle.mutateAsync(data)
    }


  return (
    <div className="container mx-auto p-6 max-w-8xl">
    <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 mb-6">
        <TypographyH1>Lagerhantering - Vårdcentral</TypographyH1>
        
        <ArticleForm
          onSubmit={handleCreateArticle}
          trigger={
            <Button>
              <Plus  />
              Lägg till artikel
            </Button>
          }
        />
      
      </div>
      <TypographyP className='text-center sm:text-left'>
        Hantera sjukvårdsmaterial enkelt och effektivt. Uppdatera lagerstatus och få varningar när material börjar ta slut.
      </TypographyP>
      
      <Separator className='my-6'/>

      
      <ArticleList />
    </div>
  )
}

export default App