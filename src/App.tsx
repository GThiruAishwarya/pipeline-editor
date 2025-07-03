// src/App.tsx
import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './components/CustomNode';
import ControlsPanel from './components/ControlsPanel';
import ValidationStatus from './components/ValidationStatus';
import JSONPreview from './components/JSONPreview';
import validateDAG from './utils/validateDAG';
import autoLayout from './layout/autoLayout';
import { nanoid } from 'nanoid';

const nodeTypes = { custom: CustomNode };

const App: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isValidDag, setIsValidDag] = useState(true);
  const { fitView } = useReactFlow();

  const onConnect = useCallback((params: any) => {
    if (params.source === params.target) return;
    setEdges((eds) => addEdge({ ...params, type: 'default' }, eds));
  }, [setEdges]);

  const addNode = () => {
    const label = prompt('Enter node name');
    if (!label) return;
    const newNode = {
      id: nanoid(),
      type: 'custom',
      data: { label },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const deleteSelected = () => {
    setNodes((nds) => nds.filter((n) => !n.selected));
    setEdges((eds) => eds.filter((e) => !e.selected));
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete') deleteSelected();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    setIsValidDag(validateDAG(nodes, edges));
  }, [nodes, edges]);

  return (
    <ReactFlowProvider>
      <div className="controls-panel">
        <ControlsPanel onAddNode={addNode} onAutoLayout={() => {
          const layouted = autoLayout(nodes, edges);
          setNodes(layouted);
          fitView();
        }} />
        <ValidationStatus isValid={isValidDag} />
      </div>
      <div style={{ height: '80vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <JSONPreview nodes={nodes} edges={edges} />
    </ReactFlowProvider>
  );
};

export default App;

