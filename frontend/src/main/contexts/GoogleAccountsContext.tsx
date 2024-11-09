import {createContext, useState} from "react";
import {GoogleAccount} from "@/main/model/GoogleAccount.ts";

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

export const GoogleAccountsContextProvider = ({children}: Props) => {
  const [selectedAccount, setSelectedAccount] = useState<GoogleAccount | null>(null)

  return (
    <GoogleAccountsContext.Provider value={{selectedAccount, setSelectedAccount}}>
      {children}
    </GoogleAccountsContext.Provider>
  )
}