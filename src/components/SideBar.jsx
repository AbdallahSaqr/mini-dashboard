import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function SideBar() {
  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: "speedometer2" },
    { label: "Data Table", path: "/table", icon: "table" },
    { label: "Add Entry", path: "/add", icon: "plus-circle" },
    { label: "Notifications", path: "/notifications", icon: "bell" },
    { label: "Settings", path: "/settings", icon: "gear" },
  ];

  return (
    <div className="sidebar-custom">
      <div className="sidebar-inner">
        <div className="sidebar-header">
          <i className="bi bi-clipboard2-data-fill me-2" style={{ fontSize: "1.5rem" }}></i>
          <span className="fs-5 fw-bold">My Dashboard</span>
        </div>
        <hr />
        <ul className="nav flex-column">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  "nav-link d-flex align-items-center " +
                  (isActive ? "active-link" : "")
                }
              >
                <i className={`bi bi-${item.icon} me-2`}></i>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
