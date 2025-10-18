'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, PlusIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Sidebar from '@/components/layout/Sidebar';
import { PatientIcon, PayerIcon, BillingProviderIcon, ProviderIcon, ServiceFacilityIcon } from '@/components/icons';
import { getClaimById } from '@/data/claims';

interface ClaimDetailsProps {
  params: { id: string };
}

export default function ClaimDetails({ params }: ClaimDetailsProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('properties');

  // Get the claim data based on the ID parameter
  const claim = getClaimById(params.id);

  // If claim not found, show error or redirect
  if (!claim) {
    return (
      <div className="bg-white relative shadow-sm size-full flex h-screen">
        <Sidebar onClose={() => {}} />
        <div className="flex-1 bg-neutral-50 flex flex-col min-h-screen ml-52 items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-700 mb-4">Claim Not Found</h1>
            <p className="text-gray-500 mb-4">The claim with ID {params.id} could not be found.</p>
            <button
              onClick={() => router.push('/claims')}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Back to Claims
            </button>
          </div>
        </div>
      </div>
    );
  }
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'patient-demographics': false,
    'primary-insurance': false,
    'secondary-insurance': false,
    'non-insurance-payer': false,
    'billing': false,
    'providers': false,
    'care-team': false,
    'service-facility': false,
    'details': false,
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleBackClick = () => {
    router.push('/claims');
  };

  const tabs = [
    { id: 'properties', name: 'Claim Properties', active: true },
    { id: 'dx-service-lines', name: 'Dx & Service Lines', active: false },
    { id: 'remits', name: 'Remits', active: false },
    { id: 'patient-invoices', name: 'Patient Invoices & Payments', active: false },
    { id: 'other-claims', name: 'Other claims', active: false },
    { id: 'documents', name: 'Documents & Checks', active: false },
  ];


  const activityItems = [
    {
      id: 1,
      type: 'comment',
      user: 'Alicia Simmons',
      timestamp: '03/09/2022 09:00 AM',
      content: 'Waiting on adjudication.',
      actions: ['Delete']
    },
    {
      id: 2,
      type: 'status',
      user: 'Candid Health',
      timestamp: '03/09/2022 09:00 AM',
      content: 'Status updated to',
      status: 'Submitted to Payer'
    },
    {
      id: 3,
      type: 'submission',
      user: 'Candid Health',
      timestamp: '03/09/2022 09:00 AM',
      content: 'Submitted to Aetna Gold PPO',
      subtitle: 'Submitted through Availity',
      flow: ['Submitted', 'Clearinghouse 227', 'Payer 277']
    },
    {
      id: 4,
      type: 'comment',
      user: 'Alicia Simmons',
      timestamp: '03/09/2022 09:00 AM',
      content: 'Resolved the eligibility.'
    },
    {
      id: 5,
      type: 'status',
      user: 'Candid Health',
      timestamp: '03/09/2022 09:00 AM',
      content: "Status updated to 'Waiting on provider'",
      status: 'Submitted to Payer'
    },
    {
      id: 6,
      type: 'task',
      user: 'Suzy Q',
      timestamp: '03/09/2022 at 09:00 AM',
      content: 'Member Eligibility task created',
      taskStatus: 'Completed',
      assignee: 'Sean OConnor',
      actions: ['Open']
    },
    {
      id: 7,
      type: 'basic',
      user: 'Candid Health',
      timestamp: '03/09/2022 at 09:00 AM',
      content: 'Claim generated'
    }
  ];

  return (
    <div className="bg-white relative shadow-sm size-full flex h-screen">
      {/* Sidebar */}
      <Sidebar onClose={() => {}} />

      {/* Main Content */}
      <div className="flex-1 bg-neutral-50 flex flex-col min-h-screen ml-52">
        {/* Header with breadcrumbs */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-2">
            {/* Left side - Back button */}
            <button
              onClick={handleBackClick}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="text-sm font-normal text-gray-600">Back</span>
            </button>

            {/* Right side - All other elements */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                </svg>
                <span className="text-sm text-indigo-700 font-normal">Aetna Denials</span>
                <span className="text-sm text-gray-500 font-normal">for 3 days</span>
              </div>

              <div className="bg-gray-100 border border-gray-200 rounded px-2 py-1 flex items-center gap-1">
                <svg className="w-3 h-3 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="text-sm text-gray-700 font-normal">Candid</span>
              </div>

              <div className="bg-indigo-100 border border-blue-200 rounded-l px-2 py-1.5">
                <span className="text-sm text-indigo-700 font-normal">Submitted to payer</span>
              </div>

              <button className="bg-white border border-gray-200 rounded px-3 py-1.5 text-sm font-normal text-gray-700 hover:bg-gray-50 h-[38px]">
                History
              </button>

              <button className="bg-white border border-gray-200 rounded px-3 py-1.5 text-sm font-normal text-gray-700 hover:bg-gray-50 h-[38px] flex items-center gap-2">
                Actions
                <ChevronDownIcon className="w-4 h-4 text-gray-500" />
              </button>

              <button className="bg-white border border-gray-200 rounded p-2 text-gray-500 hover:text-gray-700 h-[38px] w-[38px] flex items-center justify-center">
                <ChevronDownIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Claim Header */}
            <div className="bg-white px-10 py-6 border-b border-gray-200">
              <div className="mb-4">
                <h1 className="text-xl font-semibold text-gray-800 mb-2">{claim.patient}</h1>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div>
                    <div className="text-gray-400">Date of service</div>
                    <div className="text-gray-700">{claim.dos}</div>
                  </div>
                  <div className="w-px h-3.5 bg-gray-300"></div>
                  <div>
                    <div className="text-gray-400">Claim ID</div>
                    <div className="text-gray-700">029...1230</div>
                  </div>
                  <div className="w-px h-3.5 bg-gray-300"></div>
                  <div>
                    <div className="text-gray-400">Claim type</div>
                    <div className="bg-gray-100 px-1 py-0.5 rounded text-gray-700">Professional</div>
                  </div>
                  <div className="w-px h-3.5 bg-gray-300"></div>
                  <div>
                    <div className="text-gray-400">External ID</div>
                    <div className="text-gray-700">092...1213</div>
                  </div>
                  <div className="w-px h-3.5 bg-gray-300"></div>
                  <div>
                    <div className="text-gray-400">Billing type</div>
                    <div className="text-gray-700">Billable</div>
                  </div>
                  <div className="w-px h-3.5 bg-gray-300"></div>
                  <div>
                    <div className="text-gray-400">Billing status</div>
                    <div className="text-gray-700">Insurance pay</div>
                  </div>
                  <div className="w-px h-3.5 bg-gray-300"></div>
                  <div>
                    <div className="text-gray-400">Custom metadata</div>
                    <div className="text-indigo-700">15 fields</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                  <PlusIcon className="w-3 h-3" />
                  <span className="text-xs">Add tag</span>
                </button>
              </div>

              {/* Financial Stats */}
              <div className="flex items-center gap-4">
                <div className="bg-white border border-gray-200 rounded px-2 py-1 h-18 flex flex-col">
                  <div className="text-xs font-medium text-gray-700 mb-1">Billed</div>
                  <div className="text-sm font-normal text-gray-800">{claim.billedAmt}</div>
                </div>
                <div className="w-0.5 h-5 bg-gray-300"></div>
                <div className="bg-white border border-gray-200 rounded px-2 py-1 h-18 flex flex-col">
                  <div className="text-xs font-medium text-gray-700 mb-1">Allowed</div>
                  <div className="text-sm font-normal text-gray-800">$200.00</div>
                </div>
                <div className="bg-white border border-gray-200 rounded px-2 py-1 h-18 flex flex-col">
                  <div className="text-xs font-medium text-gray-700 mb-1">Payments</div>
                  <div className="flex gap-3">
                    <div>
                      <div className="bg-gray-100 px-1 py-0.5 rounded text-xs text-gray-700">Primary</div>
                      <div className="text-sm text-gray-800">$120.00</div>
                    </div>
                    <div>
                      <div className="bg-gray-100 px-1 py-0.5 rounded text-xs text-gray-700">Secondary</div>
                      <div className="text-sm text-gray-800">$10.00</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded px-2 py-1 h-18 flex flex-col">
                  <div className="text-xs font-medium text-gray-700 mb-1">Writeoffs</div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500">Patient</div>
                    <div className="text-sm text-gray-800">$5.00</div>
                  </div>
                </div>
                <div className="w-0.5 h-5 bg-gray-300"></div>
                <div className="bg-white border border-gray-200 rounded px-2 py-1 h-18 flex flex-col">
                  <div className="text-xs font-medium text-gray-700 mb-1">Balance</div>
                  <div className="text-sm text-gray-800">$15.00</div>
                </div>
                <div className="px-2 py-1 h-18 flex flex-col">
                  <div className="text-xs font-medium text-gray-700 mb-1">Responsible Party</div>
                  <div className="text-sm font-medium text-gray-800">Patient</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white px-10 border-b border-gray-200">
              <div className="flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-2 py-2 text-sm font-medium border-b-2 ${
                      activeTab === tab.id
                        ? 'text-indigo-700 border-indigo-700'
                        : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-10 py-4 overflow-y-auto">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Claim Properties</h2>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  {/* Patient Demographics */}
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between h-11">
                      <div className="flex items-center flex-1">
                        <div className="flex items-center gap-3 p-1.5 rounded">
                          <div className="w-9 h-9 flex items-center justify-center relative">
                            <PatientIcon size={36} />
                          </div>
                          <div className="flex flex-col">
                            <div className="text-xs font-normal text-gray-500">Patient</div>
                            <div className="text-sm font-medium text-gray-700">{claim.patient}</div>
                          </div>
                        </div>
                        <div className="flex flex-col ml-6 w-24">
                          <div className="text-xs font-normal text-gray-500">Date of birth</div>
                          <div className="text-sm font-normal text-gray-700">01/01/1985</div>
                        </div>
                        <div className="flex flex-col ml-6 flex-1">
                          <div className="text-xs font-normal text-gray-500">Gender</div>
                          <div className="text-sm font-normal text-gray-900">Female</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="bg-white border border-gray-200 rounded px-2 py-1.5 text-xs font-normal text-gray-700 hover:bg-gray-50 h-8">
                          Edit
                        </button>
                        <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  {/* Primary Insurance */}
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between h-11">
                      <div className="flex items-center flex-1">
                        <div className="flex items-center gap-3 p-1.5 rounded">
                          <div className="w-9 h-9 flex items-center justify-center relative">
                            <PayerIcon size={36} />
                          </div>
                          <div className="flex flex-col">
                            <div className="text-xs font-normal text-gray-500">Payer</div>
                            <div className="text-sm font-medium text-gray-700">{claim.payerName}</div>
                          </div>
                        </div>
                        <div className="flex flex-col ml-6 w-24">
                          <div className="text-xs font-normal text-gray-500">Payer ID</div>
                          <div className="text-sm font-normal text-gray-700">{claim.payerId}</div>
                        </div>
                        <div className="flex flex-col ml-6 flex-1">
                          <div className="text-xs font-normal text-gray-500">Member ID</div>
                          <div className="text-sm font-normal text-gray-900">W213863354</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-indigo-100 border border-blue-200 rounded px-1 py-1 flex items-center gap-1">
                          <svg className="w-3 h-3 text-indigo-700" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                          <span className="text-xs font-normal text-indigo-700">Eligible</span>
                        </div>
                        <button className="bg-white border border-gray-200 rounded px-2 py-1.5 text-xs font-normal text-gray-700 hover:bg-gray-50 h-8">
                          Edit
                        </button>
                        <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  {/* Secondary Insurance */}
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between h-11">
                      <div className="flex items-center flex-1">
                        <div className="flex items-center gap-3 p-1.5 rounded">
                          <div className="w-9 h-9 flex items-center justify-center relative">
                            <PayerIcon size={36} />
                          </div>
                          <div className="flex flex-col">
                            <div className="text-xs font-normal text-gray-500">Payer</div>
                            <div className="text-sm font-medium text-gray-700">AARP</div>
                          </div>
                        </div>
                        <div className="flex flex-col ml-6 w-24">
                          <div className="text-xs font-normal text-gray-500">Payer ID</div>
                          <div className="text-sm font-normal text-gray-700">60054</div>
                        </div>
                        <div className="flex flex-col ml-6 flex-1">
                          <div className="text-xs font-normal text-gray-500">Member ID</div>
                          <div className="text-sm font-normal text-gray-900">W213863354</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-indigo-100 border border-blue-200 rounded px-1 py-1 flex items-center gap-1">
                          <svg className="w-3 h-3 text-indigo-700" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                          <span className="text-xs font-normal text-indigo-700">Eligible</span>
                        </div>
                        <button className="bg-white border border-gray-200 rounded px-2 py-1.5 text-xs font-normal text-gray-700 hover:bg-gray-50 h-8">
                          Edit
                        </button>
                        <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  {/* Non Insurance Payer */}
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between h-11">
                      <div className="flex items-center flex-1">
                        <div className="flex items-center gap-3 p-1.5 rounded">
                          <div className="w-9 h-9 flex items-center justify-center relative">
                            <PayerIcon size={36} />
                          </div>
                          <div className="flex flex-col">
                            <div className="text-xs font-normal text-gray-500">Non insurance Payer</div>
                            <div className="text-sm font-medium text-gray-700">Sunrise Foundation</div>
                          </div>
                        </div>
                        <div className="flex flex-col ml-6 w-24">
                          <div className="text-xs font-normal text-gray-500">Category</div>
                          <div className="text-sm font-normal text-gray-700">Foundation</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="bg-white border border-gray-200 rounded px-2 py-1.5 text-xs font-normal text-gray-700 hover:bg-gray-50 h-8">
                          Edit
                        </button>
                        <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  {/* Billing Provider */}
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between h-11">
                      <div className="flex items-center flex-1">
                        <div className="flex items-center gap-3 p-1.5 rounded">
                          <div className="w-9 h-9 flex items-center justify-center relative">
                            <BillingProviderIcon size={36} />
                          </div>
                          <div className="flex flex-col">
                            <div className="text-xs font-normal text-gray-500">Billing provider</div>
                            <div className="text-sm font-medium text-gray-700">California Medical Center</div>
                          </div>
                        </div>
                        <div className="flex flex-col ml-6 w-24">
                          <div className="text-xs font-normal text-gray-500">NPI</div>
                          <div className="text-sm font-normal text-gray-700">1234567</div>
                        </div>
                        <div className="flex flex-col ml-6 flex-1">
                          <div className="text-xs font-normal text-gray-500">TIN</div>
                          <div className="text-sm font-normal text-gray-900">W213863354</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="bg-white border border-gray-200 rounded px-2 py-1.5 text-xs font-normal text-gray-700 hover:bg-gray-50 h-8">
                          Edit
                        </button>
                        <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  {/* Provider */}
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between h-11">
                      <div className="flex items-center flex-1">
                        <div className="flex items-center gap-3 p-1.5 rounded">
                          <div className="w-9 h-9 flex items-center justify-center relative">
                            <ProviderIcon size={36} />
                          </div>
                          <div className="flex flex-col">
                            <div className="text-xs font-normal text-gray-500">Provider</div>
                            <div className="text-sm font-medium text-gray-700">Sam Hide</div>
                          </div>
                        </div>
                        <div className="flex flex-col ml-6 w-24">
                          <div className="text-xs font-normal text-gray-500">NPI</div>
                          <div className="text-sm font-normal text-gray-700">1234567</div>
                        </div>
                        <div className="flex flex-col ml-6 w-32">
                          <div className="text-xs font-normal text-gray-500">Credentialed</div>
                          <div className="flex items-center gap-1">
                            <div className="bg-green-100 border border-green-200 rounded px-1 py-0 text-xs text-green-700">Effective</div>
                            <span className="text-xs text-gray-500">01/13/24</span>
                          </div>
                        </div>
                        <div className="flex flex-col ml-6 flex-1">
                          <div className="text-xs font-normal text-gray-500">Contracted</div>
                          <div className="flex items-center gap-1">
                            <div className="bg-green-100 border border-green-200 rounded px-1 py-0 text-xs text-green-700">Effective</div>
                            <span className="text-xs text-gray-500">01/13/24</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="bg-white border border-gray-200 rounded px-2 py-1.5 text-xs font-normal text-gray-700 hover:bg-gray-50 h-8">
                          Edit
                        </button>
                        <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  {/* Care Team */}
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between h-11">
                      <div className="flex items-center flex-1">
                        <div className="flex items-center gap-3 p-1.5 rounded">
                          <div className="w-9 h-9 flex items-center justify-center relative">
                            <ProviderIcon size={36} />
                          </div>
                          <div className="flex flex-col">
                            <div className="text-xs font-normal text-gray-500">Care team</div>
                            <div className="text-sm font-medium text-gray-700">Referring, Supervising</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="bg-white border border-gray-200 rounded px-2 py-1.5 text-xs font-normal text-gray-700 hover:bg-gray-50 h-8">
                          Edit
                        </button>
                        <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  {/* Service Facility */}
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between h-11">
                      <div className="flex items-center flex-1">
                        <div className="flex flex-col w-60">
                          <div className="text-xs font-normal text-gray-500">Service Facility</div>
                          <div className="flex items-center gap-2">
                            <ServiceFacilityIcon size={24} />
                            <span className="text-lg font-medium text-gray-700">Texas Facility</span>
                          </div>
                        </div>
                        <div className="flex flex-col ml-6 w-24">
                          <div className="text-xs font-normal text-gray-500">State</div>
                          <div className="text-sm font-normal text-gray-700">TX</div>
                        </div>
                        <div className="flex flex-col ml-6 w-24">
                          <div className="text-xs font-normal text-gray-500">Place of Service</div>
                          <div className="text-sm font-normal text-gray-700">02</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="bg-white border border-gray-200 rounded px-2 py-1.5 text-xs font-normal text-gray-700 hover:bg-gray-50 h-8">
                          Edit
                        </button>
                        <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="p-3 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between h-11">
                      <div className="flex items-center flex-1">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-700">Additional details</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="bg-white border border-gray-200 rounded px-2 py-1.5 text-xs font-normal text-gray-700 hover:bg-gray-50 h-8">
                          Edit
                        </button>
                        <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Sidebar */}
          <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
            {/* Activity Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex">
                <button className="px-2 py-2 text-sm font-medium text-indigo-700 border-b-2 border-indigo-700">
                  Activity
                </button>
                <button className="px-2 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent">
                  Tasks
                </button>
              </div>
            </div>

            {/* Activity Controls */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex rounded border border-gray-300">
                  <button className="px-3 py-1.5 text-xs bg-indigo-600 text-white rounded-l">All</button>
                  <button className="px-3 py-1.5 text-xs text-gray-700 border-l border-gray-300">Timeline</button>
                  <button className="px-3 py-1.5 text-xs text-gray-700 border-l border-gray-300 rounded-r">Notes</button>
                </div>
                <button className="flex items-center gap-1 text-indigo-700 text-xs hover:text-indigo-600">
                  <PlusIcon className="w-3 h-3" />
                  Comment
                </button>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="flex-1 px-6 py-4 overflow-y-auto">
              <div className="space-y-4">
                {activityItems.map((item, index) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                        {item.type === 'submission' && <span className="text-xs">✈️</span>}
                        {item.type === 'status' && <span className="text-xs">◆</span>}
                        {item.type === 'task' && <span className="text-xs">📋</span>}
                        {item.type === 'comment' && <span className="text-xs">💬</span>}
                        {item.type === 'basic' && <span className="text-xs">●</span>}
                      </div>
                      {index < activityItems.length - 1 && (
                        <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-gray-500 truncate">
                          {item.user} on {item.timestamp}
                        </p>
                        {item.actions && (
                          <button className="text-xs text-red-600 hover:text-red-700">
                            {item.actions[0]}
                          </button>
                        )}
                      </div>

                      <div className="text-sm text-gray-800 mb-2">{item.content}</div>

                      {item.subtitle && (
                        <div className="text-xs text-gray-500 mb-2">{item.subtitle}</div>
                      )}

                      {item.status && (
                        <div className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">
                          {item.status}
                        </div>
                      )}

                      {item.flow && (
                        <div className="flex items-center gap-1 flex-wrap">
                          {item.flow.map((step, stepIndex) => (
                            <React.Fragment key={step}>
                              <span className={`px-2 py-1 rounded text-xs ${
                                stepIndex === 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                              }`}>
                                {step}
                              </span>
                              {stepIndex < item.flow.length - 1 && (
                                <ChevronRightIcon className="w-3 h-3 text-gray-400" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      )}

                      {item.taskStatus && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {item.taskStatus}
                            </span>
                            <span className="text-xs text-gray-500">
                              Assignee: {item.assignee}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}