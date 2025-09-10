import React from 'react'
import Header from '../components/Header'

export default function AddEntry() {
  const handleProfile = () => alert("Go to profile page");
  const handleLogout = () => alert("Logging out...");

  return (
    <>
    <Header
            title="Add Entry"
            icon={"bi bi-plus-circle gradient-icon"}
            onProfile={handleProfile}
            onLogout={handleLogout}
          />
    </>
  )
}
