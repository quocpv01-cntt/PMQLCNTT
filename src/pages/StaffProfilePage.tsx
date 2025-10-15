import React from 'react';
import { useParams } from 'react-router-dom';

const StaffProfilePage: React.FC = () => {
  const { staffId } = useParams<{ staffId: string }>();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Hồ sơ nhân viên</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          Chi tiết thông tin nhân viên ID: {staffId}
        </p>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-12 text-center">
        <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">Tính năng đang phát triển</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Tính năng hồ sơ nhân viên chi tiết sẽ sớm được cập nhật.
        </p>
      </div>
    </div>
  );
};

export default StaffProfilePage;