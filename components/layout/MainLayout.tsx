import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants';
import { useTheme } from '../../contexts/ThemeContext';

const SidebarLink: React.FC<{ href: string; active: boolean; children: React.ReactNode }> = ({ href, active, children }) => (
  <Link to={href} className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${active? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white':'text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'}`}>
    {children}
  </Link>
);

const MainLayout: React.FC = () => {
  const { pathname } = useLocation();
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900">
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 p-3 hidden md:block">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-bold text-slate-800 dark:text-slate-100">IT Asset</h1>
          <button onClick={toggle} className="text-xs px-2 py-1 border rounded dark:border-slate-700">{theme==='dark'? 'Light':'Dark'}</button>
        </div>
        <nav className="space-y-2">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              {item.href && item.href !== '#' ? (
                <SidebarLink href={item.href} active={pathname === item.href}>{item.label}</SidebarLink>
              ) : (
                <div>
                  <div className="px-2 text-xs uppercase text-slate-400 dark:text-slate-500 mb-1">{item.label}</div>
                  <div className="space-y-1">
                    {item.children?.map((child) => (
                      <SidebarLink key={child.href} href={child.href} active={pathname === child.href}>{child.label}</SidebarLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
