import React, { createContext, useContext, useMemo } from 'react';
import { GoogleRepository, GoogleRepositoryImpl } from '@/main/repositories/GoogleRepository';

interface GoogleRepositoryContextValue {
  googleRepository: GoogleRepository;
}

const GoogleRepositoryContext = createContext<GoogleRepositoryContextValue | undefined>(undefined);

interface GoogleRepositoryProviderProps {
  children: React.ReactNode;
}

export const GoogleRepositoryProvider: React.FC<GoogleRepositoryProviderProps> = ({ children }) => {
  const googleRepository = useMemo(() => new GoogleRepositoryImpl(), []);

  const value = useMemo(() => ({
    googleRepository
  }), [googleRepository]);

  return (
    <GoogleRepositoryContext.Provider value={value}>
      {children}
    </GoogleRepositoryContext.Provider>
  );
};

export const useGoogleRepository = (): GoogleRepository => {
  const context = useContext(GoogleRepositoryContext);
  if (!context) {
    throw new Error('useGoogleRepository must be used within GoogleRepositoryProvider');
  }
  return context.googleRepository;
};