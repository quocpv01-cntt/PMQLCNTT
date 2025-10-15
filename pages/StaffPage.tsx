import React, { useEffect, useState } from 'react';
import { staffApi } from '../services/api';

const StaffPage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);

  const load = async () => {
    const list = await staffApi.getAll();
    setItems(list);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Danh sách Cán bộ</h2>
        <button onClick={load} className="text-sm border px-3 py-1 rounded">Tải lại</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left bg-slate-100 dark:bg-slate-800">
              <th className="p-2">Mã</th>
              <th className="p-2">Họ tên</th>
              <th className="p-2">Email</th>
              <th className="p-2">Đơn vị</th>
              <th className="p-2">Chức vụ</th>
            </tr>
          </thead>
          <tbody>
            {items.map((s) => (
              <tr key={s.id} className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-2">{s.employeeId}</td>
                <td className="p-2">{s.fullName}</td>
                <td className="p-2">{s.email}</td>
                <td className="p-2">{s.unit}</td>
                <td className="p-2">{s.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffPage;
