// src/components/ControlsPanel.tsx
import React from 'react';

const ControlsPanel = ({ onAddNode, onAutoLayout }: { onAddNode: () => void; onAutoLayout: () => void }) => {
  return (
    <>
      <button onClick={onAddNode}>Add Node</button>
      <button onClick={onAutoLayout}>Auto Layout</button>
    </>
  );
};

export default ControlsPanel;
