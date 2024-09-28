import {createContext, useEffect, useState} from "react";
import {GoogleService} from "@/main/services/GoogleService.ts";

export type GoogleAccount = {
  name: string //accountId
  accountName: string
}

interface InitialState {
  accountList: GoogleAccount[]
  setAccountList: React.Dispatch<React.SetStateAction<GoogleAccount[]>>
  selectedAccount: GoogleAccount | null
  setSelectedAccount: React.Dispatch<React.SetStateAction<GoogleAccount | null>>

}

type Props = {
  children: React.ReactNode
  googleService: GoogleService
}

export const GoogleAccountsContext = createContext<InitialState>({
  accountList: [],
  setAccountList: () => {},
  selectedAccount: null,
  setSelectedAccount: () => {}
})

export const GoogleAccountsContextProvider = ({children, googleService}: Props) => {
  const [accountList, setAccountList] = useState<GoogleAccount[]>([])
  const [selectedAccount, setSelectedAccount] = useState<GoogleAccount | null>(null)

  useEffect(() => {
    googleService.getAccounts()
      .then(accountList => {
        setAccountList(accountList)
      })
      .catch(_ => {
        // window.location.href = import.meta.env.VITE_BACKEND_REDIRECT_PATH
      })
  }, [])

  return (
    <GoogleAccountsContext.Provider value={{accountList, setAccountList, selectedAccount, setSelectedAccount}}>
      {children}
    </GoogleAccountsContext.Provider>
  )
}