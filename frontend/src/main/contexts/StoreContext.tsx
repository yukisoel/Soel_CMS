import {createContext, useState} from "react";

interface StoreContextState {
  name: string
  setName: React.Dispatch<React.SetStateAction<string>>
}

type Props = {
  children: React.ReactNode
}

export const StoreContext = createContext<StoreContextState>({
  name: '',
  setName: () => {}
})

export const StoreContextProvider = ({children}: Props) => {
  const [name, setName] = useState<string>('')

  return (
    <StoreContext.Provider value={{name, setName}}>
      {children}
    </StoreContext.Provider>
  )
}