import React from 'react';

const DatabaseExplorerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Trình duyệt cơ sở dữ liệu</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          Khám phá và quản lý cơ sở dữ liệu hệ thống
        </p>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-12 text-center">
        <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">Tính năng đang phát triển</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Tính năng trình duyệt cơ sở dữ liệu sẽ sớm được cập nhật.
        </p>
      </div>
    </div>
  );
};

export default DatabaseExplorerPage;