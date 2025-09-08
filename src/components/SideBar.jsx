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
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark vh-100">
      <NavLink
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <i className="bi bi-bootstrap-fill me-2" style={{ fontSize: "1.5rem" }}></i>
        <span className="fs-4">Mini Dashboard</span>
      </NavLink>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {navItems.map((item, idx) => (
          <li key={idx}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                "nav-link d-flex align-items-center " +
                (isActive ? "active text-white" : "text-white")
              }
            >
              <i className={`bi bi-${item.icon} me-2`}></i>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
