import React from "react";

export default function Card({ title, children, footer }) {
  return (
    <div className="card-custom">
      <div className="card-inner">
        {title && <h5 className="mb-3">{title}</h5>}
        <div>{children}</div>
        {footer && <div className="mt-3">{footer}</div>}
      </div>
    </div>
  );
}
