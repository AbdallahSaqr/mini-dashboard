import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getTodos } from "../services/api"; // ✅ using your service

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

export default function CustomLineChart({ isUp = true, percentage = 12.5 }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const todos = await getTodos();

        // Group by userId (JSONPlaceholder has 10 users)
        const completionRates = {};
        todos.forEach((todo) => {
          if (!completionRates[todo.userId]) {
            completionRates[todo.userId] = { done: 0, total: 0 };
          }
          completionRates[todo.userId].total++;
          if (todo.completed) completionRates[todo.userId].done++;
        });

        const labels = Object.keys(completionRates).map((id) => `User ${id}`);
        const values = Object.values(completionRates).map(
          (u) => Math.round((u.done / u.total) * 100) // percentage done
        );

        setChartData({
          labels,
          datasets: [
            {
              label: "Completion %",
              data: values,
              fill: true,
              backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(0, "rgba(37, 99, 235, 0.4)");
                gradient.addColorStop(1, "rgba(147, 51, 234, 0.05)");
                return gradient;
              },
              borderColor: "#2563eb",
              tension: 0.4,
              pointBackgroundColor: "#2563eb",
              pointRadius: 4,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching todos:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#cbd5e1" } },
      y: {
        grid: { display: false },
        ticks: { color: "#cbd5e1", callback: (v) => `${v}%` },
      },
    },
  };

  if (loading) return <p className="text-light">Loading line chart...</p>;

  return (
    <div className="chart-card glassy-dark p-3">
      <div className="chart-header d-flex justify-content-between align-items-center mb-2">
        <h5 className="chart-title mb-0 text-light">Todo Completion</h5>
        <div className={`chart-indicator fw-semibold ${isUp ? "text-success" : "text-danger"}`}>
          <i className={`bi ${isUp ? "bi-graph-up-arrow" : "bi-graph-down-arrow"} me-1`}></i>
          {percentage}%
        </div>
      </div>
      <Line data={chartData} options={options} height={120} />
    </div>
  );
}
