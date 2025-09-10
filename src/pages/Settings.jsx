import React from "react";
import Header from "../components/Header";

export default function Settings() {
  const handleProfile = () => alert("Go to profile page");
  const handleLogout = () => alert("Logging out...");

  return (
    <>
      <Header
        title="Settings"
        icon="bi bi-gear gradient-icon"
        onProfile={handleProfile}
        onLogout={handleLogout}
      />
    </>
  );
}
