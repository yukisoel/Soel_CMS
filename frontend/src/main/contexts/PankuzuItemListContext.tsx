import { createContext, useState } from 'react'
import { PankuzuItem } from '@/main/common/Pankuzu.tsx'

interface PankuzuItemListContextState {
  pankuzuItemList: PankuzuItem[]
  setPankuzuItemList: React.Dispatch<React.SetStateAction<PankuzuItem[]>>
}

type Props = {
  children: React.ReactNode
}

export const PankuzuItemListContext = createContext<PankuzuItemListContextState>({
  pankuzuItemList: [],
  setPankuzuItemList: () => {}
})

export const PankuzuListContextProvider = ({ children }: Props) => {
  const [pankuzuItemList, setPankuzuItemList] = useState<PankuzuItem[]>([])

  return (
    <PankuzuItemListContext.Provider value={{ pankuzuItemList: pankuzuItemList, setPankuzuItemList: setPankuzuItemList }}>
      {children}
    </PankuzuItemListContext.Provider>
  )
}