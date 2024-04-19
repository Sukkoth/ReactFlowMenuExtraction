import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

function AddNode({
  setShow,
  onAdd,
}: {
  setShow: () => void;
  onAdd?: (label: string) => void;
}) {
  const [label, setLabel] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Modal>
      <h1 className='text-center mb-3 font-medium'>Add New Node</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (label && onAdd) {
            onAdd(label);
            setShow();
          }
        }}
      >
        <div className='flex gap-5 items-center mb-5'>
          <p>
            <span className='text-red-500'>*</span>Label:
          </p>
          <input
            onChange={(e) => setLabel(e.target.value)}
            type='text'
            className='outline-none border py-2 px-5 border-orange-500 focus:border-orange-700 rounded-2xl'
            ref={inputRef}
          />
        </div>
        <div className='flex gap-5 items-center justify-center'>
          <button
            type='submit'
            disabled={label.length == 0}
            className={`rounded-xl text-white font-medium  bg-orange-400 py-2 px-6 hover:bg-orange-500 hover:ring-2 hover:ring-orange-500 hover:ring-offset-2 ${
              label.length == 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Add
          </button>
          <button
            type='button'
            onClick={setShow}
            className='rounded-xl text-white font-medium  bg-blue-200 py-2 px-6 hover:bg-blue-300 hover:ring-1 hover:ring-blue-300 hover:ring-offset-2'
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddNode;
