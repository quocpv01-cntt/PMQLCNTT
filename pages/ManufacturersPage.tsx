import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useData } from '../contexts/DataContext';

const ManufacturersPage: React.FC = () => {
  const { manufacturers, loading } = useData();

  if (loading.manufacturers) {
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nhà sản xuất</h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Quản lý thông tin các nhà sản xuất và nhà cung cấp thiết bị
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <PlusIcon className="h-4 w-4 inline mr-2" />
            Thêm nhà sản xuất
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {manufacturers.map((manufacturer) => (
              <div key={manufacturer.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {manufacturer.name}
                </h3>
                <div className="mt-2 space-y-1 text-sm text-gray-500 dark:text-gray-400">
                  <p>Liên hệ: {manufacturer.contactPerson}</p>
                  <p>Điện thoại: {manufacturer.phone}</p>
                  <p>Website: {manufacturer.website}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManufacturersPage;