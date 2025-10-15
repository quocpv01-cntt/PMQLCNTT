import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Staff, Gender, UserRole } from '../../types';
import { staffApi } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import { useData } from '../../contexts/DataContext';

interface StaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  staff?: Staff | null;
}

const StaffModal: React.FC<StaffModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  staff
}) => {
  const { addToast } = useToast();
  const { units } = useData();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    fullName: '',
    email: '',
    phone: '',
    unit: '',
    position: '',
    role: UserRole.EMPLOYEE,
    joinDate: '',
    status: 'Đang hoạt động' as const,
    gender: Gender.MALE
  });

  useEffect(() => {
    if (staff) {
      setFormData({
        employeeId: staff.employeeId,
        fullName: staff.fullName,
        email: staff.email,
        phone: staff.phone,
        unit: staff.unit,
        position: staff.position,
        role: staff.role as UserRole,
        joinDate: staff.joinDate,
        status: staff.status,
        gender: staff.gender
      });
    } else {
      setFormData({
        employeeId: '',
        fullName: '',
        email: '',
        phone: '',
        unit: '',
        position: '',
        role: UserRole.EMPLOYEE,
        joinDate: new Date().toISOString().split('T')[0],
        status: 'Đang hoạt động',
        gender: Gender.MALE
      });
    }
  }, [staff]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const staffData = {
        ...formData,
        mustChangePassword: !staff, // New staff must change password
        permissions: formData.role === UserRole.ADMIN ? {
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
        } : {
          dashboard: { view: true },
          equipment: { view: true },
          staff: { view: true },
          reports: { view: true }
        }
      };

      if (staff) {
        await staffApi.update(staff.id, staffData);
        addToast('Cập nhật nhân viên thành công', 'success');
      } else {
        await staffApi.create(staffData);
        addToast('Thêm nhân viên thành công', 'success');
      }
      onSuccess();
    } catch (error) {
      addToast(
        staff ? 'Có lỗi xảy ra khi cập nhật nhân viên' : 'Có lỗi xảy ra khi thêm nhân viên',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <span className="hidden sm:inline-block sm:h-screen sm:align-middle">&#8203;</span>

        <div className="relative inline-block transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 sm:align-middle">
          <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
            <button
              type="button"
              className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={onClose}
            >
              <span className="sr-only">Đóng</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                {staff ? 'Cập nhật nhân viên' : 'Thêm nhân viên mới'}
              </h3>
              
              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Employee ID */}
                  <div>
                    <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Mã nhân viên *
                    </label>
                    <input
                      type="text"
                      name="employeeId"
                      id="employeeId"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.employeeId}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Unit */}
                  <div>
                    <label htmlFor="unit" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Đơn vị *
                    </label>
                    <select
                      name="unit"
                      id="unit"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.unit}
                      onChange={handleChange}
                    >
                      <option value="">Chọn đơn vị</option>
                      {units.map(unit => (
                        <option key={unit.id} value={unit.name}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Position */}
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Chức vụ *
                    </label>
                    <input
                      type="text"
                      name="position"
                      id="position"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.position}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Vai trò *
                    </label>
                    <select
                      name="role"
                      id="role"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value={UserRole.EMPLOYEE}>Nhân viên</option>
                      <option value={UserRole.UNIT_MANAGER}>Trưởng đơn vị</option>
                      <option value={UserRole.ADMIN}>Quản trị viên</option>
                    </select>
                  </div>

                  {/* Gender */}
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Giới tính *
                    </label>
                    <select
                      name="gender"
                      id="gender"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value={Gender.MALE}>Nam</option>
                      <option value={Gender.FEMALE}>Nữ</option>
                      <option value={Gender.OTHER}>Khác</option>
                    </select>
                  </div>

                  {/* Join Date */}
                  <div>
                    <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ngày vào làm *
                    </label>
                    <input
                      type="date"
                      name="joinDate"
                      id="joinDate"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.joinDate}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Trạng thái *
                    </label>
                    <select
                      name="status"
                      id="status"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Đang hoạt động">Đang hoạt động</option>
                      <option value="Đã nghỉ việc">Đã nghỉ việc</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed sm:col-start-2 sm:text-sm"
                  >
                    {loading ? 'Đang xử lý...' : (staff ? 'Cập nhật' : 'Thêm mới')}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={onClose}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffModal;