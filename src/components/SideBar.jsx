import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: "speedometer2" },
    { label: "Data Table", path: "/table", icon: "table" },
    { label: "Add Entry", path: "/add", icon: "plus-circle" },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="burger-btn"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          style={{ width: "1.5rem", height: "1.5rem" }}
        >
          <path
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <div
        className={`sidebar-backdrop ${isOpen ? "show" : ""}`}
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}
      <div className={`sidebar-custom ${isOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-inner">
          <div className="sidebar-header d-flex align-items-center mb-3">
            <i
              className="bi bi-clipboard2-data-fill me-2 gradient-icon"
              style={{ fontSize: "1.5rem" }}
            ></i>
            <span className="fs-5 fw-bold">My Dashboard</span>
          </div>
          <hr />
          <ul className="nav flex-column">
            {navItems.map((item, idx) => (
              <li key={idx} className="nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    "nav-link " + (isActive ? "active-link" : "")
                  }
                  onClick={closeSidebar}
                >
                  <i className={`bi bi-${item.icon} me-2`}></i>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
