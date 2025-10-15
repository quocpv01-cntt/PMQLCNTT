import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import StatsCard from '../components/common/StatsCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    totalAssets: 0,
    activeAssets: 0,
    totalStaff: 0,
    openTickets: 0,
    pendingMaintenance: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const dashboardStats = await api.dashboard.getStats();
        setStats(dashboardStats);
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  // Sample data for charts
  const assetStatusData = [
    { name: 'Sẵn sàng', value: stats.totalAssets - stats.activeAssets, color: '#10b981' },
    { name: 'Đang sử dụng', value: stats.activeAssets, color: '#3b82f6' },
    { name: 'Bảo trì', value: stats.pendingMaintenance, color: '#f59e0b' },
    { name: 'Hỏng hóc', value: 2, color: '#ef4444' }
  ];

  const monthlyTicketsData = [
    { month: 'T1', tickets: 12 },
    { month: 'T2', tickets: 8 },
    { month: 'T3', tickets: 15 },
    { month: 'T4', tickets: 10 },
    { month: 'T5', tickets: 18 },
    { month: 'T6', tickets: 14 }
  ];

  const equipmentTypeData = [
    { type: 'Laptop', count: 25 },
    { type: 'Desktop', count: 15 },
    { type: 'Monitor', count: 40 },
    { type: 'Printer', count: 8 },
    { type: 'Server', count: 5 }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Tổng quan hệ thống</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          Thống kê tổng hợp về tài sản IT, nhân viên và hoạt động hệ thống
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatsCard
          title="Tổng tài sản"
          value={stats.totalAssets.toString()}
          icon={(
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )}
          change="+12%"
          changeType="increase"
          color="blue"
        />
        
        <StatsCard
          title="Đang sử dụng"
          value={stats.activeAssets.toString()}
          icon={(
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
          change="+5%"
          changeType="increase"
          color="green"
        />
        
        <StatsCard
          title="Nhân viên"
          value={stats.totalStaff.toString()}
          icon={(
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          )}
          change="+2"
          changeType="increase"
          color="purple"
        />
        
        <StatsCard
          title="Yêu cầu hỗ trợ"
          value={stats.openTickets.toString()}
          icon={(
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
          change="-3"
          changeType="decrease"
          color="orange"
        />
        
        <StatsCard
          title="Bảo trì chờ"
          value={stats.pendingMaintenance.toString()}
          icon={(
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          change="+1"
          changeType="increase"
          color="red"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Status Pie Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Trạng thái tài sản
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {assetStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {assetStatusData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Tickets Line Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Yêu cầu hỗ trợ theo tháng
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTicketsData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  className="text-slate-600 dark:text-slate-300"
                />
                <YAxis className="text-slate-600 dark:text-slate-300" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgb(30 41 59)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="tickets" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Equipment Types Bar Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Phân bố thiết bị theo loại
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={equipmentTypeData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="type" 
                className="text-slate-600 dark:text-slate-300"
              />
              <YAxis className="text-slate-600 dark:text-slate-300" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgb(30 41 59)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Bar 
                dataKey="count" 
                fill="#8b5cf6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tickets */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Yêu cầu hỗ trợ gần đây
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Máy tính không khởi động</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">Nguyễn Văn A - Kế toán</p>
              </div>
              <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs font-medium rounded-full">
                Cao
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Cài đặt phần mềm</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">Trần Thị B - Nhân sự</p>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs font-medium rounded-full">
                Trung bình
              </span>
            </div>
          </div>
        </div>

        {/* Upcoming Maintenance */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Bảo trì sắp tới
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Dell Latitude 5520</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">Bảo trì định kỳ</p>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-300">20/10/2024</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">HP EliteDesk 800</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">Nâng cấp RAM</p>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-300">25/10/2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;