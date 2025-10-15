// Mock API service that simulates database operations
// In a real application, this would connect to a backend API

import { 
  ITEquipment, 
  Staff, 
  EquipmentType, 
  Manufacturer, 
  Unit, 
  License, 
  Allocation, 
  Maintenance, 
  Transfer, 
  UsageHistory,
  EquipmentStatus,
  Gender,
  UserRole,
  LicenseStatus,
  AllocationStatus,
  MaintenanceStatus,
  Permissions
} from '../types';

// Mock data storage
let equipmentData: ITEquipment[] = [
  {
    id: '1',
    assetTag: 'LT001',
    deviceName: 'Dell Latitude 5420',
    deviceType: 'Laptop',
    serialNumber: 'DL5420001',
    assignedTo: 'Nguyễn Văn An',
    status: EquipmentStatus.IN_USE,
    purchaseDate: '2023-01-15',
    warrantyEndDate: '2026-01-15',
    supplier: 'Dell Technologies',
    operatingSystem: 'Windows 11 Pro',
    ipAddress: '192.168.1.101',
    notes: 'Laptop chính cho nhân viên phát triển',
    unit: 'Phòng Công nghệ thông tin'
  },
  {
    id: '2',
    assetTag: 'PC001',
    deviceName: 'HP ProDesk 400 G7',
    deviceType: 'Desktop',
    serialNumber: 'HP400G7001',
    assignedTo: 'Trần Thị Bình',
    status: EquipmentStatus.AVAILABLE,
    purchaseDate: '2023-03-20',
    warrantyEndDate: '2026-03-20',
    supplier: 'HP Inc.',
    operatingSystem: 'Windows 11 Pro',
    ipAddress: '192.168.1.102',
    notes: 'Máy tính để bàn cho văn phòng',
    unit: 'Phòng Hành chính'
  },
  {
    id: '3',
    assetTag: 'SW001',
    deviceName: 'Cisco Catalyst 2960',
    deviceType: 'Switch',
    serialNumber: 'CSC2960001',
    assignedTo: '',
    status: EquipmentStatus.IN_USE,
    purchaseDate: '2022-11-10',
    warrantyEndDate: '2025-11-10',
    supplier: 'Cisco Systems',
    operatingSystem: 'IOS',
    ipAddress: '192.168.1.1',
    notes: 'Switch mạng chính cho tầng 1',
    unit: 'Phòng Công nghệ thông tin'
  }
];

let staffData: Staff[] = [
  {
    id: '1',
    employeeId: 'admin',
    fullName: 'Quản trị viên',
    email: 'admin@company.com',
    phone: '0123456789',
    unit: 'Phòng Công nghệ thông tin',
    position: 'Quản trị viên hệ thống',
    role: UserRole.ADMIN,
    joinDate: '2020-01-01',
    status: 'Đang hoạt động',
    gender: Gender.MALE,
    permissions: {
      dashboard: { view: true, add: true, edit: true, delete: true },
      equipment: { view: true, add: true, edit: true, delete: true },
      'equipment-types': { view: true, add: true, edit: true, delete: true },
      staff: { view: true, add: true, edit: true, delete: true },
      manufacturers: { view: true, add: true, edit: true, delete: true },
      units: { view: true, add: true, edit: true, delete: true },
      licenses: { view: true, add: true, edit: true, delete: true },
      network: { view: true, add: true, edit: true, delete: true },
      allocation: { view: true, add: true, edit: true, delete: true },
      maintenance: { view: true, add: true, edit: true, delete: true },
      repairs: { view: true, add: true, edit: true, delete: true },
      transfers: { view: true, add: true, edit: true, delete: true },
      'usage-history': { view: true, add: true, edit: true, delete: true },
      reports: { view: true, add: true, edit: true, delete: true },
      permissions: { view: true, add: true, edit: true, delete: true },
      roles: { view: true, add: true, edit: true, delete: true },
      'database-explorer': { view: true, add: true, edit: true, delete: true },
      settings: { view: true, add: true, edit: true, delete: true }
    },
    mustChangePassword: false
  },
  {
    id: '2',
    employeeId: 'NV001',
    fullName: 'Nguyễn Văn An',
    email: 'an.nguyen@company.com',
    phone: '0987654321',
    unit: 'Phòng Công nghệ thông tin',
    position: 'Lập trình viên',
    role: UserRole.EMPLOYEE,
    joinDate: '2022-03-15',
    status: 'Đang hoạt động',
    gender: Gender.MALE,
    permissions: {
      dashboard: { view: true },
      equipment: { view: true, add: false, edit: false, delete: false },
      staff: { view: true },
      reports: { view: true }
    },
    mustChangePassword: true
  },
  {
    id: '3',
    employeeId: 'NV002',
    fullName: 'Trần Thị Bình',
    email: 'binh.tran@company.com',
    phone: '0912345678',
    unit: 'Phòng Hành chính',
    position: 'Chuyên viên',
    role: UserRole.EMPLOYEE,
    joinDate: '2021-07-20',
    status: 'Đang hoạt động',
    gender: Gender.FEMALE,
    permissions: {
      dashboard: { view: true },
      equipment: { view: true },
      staff: { view: true }
    },
    mustChangePassword: true
  }
];

