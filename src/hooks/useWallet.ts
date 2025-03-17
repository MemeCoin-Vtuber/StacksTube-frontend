import { useState, useEffect, useCallback } from 'react'
import { showConnect } from '@stacks/connect'
import { SITE_CONFIG } from '@/config/constants'

export function useWallet() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const clearSession = useCallback(() => {
    try {
      localStorage.removeItem('blockstack-session')
      localStorage.removeItem('stacks-session')
    } catch (e) {
      console.warn('Failed to clear session:', e)
    }
  }, [])

  const connect = useCallback(async () => {
    clearSession()
    
    return new Promise<boolean>((resolve) => {
      showConnect({
        appDetails: {
          name: SITE_CONFIG.name,
          icon: window.location.origin + '/icon.png',
        },
        onFinish: (data) => {
          setIsConnected(true)
          setAddress(data.userAddress)
          resolve(true)
        },
        onCancel: () => {
          resolve(false)
        },
      })
    })
  }, [clearSession])

  const disconnect = useCallback(() => {
    clearSession()
    setIsConnected(false)
    setAddress(null)
  }, [clearSession])

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        // Add your session checking logic here
        setIsLoading(false)
      } catch (e) {
        console.error('Session check failed:', e)
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  return {
    isConnected,
    address,
    isLoading,
    connect,
    disconnect,
  }
}