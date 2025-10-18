import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface RuleCardProps {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  onToggle?: (id: string) => void;
}

export default function RuleCard({ id, name, description, status, onToggle }: RuleCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/rules-engine/${id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white border border-[#E8E8E8] flex flex-col gap-2.5 items-start justify-center overflow-hidden px-3 py-5 rounded-lg w-full hover:shadow-md transition-shadow duration-200 cursor-pointer"
    >
      <div className="flex gap-4 items-start w-full">
        <div className="flex flex-col gap-2.5 grow items-start min-h-0 min-w-0 pr-5">
          <div className="flex flex-col gap-0.75 items-start justify-center w-full">
            <p className="text-sm font-semibold leading-6 text-gray-700">
              {name}
            </p>
            <p className="text-xs font-normal leading-5 text-gray-500 w-full">
              {description}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`border flex gap-1 items-center px-2 py-0 rounded-md flex-shrink-0 ${
          status === 'active'
            ? 'bg-emerald-100 border-emerald-200'
            : 'bg-gray-100 border-gray-200'
        }`}>
          <p className={`text-base font-normal leading-7 ${
            status === 'active' ? 'text-emerald-700' : 'text-gray-700'
          }`}>
            {status === 'active' ? 'Active' : 'Inactive'}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex flex-row items-center self-stretch flex-shrink-0">
          <div className="flex flex-col gap-2.5 h-full items-start justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle?.(id);
              }}
              className="bg-white flex gap-2 h-9.5 items-center justify-center px-3 py-2 rounded hover:bg-gray-50 transition-colors"
            >
              <ChevronDownIcon className="w-4 h-4 text-gray-600 rotate-270" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}