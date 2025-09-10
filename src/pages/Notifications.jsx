import React from "react";
import Header from "../components/Header";

export default function Notifications() {
  const handleProfile = () => alert("Go to profile page");
  const handleLogout = () => alert("Logging out...");

  return (
    <>
      <Header
        title="Notifications"
        icon="bi bi-bell gradient-icon"
        onProfile={handleProfile}
        onLogout={handleLogout}
      />
    </>
  );
}
