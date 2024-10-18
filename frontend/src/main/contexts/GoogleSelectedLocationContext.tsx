import {GoogleLocation} from "@/main/model/GoogleAccount.ts";
import {createContext, useState} from "react";

interface GoogleSelectedLocationContextState {
  googleSelectedLocation: GoogleLocation
  setGoogleSelectedLocation: React.Dispatch<React.SetStateAction<GoogleLocation>>
}

type Props = {
  children: React.ReactNode
}

export const GoogleSelectedLocationContext = createContext<GoogleSelectedLocationContextState>({
  googleSelectedLocation: {name: '', title: ''},
  setGoogleSelectedLocation: () => {}
})

export const GoogleSelectedLocationContextProvider = ({children}: Props) => {
  const [googleSelectedLocation, setGoogleSelectedLocation] = useState<GoogleLocation>({name: '', title: ''})

  return (
    <GoogleSelectedLocationContext.Provider value={{googleSelectedLocation: googleSelectedLocation, setGoogleSelectedLocation: setGoogleSelectedLocation}}>
      {children}
    </GoogleSelectedLocationContext.Provider>
  )
}