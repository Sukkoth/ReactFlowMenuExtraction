import React from "react";

function MenuItem({
  children,
  onClick,
  active = true,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <div
      onClick={() => {
        if (active && onClick) onClick();
      }}
      className={`cursor-pointer text-xs hover:bg-orange-300  px-4 py-2 bg-orange-200 rounded-xl flex items-center justify-center z-10 ${
        !active ? "opacity-60" : ""
      }`}
    >
      <ul>
        <li>{children}</li>
      </ul>
    </div>
  );
}

export default MenuItem;
