import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { NAV_ITEMS } from '../../constants';
import { XMarkIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { UserRole } from '../../types';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const hasPermission = (moduleKey?: string) => {
    if (!moduleKey || !user?.permissions) return true;
    return user.permissions[moduleKey]?.view === true;
  };

  const hasRoleAccess = (roles: UserRole[]) => {
    if (!user?.role) return false;
    return roles.includes(user.role as UserRole);
  };

  const isActiveLink = (href: string) => {
    if (href === '/dashboard' && location.pathname === '/') return true;
    return location.pathname === href;
  };

  const renderNavItem = (item: any, isChild = false) => {
    if (!hasRoleAccess(item.roles) || !hasPermission(item.moduleKey)) {
      return null;
    }

    const isExpanded = expandedItems.includes(item.label);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = isActiveLink(item.href);

    if (hasChildren) {
      return (
        <div key={item.label}>
          <button
            onClick={() => toggleExpanded(item.label)}
            className={`group flex w-full items-center rounded-md p-2 text-sm font-medium ${
              isChild
                ? 'ml-6 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span className="flex-1 text-left">{item.label}</span>
            {isExpanded ? (
              <ChevronDownIcon className="h-4 w-4" />
            ) : (
              <ChevronRightIcon className="h-4 w-4" />
            )}
          </button>
          {isExpanded && (
            <div className="mt-1 space-y-1">
              {item.children.map((child: any) => renderNavItem(child, true))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.href}
        to={item.href}
        onClick={() => setOpen(false)}
        className={`group flex items-center rounded-md p-2 text-sm font-medium ${
          isActive
            ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200'
            : isChild
            ? 'ml-6 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
      >
        <item.icon
          className={`mr-3 h-5 w-5 flex-shrink-0 ${
            isActive
              ? 'text-indigo-500 dark:text-indigo-300'
              : 'text-gray-400 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
          }`}
          aria-hidden="true"
        />
        {item.label}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                  <span className="text-white font-bold text-sm">IT</span>
                </div>
                <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
                  Quản lý CNTT
                </span>
              </div>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Đóng sidebar</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <nav className="mt-8">
              <div className="space-y-1">
                {NAV_ITEMS.map(item => renderNavItem(item))}
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-800 px-6 pb-4 border-r border-gray-200 dark:border-gray-700">
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                <span className="text-white font-bold text-sm">IT</span>
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
                Quản lý CNTT
              </span>
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col gap-y-7">
              <div className="space-y-1">
                {NAV_ITEMS.map(item => renderNavItem(item))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;