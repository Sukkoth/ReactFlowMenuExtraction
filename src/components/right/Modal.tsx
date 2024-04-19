import React from "react";

function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className='absolute z-50 inset-1 rounded-2xl backdrop-blur-sm flex items-center justify-center'>
      <div className=' bg-orange-50/50 border border-orange-500 rounded-2xl p-5'>
        {children}
      </div>
    </div>
  );
}

export default Modal;
