import { TypographyH1, TypographyH2, TypographyP } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

function App() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <TypographyH1>Lagerhantering - Vårdcentral</TypographyH1>
        <Button>Lägg till artikel</Button>
      </div>
      
      <TypographyP >
        Hantera sjukvårdsmaterial enkelt och effektivt. Uppdatera lagerstatus och få varningar när material börjar ta slut.
      </TypographyP>
      <Separator className='my-4'/>

      <TypographyH2>Artiklar i lager</TypographyH2>
    </div>
  )
}

export default App