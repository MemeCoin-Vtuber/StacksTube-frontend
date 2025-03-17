import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Button'
import { CHARACTER_TRAITS } from '@/config/constants'
import { characterSchema, type Character } from '@/lib/schemas'
import { useCharacter } from '@/hooks/useCharacter'

interface CharacterFormProps {
  onSuccess: (character: Character) => void
  defaultValues?: Partial<Character>
}

export function CharacterForm({ onSuccess, defaultValues }: CharacterFormProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const { createCharacter, isLoading, error } = useCharacter()
  
  const form = useForm<Character>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      personality: 'friendly',
      voiceType: 'neutral',
      ...defaultValues,
    },
  })

  const onSubmit = async (data: Character) => {
    try {
      const character = await createCharacter({
        ...data,
        templateId: selectedTemplate,
      })
      onSuccess(character)
    } catch (e) {
      // Error is handled by useCharacter hook
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {CHARACTER_TRAITS.templates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => setSelectedTemplate(template.id)}
            className={`relative aspect-square rounded-lg overflow-hidden border-4 transition-all ${
              selectedTemplate === template.id
                ? 'border-primary scale-[1.02]'
                : 'border-transparent hover:border-gray-200'
            }`}
          >
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
              {template.name}
            </div>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <select {...form.register('personality')} className="w-full p-2 rounded">
          {CHARACTER_TRAITS.personalities.map((personality) => (
            <option key={personality} value={personality}>
              {personality.charAt(0).toUpperCase() + personality.slice(1)}
            </option>
          ))}
        </select>

        <select {...form.register('voiceType')} className="w-full p-2 rounded">
          {CHARACTER_TRAITS.voiceTypes.map((voiceType) => (
            <option key={voiceType} value={voiceType}>
              {voiceType.charAt(0).toUpperCase() + voiceType.slice(1)}
            </option>
          ))}
        </select>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
          disabled={!selectedTemplate}
        >
          Create Character
        </Button>
      </div>
    </form>
  )
}