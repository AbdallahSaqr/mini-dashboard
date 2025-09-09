import React from "react";
import Header from "../components/Header";

export default function DashboardPage() {
  const handleProfile = () => alert("Go to profile page");
  const handleLogout = () => alert("Logging out...");

  return (
    <div>
      <Header title="Dashboard" onProfile={handleProfile} onLogout={handleLogout} />
    </div>
  );
}