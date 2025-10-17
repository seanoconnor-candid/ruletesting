'use client';

import { HomeIcon, DocumentTextIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import Sidebar from '@/components/layout/Sidebar';

const dashboardCards = [
  {
    title: 'Claims',
    description: 'Manage and track insurance claims',
    icon: DocumentTextIcon,
    href: '/claims',
    count: '1,234'
  },
  {
    title: 'Rules Engine',
    description: 'Configure business rules and logic',
    icon: PuzzlePieceIcon,
    href: '/rules-engine',
    count: '45'
  }
];

export default function Home() {
  return (
    <div className="bg-white relative shadow-sm size-full flex h-screen">
      {/* Sidebar */}
      <Sidebar onClose={() => {}} />

      {/* Main Content */}
      <div className="flex-1 bg-neutral-50 flex flex-col min-h-screen ml-52">
        {/* Page Header */}
        <div className="flex items-center justify-between h-20 px-8 pt-8 pb-3 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <HomeIcon className="w-6 h-6 text-gray-500" />
            <h1 className="text-3xl font-light text-gray-800">Dashboard</h1>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome to Happy Docs</h2>
            <p className="text-gray-600">Manage your healthcare operations from this central dashboard.</p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <card.icon className="w-8 h-8 text-gray-500" />
                  <span className="text-2xl font-bold text-gray-800">{card.count}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </a>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="flex gap-4">
              <button className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Create New Claim
              </button>
              <button className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Add Rule
              </button>
              <button className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
