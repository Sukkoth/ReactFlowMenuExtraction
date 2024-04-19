import { useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  MiniMap,
  Controls,
} from "reactflow";

import "reactflow/dist/style.css";
import MenuItem from "./right/MenuItem";
import AddNode from "./right/AddNode";
import Hint from "./right/Hint";
import useApp from "../hooks/useApp";
import AppNode from "./AppNode";

const nodeTypes = {
  customType: AppNode,
};

function Right() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const {
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodesDelete,
    nodes,
    edges,
    setSelectedNode,
    addNode,
  } = useApp();

  return (
    <div className='p-5 w-full md:w-[2/3] border border-orange-400 rounded-2xl relative overflow-hidden h-[84dvh]'>
      <ReactFlow
        nodeTypes={nodeTypes}
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
        {showModal && (
          <AddNode setShow={() => setShowModal(false)} onAdd={addNode} />
        )}
        <div className='absolute left-1 top-1 flex gap-2'>
          <MenuItem onClick={() => setShowModal(true)}>📌 Add Node</MenuItem>
        </div>
        <Hint />
        <Background variant={BackgroundVariant.Dots} size={2} />
        <MiniMap nodeStrokeWidth={3} nodeColor={"orange"} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Right;
