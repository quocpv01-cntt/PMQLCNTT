import React from 'react';

const AllocationPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Cấp phát tài sản</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          Quản lý việc cấp phát và thu hồi tài sản IT
        </p>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-12 text-center">
        <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">Tính năng đang phát triển</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Tính năng cấp phát tài sản sẽ sớm được cập nhật.
        </p>
      </div>
    </div>
  );
};

export default AllocationPage;