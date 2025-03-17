import { useState, useCallback } from 'react'
import { API_ENDPOINTS } from '@/config/constants'
import type { Character } from '@/lib/schemas'

export function useCharacter() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createCharacter = useCallback(async (data: Character) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(API_ENDPOINTS.character.create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create character')
      }

      return await response.json()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error occurred')
      throw e
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateCharacter = useCallback(async (id: string, data: Partial<Character>) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_ENDPOINTS.character.update}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update character')
      }

      return await response.json()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error occurred')
      throw e
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    isLoading,
    error,
    createCharacter,
    updateCharacter,
  }
}