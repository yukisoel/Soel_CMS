import {createContext, useState} from "react";

interface StoreContextState {
  storeName: string
  setStoreName: React.Dispatch<React.SetStateAction<string>>
}

type Props = {
  children: React.ReactNode
}

export const StoreContext = createContext<StoreContextState>({
  storeName: '',
  setStoreName: () => {}
})

export const StoreContextProvider = ({children}: Props) => {
  const [storeName, setStoreName] = useState<string>('')

  return (
    <StoreContext.Provider value={{storeName: storeName, setStoreName: setStoreName}}>
      {children}
    </StoreContext.Provider>
  )
}