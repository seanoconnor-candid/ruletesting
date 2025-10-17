'use client';

import {
  HomeIcon,
  ChartBarIcon,
  UsersIcon,
  CogIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  PuzzlePieceIcon,
  InboxIcon,
  ListBulletIcon,
  CheckBadgeIcon,
  TableCellsIcon,
  CurrencyDollarIcon,
  BookmarkIcon,
  BanknotesIcon,
  PaperAirplaneIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  onClose: () => void;
}

const operationsNavigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Reports', href: '/reports', icon: ChartBarIcon },
  { name: 'Claims', href: '/claims', icon: 'claims' }, // Custom icon
  { name: 'Queues', href: '/queues', icon: InboxIcon },
  { name: 'Tasks', href: '/tasks', icon: ListBulletIcon },
  { name: 'Patients', href: '/patients', icon: 'patients' }, // Custom icon
  { name: 'Remits', href: '/remits', icon: 'remits' }, // Custom icon
  { name: 'Eligibility', href: '/eligibility', icon: CheckBadgeIcon },
];

const configurationNavigation = [
  { name: 'Rules Engine', href: '/rules-engine', icon: PuzzlePieceIcon, isActive: true },
  { name: 'Providers', href: '/providers', icon: 'providers' }, // Custom icon
  { name: 'Payers', href: '/payers', icon: 'payers' }, // Custom icon
  { name: 'Contracts', href: '/contracts', icon: 'contracts' }, // Custom icon
  { name: 'Service Facilities', href: '/service-facilities', icon: 'service-facilities' }, // Custom icon
  { name: 'Chargemasters', href: '/chargemasters', icon: TableCellsIcon },
  { name: 'Fee Schedules', href: '/fee-schedules', icon: CurrencyDollarIcon },
  { name: 'Enrollments', href: '/enrollments', icon: BookmarkIcon, badge: '3' },
  { name: 'Bank Transactions', href: '/bank-transactions', icon: BanknotesIcon },
  { name: 'Charge ingestion', href: '/charge-ingestion', icon: PaperAirplaneIcon },
  { name: 'Settings & Integrations', href: '/settings', icon: CogIcon },
  { name: 'Users & Roles', href: '/users-roles', icon: 'sitemap' }, // Custom icon
];

const bottomNavigation = [
  { name: 'Support', href: '/support', icon: QuestionMarkCircleIcon },
  { name: 'API Reference', href: '/api-reference', icon: BookOpenIcon },
];

