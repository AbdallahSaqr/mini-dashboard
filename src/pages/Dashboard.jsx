import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import Card from "../components/common/Card";
import { getUsers, getPosts, getTodos } from "../services/api";

export default function DashboardPage() {
  const handleProfile = () => alert("Go to profile page");
  const handleLogout = () => alert("Logging out...");

  // State for API data
  const [usersCount, setUsersCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [todosCount, setTodosCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, posts, todos] = await Promise.all([
          getUsers(),
          getPosts(),
          getTodos(),
        ]);
        setUsersCount(users.length);
        setPostsCount(posts.length);
        setTodosCount(todos.length);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header
        title="Dashboard"
        icon={"bi bi-speedometer2 gradient-icon"}
        onProfile={handleProfile}
        onLogout={handleLogout}
      />

      <div className="dashboard-container">
        {/* Stats Cards */}
        <div className="stats-grid">
          <Card className="stats-card">
            <div className="stats-content">
              <span className="stats-label">Total Users</span>
              <h2 className="stats-value">
                {loading ? "Loading..." : error ? "Error" : usersCount}
              </h2>
            </div>
          </Card>

          <Card className="stats-card">
            <div className="stats-content">
              <span className="stats-label">Total Posts</span>
              <h2 className="stats-value">
                {loading ? "Loading..." : error ? "Error" : postsCount}
              </h2>
            </div>
          </Card>

          <Card className="stats-card">
            <div className="stats-content">
              <span className="stats-label">Total Todos</span>
              <h2 className="stats-value">
                {loading ? "Loading..." : error ? "Error" : todosCount}
              </h2>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="charts-grid">
          <Card className="chart-card">
            <div className="chart-header">
              <div>
                <h3 className="chart-title">ToDo Completion</h3>
                <span className="chart-subtitle">Last 7 Days</span>
              </div>
            </div>
            <LineChart />
          </Card>

          <Card className="chart-card">
            <div className="chart-header">
              <div>
                <h3 className="chart-title">User Activity</h3>
                <span className="chart-subtitle">Last 7 Days</span>
              </div>
            </div>
            <BarChart />
          </Card>
        </div>
      </div>
    </>
  );
}
