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

// Add this import to use the NodeManager for handling node actions
import NodeManager from "./NodeManager";

// Establish websocket connection to your backend server
const socket = new WebSocket("ws://localhost:3001/");

// Initialize NodeManager with initial nodes and edges
const nodeManager = new NodeManager({ socket });

// Listen for messages from the server
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);

  switch (message.type) {
    case "nodes-update":
      nodeManager.updateNodesFromServer(message.nodes);
      break;
    case "edges-update":
      nodeManager.updateEdgesFromServer(message.edges);
      break;
    // Handle other message types as needed
  }
});

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
      nodes: nodeManager.nodes,
      edges: nodeManager.edges,
      onNodesChange: (changes: NodeChange[]) => {
        const updatedNodes = applyNodeChanges(changes, get().nodes);
        nodeManager.onNodesChange(changes);
        socket.send(
          JSON.stringify({ type: "nodes-update", nodes: updatedNodes })
        );
        set({ nodes: updatedNodes });
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        const updatedEdges = applyEdgeChanges(changes, get().edges);
        nodeManager.onEdgesChange(changes);
        socket.send(
          JSON.stringify({ type: "edges-update", edges: updatedEdges })
        );
        set({ edges: updatedEdges });
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