// Custom icon component for SVG icons
function CustomIcon({ name, className }: { name: string; className: string }) {
  // For now, we'll use placeholder icons. In a real implementation,
  // these would be actual SVG components matching the Figma design
  const iconMap: Record<string, React.ComponentType<{ className: string }>> = {
    'claims': UsersIcon, // Placeholder
    'patients': UsersIcon, // Placeholder
    'remits': UsersIcon, // Placeholder
    'providers': UsersIcon, // Placeholder
    'payers': UsersIcon, // Placeholder
    'contracts': UsersIcon, // Placeholder
    'service-facilities': UsersIcon, // Placeholder
    'sitemap': UsersIcon, // Placeholder
  };

  const IconComponent = iconMap[name] || UsersIcon;
  return <IconComponent className={className} />;
}

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <div className="bg-neutral-50 border-r border-gray-200 flex flex-col h-screen w-52 fixed top-0 left-0 z-10 overflow-y-auto">
      {/* Top Section */}
      <div className="flex flex-col gap-4.5 grow items-start min-h-0 w-full pt-4.5">
        {/* Logo and Header */}
        <div className="flex gap-2.5 items-center px-4.5 py-0 w-full">
          <div className="size-6">
            {/* Logo placeholder */}
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
          </div>
          <div className="flex gap-1.25 grow h-5.75 items-center min-h-0 min-w-0">
            <div className="flex flex-col font-medium grow justify-center leading-0 min-h-0 min-w-0 text-gray-800 text-sm">
              <p className="leading-6">Happy Docs</p>
            </div>
            <div className="flex flex-col items-center justify-center size-3">
              <ChevronDownIcon className="w-3 h-3 text-gray-500" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center size-4">
            <span className="text-gray-500 text-sm">⋯</span>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-start px-3 py-0 w-full">
          <div className="flex gap-2.5 grow h-8 items-center px-1.5 py-2 rounded-l-1.5 min-h-0 min-w-0 mr-[-1px]">
            <MagnifyingGlassIcon className="w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="grow min-h-0 min-w-0 text-sm font-normal leading-6 text-gray-700 bg-transparent border-none outline-none"
            />
            <div className="bg-gray-300 bg-opacity-40 flex items-center px-1 py-0.5 rounded-sm">
              <span className="text-xs font-normal leading-5 text-gray-600">⌘K</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4.5 items-start px-2 py-0 w-full">
          {/* Operations Section */}
          <div className="flex flex-col gap-2 items-start px-2 py-0 w-full">
            <p className="text-xs font-normal leading-4 text-gray-500">
              Operations
            </p>
            <div className="flex flex-col gap-1 items-start w-full">
              {operationsNavigation.map((item) => (
                <div key={item.name} className="flex gap-3 items-center px-2 py-1 w-full">
                  <div className="size-3">
                    {typeof item.icon === 'string' ? (
                      <CustomIcon name={item.icon} className="w-3 h-3 text-gray-500" />
                    ) : (
                      <item.icon className="w-3 h-3 text-gray-500" />
                    )}
                  </div>
                  <a
                    href={item.href}
                    className="grow min-h-0 min-w-0 text-sm font-normal leading-6 text-gray-700 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Configuration Section */}
          <div className="flex flex-col gap-1 items-start px-2 py-0 w-full">
            <div className="flex gap-2 items-center w-full">
              <p className="text-xs font-normal leading-4 text-gray-500">
                Configuration
              </p>
            </div>
            <div className="flex flex-col gap-1 items-start w-full">
              {configurationNavigation.map((item) => (
                <div
                  key={item.name}
                  className={`flex gap-3 items-center overflow-hidden px-2 py-1 w-full ${
                    item.isActive ? 'bg-gray-200 rounded' : ''
                  }`}
                >
                  <div className="size-3">
                    {typeof item.icon === 'string' ? (
                      <CustomIcon name={item.icon} className="w-3 h-3 text-gray-500" />
                    ) : (
                      <item.icon className="w-3 h-3 text-gray-500" />
                    )}
                  </div>
                  <a
                    href={item.href}
                    className={`grow min-h-0 min-w-0 text-sm leading-6 hover:text-gray-900 ${
                      item.isActive ? 'font-medium text-gray-700' : 'font-normal text-gray-700'
                    }`}
                  >
                    {item.name}
                  </a>
                  {item.badge && (
                    <div className="bg-indigo-50 flex flex-col gap-2.5 items-start px-1 py-0.5 rounded-sm">
                      <p className="text-xs font-normal leading-5 text-indigo-600">
                        {item.badge}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-neutral-50 flex flex-col gap-1 items-start px-0 py-0.25 w-full">
        {bottomNavigation.map((item) => (
          <div key={item.name} className="flex gap-3 items-center px-4 py-1 w-full">
            <item.icon className="w-3 h-3 text-gray-500" />
            <a
              href={item.href}
              className="grow min-h-0 min-w-0 text-sm font-normal leading-6 text-gray-700 hover:text-gray-900"
            >
              {item.name}
            </a>
          </div>
        ))}

        {/* User Profile */}
        <div className="bg-neutral-50 flex gap-3 items-center px-4.5 py-1.25 w-50">
          <div className="bg-indigo-100 flex flex-col gap-2.5 items-center justify-center overflow-hidden rounded-full size-8.5">
            <p className="text-sm font-semibold leading-5 text-gray-600">
              JD
            </p>
          </div>
          <div className="flex flex-col grow items-start min-h-0 min-w-0">
            <p className="text-xs font-medium leading-5 text-gray-700 w-13.5">
              Jane Doe
            </p>
          </div>
        </div>
      </div>

      {/* Mobile close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
    </div>
  );
}