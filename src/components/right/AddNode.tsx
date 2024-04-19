import { useState } from "react";

function AddNode({
  show,
  setShow,
  onAdd,
}: {
  show: boolean;
  setShow: () => void;
  onAdd: (label: string) => void;
}) {
  const [label, setLabel] = useState("");

  if (!show) return;
  return (
    <div className='absolute z-50 inset-1 rounded-2xl backdrop-blur-sm flex items-center justify-center'>
      <div className=' bg-orange-50/50 border border-orange-500 rounded-2xl p-5'>
        <h1 className='text-center mb-3 font-medium'>Add New Node</h1>
        <form
          onSubmit={() => {
            if (label) {
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
            />
          </div>
          <div className='flex gap-5 items-center justify-center'>
            <button
              disabled={label.length == 0}
              className={`rounded-xl text-white font-medium  bg-orange-400 py-2 px-6 hover:bg-orange-500 hover:ring-2 hover:ring-orange-500 hover:ring-offset-2 ${
                label.length == 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Add
            </button>
            <button
              onClick={setShow}
              className='rounded-xl text-white font-medium  bg-blue-200 py-2 px-6 hover:bg-blue-300 hover:ring-1 hover:ring-blue-300 hover:ring-offset-2'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNode;
