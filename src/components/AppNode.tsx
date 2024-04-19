import { Handle, Position } from "reactflow";

type propTypes = {
  data: { label: string };
  id: string;
};

function AppNode({ data }: propTypes) {
  return (
    <div className='px-5 py-2 border-2 rounded-2xl border-orange-200 min-w-[10rem] bg-white text-center z-10 shadow-xl'>
      <p>{data.label}</p>
      <Handle
        type='target'
        position={Position.Top}
        id='a'
        isConnectable={true}
      />
      <Handle
        type='source'
        position={Position.Bottom}
        id='b'
        isConnectable={true}
      />
    </div>
  );
}

export default AppNode;
