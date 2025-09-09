import React from "react";
import SideBar from "./SideBar";

export default function Layout({ children }) {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-3 col-md-2 p-0">
          <SideBar />
        </div>

        {/* Main content */}
        <div className="col-9 col-md-10 p-0">
          {children}
        </div>
      </div>
    </div>
  );
}
