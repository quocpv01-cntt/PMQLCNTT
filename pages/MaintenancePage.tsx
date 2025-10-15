import React, { useEffect, useState } from 'react';
import { maintenanceApi } from '../services/api';

const MaintenancePage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  useEffect(()=>{ maintenanceApi.list().then(setItems).catch(()=>setItems([])); },[]);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Lịch sử Bảo trì</h2>
      <div className="space-y-2">
        {items.map(m => (
          <div key={m.id} className="p-3 rounded border bg-white dark:bg-slate-800 border-slate-200/50 dark:border-slate-700">
            <div className="font-medium">{m.type}</div>
            <div className="text-xs text-slate-500">{m.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MaintenancePage;
