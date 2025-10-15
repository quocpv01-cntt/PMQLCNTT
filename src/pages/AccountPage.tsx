import React from 'react';
import { AuthContext } from '../types';

const AccountPage: React.FC = () => {
  const { user } = React.useContext(AuthContext)!;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Tài khoản của tôi</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          Quản lý thông tin tài khoản cá nhân
        </p>
      </div>

      {/* User info */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <div className="h-20 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="ml-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{user?.name}</h2>
            <p className="text-slate-600 dark:text-slate-300">{user?.email}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Vai trò: {user?.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Tên đầy đủ
            </label>
            <input
              type="text"
              value={user?.name || ''}
              disabled
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Vai trò
            </label>
            <input
              type="text"
              value={user?.role || ''}
              disabled
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Đơn vị
            </label>
            <input
              type="text"
              value={user?.unit || 'N/A'}
              disabled
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
            Đổi mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;