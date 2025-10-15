import React from 'react';

const DetailedReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Báo cáo chi tiết</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          Xem báo cáo chi tiết và phân tích dữ liệu
        </p>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-12 text-center">
        <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">Tính năng đang phát triển</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Tính năng báo cáo chi tiết sẽ sớm được cập nhật.
        </p>
      </div>
    </div>
  );
};

export default DetailedReportsPage;