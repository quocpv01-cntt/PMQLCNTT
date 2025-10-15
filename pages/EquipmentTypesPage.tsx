import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';
import { EquipmentType } from '../types';
import { equipmentTypesApi } from '../services/api';

const EquipmentTypesPage: React.FC = () => {
  const { equipmentTypes, loading, refreshEquipmentTypes } = useData();
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTypes = equipmentTypes.filter(type => 
    type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    type.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    type.prefix.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading.equipmentTypes) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Loại thiết bị</h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Quản lý các loại thiết bị và danh mục trong hệ thống
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <PlusIcon className="h-4 w-4 inline mr-2" />
            Thêm loại thiết bị
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="mb-4">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Tìm kiếm loại thiết bị..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
            <thead>
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-0">
                  Tên loại
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Mã tiền tố
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Danh mục
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Ghi chú
                </th>
                <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Thao tác</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTypes.map((type) => (
                <tr key={type.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-0">
                    {type.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {type.prefix}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {type.category}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {type.notes}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EquipmentTypesPage;