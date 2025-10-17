interface Step {
  name: string;
  count: number;
  isSelected?: boolean;
  isHighlighted?: boolean;
}

interface PipelineStepProps {
  phase: string;
  steps: Step[];
  isActive?: boolean;
  onStepClick?: (stepName: string) => void;
}

export default function PipelineStep({ phase, steps, isActive, onStepClick }: PipelineStepProps) {
  return (
    <button
      className={`box-border cursor-pointer flex flex-col items-start p-2.5 relative rounded-sm w-full ${
        isActive ? 'bg-indigo-50' : 'bg-white'
      }`}
    >
      {/* Phase Header */}
      <div className="box-border flex gap-2 h-7.5 items-end pb-2.5 pt-1.25 px-1.25 relative w-full">
        <p className={`text-xs font-semibold leading-4 not-italic relative text-nowrap uppercase whitespace-pre ${
          isActive ? 'text-indigo-600' : 'text-gray-500'
        }`}>
          {phase}
        </p>
      </div>

      {/* Steps */}
      {steps.map((step, stepIndex) => (
        <div
          key={stepIndex}
          className={`box-border flex gap-1 items-center leading-6 not-italic p-1.25 relative text-sm text-nowrap w-full cursor-pointer ${
            step.isHighlighted ? 'bg-indigo-600' :
            step.isSelected ? 'bg-indigo-100 rounded-sm' : ''
          } ${step.isHighlighted ? '' : 'hover:bg-gray-50'}`}
          onClick={() => onStepClick?.(step.name)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onStepClick?.(step.name);
            }
          }}
        >
          <p className={`basis-0 font-medium grow min-h-0 min-w-0 overflow-ellipsis overflow-hidden relative text-left ${
            step.isHighlighted ? 'text-white' :
            step.isSelected ? 'text-gray-700' : 'text-gray-800'
          }`}>
            {step.name}
          </p>
          <p className={`font-normal relative whitespace-pre ${
            step.isHighlighted ? 'text-gray-400' :
            step.isSelected ? 'text-indigo-300' : 'text-gray-400'
          }`}>
            {step.count}
          </p>
        </div>
      ))}
    </button>
  );
}