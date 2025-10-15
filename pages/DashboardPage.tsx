import React, { useEffect, useState } from 'react';
import { dashboardApi } from '../services/api';

const Card: React.FC<{ title: string; value: number }> = ({ title, value }) => (
  <div className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow border border-slate-200/50 dark:border-slate-700">
    <div className="text-slate-500 text-sm">{title}</div>
    <div className="text-2xl font-bold mt-1">{value}</div>
  </div>
);

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<{ assets: number; employees: number; ticketsOpen: number; maintenance: number } | null>(null);

  useEffect(() => {
    dashboardApi.summary().then(setStats).catch(()=>setStats({ assets: 0, employees: 0, ticketsOpen: 0, maintenance: 0 }));
  }, []);

  if (!stats) return <div>Đang tải...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Tổng quan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Tài sản" value={stats.assets} />
        <Card title="Nhân viên" value={stats.employees} />
        <Card title="Ticket mở" value={stats.ticketsOpen} />
        <Card title="Bảo trì" value={stats.maintenance} />
      </div>
    </div>
  );
};

export default DashboardPage;
