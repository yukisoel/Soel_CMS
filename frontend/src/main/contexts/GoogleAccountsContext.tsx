import { createContext, useState, useEffect } from 'react'
import { GoogleAccount } from '@/types/apiModel.ts'

interface GoogleAccountsContextState {
  selectedAccount: GoogleAccount | null
  setSelectedAccount: React.Dispatch<React.SetStateAction<GoogleAccount | null>>

}

type Props = {
  children: React.ReactNode
}

export const GoogleAccountsContext = createContext<GoogleAccountsContextState>({
  selectedAccount: null,
  setSelectedAccount: () => {}
})

const STORAGE_KEY = 'selectedGoogleAccount'

export const GoogleAccountsContextProvider = ({ children }: Props) => {
  // localStorageから初期値を取得
  const [selectedAccount, setSelectedAccount] = useState<GoogleAccount | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.error('Failed to load selectedAccount from localStorage:', error)
      return null
    }
  })

  // selectedAccountが変更されたらlocalStorageに保存
  useEffect(() => {
    try {
      if (selectedAccount) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedAccount))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch (error) {
      console.error('Failed to save selectedAccount to localStorage:', error)
    }
  }, [selectedAccount])

  return (
    <GoogleAccountsContext.Provider value={{ selectedAccount, setSelectedAccount }}>
      {children}
    </GoogleAccountsContext.Provider>
  )
}
