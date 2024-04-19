import { useCallback, useContext, useEffect, useState } from "react";
import {
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
} from "reactflow";
import { DataContext } from "../providers/DataProvider";

function useApp() {
  const data = useContext(DataContext);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  //listen to menus from textarea and add them to nodes list
  //also update edges along with it
  useEffect(() => {
    if (data !== null && data.menus.length > 0) {
      const nodes = data.menus.map((item) => {
        data.yPosition.current += 100;
        return {
          id: data.getId(),
          type: "customType",
          position: { x: 400, y: data.yPosition.current },
          data: {
            label: item,
            onDuplicate: data?.duplicateNode,
            onDelete: data?.deleteNode,
            onUpdate: data?.updateNode,
          },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes]);

  //react flow events
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

  //export data needed
  return {
    nodes,
    setSelectedNode,
    edges,
    selectedNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodesDelete,
    addNode: data?.addNode,
  };
}

export default useApp;
