import {createContext, useState} from "react";

type InitialState = {
  profile: Profile | null
  setProfile: (profile: Profile | null) => void
}

type Props = {
  children: React.ReactNode
}

export type Profile = {
  email: string
  familyName: string
  givenName: string
  imageUrl: string
}

export  const GoogleAuthContext = createContext<InitialState | null>(null)

export const GoogleAuthContextProvider = ({children}: Props) => {
  const [profile, setProfile] = useState<Profile | null>(null)
  return (
    <GoogleAuthContext.Provider value={{profile, setProfile}}>
      {children}
    </GoogleAuthContext.Provider>
  )
}