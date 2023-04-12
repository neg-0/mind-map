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

import "reactflow/dist/style.css";
import TextNode from "./nodes/TextNode";

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const nodeTypes: NodeTypes = {
  text: TextNode,
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

export default function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    selector,
    shallow
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
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
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
