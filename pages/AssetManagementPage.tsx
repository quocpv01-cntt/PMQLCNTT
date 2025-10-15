import React, { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';
import { ITEquipment, EquipmentStatus } from '../types';
import { equipmentApi } from '../services/api';
import EquipmentModal from '../components/forms/EquipmentModal';

const AssetManagementPage: React.FC = () => {
  const { equipment, loading, refreshEquipment } = useData();
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<ITEquipment | null>(null);

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = 
      item.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesType = typeFilter === 'all' || item.deviceType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const uniqueTypes = [...new Set(equipment.map(item => item.deviceType))];

  const handleEdit = (item: ITEquipment) => {
    setEditingEquipment(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thiết bị này?')) {
      try {
        await equipmentApi.delete(id);
        await refreshEquipment();
        addToast('Xóa thiết bị thành công', 'success');
      } catch (error) {
        addToast('Có lỗi xảy ra khi xóa thiết bị', 'error');
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingEquipment(null);
  };

  const handleModalSuccess = () => {
    refreshEquipment();
    handleModalClose();
  };

  const getStatusBadge = (status: EquipmentStatus) => {
    const statusConfig = {
      [EquipmentStatus.AVAILABLE]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      [EquipmentStatus.IN_USE]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      [EquipmentStatus.IN_REPAIR]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      [EquipmentStatus.RETIRED]: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
      [EquipmentStatus.LOST]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };

    return statusConfig[status] || statusConfig[EquipmentStatus.AVAILABLE];
  };

  if (loading.equipment) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý Tài sản IT</h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Quản lý laptop, máy tính, thiết bị mạng và các tài sản công nghệ thông tin khác
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-4 w-4 inline mr-2" />
            Thêm thiết bị
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tìm kiếm
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Tên thiết bị, mã tài sản, serial..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Trạng thái
            </label>
            <select
              id="status-filter"
              name="status-filter"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              {Object.values(EquipmentStatus).map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Loại thiết bị
            </label>
            <select
              id="type-filter"
              name="type-filter"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">Tất cả loại</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Equipment Table */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-0">
                        Thiết bị
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Mã tài sản
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Loại
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Người sử dụng
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Trạng thái
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Bảo hành
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Thao tác</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredEquipment.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-0">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {item.deviceName}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                SN: {item.serialNumber}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {item.assetTag}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {item.deviceType}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {item.assignedTo || 'Chưa phân công'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadge(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {new Date(item.warrantyEndDate) > new Date() ? (
                            <span className="text-green-600 dark:text-green-400">
                              {new Date(item.warrantyEndDate).toLocaleDateString('vi-VN')}
                            </span>
                          ) : (
                            <span className="text-red-600 dark:text-red-400">
                              Hết hạn
                            </span>
                          )}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredEquipment.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">
                      {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' 
                        ? 'Không tìm thấy thiết bị nào phù hợp với bộ lọc'
                        : 'Chưa có thiết bị nào được thêm vào hệ thống'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Modal */}
      <EquipmentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        equipment={editingEquipment}
      />
    </div>
  );
};

export default AssetManagementPage;