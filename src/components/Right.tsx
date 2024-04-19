import { useCallback, useContext, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Edge,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Node,
  NodeChange,
  EdgeChange,
  Connection,
  getIncomers,
  getConnectedEdges,
  getOutgoers,
  MiniMap,
  Controls,
} from "reactflow";

import "reactflow/dist/style.css";
import { DataContext } from "../providers/DataProvider";
import MenuItem from "./right/MenuItem";
import AddNode from "./right/AddNode";
import Hint from "./right/Hint";

function Right() {
  const data = useContext(DataContext);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    if (data !== null && data.menus.length > 0) {
      const nodes = data.menus.map((item) => {
        data.yPosition.current += 100;
        return {
          id: data.getId(),
          position: { x: 400, y: data.yPosition.current },
          data: { label: item },
        };
      });
      const initialEdges = [];
      for (let i = 0; i < nodes.length - 1; i++) {
        const edge = {
          id: `e${i}-${i + 1}`,
          source: `${i}`,
          target: `${i + 1}`,
        };
        initialEdges.push(edge);
      }

      setNodes(nodes);
      setEdges(initialEdges);
    } else {
      setNodes([]);
      setEdges([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.menus]);

  //reset when there are no nodes
  useEffect(() => {
    if (nodes.length == 0) {
      data?.reset();
    }
  }, [nodes]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Edge | Connection) =>
      setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  const onNodesDelete = useCallback(
    (deleted: Node[]) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
  );

  //!functions
  const addNode = useCallback((label: string) => {
    if (data !== null) {
      data.yPosition.current += 100;
      setNodes((els) => {
        return [
          ...els,
          {
            id: data?.getId(),
            position: { x: 100, y: data?.yPosition.current },
            data: { label: label || "Untitled" },
          },
        ];
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const duplicateNode = useCallback(() => {
    if (data !== null && selectedNode) {
      setNodes((prev) => [
        ...prev,
        {
          id: data?.getId(),
          position: {
            x: selectedNode.position.x + 200,
            y: selectedNode.position.y,
          },
          data: { label: selectedNode.data.label + " copy" },
        },
      ]);
    }
  }, [selectedNode]);

  return (
    <div className='p-5 w-full border border-orange-400 rounded-2xl relative overflow-hidden'>
      <AddNode
        show={showModal}
        setShow={() => setShowModal(false)}
        onAdd={addNode}
      />
      <div className='absolute left-1 top-1 flex gap-2'>
        <MenuItem onClick={() => setShowModal(true)}>📌 Add Node</MenuItem>

        <MenuItem active={selectedNode !== null} onClick={duplicateNode}>
          🚀 Duplicate Node
        </MenuItem>
      </div>
      <Hint />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={onNodesDelete}
        onSelectionChange={({ nodes }) => {
          if (nodes.length === 1) {
            setSelectedNode(nodes[0]);
          } else {
            setSelectedNode(null);
          }
        }}
      >
        <Background variant={BackgroundVariant.Dots} size={2} />
        <MiniMap nodeStrokeWidth={3} nodeColor={"orange"} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Right;
