import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import initialEdges from "./initialEdges";
import initialNodes from "./initialNodes";

type NodeState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  updateTextContent: (id: string, handleId: string, text: string) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<NodeState>()(
  persist(
    (set, get) => ({
      nodes: initialNodes,
      edges: initialEdges,
      onNodesChange: (changes: NodeChange[]) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      onConnect: (connection: Connection) => {
        set({
          edges: addEdge(connection, get().edges),
        });
      },
      updateTextContent: (nodeId: string, handleId: string, text: string) => {
        set({
          nodes: get().nodes.map((n) => {
            if (n.id === nodeId) {
              n.data = { ...n.data };
              n.data.textFields[handleId] = text;
            }
            return n;
          }),
        });
      },
    }),
    {
      name: "nodes",
    }
  )
);

export default useStore;
