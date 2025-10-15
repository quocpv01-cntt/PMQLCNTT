import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-9xl font-extrabold text-gray-900 dark:text-white">
            404
          </h2>
          <h3 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            Không tìm thấy trang
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
        </div>
        <div>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <HomeIcon className="mr-2 h-4 w-4" />
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;