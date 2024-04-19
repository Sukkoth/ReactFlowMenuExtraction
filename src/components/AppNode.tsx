import { useState } from "react";
import { Handle, Position } from "reactflow";

type propTypes = {
  data: { label: string };
  id: string;
};

function AppNode({ data, id }: propTypes) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <div
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
      className='flex border-2 p-1 border-orange-200 min-w-[10rem] bg-white text-center z-10 shadow-xl'
    >
      <div className='w-[95%]'>
        <p className='px-3 py-2'>{data.label}</p>
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

      <div
        className={` absolute right-1 top-1 bottom-1 w-[10%] flex flex-col justify-between `}
        style={{
          visibility: showMenu ? "visible" : "hidden",
        }}
      >
        <button onClick={() => console.log("DUPLICATE ", id)}>
          <img src='/copy.png' alt='Copy this node' className='size-4' />
        </button>
        <button onClick={() => console.log("DELETE ", id)}>
          <img src='/trash1.png' alt='Copy this node' className='size-4' />
        </button>
      </div>
    </div>
  );
}

export default AppNode;
