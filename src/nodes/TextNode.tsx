import { Box, TextField } from "@mui/material";
import { Handle, NodeProps, Position } from "reactflow";
import RFStore from "../Store";
import DragHandle from "./DragHandle";
import "./TextNode.css";

export default function TextNode({ id, data, isConnectable }: NodeProps) {
  const updateTextContent = RFStore((state) => state.updateTextContent);

  return (
    <Box
      sx={{
        border: "2px solid #eee",
        py: "16px",
        borderRadius: "16px",
        background: "white",
        display: "flex",
        flexDirection: "column",
        width: "400px",
      }}
    >
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        isConnectable={isConnectable}
      />
      <DragHandle />
      {Object.keys(data.textFields).map((handleId) => (
        <Box className="custom-node__select" key={handleId} sx={{ px: "16px" }}>
          <TextField
            sx={{
              width: "100%",
            }}
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
