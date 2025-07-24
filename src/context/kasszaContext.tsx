import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router';

interface KasszaContextType {
  kassza: number;
  name: string;
  token: string;
  setKassza: (kassza: number) => void;
  setName: (name: string) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

const KasszaContext = createContext<KasszaContextType>({
  kassza: 0,
  name: '',
  token: '',
  setKassza: () => {
  },
  setName: () => {
  },
  setToken: () => {
  },
  logout: () => {
  },
});

export const useKassza = () => useContext(KasszaContext);

export default function KasszaContextProvider({ children }: { children: React.ReactNode }) {
  const [kassza, setKassza] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const navigate = useNavigate();

  const logout = () => {
    setKassza(0);
    setName('');
    setToken('');
    localStorage.removeItem('kassza');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <KasszaContext.Provider value={{ kassza, name, token, setKassza, setName, setToken, logout }}>
      {children}
    </KasszaContext.Provider>
  );
}
