import { useState, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
const DecisionTree = () => {
  const elements = [
    {
      id: "1",
      type: "input",
      data: { label: "Open" },
      position: { x: 0, y: 0 },
      style: { backgroundColor: "cyan" },
    },
    {
      id: "2",
      type: "default",
      data: { label: "Open - Profiled" },
      position: { x: 150, y: 100 },
      style: { backgroundColor: "indigo" },
    },
    {
      id: "3",
      type: "default",
      data: { label: "Open - Booked for Demo" },
      position: { x: 250, y: 200 },
      style: { backgroundColor: "purple" },
    },
    {
      id: "4",
      type: "default",
      data: { label: "For Proposal" },
      position: { x: 400, y: 300 },
      style: { backgroundColor: "orange" },
    },
    {
      id: "5",
      type: "output",
      data: { label: "Rejected by Client" },
      position: { x: 300, y: 400 },
      style: { backgroundColor: "red" },
    },
    {
      id: "6",
      type: "output",
      data: { label: "Deployed" },
      position: { x: 600, y: 500 },
      style: { backgroundColor: "grey" },
    },
    {
      id: "7",
      type: "output",
      data: { label: "Disqualified by Radztech" },
      position: { x: 50, y: 200 },
      style: { backgroundColor: "red" },
    },
    {
      id: "8",

      data: { label: "Closed - For Deployment" },
      position: { x: 500, y: 400 },
      style: { backgroundColor: "green" },
    },
  ];
  const Lines = [
    { id: "e1-2", source: "1", target: "2", type: "step" },
    { id: "e2-3", source: "2", target: "3", type: "step" },
    { id: "e3-4", source: "3", target: "4", type: "step" },
    { id: "e4-5", source: "4", target: "5", type: "step" },
    { id: "e4-6", source: "8", target: "6", type: "step" },
    { id: "e2-7", source: "2", target: "7", type: "step" },
    { id: "e2-8", source: "4", target: "8", type: "step" },
  ];
  const [nodes, setNodes] = useState(elements);
  const [edges, setEdges] = useState(Lines);
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  return (
    <ReactFlow
      edges={edges}
      nodes={nodes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export default DecisionTree;
