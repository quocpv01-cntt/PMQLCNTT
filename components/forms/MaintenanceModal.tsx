import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Maintenance, MaintenanceStatus } from '../../types';
import { maintenanceApi } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import { useData } from '../../contexts/DataContext';

interface MaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  maintenance?: Maintenance | null;
}

const MaintenanceModal: React.FC<MaintenanceModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  maintenance
}) => {
  const { addToast } = useToast();
  const { equipment, units } = useData();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    assetName: '',
    maintenanceType: 'Bảo trì định kỳ' as const,
    startDate: '',
    endDate: '',
    status: MaintenanceStatus.SCHEDULED,
    notes: '',
    unit: ''
  });

  useEffect(() => {
    if (maintenance) {
      setFormData({
        assetName: maintenance.assetName,
        maintenanceType: maintenance.maintenanceType,
        startDate: maintenance.startDate,
        endDate: maintenance.endDate,
        status: maintenance.status,
        notes: maintenance.notes,
        unit: maintenance.unit || ''
      });
    } else {
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      
      setFormData({
        assetName: '',
        maintenanceType: 'Bảo trì định kỳ',
        startDate: today,
        endDate: tomorrowStr,
        status: MaintenanceStatus.SCHEDULED,
        notes: '',
        unit: ''
      });
    }
  }, [maintenance]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (maintenance) {
        await maintenanceApi.update(maintenance.id, formData);
        addToast('Cập nhật lịch bảo trì thành công', 'success');
      } else {
        await maintenanceApi.create(formData);
        addToast('Lên lịch bảo trì thành công', 'success');
      }
      onSuccess();
    } catch (error) {
      addToast(
        maintenance ? 'Có lỗi xảy ra khi cập nhật lịch bảo trì' : 'Có lỗi xảy ra khi lên lịch bảo trì',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
                {maintenance ? 'Cập nhật lịch bảo trì' : 'Lên lịch bảo trì mới'}
              </h3>
              
              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Asset Name */}
                  <div className="sm:col-span-2">
                    <label htmlFor="assetName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Thiết bị *
                    </label>
                    <select
                      name="assetName"
                      id="assetName"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.assetName}
                      onChange={handleChange}
                    >
                      <option value="">Chọn thiết bị</option>
                      {equipment.map(item => (
                        <option key={item.id} value={item.deviceName}>
                          {item.deviceName} ({item.assetTag})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Maintenance Type */}
                  <div>
                    <label htmlFor="maintenanceType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Loại bảo trì *
                    </label>
                    <select
                      name="maintenanceType"
                      id="maintenanceType"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.maintenanceType}
                      onChange={handleChange}
                    >
                      <option value="Bảo trì định kỳ">Bảo trì định kỳ</option>
                      <option value="Sửa chữa">Sửa chữa</option>
                      <option value="Nâng cấp">Nâng cấp</option>
                    </select>
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
                      {Object.values(MaintenanceStatus).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  {/* Start Date */}
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ngày bắt đầu *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ngày kết thúc *
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      id="endDate"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Unit */}
                  <div className="sm:col-span-2">
                    <label htmlFor="unit" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Đơn vị thực hiện
                    </label>
                    <select
                      name="unit"
                      id="unit"
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
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ghi chú *
                  </label>
                  <textarea
                    name="notes"
                    id="notes"
                    rows={4}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Mô tả chi tiết về công việc bảo trì cần thực hiện..."
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>

                {/* Action Buttons */}
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed sm:col-start-2 sm:text-sm"
                  >
                    {loading ? 'Đang xử lý...' : (maintenance ? 'Cập nhật' : 'Lên lịch')}
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

export default MaintenanceModal;