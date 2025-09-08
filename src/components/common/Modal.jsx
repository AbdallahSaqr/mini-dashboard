import React from "react";
import Button from "./Button";

export default function Modal({ show, handleClose, title, children, footer }) {
  if (!show) return null;

  return (
    <div className="modal-custom-backdrop" onClick={handleClose}>
      <div className="modal-custom" onClick={(e) => e.stopPropagation()}>
        <div className="modal-inner">
          {title && <h5>{title}</h5>}
          <div className="mt-3">{children}</div>
          {footer && <div className="mt-4 d-flex justify-content-end">{footer}</div>}
          {!footer && (
            <div className="mt-4 d-flex justify-content-end">
              <Button onClick={handleClose}>Close</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
