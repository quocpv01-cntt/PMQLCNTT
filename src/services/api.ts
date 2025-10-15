import { db, SupportTicket } from './database';
import { ITEquipment, Staff, User, Maintenance, EquipmentType, Unit, Manufacturer } from '../types';

class ApiService {
  // Equipment API
  equipment = {
    getAll: () => db.getAll<ITEquipment>('equipment'),
    getById: (id: string) => db.getById<ITEquipment>('equipment', id),
    create: (equipment: Omit<ITEquipment, 'id'>) => db.create<ITEquipment>('equipment', equipment),
    update: (id: string, updates: Partial<ITEquipment>) => db.update<ITEquipment>('equipment', id, updates),
    delete: (id: string) => db.delete('equipment', id)
  };

  // Staff API
  staff = {
    getAll: () => db.getAll<Staff>('staff'),
    getById: (id: string) => db.getById<Staff>('staff', id),
    create: (staff: Omit<Staff, 'id'>) => db.create<Staff>('staff', staff),
    update: (id: string, updates: Partial<Staff>) => db.update<Staff>('staff', id, updates),
    delete: (id: string) => db.delete('staff', id),
    changePassword: (id: string, newPassword: string) => {
      // Simulate password change
      return db.update<Staff>('staff', id, { mustChangePassword: false });
    }
  };

  // Support Tickets API
  tickets = {
    getAll: () => db.getAll<SupportTicket>('tickets'),
    getById: (id: string) => db.getById<SupportTicket>('tickets', id),
    create: (ticket: Omit<SupportTicket, 'id'>) => db.create<SupportTicket>('tickets', ticket),
    update: (id: string, updates: Partial<SupportTicket>) => db.update<SupportTicket>('tickets', id, updates),
    delete: (id: string) => db.delete('tickets', id)
  };

  // Maintenance API
  maintenance = {
    getAll: () => db.getAll<Maintenance>('maintenance'),
    getById: (id: string) => db.getById<Maintenance>('maintenance', id),
    create: (maintenance: Omit<Maintenance, 'id'>) => db.create<Maintenance>('maintenance', maintenance),
    update: (id: string, updates: Partial<Maintenance>) => db.update<Maintenance>('maintenance', id, updates),
    delete: (id: string) => db.delete('maintenance', id)
  };

  // Equipment Types API
  equipmentTypes = {
    getAll: () => db.getAll<EquipmentType>('equipment_types'),
    getById: (id: string) => db.getById<EquipmentType>('equipment_types', id),
    create: (type: Omit<EquipmentType, 'id'>) => db.create<EquipmentType>('equipment_types', type),
    update: (id: string, updates: Partial<EquipmentType>) => db.update<EquipmentType>('equipment_types', id, updates),
    delete: (id: string) => db.delete('equipment_types', id)
  };

  // Units API
  units = {
    getAll: () => db.getAll<Unit>('units'),
    getById: (id: string) => db.getById<Unit>('units', id),
    create: (unit: Omit<Unit, 'id'>) => db.create<Unit>('units', unit),
    update: (id: string, updates: Partial<Unit>) => db.update<Unit>('units', id, updates),
    delete: (id: string) => db.delete('units', id)
  };

  // Manufacturers API
  manufacturers = {
    getAll: () => db.getAll<Manufacturer>('manufacturers'),
    getById: (id: string) => db.getById<Manufacturer>('manufacturers', id),
    create: (manufacturer: Omit<Manufacturer, 'id'>) => db.create<Manufacturer>('manufacturers', manufacturer),
    update: (id: string, updates: Partial<Manufacturer>) => db.update<Manufacturer>('manufacturers', id, updates),
    delete: (id: string) => db.delete('manufacturers', id)
  };

  // Users API
  users = {
    getAll: () => db.getAll<User>('users'),
    getById: (id: string) => db.getById<User>('users', id),
    create: (user: Omit<User, 'id'>) => db.create<User>('users', user),
    update: (id: string, updates: Partial<User>) => db.update<User>('users', id, updates),
    delete: (id: string) => db.delete('users', id)
  };

  // Dashboard API
  dashboard = {
    getStats: () => db.getDashboardStats()
  };

  // Initialize data
  async initialize() {
    await db.initializeData();
  }
}

export const api = new ApiService();
export const staffApi = api.staff;