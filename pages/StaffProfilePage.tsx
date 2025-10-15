import React from 'react';
import { useParams } from 'react-router-dom';

const StaffProfilePage: React.FC = () => {
  const { staffId } = useParams();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Hồ sơ nhân viên
      </h1>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <p className="text-gray-500 dark:text-gray-400">
          Đang phát triển - Staff ID: {staffId}
        </p>
      </div>
    </div>
  );
};

export default StaffProfilePage;