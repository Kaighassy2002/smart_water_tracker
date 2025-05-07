// src/components/EditableNode.jsx
import React from "react";
import { Handle } from "reactflow";

const EditableNode = ({ id, data, selected }) => {
  const handleChange = (e) => {
    data.updateLabel(e.target.value);
  };

  return (
    <div
      style={{
        padding: 10,
        background: selected ? "#e6f7ff" : "#fff",
        border: "1px solid #ccc",
        borderRadius: 5,
        width: 140,
      }}
    >
      <input
        type="text"
        value={data.label}
        onChange={handleChange}
        style={{
          border: "none",
          width: "100%",
          outline: "none",
          backgroundColor: "white",
          fontWeight: "bold",
        }}
      />
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
    </div>
  );
};

export default EditableNode;
