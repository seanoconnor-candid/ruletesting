'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface RuleNode {
  id: string;
  type: 'condition' | 'action' | 'else';
  label: string;
  value?: string;
  children?: RuleNode[];
  position: { x: number; y: number };
}

interface Rule {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  nodes: RuleNode[];
}

// Sample rule data - in a real app this would come from an API
const sampleRule: Rule = {
  id: 'rule-1',
  name: 'Adjust 20311 if billed on same claim as 20333',
  description: 'Prevents charging for both codes',
  status: 'active',
  nodes: [
    {
      id: 'root',
      type: 'condition',
      label: 'All Claims',
      position: { x: 16, y: 58 }
    },
    {
      id: 'if-branch',
      type: 'condition',
      label: 'If',
      value: 'CPT Code is 20311',
      position: { x: 227, y: 16 },
      children: [
        {
          id: 'action-1',
          type: 'action',
          label: 'Then',
          value: 'Split into non-billable claim 20331',
          position: { x: 611, y: 16 }
        }
      ]
    },
    {
      id: 'else-branch',
      type: 'else',
      label: 'Else',
      value: 'Choose field',
      position: { x: 227, y: 144 },
      children: [
        {
          id: 'action-2',
          type: 'action',
          label: 'Then',
          value: 'Set...',
          position: { x: 611, y: 144 }
        }
      ]
    }
  ]
};

