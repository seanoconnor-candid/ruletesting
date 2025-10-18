'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  PlusIcon,
  EllipsisHorizontalIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import Sidebar from '@/components/layout/Sidebar';
import { ClaimsHeaderIcon } from '@/components/icons';
import { sampleClaims, type Claim } from '@/data/claims';

function StatusBadge({ status }: { status: Claim['status'] }) {
  const getStatusColor = (status: Claim['status']) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Coded':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Denied':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Finalized paid':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(status)}`}>
      {status}
    </span>
  );
}

function FilterDropdown({ placeholder }: { placeholder: string }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="relative">
        <select className="appearance-none bg-white border border-[#e8e8eb] rounded h-[38px] px-3 py-2 pr-8 text-sm text-[#a7a7b0] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full">
          <option value="">{placeholder}</option>
        </select>
        <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#a7a7b0] pointer-events-none" />
      </div>
    </div>
  );
}

export default function ClaimsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleClaimClick = (claimId: string) => {
    router.push(`/claims/${claimId}`);
  };

  return (
    <div className="bg-white relative shadow-sm size-full flex h-screen">
      {/* Sidebar */}
      <Sidebar onClose={() => {}} />

      {/* Main Content */}
      <div className="flex-1 bg-neutral-50 flex flex-col min-h-screen ml-52">
        {/* Page Header */}
        <div className="flex items-center justify-between h-20 px-8 pt-8 pb-3 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <ClaimsHeaderIcon className="text-gray-500" size={36} />
            <h1 className="text-3xl font-light text-gray-800">Claims</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
            <span>Bulk upload</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white px-8 py-4 border-b border-gray-200">
          <div className="flex flex-col gap-2">
            {/* Search Row */}
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-[#747480]" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-[38px] pl-10 pr-4 py-2 bg-white border border-[#e8e8eb] rounded-md text-sm text-[#a7a7b0] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* First Filter Row */}
            <div className="flex items-center gap-2">
              <FilterDropdown placeholder="Primary Payer Names" />
              <FilterDropdown placeholder="Primary Payer IDs" />
              <FilterDropdown placeholder="Status" />
              <FilterDropdown placeholder="Tags" />
              <FilterDropdown placeholder="Service Date" />
            </div>

            {/* Second Filter Row */}
            <div className="flex items-center gap-2">
              <FilterDropdown placeholder="Owner of Next Action" />
              <FilterDropdown placeholder="Task Categories" />
              <FilterDropdown placeholder="Task Types" />
              <FilterDropdown placeholder="Billing NPI" />
              <FilterDropdown placeholder="Rendering provider" />
            </div>

            {/* Filter Actions */}
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 h-[38px] px-3 py-2 bg-white border border-[#e8e8eb] rounded text-sm font-normal text-[#3d3e45] hover:bg-gray-50">
                <FunnelIcon className="w-4 h-4" />
                Add
              </button>
              <button className="flex items-center gap-2 h-[38px] px-3 py-2 bg-white border border-[#e8e8eb] rounded text-sm font-normal text-[#3d3e45] hover:bg-gray-50">
                <div className="w-9 h-5 bg-[#e8e8eb] rounded-full p-0.5">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                Show saved filters
              </button>
              <button className="h-[38px] px-3 py-2 bg-white border border-[#e8e8eb] rounded text-sm font-normal text-[#3d3e45] hover:bg-gray-50">
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Claims Table */}
        <div className="flex-1 overflow-auto px-9">
          <table className="w-full bg-white">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DOS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Billed Amt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payer name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payer ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <PlusIcon className="w-4 h-4 ml-auto" />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleClaims.map((claim) => (
                <tr
                  key={claim.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleClaimClick(claim.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {claim.patient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {claim.dos}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {claim.billedAmt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {claim.payerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {claim.payerId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={claim.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {claim.tags?.join(', ') || ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click when clicking menu
                      }}
                    >
                      <EllipsisHorizontalIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}