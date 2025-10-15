import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ITEquipment, EquipmentStatus } from '../../types';
import { equipmentApi } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import { useData } from '../../contexts/DataContext';

interface EquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  equipment?: ITEquipment | null;
}

const EquipmentModal: React.FC<EquipmentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  equipment
}) => {
  const { addToast } = useToast();
  const { staff, units } = useData();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    assetTag: '',
    deviceName: '',
    deviceType: '',
    serialNumber: '',
    assignedTo: '',
    status: EquipmentStatus.AVAILABLE,
    purchaseDate: '',
    warrantyEndDate: '',
    supplier: '',
    operatingSystem: '',
    ipAddress: '',
    notes: '',
    unit: ''
  });

  useEffect(() => {
    if (equipment) {
      setFormData({
        assetTag: equipment.assetTag,
        deviceName: equipment.deviceName,
        deviceType: equipment.deviceType,
        serialNumber: equipment.serialNumber,
        assignedTo: equipment.assignedTo,
        status: equipment.status,
        purchaseDate: equipment.purchaseDate,
        warrantyEndDate: equipment.warrantyEndDate,
        supplier: equipment.supplier,
        operatingSystem: equipment.operatingSystem,
        ipAddress: equipment.ipAddress,
        notes: equipment.notes || '',
        unit: equipment.unit || ''
      });
    } else {
      setFormData({
        assetTag: '',
        deviceName: '',
        deviceType: '',
        serialNumber: '',
        assignedTo: '',
        status: EquipmentStatus.AVAILABLE,
        purchaseDate: '',
        warrantyEndDate: '',
        supplier: '',
        operatingSystem: '',
        ipAddress: '',
        notes: '',
        unit: ''
      });
    }
  }, [equipment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (equipment) {
        await equipmentApi.update(equipment.id, formData);
        addToast('Cập nhật thiết bị thành công', 'success');
      } else {
        await equipmentApi.create(formData);
        addToast('Thêm thiết bị thành công', 'success');
      }
      onSuccess();
    } catch (error) {
      addToast(
        equipment ? 'Có lỗi xảy ra khi cập nhật thiết bị' : 'Có lỗi xảy ra khi thêm thiết bị',
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
                {equipment ? 'Cập nhật thiết bị' : 'Thêm thiết bị mới'}
              </h3>
              
              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Asset Tag */}
                  <div>
                    <label htmlFor="assetTag" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Mã tài sản *
                    </label>
                    <input
                      type="text"
                      name="assetTag"
                      id="assetTag"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.assetTag}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Device Name */}
                  <div>
                    <label htmlFor="deviceName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Tên thiết bị *
                    </label>
                    <input
                      type="text"
                      name="deviceName"
                      id="deviceName"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.deviceName}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Device Type */}
                  <div>
                    <label htmlFor="deviceType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Loại thiết bị *
                    </label>
                    <select
                      name="deviceType"
                      id="deviceType"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.deviceType}
                      onChange={handleChange}
                    >
                      <option value="">Chọn loại thiết bị</option>
                      <option value="Laptop">Laptop</option>
                      <option value="Desktop">Desktop</option>
                      <option value="Server">Server</option>
                      <option value="Switch">Switch</option>
                      <option value="Router">Router</option>
                      <option value="Printer">Printer</option>
                      <option value="Monitor">Monitor</option>
                      <option value="Other">Khác</option>
                    </select>
                  </div>

                  {/* Serial Number */}
                  <div>
                    <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Số serial *
                    </label>
                    <input
                      type="text"
                      name="serialNumber"
                      id="serialNumber"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.serialNumber}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Assigned To */}
                  <div>
                    <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Người sử dụng
                    </label>
                    <select
                      name="assignedTo"
                      id="assignedTo"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.assignedTo}
                      onChange={handleChange}
                    >
                      <option value="">Chưa phân công</option>
                      {staff.map(person => (
                        <option key={person.id} value={person.fullName}>
                          {person.fullName}
                        </option>
                      ))}
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
                      {Object.values(EquipmentStatus).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  {/* Purchase Date */}
                  <div>
                    <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ngày mua *
                    </label>
                    <input
                      type="date"
                      name="purchaseDate"
                      id="purchaseDate"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.purchaseDate}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Warranty End Date */}
                  <div>
                    <label htmlFor="warrantyEndDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ngày hết bảo hành *
                    </label>
                    <input
                      type="date"
                      name="warrantyEndDate"
                      id="warrantyEndDate"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.warrantyEndDate}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Supplier */}
                  <div>
                    <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nhà cung cấp *
                    </label>
                    <input
                      type="text"
                      name="supplier"
                      id="supplier"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.supplier}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Operating System */}
                  <div>
                    <label htmlFor="operatingSystem" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Hệ điều hành
                    </label>
                    <input
                      type="text"
                      name="operatingSystem"
                      id="operatingSystem"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.operatingSystem}
                      onChange={handleChange}
                    />
                  </div>

                  {/* IP Address */}
                  <div>
                    <label htmlFor="ipAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Địa chỉ IP
                    </label>
                    <input
                      type="text"
                      name="ipAddress"
                      id="ipAddress"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.ipAddress}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Unit */}
                  <div>
                    <label htmlFor="unit" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Đơn vị
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
                    Ghi chú
                  </label>
                  <textarea
                    name="notes"
                    id="notes"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                    {loading ? 'Đang xử lý...' : (equipment ? 'Cập nhật' : 'Thêm mới')}
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

export default EquipmentModal;