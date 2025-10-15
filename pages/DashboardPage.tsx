import React, { useState, useEffect } from 'react';
import { 
  ComputerDesktopIcon, 
  UsersIcon, 
  KeyIcon, 
  WrenchScrewdriverIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { dashboardApi } from '../services/api';
import { StatCardData } from '../types';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardApi.getStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Không thể tải dữ liệu thống kê</p>
      </div>
    );
  }

  const statCards: StatCardData[] = [
    {
      title: 'Tổng thiết bị',
      value: stats.totalEquipment.toString(),
      icon: ComputerDesktopIcon,
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Thiết bị đang sử dụng',
      value: stats.inUseEquipment.toString(),
      icon: ChartBarIcon,
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Nhân viên',
      value: stats.totalStaff.toString(),
      icon: UsersIcon,
      change: '+2%',
      changeType: 'increase'
    },
    {
      title: 'Giấy phép hoạt động',
      value: stats.activeLicenses.toString(),
      icon: KeyIcon,
      change: '-1',
      changeType: 'decrease'
    }
  ];

  const equipmentStatusData = Object.entries(stats.equipmentByStatus).map(([status, count]) => ({
    name: status,
    value: count as number
  }));

  const equipmentTypeData = Object.entries(stats.equipmentByType).map(([type, count]) => ({
    name: type,
    value: count as number
  }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const monthlyData = [
    { month: 'T1', equipment: 45, maintenance: 3, requests: 12 },
    { month: 'T2', equipment: 52, maintenance: 5, requests: 8 },
    { month: 'T3', equipment: 48, maintenance: 2, requests: 15 },
    { month: 'T4', equipment: 61, maintenance: 7, requests: 10 },
    { month: 'T5', equipment: 55, maintenance: 4, requests: 18 },
    { month: 'T6', equipment: 67, maintenance: 6, requests: 14 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Tổng quan về hệ thống quản lý CNTT
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <div
            key={stat.title}
            className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 py-5 shadow sm:px-6 sm:py-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.title}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-4 w-4 flex-shrink-0 self-center" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 flex-shrink-0 self-center" />
                )}
                <span className="sr-only">
                  {stat.changeType === 'increase' ? 'Tăng' : 'Giảm'} so với tháng trước
                </span>
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Equipment Status Pie Chart */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Trạng thái thiết bị
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={equipmentStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {equipmentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Equipment Type Bar Chart */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Thiết bị theo loại
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={equipmentTypeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Xu hướng theo tháng
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="equipment" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Thiết bị"
                />
                <Line 
                  type="monotone" 
                  dataKey="maintenance" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Bảo trì"
                />
                <Line 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  name="Yêu cầu"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Thao tác nhanh
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <ComputerDesktopIcon className="h-5 w-5 mr-2" />
              Thêm thiết bị
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <UsersIcon className="h-5 w-5 mr-2" />
              Thêm nhân viên
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <WrenchScrewdriverIcon className="h-5 w-5 mr-2" />
              Lên lịch bảo trì
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <KeyIcon className="h-5 w-5 mr-2" />
              Quản lý giấy phép
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Hoạt động gần đây
          </h3>
          <div className="flow-root">
            <ul className="-mb-8">
              <li>
                <div className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                        <ComputerDesktopIcon className="h-5 w-5 text-white" />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Thêm thiết bị mới <span className="font-medium text-gray-900 dark:text-white">Dell Latitude 5420</span>
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                        2 giờ trước
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                        <WrenchScrewdriverIcon className="h-5 w-5 text-white" />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Hoàn thành bảo trì <span className="font-medium text-gray-900 dark:text-white">Cisco Catalyst 2960</span>
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                        1 ngày trước
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative">
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                        <UsersIcon className="h-5 w-5 text-white" />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Cập nhật thông tin nhân viên <span className="font-medium text-gray-900 dark:text-white">Nguyễn Văn An</span>
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                        3 ngày trước
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;