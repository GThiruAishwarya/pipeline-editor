// src/components/JSONPreview.tsx
import React from 'react';

const JSONPreview = ({ nodes, edges }: { nodes: any[]; edges: any[] }) => {
  return (
    <div className="json-preview">
      <strong>JSON Preview:</strong>
      <pre>{JSON.stringify({ nodes, edges }, null, 2)}</pre>
    </div>
  );
};

export default JSONPreview;