let equipmentTypesData: EquipmentType[] = [
  { id: '1', name: 'Laptop', prefix: 'LT', category: 'Máy tính', notes: 'Máy tính xách tay' },
  { id: '2', name: 'Desktop', prefix: 'PC', category: 'Máy tính', notes: 'Máy tính để bàn' },
  { id: '3', name: 'Switch', prefix: 'SW', category: 'Mạng', notes: 'Thiết bị chuyển mạch' },
  { id: '4', name: 'Router', prefix: 'RT', category: 'Mạng', notes: 'Thiết bị định tuyến' },
  { id: '5', name: 'Printer', prefix: 'PR', category: 'Ngoại vi', notes: 'Máy in' }
];

let manufacturersData: Manufacturer[] = [
  { id: '1', name: 'Dell Technologies', contactPerson: 'John Smith', phone: '1-800-DELL', website: 'www.dell.com' },
  { id: '2', name: 'HP Inc.', contactPerson: 'Jane Doe', phone: '1-800-HP', website: 'www.hp.com' },
  { id: '3', name: 'Cisco Systems', contactPerson: 'Mike Johnson', phone: '1-800-CISCO', website: 'www.cisco.com' },
  { id: '4', name: 'Lenovo', contactPerson: 'Li Wei', phone: '1-800-LENOVO', website: 'www.lenovo.com' }
];

let unitsData: Unit[] = [
  { id: '1', name: 'Phòng Công nghệ thông tin', manager: 'Nguyễn Văn Quản', description: 'Phụ trách hệ thống IT và phát triển phần mềm' },
  { id: '2', name: 'Phòng Hành chính', manager: 'Trần Thị Lan', description: 'Quản lý hành chính và nhân sự' },
  { id: '3', name: 'Phòng Kế toán', manager: 'Lê Văn Toán', description: 'Quản lý tài chính và kế toán' },
  { id: '4', name: 'Phòng Kinh doanh', manager: 'Phạm Thị Hoa', description: 'Phát triển kinh doanh và bán hàng' }
];

let licensesData: License[] = [
  {
    id: '1',
    softwareName: 'Microsoft Office 365',
    productKey: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX',
    purchaseDate: '2023-01-01',
    expiryDate: '2024-01-01',
    totalSeats: 50,
    assignedSeats: 35,
    status: LicenseStatus.ACTIVE
  },
  {
    id: '2',
    softwareName: 'Adobe Creative Suite',
    productKey: 'YYYYY-YYYYY-YYYYY-YYYYY-YYYYY',
    purchaseDate: '2022-06-15',
    expiryDate: '2023-06-15',
    totalSeats: 10,
    assignedSeats: 8,
    status: LicenseStatus.EXPIRED
  }
];

let allocationsData: Allocation[] = [
  {
    id: '1',
    assetName: 'Dell Latitude 5420',
    staffName: 'Nguyễn Văn An',
    allocationDate: '2023-02-01',
    returnDate: '',
    status: AllocationStatus.ALLOCATED
  },
  {
    id: '2',
    assetName: 'HP ProDesk 400 G7',
    staffName: 'Trần Thị Bình',
    allocationDate: '2023-03-25',
    returnDate: '2023-08-15',
    status: AllocationStatus.RETURNED
  }
];

let maintenanceData: Maintenance[] = [
  {
    id: '1',
    assetName: 'Dell Latitude 5420',
    maintenanceType: 'Bảo trì định kỳ',
    startDate: '2023-06-01',
    endDate: '2023-06-02',
    status: MaintenanceStatus.COMPLETED,
    notes: 'Vệ sinh máy và cập nhật phần mềm',
    unit: 'Phòng Công nghệ thông tin'
  },
  {
    id: '2',
    assetName: 'Cisco Catalyst 2960',
    maintenanceType: 'Nâng cấp',
    startDate: '2023-08-15',
    endDate: '2023-08-16',
    status: MaintenanceStatus.SCHEDULED,
    notes: 'Nâng cấp firmware mới nhất',
    unit: 'Phòng Công nghệ thông tin'
  }
];

let transfersData: Transfer[] = [
  {
    id: '1',
    assetName: 'HP ProDesk 400 G7',
    fromStaff: 'Trần Thị Bình',
    toStaff: 'Nguyễn Văn Cường',
    transferDate: '2023-08-15',
    notes: 'Chuyển máy do thay đổi vị trí làm việc'
  }
];

let usageHistoryData: UsageHistory[] = [
  {
    id: '1',
    timestamp: '2023-10-15 09:30:00',
    user: 'admin',
    action: 'Thêm thiết bị',
    asset: 'Dell Latitude 5420',
    details: 'Thêm laptop mới vào hệ thống'
  },
  {
    id: '2',
    timestamp: '2023-10-15 10:15:00',
    user: 'NV001',
    action: 'Cập nhật thông tin',
    asset: 'HP ProDesk 400 G7',
    details: 'Cập nhật địa chỉ IP'
  }
];

// API functions
export const equipmentApi = {
  getAll: async (): Promise<ITEquipment[]> => {
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API delay
    return [...equipmentData];
  },

  getById: async (id: string): Promise<ITEquipment | null> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return equipmentData.find(item => item.id === id) || null;
  },

  create: async (equipment: Omit<ITEquipment, 'id'>): Promise<ITEquipment> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newEquipment: ITEquipment = {
      ...equipment,
      id: Date.now().toString()
    };
    equipmentData.push(newEquipment);
    return newEquipment;
  },

  update: async (id: string, equipment: Partial<ITEquipment>): Promise<ITEquipment | null> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = equipmentData.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    equipmentData[index] = { ...equipmentData[index], ...equipment };
    return equipmentData[index];
  },

  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = equipmentData.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    equipmentData.splice(index, 1);
    return true;
  }
};

export const staffApi = {
  getAll: async (): Promise<Staff[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...staffData];
  },

  getById: async (id: string): Promise<Staff | null> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return staffData.find(item => item.id === id) || null;
  },

  create: async (staff: Omit<Staff, 'id'>): Promise<Staff> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newStaff: Staff = {
      ...staff,
      id: Date.now().toString()
    };
    staffData.push(newStaff);
    return newStaff;
  },

  update: async (id: string, staff: Partial<Staff>): Promise<Staff | null> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = staffData.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    staffData[index] = { ...staffData[index], ...staff };
    return staffData[index];
  },

  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = staffData.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    staffData.splice(index, 1);
    return true;
  },

  changePassword: async (id: string, newPassword: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = staffData.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    staffData[index].mustChangePassword = false;
    return true;
  }
};

export const equipmentTypesApi = {
  getAll: async (): Promise<EquipmentType[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...equipmentTypesData];
  },

  create: async (equipmentType: Omit<EquipmentType, 'id'>): Promise<EquipmentType> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newType: EquipmentType = {
      ...equipmentType,
      id: Date.now().toString()
    };
    equipmentTypesData.push(newType);
    return newType;
  },

  update: async (id: string, equipmentType: Partial<EquipmentType>): Promise<EquipmentType | null> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = equipmentTypesData.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    equipmentTypesData[index] = { ...equipmentTypesData[index], ...equipmentType };
    return equipmentTypesData[index];
  },

  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = equipmentTypesData.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    equipmentTypesData.splice(index, 1);
    return true;
  }
};

export const manufacturersApi = {
  getAll: async (): Promise<Manufacturer[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...manufacturersData];
  },

  create: async (manufacturer: Omit<Manufacturer, 'id'>): Promise<Manufacturer> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newManufacturer: Manufacturer = {
      ...manufacturer,
      id: Date.now().toString()
    };
    manufacturersData.push(newManufacturer);
    return newManufacturer;
  },

  update: async (id: string, manufacturer: Partial<Manufacturer>): Promise<Manufacturer | null> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = manufacturersData.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    manufacturersData[index] = { ...manufacturersData[index], ...manufacturer };
    return manufacturersData[index];
  },

  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = manufacturersData.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    manufacturersData.splice(index, 1);
    return true;
  }
};

export const unitsApi = {
  getAll: async (): Promise<Unit[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...unitsData];
  },

  create: async (unit: Omit<Unit, 'id'>): Promise<Unit> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newUnit: Unit = {
      ...unit,
      id: Date.now().toString()
    };
    unitsData.push(newUnit);
    return newUnit;
  },

  update: async (id: string, unit: Partial<Unit>): Promise<Unit | null> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = unitsData.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    unitsData[index] = { ...unitsData[index], ...unit };
    return unitsData[index];
  },

  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = unitsData.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    unitsData.splice(index, 1);
    return true;
  }
};

export const licensesApi = {
  getAll: async (): Promise<License[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...licensesData];
  },

  create: async (license: Omit<License, 'id'>): Promise<License> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newLicense: License = {
      ...license,
      id: Date.now().toString()
    };
    licensesData.push(newLicense);
    return newLicense;
  },

  update: async (id: string, license: Partial<License>): Promise<License | null> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = licensesData.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    licensesData[index] = { ...licensesData[index], ...license };
    return licensesData[index];
  },

  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = licensesData.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    licensesData.splice(index, 1);
    return true;
  }
};

export const allocationsApi = {
  getAll: async (): Promise<Allocation[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...allocationsData];
  },

  create: async (allocation: Omit<Allocation, 'id'>): Promise<Allocation> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newAllocation: Allocation = {
      ...allocation,
      id: Date.now().toString()
    };
    allocationsData.push(newAllocation);
    return newAllocation;
  },

  update: async (id: string, allocation: Partial<Allocation>): Promise<Allocation | null> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = allocationsData.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    allocationsData[index] = { ...allocationsData[index], ...allocation };
    return allocationsData[index];
  },

  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = allocationsData.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    allocationsData.splice(index, 1);
    return true;
  }
};

export const maintenanceApi = {
  getAll: async (): Promise<Maintenance[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...maintenanceData];
  },

  create: async (maintenance: Omit<Maintenance, 'id'>): Promise<Maintenance> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newMaintenance: Maintenance = {
      ...maintenance,
      id: Date.now().toString()
    };
    maintenanceData.push(newMaintenance);
    return newMaintenance;
  },

  update: async (id: string, maintenance: Partial<Maintenance>): Promise<Maintenance | null> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = maintenanceData.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    maintenanceData[index] = { ...maintenanceData[index], ...maintenance };
    return maintenanceData[index];
  },

  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = maintenanceData.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    maintenanceData.splice(index, 1);
    return true;
  }
};

export const transfersApi = {
  getAll: async (): Promise<Transfer[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...transfersData];
  },

  create: async (transfer: Omit<Transfer, 'id'>): Promise<Transfer> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newTransfer: Transfer = {
      ...transfer,
      id: Date.now().toString()
    };
    transfersData.push(newTransfer);
    return newTransfer;
  },

  update: async (id: string, transfer: Partial<Transfer>): Promise<Transfer | null> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = transfersData.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    transfersData[index] = { ...transfersData[index], ...transfer };
    return transfersData[index];
  },

  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = transfersData.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    transfersData.splice(index, 1);
    return true;
  }
};

export const usageHistoryApi = {
  getAll: async (): Promise<UsageHistory[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...usageHistoryData];
  },

  create: async (usage: Omit<UsageHistory, 'id'>): Promise<UsageHistory> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newUsage: UsageHistory = {
      ...usage,
      id: Date.now().toString()
    };
    usageHistoryData.push(newUsage);
    return newUsage;
  }
};

// Dashboard statistics
export const dashboardApi = {
  getStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const totalEquipment = equipmentData.length;
    const availableEquipment = equipmentData.filter(e => e.status === EquipmentStatus.AVAILABLE).length;
    const inUseEquipment = equipmentData.filter(e => e.status === EquipmentStatus.IN_USE).length;
    const inRepairEquipment = equipmentData.filter(e => e.status === EquipmentStatus.IN_REPAIR).length;
    
    const totalStaff = staffData.filter(s => s.status === 'Đang hoạt động').length;
    const totalLicenses = licensesData.length;
    const activeLicenses = licensesData.filter(l => l.status === LicenseStatus.ACTIVE).length;
    
    const pendingMaintenance = maintenanceData.filter(m => m.status === MaintenanceStatus.SCHEDULED).length;
    
    return {
      totalEquipment,
      availableEquipment,
      inUseEquipment,
      inRepairEquipment,
      totalStaff,
      totalLicenses,
      activeLicenses,
      pendingMaintenance,
      equipmentByType: equipmentData.reduce((acc, eq) => {
        acc[eq.deviceType] = (acc[eq.deviceType] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      equipmentByStatus: {
        [EquipmentStatus.AVAILABLE]: availableEquipment,
        [EquipmentStatus.IN_USE]: inUseEquipment,
        [EquipmentStatus.IN_REPAIR]: inRepairEquipment,
        [EquipmentStatus.RETIRED]: equipmentData.filter(e => e.status === EquipmentStatus.RETIRED).length,
        [EquipmentStatus.LOST]: equipmentData.filter(e => e.status === EquipmentStatus.LOST).length
      }
    };
  }
};