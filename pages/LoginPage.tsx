import React, { useContext, useState } from 'react';
import { AuthContext } from '../types';

const LoginPage: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('admin');
  const [password, setPassword] = useState('Admin@345');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const ctx = useContext(AuthContext);
      if (!ctx) throw new Error('Auth not ready');
      const ok = await ctx.login(employeeId, password, true);
      if (!ok) throw new Error('Đăng nhập thất bại');
    } catch (err: any) {
      setError(err.message || 'Lỗi');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white dark:bg-slate-800 p-6 rounded shadow space-y-3">
        <h2 className="text-lg font-semibold">Đăng nhập</h2>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <input value={employeeId} onChange={(e)=>setEmployeeId(e.target.value)} placeholder="Mã nhân viên" className="w-full border rounded px-3 py-2 bg-transparent"/>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Mật khẩu" className="w-full border rounded px-3 py-2 bg-transparent"/>
        <button className="w-full bg-slate-900 text-white rounded py-2">Đăng nhập</button>
      </form>
    </div>
  );
};

export default LoginPage;
