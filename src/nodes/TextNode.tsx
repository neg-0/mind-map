import { Box, TextField } from "@mui/material";
import { Handle, NodeProps, Position } from "reactflow";

import useStore from "../Store";
import "./CustomNode.css";

export default function TextNode({ id, data, isConnectable }: NodeProps) {
  const updateTextContent = useStore((state) => state.updateTextContent);
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
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        isConnectable={isConnectable}
      />
      {Object.keys(data.textFields).map((handleId) => (
        <Box className="custom-node__select" key={handleId}>
          <TextField
            value={data.textFields[handleId]}
            onChange={(evt) =>
              updateTextContent(id, handleId, evt.target.value)
            }
            multiline
          />
          <Handle type="source" position={Position.Right} id={handleId} />
        </Box>
      ))}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        isConnectable={isConnectable}
      />
    </Box>
  );
}
