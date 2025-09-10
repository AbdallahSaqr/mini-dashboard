import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getPosts } from "../services/api"; // ✅ using your service

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export default function CustomBarChart({ isUp = true, percentage = 7.8 }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const posts = await getPosts();

        // Group posts by userId (JSONPlaceholder has userId 1–10)
        const counts = {};
        posts.forEach((post) => {
          counts[post.userId] = (counts[post.userId] || 0) + 1;
        });

        const labels = Object.keys(counts).map((id) => `User ${id}`);
        const values = Object.values(counts);

        setChartData({
          labels,
          datasets: [
            {
              label: "Posts",
              data: values,
              backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(0, "#14b8a6");
                gradient.addColorStop(0.5, "#2563eb");
                gradient.addColorStop(1, "#9333ea");
                return gradient;
              },
              borderRadius: 10,
              barThickness: 35,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error loading chart data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#cbd5e1", font: { size: 12 } },
      },
      y: {
        grid: { display: false },
        ticks: { color: "#cbd5e1", stepSize: 5, font: { size: 12 } },
      },
    },
  };

  if (loading) return <p className="text-light">Loading chart...</p>;

  return (
    <div className="chart-card glassy-dark p-3">
      <div className="chart-header d-flex justify-content-between align-items-center mb-2">
        <h5 className="chart-title mb-0 text-light">Posts per User</h5>
        <div className={`chart-indicator fw-semibold ${isUp ? "text-success" : "text-danger"}`}>
          <i className={`bi ${isUp ? "bi-graph-up-arrow" : "bi-graph-down-arrow"} me-1`}></i>
          {percentage}%
        </div>
      </div>
      <Bar data={chartData} options={options} height={120} />
    </div>
  );
}
