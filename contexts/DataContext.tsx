import React, { createContext, useContext } from 'react';

const Ctx = createContext<Record<string, unknown> | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Ctx.Provider value={{}}>{children}</Ctx.Provider>;
};

export const useData = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};
