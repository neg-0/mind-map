import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  DefaultEdgeOptions,
  FitViewOptions,
  MiniMap,
  NodeTypes,
} from "reactflow";
import { shallow } from "zustand/shallow";
import useStore from "./Store";

import React from "react";
import "reactflow/dist/style.css";
import "./App.css";
import ContextMenu, { ContextMenuItem } from "./components/ContextMenu";
import { useLongPress } from "./hooks/useLongPress";
import InsightNode from "./nodes/InsightNode";
import TextNode from "./nodes/TextNode";

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const nodeTypes: NodeTypes = {
  text: TextNode,
  insight: InsightNode,
};

const selector = (state: {
  nodes: any;
  edges: any;
  onNodesChange: any;
  onEdgesChange: any;
  onConnect: any;
}) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    selector,
    shallow
  );

  const [contextMenu, setContextMenu] = React.useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({ visible: false, x: 0, y: 0 });

  const handleContextMenu = (e?: React.MouseEvent) => {
    if (!e) return;

    // Prevent the default context menu from showing
    e.preventDefault();

    // Only show the context menu if we're clicking the div with class name react-flow__pane or MuiBackdrop-root
    // if (
    //   e.target &&
    //   !(e.target as HTMLElement).classList.contains("react-flow__pane")
    // ) {
    //   return;
    // }

    // Show the context menu
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
  };

  const longPressEventHandlers = useLongPress(handleContextMenu, 500);

  const closeContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  const menuItems: ContextMenuItem[] = [
    {
      label: "Add Text Node",
      action: () => {
        // Implement adding a new text node
      },
    },
    {
      label: "Add Insight Node",
      action: () => {
        // Implement adding a new insight node
      },
    },
    // Add more items as needed
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="app__container"
        style={{ width: "100vw", height: "100vh" }}
        onContextMenu={handleContextMenu}
        {...longPressEventHandlers}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={fitViewOptions}
          defaultEdgeOptions={defaultEdgeOptions}
        >
          <Controls />
          <MiniMap />
          <Background
            variant={BackgroundVariant.Dots}
            gap={12}
            size={1}
            color="var(--accent-color)"
          />
        </ReactFlow>
        {contextMenu.visible && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            handleClose={closeContextMenu}
            items={menuItems}
            anchor={document.body}
          />
        )}
      </div>
    </DndProvider>
  );
}

export default App;
