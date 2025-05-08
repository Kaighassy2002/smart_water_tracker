import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import EditableNode from "../components/EditableNode"; // Import custom editable node
import { v4 as uuidv4 } from "uuid";
import { Container, Row, Col, Button } from "react-bootstrap";

// Define custom node types
const nodeTypes = {
  editable: EditableNode,
};

// Initial editable Start Node
const initialNodes = [
  {
    id: "1",
    type: "editable",
    position: { x: 100, y: 100 },
    data: {
      label: "Start Node",
      updateLabel: () => {}, // placeholder, will be updated below
    },
  },
];

const Flowchart = () => {
  // Function to update node label
  const updateNodeLabel = (id, newLabel) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                label: newLabel,
                updateLabel: (label) => updateNodeLabel(id, label),
              },
            }
          : node
      )
    );
  };

  // Replace placeholder updateLabel with actual function on init
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        updateLabel: (label) => updateNodeLabel(node.id, label),
      },
    }))
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = () => {
    const id = uuidv4();
    const newNode = {
      id,
      type: "editable",
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
      data: {
        label: `Node ${nodes.length + 1}`,
        updateLabel: (label) => updateNodeLabel(id, label),
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col className="d-flex justify-content-between align-items-center">
          <h3>Flowchart Editor</h3>
          <Button onClick={addNode} variant="primary">
            Add Node
          </Button>
        </Col>
      </Row>
      <div style={{ height: "70vh", border: "1px solid #ddd" }}>
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
          <Background gap={16} />
        </ReactFlow>
      </div>
    </Container>
  );
};

export default Flowchart;
