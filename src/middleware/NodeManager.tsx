// NodeManager.ts
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";

type NodeManagerProps = {
  socket: WebSocket;
};

class NodeManager {
  nodes: Node[] = [];
  edges: Edge[] = [];
  socket: WebSocket;

  constructor({ socket }: NodeManagerProps) {
    this.socket = socket;
  }

  updateNodesFromServer(nodes: Node[]): void {
    this.nodes = nodes;
  }

  updateEdgesFromServer(edges: Edge[]): void {
    this.edges = edges;
  }

  onNodesChange(changes: NodeChange[]): void {
    this.nodes = applyNodeChanges(changes, this.nodes);
    this.socket.send(
      JSON.stringify({ type: "nodes-update", nodes: this.nodes })
    );
  }

  onEdgesChange(changes: EdgeChange[]): void {
    this.edges = applyEdgeChanges(changes, this.edges);
    this.socket.send(
      JSON.stringify({ type: "edges-update", edges: this.edges })
    );
  }

  onConnect(connection: Connection): void {
    this.edges = addEdge(connection, this.edges);
    this.socket.send(
      JSON.stringify({ type: "edges-update", edges: this.edges })
    );
  }

  updateTextContent(nodeId: string, handleId: string, text: string): void {
    this.nodes = this.nodes.map((n) => {
      if (n.id === nodeId) {
        n.data = { ...n.data };
        n.data.textFields[handleId] = text;
      }
      return n;
    });
    this.socket.send(
      JSON.stringify({ type: "nodes-update", nodes: this.nodes })
    );
  }
}

export default NodeManager;
