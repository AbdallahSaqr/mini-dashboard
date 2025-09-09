import React from "react";
import SideBar from "./SideBar";

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      {/* Sidebar - removed Bootstrap classes to handle mobile differently */}
      <SideBar />

      {/* Main content */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
