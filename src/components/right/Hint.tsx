import React, { useState } from "react";

function Hint() {
  const [showHint, setShowHint] = useState(true);
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
          <ul className='space-y-1'>
            <li>
              <p>🔭 Pinch/Scroll to zoom</p>
            </li>
            <li>
              <p>↔️ Hold and drag to move around</p>
            </li>
            <li>
              <p>
                ✂️ <strong>backspace</strong> to delete node
              </p>
            </li>
          </ul>
          <p className='font-mono mt-5 text-end'>
            🖥️ Created by Gadisa T.
            <a
              href='https://t.me/sukkoth'
              target='_blank'
              className='text-orange-800'
            >
              (@sukkoth)
            </a>{" "}
            😎
          </p>
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
