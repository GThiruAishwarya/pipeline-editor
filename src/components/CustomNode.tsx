// src/components/CustomNode.tsx
import React from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }: any) => {
  return (
    <div className="custom-node">
      <Handle type="target" position={Position.Left} />
      {data.label}
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default CustomNode;
