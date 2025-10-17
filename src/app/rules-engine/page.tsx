'use client';

import { useState } from 'react';
import { ChevronDownIcon, PlusIcon, ArrowUpRightIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import RuleCard from '@/components/ui/RuleCard';
import PipelineStep from '@/components/ui/PipelineStep';
import SearchInput from '@/components/ui/SearchInput';
import Sidebar from '@/components/layout/Sidebar';

interface Rule {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
}

const sampleRules: Rule[] = Array(12).fill(null).map((_, index) => ({
  id: `rule-${index + 1}`,
  name: "Dani's Rule",
  description: "This is a description of the rule",
  status: 'active' as const
}));

const pipelineSteps = [
  {
    phase: "ELIGIBILITY",
    steps: [
      { name: "Patient", count: 2 }
    ]
  },
  {
    phase: "CODED",
    steps: [
      { name: "Coding", count: 2 }
    ]
  },
  {
    phase: "GENERATE A CLAIM",
    isActive: true,
    steps: [
      { name: "Payer", count: 2, isSelected: true },
      { name: "Patient", count: 2 },
      { name: "Service Facility", count: 2 },
      { name: "Billing Provider", count: 2 },
      { name: "BCBS Routing", count: 2 },
      { name: "Service Lines", count: 2 },
      { name: "Finalize Claim", count: 2, isHighlighted: true }
    ]
  },
  {
    phase: "VALIDATE CLAIM",
    steps: [
      { name: "Payer", count: 2 },
      { name: "Patient", count: 2 },
      { name: "Service Facility", count: 2 }
    ]
  },
  {
    phase: "SUBMISSION",
    steps: [
      { name: "Additional", count: 2 }
    ]
  }
];

export default function RulesEnginePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleStepClick = (stepName: string) => {
    console.log('Step clicked:', stepName);
  };

  const handleRuleToggle = (ruleId: string) => {
    console.log('Rule toggled:', ruleId);
  };

  return (
    <div className="bg-white relative shadow-sm size-full flex h-screen">
      {/* Sidebar */}
      <Sidebar onClose={() => {}} />

      {/* Main Content */}
      <div className="flex-1 bg-neutral-50 flex flex-col gap-4 min-h-screen ml-52">
        {/* Page Header */}
        <div className="flex gap-2.5 h-20 items-start pb-3 pt-8 px-8 w-full">
          <div className="flex flex-col gap-2 grow items-start justify-end min-h-0 min-w-0">
            <div className="flex gap-2 items-center justify-center">
              <div className="size-9 flex items-center justify-center">
                <PuzzlePieceIcon className="w-6 h-6 text-gray-500" />
              </div>
              <h1 className="text-3xl font-light leading-9 text-gray-800">
                Rules Engine
              </h1>
            </div>
          </div>
          <div className="flex gap-2.5 items-center">
            <div className="flex gap-1 items-center">
              <div className="flex flex-col items-start">
                <div className="flex gap-2.5 items-center">
                  <p className="text-sm font-normal leading-6 text-gray-500">
                    Learn more
                  </p>
                </div>
                <div className="h-0 w-full">
                  <div className="border-b border-gray-500 w-full"></div>
                </div>
              </div>
              <ArrowUpRightIcon className="w-4 h-4 text-gray-500" />
            </div>
            <button className="flex gap-2 h-9.5 items-center justify-center px-3 py-2 rounded">
              <PlusIcon className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-normal leading-6 text-gray-700">Variables</span>
            </button>
            <button className="bg-white border border-gray-200 flex gap-2 h-9.5 items-center justify-center px-3 py-2 rounded shadow-sm">
              <PlusIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-normal leading-6 text-gray-700">New</span>
            </button>
          </div>
        </div>

        <div className="flex items-start pl-8 pr-0 py-0 w-full">
          {/* Left Rail */}
          <div className="flex flex-col gap-3 items-start w-52">
            {/* Pipeline Selection */}
            <div className="flex flex-col gap-1 items-start w-full">
              <div className="bg-white border border-gray-200 h-9.5 rounded w-full">
                <div className="flex gap-2 h-9.5 items-center overflow-hidden px-3 py-2 rounded w-full">
                  <div className="flex gap-1 grow items-center min-h-0 min-w-0">
                    <p className="text-sm font-normal leading-6 text-gray-700">
                      Claim submission
                    </p>
                  </div>
                  <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Search */}
            <SearchInput
              placeholder="Search rules"
              value={searchTerm}
              onChange={setSearchTerm}
            />

            {/* Rules Steps */}
            <div className="bg-white flex flex-col items-start w-full">
              {pipelineSteps.map((section, sectionIndex) => (
                <PipelineStep
                  key={sectionIndex}
                  phase={section.phase}
                  steps={section.steps}
                  isActive={section.isActive}
                  onStepClick={handleStepClick}
                />
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex flex-col gap-4 grow items-start min-h-0 min-w-0 pb-0 pt-2 px-8">
            {/* Claims Header */}
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-1.25 items-start justify-end">
                <p className="text-xs font-semibold leading-4 text-gray-500 uppercase">
                  Generate CLAIM phase
                </p>
                <div className="flex gap-2.5 items-start">
                  <h2 className="text-2xl font-bold leading-8 text-gray-800">
                    Finalize Claim
                  </h2>
                </div>
                <div className="flex gap-2.5 items-start">
                  <p className="text-sm font-normal leading-6 text-gray-800">
                    Makes the final transformations needed the ready the claim for submission.
                  </p>
                </div>
              </div>
              <div className="flex gap-11.5 items-center justify-end w-64">
                <button className="flex gap-2.5 h-9.5 items-center justify-center px-3 py-2 rounded">
                  <span className="text-sm font-normal leading-6 text-gray-700">Reorder</span>
                </button>
                <div className="flex gap-2.5 items-center">
                  <p className="text-sm font-normal leading-6 text-gray-600">
                    {sampleRules.length} Rules
                  </p>
                </div>
              </div>
            </div>

            {/* Rules List */}
            <div className="space-y-3 w-full">
              {sampleRules.map((rule) => (
                <RuleCard
                  key={rule.id}
                  id={rule.id}
                  name={rule.name}
                  description={rule.description}
                  status={rule.status}
                  onToggle={handleRuleToggle}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pointing Hand - Hidden for now since image asset is not available */}
        {/*
        <div className="absolute left-[1133px] overflow-hidden size-12.5 top-40">
          <div className="absolute inset-[27.08%_29.3%_29.3%_29.82%]">
            <img alt="Pointing hand" className="block max-w-none size-full" src={img12} />
          </div>
        </div>
        */}
      </div>
    </div>
  );
}