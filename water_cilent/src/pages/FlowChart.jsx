import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button, Container, Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const initialNodes = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { label: "Start Node" },
    type: "default",
  },
];

const Flowchart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = () => {
    const newNode = {
      id: uuidv4(),
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
      data: { label: `Node ${nodes.length + 1}` },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <Container fluid className="py-4">
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
