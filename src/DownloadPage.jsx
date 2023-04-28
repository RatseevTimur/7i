import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, Background, MiniMap } from 'reactflow';

import DownloadButton from './DownloadButton';
import CustomNode from './CustomNode';
import { initialNodes, initialEdges } from './nodes-edges';

import Sidebar from './Sidebar';

// import 'reactflow/dist/style.css';
import './index.css';
import './Add.css';


const connectionLineStyle = { stroke: '#ffff' };
const snapGrid = [25, 25];
const nodeTypes = {
  custom: CustomNode,
};

const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep',
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

// const initialNodes = [
//   {
//     id: '1',
//     type: 'input',
//     data: { label: 'input node' },
//     position: { x: 250, y: 5 },
//   },
// ];

const focusNode = () => {
  const { nodeInternals } = store.getState();
  const nodes = Array.from(nodeInternals).map(([, node]) => node);

  if (nodes.length > 0) {
    const node = nodes[0];

    const x = node.position.x + node.width / 2;
    const y = node.position.y + node.height / 2;
    const zoom = 1.85;

    setCenter(x, y, { zoom, duration: 1000 });
  }
}

let id = 0;
const getId = () => `dndnode_${id++}`;

const DownloadPage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);


  const reactFlowWrapper = useRef(null);

  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );


  return (
    <div className="wrapper" id="download-image">
      
      <DownloadButton />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        // onInit={setReactFlowInstance}
        //onDrop={onDrop}
        // onDragOver={onDragOver}

        connectionLineStyle={connectionLineStyle}
        connectionLineType="smoothstep"
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultViewport={defaultViewport}
        fitView
        attributionPosition="bottom-left"
        defaultEdgeOptions={defaultEdgeOptions}
      >
        {/* <button style={{position: 'absolute', height: '200px', width: '200px', zIndex: 6}} onClick={focusNode}>focus node</button> */}
        <Controls />
        <Background gap={25} />
        <MiniMap />
        <Sidebar />
      </ReactFlow>
    </div>
  );
};

export default DownloadPage;
