'use client';

import {
  HomeIcon,
  ChartBarIcon,
  UsersIcon,
  CogIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Users', href: '/users', icon: UsersIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Sidebar header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={onClose}
          className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </a>
        ))}
      </nav>

      {/* Sidebar footer */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">Dashboard App v1.0</p>
      </div>
    </div>
  );
}