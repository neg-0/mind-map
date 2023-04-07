import { Box, TextField } from "@mui/material";
import { useCallback } from "react";
import {
  Handle,
  NodeProps,
  Position,
  useReactFlow,
  useStoreApi,
} from "reactflow";

import "./CustomNode.css";

function Select({
  value,
  handleId,
  nodeId,
}: {
  value: string;
  handleId: string;
  nodeId: string;
}) {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const onChange = (evt: { target: { value: any } }) => {
    console.log(evt.target.value);
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            selects: {
              ...node.data.selects,
              [handleId]: evt.target.value,
            },
          };
        }

        return node;
      })
    );
  };

  return (
    <Box className="custom-node__select">
      <TextField value={value} onChange={onChange} multiline />
      <Handle type="source" position={Position.Right} id={handleId} />
    </Box>
  );
}

export default function TextNode({ data, isConnectable }: NodeProps) {
  const onChange = useCallback((evt: { target: { value: any } }) => {
    console.log(evt.target.value);
  }, []);

  return (
    <Box
      sx={{
        border: "1px solid #eee",
        p: "5px",
        borderradius: "5px",
        background: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {Object.keys(data.selects).map((handleId) => (
        <Select
          key={handleId}
          nodeId={handleId}
          value={data.selects[handleId]}
          handleId={handleId}
        />
      ))}
      <div></div>
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        isConnectable={isConnectable}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        isConnectable={isConnectable}
      />
    </Box>
  );
}
