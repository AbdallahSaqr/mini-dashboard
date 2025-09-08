import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import DataTable from "./pages/DataTable";
import AddEntry from "./pages/AddEntry";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/table" element={<DataTable />} />
        <Route path="/add" element={<AddEntry />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Layout>
  );
}

export default App;
