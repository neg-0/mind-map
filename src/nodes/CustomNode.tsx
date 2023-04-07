import { Node, NodeProps } from "reactflow";

type NodeData = {
  value: number;
};

type CustomNode = Node<NodeData>;

function MyCustomNode({ data }: NodeProps<NodeData>) {
  return <div>A big number: {data.value}</div>;
}
