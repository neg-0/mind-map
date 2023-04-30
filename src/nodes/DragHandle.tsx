import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Box } from "@mui/material";
export default function DragHandle() {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        top: 0,
        right: 0,
        transform: "translate(25%, -25%)",
        backgroundColor: "white",
        border: "1px solid #dadada",
      }}
    >
      <DragIndicatorIcon className="drag-handle" color="primary" />
    </Box>
  );
}
