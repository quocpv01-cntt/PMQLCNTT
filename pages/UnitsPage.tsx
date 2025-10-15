import React from 'react';
import { PlusIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { useData } from '../contexts/DataContext';

const UnitsPage: React.FC = () => {
  const { units, loading } = useData();

  if (loading.units) {
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Đơn vị</h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Quản lý các phòng ban và đơn vị trong tổ chức
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <PlusIcon className="h-4 w-4 inline mr-2" />
            Thêm đơn vị
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {units.map((unit) => (
              <div key={unit.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex items-center">
                  <BuildingOfficeIcon className="h-8 w-8 text-indigo-500 mr-3" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {unit.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Trưởng đơn vị: {unit.manager}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                  {unit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitsPage;