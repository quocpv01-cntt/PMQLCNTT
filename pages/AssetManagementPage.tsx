import React, { useEffect, useState } from 'react';
import { assetsApi } from '../services/api';

const AssetManagementPage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);

  const load = async () => {
    const list = await assetsApi.list();
    setItems(list);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Thiết bị Công Nghệ</h2>
        <button onClick={load} className="text-sm border px-3 py-1 rounded">Tải lại</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left bg-slate-100 dark:bg-slate-800">
              <th className="p-2">Mã TS</th>
              <th className="p-2">Tên</th>
              <th className="p-2">Loại</th>
              <th className="p-2">Serial</th>
              <th className="p-2">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {items.map((a) => (
              <tr key={a.id} className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-2">{a.assetTag}</td>
                <td className="p-2">{a.deviceName}</td>
                <td className="p-2">{a.deviceType}</td>
                <td className="p-2">{a.serialNumber}</td>
                <td className="p-2">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetManagementPage;
