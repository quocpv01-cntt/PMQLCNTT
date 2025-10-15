import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';
import { Staff, Gender } from '../types';
import { staffApi } from '../services/api';
import { Link } from 'react-router-dom';
import StaffModal from '../components/forms/StaffModal';

const StaffPage: React.FC = () => {
  const { staff, loading, refreshStaff } = useData();
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [unitFilter, setUnitFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  const filteredStaff = staff.filter(person => {
    const matchesSearch = 
      person.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.phone.includes(searchTerm);
    
    const matchesUnit = unitFilter === 'all' || person.unit === unitFilter;
    const matchesStatus = statusFilter === 'all' || person.status === statusFilter;
    
    return matchesSearch && matchesUnit && matchesStatus;
  });

  const uniqueUnits = [...new Set(staff.map(person => person.unit))];

  const handleEdit = (person: Staff) => {
    setEditingStaff(person);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      try {
        await staffApi.delete(id);
        await refreshStaff();
        addToast('Xóa nhân viên thành công', 'success');
      } catch (error) {
        addToast('Có lỗi xảy ra khi xóa nhân viên', 'error');
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingStaff(null);
  };

  const handleModalSuccess = () => {
    refreshStaff();
    handleModalClose();
  };

  const getStatusBadge = (status: string) => {
    return status === 'Đang hoạt động' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  const getGenderIcon = (gender: Gender) => {
    if (gender === Gender.MALE) return '👨';
    if (gender === Gender.FEMALE) return '👩';
    return '👤';
  };

  if (loading.staff) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý Nhân viên</h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Quản lý thông tin nhân viên, phòng ban và quyền hạn trong hệ thống
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-4 w-4 inline mr-2" />
            Thêm nhân viên
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tìm kiếm
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Tên, mã NV, email, số điện thoại..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Unit Filter */}
          <div>
            <label htmlFor="unit-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Đơn vị
            </label>
            <select
              id="unit-filter"
              name="unit-filter"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              value={unitFilter}
              onChange={(e) => setUnitFilter(e.target.value)}
            >
              <option value="all">Tất cả đơn vị</option>
              {uniqueUnits.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Trạng thái
            </label>
            <select
              id="status-filter"
              name="status-filter"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="Đang hoạt động">Đang hoạt động</option>
              <option value="Đã nghỉ việc">Đã nghỉ việc</option>
            </select>
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-0">
                        Nhân viên
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Mã NV
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Đơn vị
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Chức vụ
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Liên hệ
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Trạng thái
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Thao tác</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredStaff.map((person) => (
                      <tr key={person.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-0">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-lg">
                                {getGenderIcon(person.gender)}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                <Link 
                                  to={`/staff/${person.id}`}
                                  className="hover:text-indigo-600 dark:hover:text-indigo-400"
                                >
                                  {person.fullName}
                                </Link>
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {person.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {person.employeeId}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {person.unit}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {person.position}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          <div>
                            <div>{person.phone}</div>
                            <div className="text-xs">{person.email}</div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadge(person.status)}`}>
                            {person.status}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <div className="flex items-center justify-end space-x-2">
                            <Link
                              to={`/staff/${person.id}`}
                              className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                              <UserIcon className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => handleEdit(person)}
                              className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(person.id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredStaff.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">
                      {searchTerm || unitFilter !== 'all' || statusFilter !== 'all' 
                        ? 'Không tìm thấy nhân viên nào phù hợp với bộ lọc'
                        : 'Chưa có nhân viên nào được thêm vào hệ thống'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Modal */}
      <StaffModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        staff={editingStaff}
      />
    </div>
  );
};

export default StaffPage;