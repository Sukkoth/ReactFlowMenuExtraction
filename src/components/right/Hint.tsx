import { useState } from "react";

function Hint() {
  const [showHint, setShowHint] = useState(false);
  return (
    <div
      onClick={() => {
        if (!showHint) setShowHint(true);
      }}
      className={`cursor-pointer z-20 text-sm absolute right-1 top-1  ${
        showHint ? "bg-orange-200" : "bg-blue-100 hover:bg-blue-200"
      } rounded-xl flex items-center justify-center`}
    >
      {showHint ? (
        <div className='relative px-5 py-3'>
          <div
            className='absolute right-2 top-2'
            onClick={() => setShowHint(false)}
          >
            <p>❌</p>
          </div>
          <ul className='space-y-1 font-mono'>
            <li>
              <p>🔭 Pinch/Scroll to zoom</p>
            </li>
            <li>
              <p>↔️ Hold and drag to move around</p>
            </li>
            <li>
              <p>🚀 Hover on node for options</p>
            </li>
          </ul>
          <p className='font-mono mt-2 text-end'>🛠️ Created by Gadisa T.</p>
          <div className='flex justify-end gap-4 mt-3'>
            <a
              href='https://t.me/sukkoth'
              target='_blank'
              className='hover:scale-110'
            >
              <img className='size-6' src='/telegram.png' alt='telegram' />
            </a>
            <a
              href='https://github.com/Sukkoth/ReactFlowMenuExtraction'
              target='_blank'
              className='hover:scale-110'
            >
              <img className='size-6' src='/github.png' alt='telegram' />
            </a>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center px-2 py-2'>
          <p className='text-2xl'>💡</p>
        </div>
      )}
    </div>
  );
}

export default Hint;
