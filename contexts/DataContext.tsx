import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  ITEquipment, 
  Staff, 
  EquipmentType, 
  Manufacturer, 
  Unit, 
  License, 
  Allocation, 
  Maintenance, 
  Transfer 
} from '../types';
import { 
  equipmentApi, 
  staffApi, 
  equipmentTypesApi, 
  manufacturersApi, 
  unitsApi, 
  licensesApi, 
  allocationsApi, 
  maintenanceApi, 
  transfersApi 
} from '../services/api';

interface DataContextType {
  // Equipment
  equipment: ITEquipment[];
  equipmentTypes: EquipmentType[];
  manufacturers: Manufacturer[];
  
  // Staff & Units
  staff: Staff[];
  units: Unit[];
  
  // Licenses
  licenses: License[];
  
  // Operations
  allocations: Allocation[];
  maintenance: Maintenance[];
  transfers: Transfer[];
  
  // Loading states
  loading: {
    equipment: boolean;
    staff: boolean;
    equipmentTypes: boolean;
    manufacturers: boolean;
    units: boolean;
    licenses: boolean;
    allocations: boolean;
    maintenance: boolean;
    transfers: boolean;
  };
  
  // Refresh functions
  refreshEquipment: () => Promise<void>;
  refreshStaff: () => Promise<void>;
  refreshEquipmentTypes: () => Promise<void>;
  refreshManufacturers: () => Promise<void>;
  refreshUnits: () => Promise<void>;
  refreshLicenses: () => Promise<void>;
  refreshAllocations: () => Promise<void>;
  refreshMaintenance: () => Promise<void>;
  refreshTransfers: () => Promise<void>;
  refreshAll: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [equipment, setEquipment] = useState<ITEquipment[]>([]);
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [maintenance, setMaintenance] = useState<Maintenance[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  
  const [loading, setLoading] = useState({
    equipment: true,
    staff: true,
    equipmentTypes: true,
    manufacturers: true,
    units: true,
    licenses: true,
    allocations: true,
    maintenance: true,
    transfers: true
  });

  const refreshEquipment = async () => {
    setLoading(prev => ({ ...prev, equipment: true }));
    try {
      const data = await equipmentApi.getAll();
      setEquipment(data);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    } finally {
      setLoading(prev => ({ ...prev, equipment: false }));
    }
  };

  const refreshStaff = async () => {
    setLoading(prev => ({ ...prev, staff: true }));
    try {
      const data = await staffApi.getAll();
      setStaff(data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(prev => ({ ...prev, staff: false }));
    }
  };

  const refreshEquipmentTypes = async () => {
    setLoading(prev => ({ ...prev, equipmentTypes: true }));
    try {
      const data = await equipmentTypesApi.getAll();
      setEquipmentTypes(data);
    } catch (error) {
      console.error('Error fetching equipment types:', error);
    } finally {
      setLoading(prev => ({ ...prev, equipmentTypes: false }));
    }
  };

  const refreshManufacturers = async () => {
    setLoading(prev => ({ ...prev, manufacturers: true }));
    try {
      const data = await manufacturersApi.getAll();
      setManufacturers(data);
    } catch (error) {
      console.error('Error fetching manufacturers:', error);
    } finally {
      setLoading(prev => ({ ...prev, manufacturers: false }));
    }
  };

  const refreshUnits = async () => {
    setLoading(prev => ({ ...prev, units: true }));
    try {
      const data = await unitsApi.getAll();
      setUnits(data);
    } catch (error) {
      console.error('Error fetching units:', error);
    } finally {
      setLoading(prev => ({ ...prev, units: false }));
    }
  };

  const refreshLicenses = async () => {
    setLoading(prev => ({ ...prev, licenses: true }));
    try {
      const data = await licensesApi.getAll();
      setLicenses(data);
    } catch (error) {
      console.error('Error fetching licenses:', error);
    } finally {
      setLoading(prev => ({ ...prev, licenses: false }));
    }
  };

  const refreshAllocations = async () => {
    setLoading(prev => ({ ...prev, allocations: true }));
    try {
      const data = await allocationsApi.getAll();
      setAllocations(data);
    } catch (error) {
      console.error('Error fetching allocations:', error);
    } finally {
      setLoading(prev => ({ ...prev, allocations: false }));
    }
  };

  const refreshMaintenance = async () => {
    setLoading(prev => ({ ...prev, maintenance: true }));
    try {
      const data = await maintenanceApi.getAll();
      setMaintenance(data);
    } catch (error) {
      console.error('Error fetching maintenance:', error);
    } finally {
      setLoading(prev => ({ ...prev, maintenance: false }));
    }
  };

  const refreshTransfers = async () => {
    setLoading(prev => ({ ...prev, transfers: true }));
    try {
      const data = await transfersApi.getAll();
      setTransfers(data);
    } catch (error) {
      console.error('Error fetching transfers:', error);
    } finally {
      setLoading(prev => ({ ...prev, transfers: false }));
    }
  };

  const refreshAll = async () => {
    await Promise.all([
      refreshEquipment(),
      refreshStaff(),
      refreshEquipmentTypes(),
      refreshManufacturers(),
      refreshUnits(),
      refreshLicenses(),
      refreshAllocations(),
      refreshMaintenance(),
      refreshTransfers()
    ]);
  };

  useEffect(() => {
    refreshAll();
  }, []);

  return (
    <DataContext.Provider value={{
      equipment,
      equipmentTypes,
      manufacturers,
      staff,
      units,
      licenses,
      allocations,
      maintenance,
      transfers,
      loading,
      refreshEquipment,
      refreshStaff,
      refreshEquipmentTypes,
      refreshManufacturers,
      refreshUnits,
      refreshLicenses,
      refreshAllocations,
      refreshMaintenance,
      refreshTransfers,
      refreshAll
    }}>
      {children}
    </DataContext.Provider>
  );
};