import React from 'react';
import { PlusIcon, KeyIcon } from '@heroicons/react/24/outline';
import { useData } from '../contexts/DataContext';
import { LicenseStatus } from '../types';

const LicensesPage: React.FC = () => {
  const { licenses, loading } = useData();

  const getStatusBadge = (status: LicenseStatus) => {
    const statusConfig = {
      [LicenseStatus.ACTIVE]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      [LicenseStatus.EXPIRED]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      [LicenseStatus.INACTIVE]: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    };
    return statusConfig[status] || statusConfig[LicenseStatus.INACTIVE];
  };

  if (loading.licenses) {
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bản quyền Phần mềm</h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Quản lý giấy phép và bản quyền phần mềm trong tổ chức
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <PlusIcon className="h-4 w-4 inline mr-2" />
            Thêm giấy phép
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            {licenses.map((license) => (
              <div key={license.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <KeyIcon className="h-8 w-8 text-indigo-500 mr-3" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {license.softwareName}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Key: {license.productKey}
                      </p>
                    </div>
                  </div>
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadge(license.status)}`}>
                    {license.status}
                  </span>
                </div>
                
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Ngày mua</p>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {new Date(license.purchaseDate).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Ngày hết hạn</p>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {new Date(license.expiryDate).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sử dụng</p>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {license.assignedSeats} / {license.totalSeats} licenses
                    </p>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{ width: `${(license.assignedSeats / license.totalSeats) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicensesPage;