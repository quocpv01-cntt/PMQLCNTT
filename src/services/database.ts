// Database simulation using localStorage
import { ITEquipment, Staff, User, Maintenance, EquipmentType, Unit, Manufacturer } from '../types';

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  priority: 'Thấp' | 'Trung bình' | 'Cao' | 'Khẩn cấp';
  status: 'Mở' | 'Đang xử lý' | 'Đã giải quyết' | 'Đã đóng';
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  category: string;
}

class DatabaseService {
  private getStorageKey(table: string): string {
    return `it_management_${table}`;
  }

  private getData<T>(table: string): T[] {
    const data = localStorage.getItem(this.getStorageKey(table));
    return data ? JSON.parse(data) : [];
  }

  private setData<T>(table: string, data: T[]): void {
    localStorage.setItem(this.getStorageKey(table), JSON.stringify(data));
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Generic CRUD operations
  async create<T extends { id: string }>(table: string, item: Omit<T, 'id'>): Promise<T> {
    const data = this.getData<T>(table);
    const newItem = { ...item, id: this.generateId() } as T;
    data.push(newItem);
    this.setData(table, data);
    return newItem;
  }

  async getAll<T>(table: string): Promise<T[]> {
    return this.getData<T>(table);
  }

  async getById<T extends { id: string }>(table: string, id: string): Promise<T | null> {
    const data = this.getData<T>(table);
    return data.find(item => item.id === id) || null;
  }

  async update<T extends { id: string }>(table: string, id: string, updates: Partial<T>): Promise<T | null> {
    const data = this.getData<T>(table);
    const index = data.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    data[index] = { ...data[index], ...updates };
    this.setData(table, data);
    return data[index];
  }

  async delete(table: string, id: string): Promise<boolean> {
    const data = this.getData(table);
    const index = data.findIndex((item: any) => item.id === id);
    if (index === -1) return false;
    
    data.splice(index, 1);
    this.setData(table, data);
    return true;
  }

  // Initialize with sample data
  async initializeData(): Promise<void> {
    // Check if data already exists
    if (this.getData('users').length > 0) return;

    // Sample users
    const users: User[] = [
      {
        id: '1',
        name: 'Admin',
        email: 'admin@company.com',
        role: 'ADMIN',
        permissions: {
          dashboard: { view: true },
          equipment: { view: true, add: true, edit: true, delete: true },
          staff: { view: true, add: true, edit: true, delete: true },
          tickets: { view: true, add: true, edit: true, delete: true },
          maintenance: { view: true, add: true, edit: true, delete: true },
          reports: { view: true }
        }
      }
    ];

    // Sample staff
    const staff: Staff[] = [
      {
        id: '1',
        employeeId: 'admin',
        fullName: 'Quản trị viên hệ thống',
        email: 'admin@company.com',
        phone: '0123456789',
        unit: 'IT',
        position: 'Quản trị viên',
        role: 'ADMIN',
        joinDate: '2024-01-01',
        status: 'Đang hoạt động',
        gender: 'Nam' as any,
        permissions: {
          dashboard: { view: true },
          equipment: { view: true, add: true, edit: true, delete: true },
          staff: { view: true, add: true, edit: true, delete: true },
          tickets: { view: true, add: true, edit: true, delete: true },
          maintenance: { view: true, add: true, edit: true, delete: true },
          reports: { view: true }
        }
      },
      {
        id: '2',
        employeeId: 'emp001',
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@company.com',
        phone: '0987654321',
        unit: 'Kế toán',
        position: 'Nhân viên',
        role: 'EMPLOYEE',
        joinDate: '2024-02-01',
        status: 'Đang hoạt động',
        gender: 'Nam' as any
      }
    ];

    // Sample equipment types
    const equipmentTypes: EquipmentType[] = [
      { id: '1', name: 'Laptop', prefix: 'LT', category: 'Máy tính', notes: 'Máy tính xách tay' },
      { id: '2', name: 'Desktop', prefix: 'DT', category: 'Máy tính', notes: 'Máy tính để bàn' },
      { id: '3', name: 'Monitor', prefix: 'MN', category: 'Thiết bị ngoại vi', notes: 'Màn hình máy tính' },
      { id: '4', name: 'Printer', prefix: 'PR', category: 'Thiết bị ngoại vi', notes: 'Máy in' }
    ];

    // Sample units
    const units: Unit[] = [
      { id: '1', name: 'IT', manager: 'Quản trị viên hệ thống', description: 'Phòng Công nghệ thông tin' },
      { id: '2', name: 'Kế toán', manager: 'Trưởng phòng Kế toán', description: 'Phòng Kế toán' },
      { id: '3', name: 'Nhân sự', manager: 'Trưởng phòng Nhân sự', description: 'Phòng Nhân sự' }
    ];

    // Sample manufacturers
    const manufacturers: Manufacturer[] = [
      { id: '1', name: 'Dell', contactPerson: 'Dell Support', phone: '1800-123-456', website: 'https://dell.com' },
      { id: '2', name: 'HP', contactPerson: 'HP Support', phone: '1800-789-012', website: 'https://hp.com' },
      { id: '3', name: 'Lenovo', contactPerson: 'Lenovo Support', phone: '1800-345-678', website: 'https://lenovo.com' }
    ];

    // Sample equipment
    const equipment: ITEquipment[] = [
      {
        id: '1',
        assetTag: 'LT-001',
        deviceName: 'Dell Latitude 5520',
        deviceType: 'Laptop',
        serialNumber: 'DL123456789',
        assignedTo: 'Nguyễn Văn A',
        status: 'Đang sử dụng' as any,
        purchaseDate: '2024-01-15',
        warrantyEndDate: '2027-01-15',
        supplier: 'Dell',
        operatingSystem: 'Windows 11 Pro',
        ipAddress: '192.168.1.100',
        notes: 'Laptop cho nhân viên kế toán',
        unit: 'Kế toán'
      },
      {
        id: '2',
        assetTag: 'DT-001',
        deviceName: 'HP EliteDesk 800',
        deviceType: 'Desktop',
        serialNumber: 'HP987654321',
        assignedTo: '',
        status: 'Sẵn sàng' as any,
        purchaseDate: '2024-02-01',
        warrantyEndDate: '2027-02-01',
        supplier: 'HP',
        operatingSystem: 'Windows 11 Pro',
        ipAddress: '',
        notes: 'Máy tính dự phòng',
        unit: 'IT'
      }
    ];

    // Sample support tickets
    const tickets: SupportTicket[] = [
      {
        id: '1',
        title: 'Máy tính không khởi động được',
        description: 'Máy tính Dell Latitude 5520 không thể khởi động, màn hình đen',
        priority: 'Cao',
        status: 'Đang xử lý',
        assignedTo: 'Quản trị viên hệ thống',
        createdBy: 'Nguyễn Văn A',
        createdAt: '2024-10-14T09:00:00Z',
        updatedAt: '2024-10-14T10:30:00Z',
        category: 'Phần cứng'
      },
      {
        id: '2',
        title: 'Yêu cầu cài đặt phần mềm',
        description: 'Cần cài đặt Microsoft Office 2021 cho máy tính mới',
        priority: 'Trung bình',
        status: 'Mở',
        assignedTo: '',
        createdBy: 'Nguyễn Văn A',
        createdAt: '2024-10-15T08:00:00Z',
        updatedAt: '2024-10-15T08:00:00Z',
        category: 'Phần mềm'
      }
    ];

    // Sample maintenance
    const maintenance: Maintenance[] = [
      {
        id: '1',
        assetName: 'Dell Latitude 5520',
        maintenanceType: 'Bảo trì định kỳ',
        startDate: '2024-10-20',
        endDate: '2024-10-20',
        status: 'Đã lên lịch' as any,
        notes: 'Vệ sinh và kiểm tra tổng thể',
        unit: 'Kế toán'
      }
    ];

    // Save all data
    this.setData('users', users);
    this.setData('staff', staff);
    this.setData('equipment_types', equipmentTypes);
    this.setData('units', units);
    this.setData('manufacturers', manufacturers);
    this.setData('equipment', equipment);
    this.setData('tickets', tickets);
    this.setData('maintenance', maintenance);
  }

  // Statistics methods
  async getDashboardStats() {
    const equipment = await this.getAll<ITEquipment>('equipment');
    const staff = await this.getAll<Staff>('staff');
    const tickets = await this.getAll<SupportTicket>('tickets');
    const maintenance = await this.getAll<Maintenance>('maintenance');

    return {
      totalAssets: equipment.length,
      activeAssets: equipment.filter(e => e.status === 'Đang sử dụng').length,
      totalStaff: staff.filter(s => s.status === 'Đang hoạt động').length,
      openTickets: tickets.filter(t => t.status === 'Mở' || t.status === 'Đang xử lý').length,
      pendingMaintenance: maintenance.filter(m => m.status === 'Đã lên lịch').length
    };
  }
}

export const db = new DatabaseService();