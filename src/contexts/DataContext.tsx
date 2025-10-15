import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface DataContextType {
  initialized: boolean;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      try {
        await api.initialize();
        setInitialized(true);
      } catch (error) {
        console.error('Failed to initialize data:', error);
      }
    };

    initializeData();
  }, []);

  return (
    <DataContext.Provider value={{ initialized }}>
      {children}
    </DataContext.Provider>
  );
};