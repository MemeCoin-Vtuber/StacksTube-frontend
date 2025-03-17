import { z } from 'zod'

export const TokenSchema = z.object({
  name: z.string().min(3).max(50),
  symbol: z.string().min(2).max(10),
  description: z.string().min(10).max(500),
  image: z.string().url().optional(),
  attributes: z.array(
    z.object({
      trait_type: z.string(),
      value: z.union([z.string(), z.number()]),
    })
  ).optional(),
})

export const CharacterSchema = z.object({
  name: z.string().min(2).max(50),
  personality: z.enum(['friendly', 'mysterious', 'energetic', 'calm']),
  voiceType: z.enum(['male', 'female', 'neutral']),
  customTraits: z.array(z.string()).optional(),
  imageUrl: z.string().url().optional(),
})

export type Token = z.infer<typeof TokenSchema>
export type Character = z.infer<typeof CharacterSchema>