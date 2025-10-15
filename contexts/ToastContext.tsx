import React, { createContext, useContext, useState } from 'react';

type Toast = { id: string; title: string; type?: 'success'|'error'|'info' };

type ToastCtx = { show: (title: string, type?: Toast['type']) => void };

const Ctx = createContext<ToastCtx | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const show = (title: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, title, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  };
  return (
    <Ctx.Provider value={{ show }}>
      {children}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div key={t.id} className={`px-4 py-2 rounded shadow text-white ${t.type==='success'?'bg-green-600':t.type==='error'?'bg-red-600':'bg-slate-700'}`}>{t.title}</div>
        ))}
      </div>
    </Ctx.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};
