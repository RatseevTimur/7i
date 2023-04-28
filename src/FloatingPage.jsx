import React, { useCallback, useState, useRef } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  ConnectionLineType, Controls, MiniMap
} from 'reactflow';
import 'reactflow/dist/style.css';

import FloatingEdge from './FloatingEdge.jsx';
import FloatingConnectionLine from './FloatingConnectionLine.jsx';
import { createNodesAndEdges } from './utils.js';

import dagre from 'dagre';

import './LayoutPage.css';

import Sidebar from './Sidebar';
import CustomNode from './CustomNode';
import './index.css';
import './Add.css';

import './index.css';

//import { initialNodes, initialEdges } from './nodes-edges.js';
const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges();

const edgeTypes = {
  floating: FloatingEdge,
};

const NodeAsHandleFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: 'floating', markerEnd: { type: MarkerType.Arrow } }, eds)
      ),
    [setEdges]
  );

  //////////
  const defaultEdgeOptions = {
    animated: true,
    type: 'smoothstep',
  };
  
  const defaultViewport = { x: 0, y: 0, zoom: 1.5 };
  const connectionLineStyle = { stroke: '#ffff' };
    const snapGrid = [25, 25];
  const nodeTypes = {
    custom: CustomNode,
  };
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);
  /////////

  return (
    <div className="floatingedges" id="download-image">
      <ReactFlow

        //nodeTypes={nodeTypes}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultViewport={defaultViewport}
        attributionPosition="bottom-left"
        defaultEdgeOptions={defaultEdgeOptions}

        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}

        connectionLineType={ConnectionLineType.SmoothStep}


        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        edgeTypes={edgeTypes}
        connectionLineComponent={FloatingConnectionLine}
      >
        <Background />

        <Controls />
        <Background gap={25} />
        <MiniMap />
        <Sidebar />
      </ReactFlow>
    </div>
  );
};

export default NodeAsHandleFlow;