export default function RuleDetailsPage() {
  const router = useRouter();
  const [rule] = useState<Rule>(sampleRule);

  const handleClose = () => {
    router.back();
  };

  // Component for All Claims starter node with tree split
  const AllClaimsNode = ({ node, ifNode, elseNode }: { node: RuleNode; ifNode?: RuleNode; elseNode?: RuleNode }) => {
    // Calculate the center positions of the If and Else nodes
    const ifNodeCenter = ifNode ? { x: ifNode.position.x, y: ifNode.position.y + 25 } : null;
    const elseNodeCenter = elseNode ? { x: elseNode.position.x, y: elseNode.position.y + 25 } : null;

    // All Claims node - line should start from the right edge of the button
    const allClaimsRight = { x: node.position.x + 90, y: node.position.y + 17 }; // 90px = right edge of button, 17px = center height

    return (
      <div
        className="absolute flex items-center"
        style={{
          left: `${node.position.x}px`,
          top: `${node.position.y}px`,
        }}
      >
        {/* All Claims button */}
        <div className="bg-gray-600 text-white text-sm font-normal px-3 py-2 rounded-sm">
          All Claims
        </div>

        {/* Tree split with connecting lines to actual node centers */}
        {ifNodeCenter && elseNodeCenter && (
          <svg
            className="absolute"
            width={Math.max(ifNodeCenter.x - allClaimsRight.x + 50, elseNodeCenter.x - allClaimsRight.x + 50)}
            height={Math.max(elseNodeCenter.y - node.position.y + 50, 150)}
            style={{ left: 90, top: -node.position.y + Math.min(ifNodeCenter.y, node.position.y + 17) - 25 }}
          >
            {/* Main horizontal line from All Claims right edge */}
            <line
              x1="0"
              y1={node.position.y + 17 - Math.min(ifNodeCenter.y, node.position.y + 17) + 25}
              x2="50"
              y2={node.position.y + 17 - Math.min(ifNodeCenter.y, node.position.y + 17) + 25}
              stroke="#d1d5db"
              strokeWidth="2"
            />

            {/* Vertical connector line */}
            <line
              x1="50"
              y1={ifNodeCenter.y - Math.min(ifNodeCenter.y, node.position.y + 17) + 25}
              x2="50"
              y2={elseNodeCenter.y - Math.min(ifNodeCenter.y, node.position.y + 17) + 25}
              stroke="#d1d5db"
              strokeWidth="2"
            />

            {/* Line to If node */}
            <line
              x1="50"
              y1={ifNodeCenter.y - Math.min(ifNodeCenter.y, node.position.y + 17) + 25}
              x2={ifNodeCenter.x - allClaimsRight.x}
              y2={ifNodeCenter.y - Math.min(ifNodeCenter.y, node.position.y + 17) + 25}
              stroke="#d1d5db"
              strokeWidth="2"
            />

            {/* Line to Else node */}
            <line
              x1="50"
              y1={elseNodeCenter.y - Math.min(ifNodeCenter.y, node.position.y + 17) + 25}
              x2={elseNodeCenter.x - allClaimsRight.x}
              y2={elseNodeCenter.y - Math.min(ifNodeCenter.y, node.position.y + 17) + 25}
              stroke="#d1d5db"
              strokeWidth="2"
            />
          </svg>
        )}

        {/* Plus buttons positioned where guidelines meet the left edge of nodes */}
        {ifNodeCenter && (
          <button
            className="absolute bg-white border border-gray-200 w-7 h-7 rounded flex items-center justify-center text-xs text-black z-10"
            style={{
              left: ifNodeCenter.x - allClaimsRight.x - 28, // Position just before the node left edge
              top: ifNodeCenter.y - node.position.y - 14
            }}
          >
            +
          </button>
        )}
        {elseNodeCenter && (
          <button
            className="absolute bg-white border border-gray-200 w-7 h-7 rounded flex items-center justify-center text-xs text-black z-10"
            style={{
              left: elseNodeCenter.x - allClaimsRight.x - 28, // Position just before the node left edge
              top: elseNodeCenter.y - node.position.y - 14
            }}
          >
            +
          </button>
        )}
      </div>
    );
  };

  // Component for Condition (If) nodes
  const ConditionNode = ({ node }: { node: RuleNode }) => (
    <div
      className="absolute"
      style={{
        left: `${node.position.x}px`,
        top: `${node.position.y}px`,
      }}
    >
      <div className="bg-white border border-gray-500 rounded-lg shadow-sm w-[300px] px-0 py-2">
        {/* If label */}
        <div className="px-3 py-0">
          <p className="text-sm font-medium text-gray-500 mb-2">
            {node.label}
          </p>
        </div>

        {/* Content */}
        <div className="px-3">
          <div className="flex items-center gap-2 h-9 px-3 py-1.5 rounded-md">
            <span className="text-sm font-medium text-gray-900">
              {node.value || 'Choose field'}
            </span>
            <svg className="w-3 h-3 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  // Component for Action (Then) nodes
  const ActionNode = ({ node }: { node: RuleNode }) => (
    <div
      className="absolute"
      style={{
        left: `${node.position.x}px`,
        top: `${node.position.y}px`,
      }}
    >
      <div className="bg-indigo-100 rounded-lg shadow-sm w-[300px] px-0 py-2">
        {/* Then label */}
        <div className="px-3 py-0">
          <p className="text-sm font-medium text-gray-500 mb-2">
            Then
          </p>
        </div>

        {/* Content */}
        <div className="px-3">
          <div className="flex items-center gap-2 h-9 px-3 py-1.5 rounded-md">
            <span className="text-sm font-medium text-indigo-700">
              {node.value || 'Set...'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // Component for Else nodes
  const ElseNode = ({ node }: { node: RuleNode }) => (
    <div
      className="absolute"
      style={{
        left: `${node.position.x}px`,
        top: `${node.position.y}px`,
      }}
    >
      <div className="bg-gray-200 rounded-lg shadow-sm w-[300px] px-0 py-2">
        {/* Else label */}
        <div className="px-3 py-0">
          <p className="text-sm font-medium text-gray-500 mb-2">
            Else
          </p>
        </div>

        {/* Content */}
        <div className="px-3">
          <div className="flex items-center gap-2 h-9 px-3 py-1.5 rounded-md">
            <span className="text-sm font-medium text-gray-900">
              {node.value || 'Choose field'}
            </span>
            <svg className="w-3 h-3 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  // Component for horizontal connectors between nodes
  const Connector = ({ from, to }: { from: RuleNode; to: RuleNode }) => (
    <div
      className="absolute flex items-center"
      style={{
        left: `${from.position.x + 300}px`,
        top: `${from.position.y + 25}px`,
        width: `${to.position.x - (from.position.x + 300)}px`,
      }}
    >
      {/* Left line */}
      <div className="flex-1 h-0.5 bg-gray-300"></div>

      {/* Plus button */}
      <button className="bg-white border border-gray-200 w-7 h-7 rounded flex items-center justify-center text-xs text-black mx-1">
        +
      </button>

      {/* Right line */}
      <div className="flex-1 h-0.5 bg-gray-300"></div>
    </div>
  );

  const renderNode = (node: RuleNode) => {
    if (node.id === 'root') {
      // Find the If and Else nodes to pass their positions
      const ifNode = rule.nodes.find(n => n.id === 'if-branch');
      const elseNode = rule.nodes.find(n => n.id === 'else-branch');
      return <AllClaimsNode key={node.id} node={node} ifNode={ifNode} elseNode={elseNode} />;
    }

    if (node.type === 'condition') {
      return (
        <div key={node.id}>
          <ConditionNode node={node} />
          {node.children?.map(child => (
            <div key={`${node.id}-${child.id}`}>
              <Connector from={node} to={child} />
              {renderNode(child)}
            </div>
          ))}
        </div>
      );
    }

    if (node.type === 'action') {
      return <ActionNode key={node.id} node={node} />;
    }

    if (node.type === 'else') {
      return (
        <div key={node.id}>
          <ElseNode node={node} />
          {node.children?.map(child => (
            <div key={`${node.id}-${child.id}`}>
              <Connector from={node} to={child} />
              {renderNode(child)}
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-20 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-50 rounded-xl w-full max-w-[95vw] h-[95vh] flex flex-col shadow-xl backdrop-blur-sm">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-700">
                {rule.name}
              </h1>
              <p className="text-sm text-gray-500 opacity-50">
                {rule.description}
              </p>
            </div>

            {/* Status Badge */}
            <div className="bg-indigo-100 border border-indigo-200 px-2 py-1 rounded-md mr-4">
              <span className="text-indigo-700 text-base font-normal">
                Enabled
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="bg-white border border-gray-200 px-3 py-2 rounded text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <span className="text-gray-500">📋</span>
                Make a copy
              </button>
              <button className="bg-white border border-gray-200 px-3 py-2 rounded text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <span className="text-gray-500">🧪</span>
                Test
              </button>
              <button className="bg-indigo-600 text-white px-3 py-2 rounded text-sm hover:bg-indigo-700">
                Edit
              </button>
              <button
                onClick={handleClose}
                className="ml-2 p-2 hover:bg-gray-100 rounded-full"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative overflow-auto bg-gray-50 border border-gray-200">
          <div className="relative w-full h-full min-h-[600px]">
            {/* Grid background */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(#e5e7eb 1px, transparent 1px),
                  linear-gradient(90deg, #e5e7eb 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px'
              }}
            />

            {/* Rule nodes */}
            <div className="relative w-full h-full">
              {rule.nodes.map(renderNode)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}