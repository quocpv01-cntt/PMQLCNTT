import React from 'react';

const LicensesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Quản lý License</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          Quản lý giấy phép phần mềm và license
        </p>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-12 text-center">
        <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">Tính năng đang phát triển</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Tính năng quản lý license sẽ sớm được cập nhật.
        </p>
      </div>
    </div>
  );
};

export default LicensesPage;