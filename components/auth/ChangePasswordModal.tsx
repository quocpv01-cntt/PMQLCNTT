import React, { useState } from 'react';

const ChangePasswordModal: React.FC<{ isOpen: boolean; userId: string; onSuccess: (userId: string)=>void }>=({isOpen,userId,onSuccess})=>{
  const [pwd, setPwd] = useState('');
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded shadow w-full max-w-sm space-y-3">
        <h3 className="text-lg font-semibold">Đổi mật khẩu</h3>
        <input type="password" value={pwd} onChange={(e)=>setPwd(e.target.value)} placeholder="Mật khẩu mới" className="w-full border rounded px-3 py-2 bg-transparent"/>
        <div className="flex justify-end gap-2">
          <button className="px-3 py-1 border rounded" onClick={()=>onSuccess(userId)}>Xác nhận</button>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
