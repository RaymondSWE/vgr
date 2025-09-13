import { z } from "zod"

export const articleFormSchema = z.object({
  name: z
    .string()
    .min(1, "Namn är obligatoriskt")
    .max(100, "Namn kan inte överstiga 100 tecken")
    .trim(),
  
  quantity: z
    .number("Antal måste vara ett nummer")
    .min(0, "Antal kan inte vara negativt")
    .int("Antal måste vara ett heltal"),
  
  unit: z
    .string()
    .min(1, "Enhet är obligatorisk")
    .max(50, "Enhet kan inte överstiga 50 tecken")
    .trim(),
  
  lowThreshold: z
    .number("Lågt lager gräns måste vara ett nummer")
    .min(1, "Lågt lager gräns måste vara minst 1")
    .int("Lågt lager gräns måste vara ett heltal")
})

export type ArticleFormValues = z.infer<typeof articleFormSchema>