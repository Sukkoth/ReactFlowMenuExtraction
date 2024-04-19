import { useEffect, useRef, useState } from "react";
import { Handle, Position } from "reactflow";

type propTypes = {
  data: {
    label: string;
    onDuplicate?: (nodeId: string) => void;
    onDelete?: (nodeId: string) => void;
    onUpdate?: (nodeId: string, label: string) => void;
  };
  id: string;
};

function AppNode({ data, id }: propTypes) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("");
  const focusRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (showEdit) {
      setLabel(data.label);
      if (focusRef.current) focusRef.current.focus();
    } else {
      setLabel("");
    }
  }, [showEdit, data.label]);
  return (
    <div
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
      className='p-1 border-2 rounded-xl  border-orange-200 min-w-[10rem] bg-white text-center z-10 shadow-xl'
    >
      <div className='w-[95%]' onDoubleClick={() => setShowEdit(true)}>
        {!showEdit && <p className='px-3 py-2'>{data.label}</p>}
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
      {!showEdit && (
        <div
          className={`absolute right-2 top-1 bottom-1 w-[10%] flex flex-col justify-between `}
          style={{
            visibility: showMenu ? "visible" : "hidden",
          }}
        >
          <button
            onClick={() => {
              if (data.onDuplicate) {
                data.onDuplicate(id);
              }
            }}
          >
            <img src='/copy.png' alt='Copy this node' className='size-4' />
          </button>
          <button
            onClick={() => {
              if (data.onDelete) {
                data.onDelete(id);
              }
            }}
          >
            <img src='/trash1.png' alt='Copy this node' className='size-4' />
          </button>
        </div>
      )}
      {showEdit && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (data.onUpdate) data.onUpdate(id, label);
            setShowEdit(false);
          }}
        >
          <div className='mb-1'>
            <input
              required={true}
              ref={focusRef}
              onChange={(e) => setLabel(e.target.value)}
              type='text'
              value={label}
              className='outline-none border-b py-2 px-5 border-orange-400 focus:border-orange-400  w-40'
            />
          </div>
          <div className='flex gap-5 items-center justify-center'>
            <button
              type='submit'
              className={`rounded-xl text-white font-medium  py-1 px-2  ${
                label.length == 0 ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              ✅
            </button>
            <button
              type='button'
              onClick={() => setShowEdit(false)}
              className={`rounded-xl text-white font-medium  py-1 px-2 cursor-pointer`}
            >
              ❌
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AppNode;
