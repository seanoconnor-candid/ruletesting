import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function SearchInput({
  placeholder = "Search",
  value,
  onChange,
  className = ""
}: SearchInputProps) {
  return (
    <div className={`bg-white border border-gray-200 flex gap-2.5 h-8 items-center pl-2.5 pr-3 py-2 rounded-md w-full ${className}`}>
      <div className="flex gap-2.5 grow items-center min-h-0 min-w-0">
        <div className="overflow-hidden size-4">
          <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-xs font-normal leading-5 text-gray-400 placeholder-gray-400 bg-transparent border-none outline-none flex-1"
        />
      </div>
    </div>
  );
}