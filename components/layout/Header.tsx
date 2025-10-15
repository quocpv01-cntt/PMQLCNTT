import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { 
  Bars3Icon, 
  BellIcon, 
  SunIcon, 
  MoonIcon, 
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ngày trước`;
  };

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-300 lg:hidden"
        onClick={onMenuClick}
      >
        <span className="sr-only">Mở sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1 items-center">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Hệ thống Quản lý CNTT
          </h1>
        </div>
        
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Theme toggle */}
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
            onClick={toggleTheme}
          >
            <span className="sr-only">Chuyển đổi theme</span>
            {theme === 'light' ? (
              <MoonIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <SunIcon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <span className="sr-only">Xem thông báo</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Thông báo</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                      >
                        Đánh dấu tất cả đã đọc
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                      Không có thông báo nào
                    </div>
                  ) : (
                    notifications.slice(0, 10).map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                          !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                            notification.type === 'error' ? 'bg-red-400' :
                            notification.type === 'warning' ? 'bg-yellow-400' :
                            notification.type === 'success' ? 'bg-green-400' :
                            'bg-blue-400'
                          }`} />
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              {formatTimeAgo(notification.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-gray-700" aria-hidden="true" />

          {/* Profile dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              className="-m-1.5 flex items-center p-1.5"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <span className="sr-only">Mở menu người dùng</span>
              <UserCircleIcon className="h-8 w-8 text-gray-400 dark:text-gray-300" />
              <span className="hidden lg:flex lg:items-center">
                <span className="ml-4 text-sm font-semibold leading-6 text-gray-900 dark:text-white" aria-hidden="true">
                  {user?.name}
                </span>
              </span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-2 shadow-lg ring-1 ring-gray-900/5 dark:ring-gray-700 focus:outline-none">
                <Link
                  to="/account"
                  className="flex items-center px-3 py-1 text-sm leading-6 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => setShowUserMenu(false)}
                >
                  <UserCircleIcon className="h-4 w-4 mr-2" />
                  Tài khoản của tôi
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-3 py-1 text-sm leading-6 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Cog6ToothIcon className="h-4 w-4 mr-2" />
                  Cài đặt
                </Link>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                  }}
                  className="flex w-full items-center px-3 py-1 text-sm leading-6 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;