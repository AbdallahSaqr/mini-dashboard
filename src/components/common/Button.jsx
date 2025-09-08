import React from "react";

export default function Button({
  children,
  onClick,
  type = "button",
}) {
  return (
    <button type={type} className={`btn-custom`} onClick={onClick}>
      <span className="btn-inner">
        <span className="btn-label">{children}</span>
      </span>
    </button>
  );
}
