import React, { createContext, useContext } from 'react';

const Ctx = createContext<{ notify: (msg: string)=>void } | null>(null);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const notify = (msg: string) => console.log('[notify]', msg);
  return <Ctx.Provider value={{ notify }}>{children}</Ctx.Provider>;
};

export const useNotification = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
};
