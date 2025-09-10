import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "../components/common/Table";
import { getPosts } from "../services/api";
import Button from "../components/common/Button";

// Functions for Header actions
export default function DataTable() {
  const handleProfile = () => alert("Go to profile page");
  const handleLogout = () => alert("Logging out...");

  // Table columns\
  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Body", accessor: "body" },
  ];

  // States
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const rowsPerPage = 10;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const posts = await getPosts();
        setAllData(posts);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtered data by search
  const filteredData = allData.filter(
    (row) =>
      row.title.toLowerCase().includes(search.toLowerCase()) ||
      row.body.toLowerCase().includes(search.toLowerCase())
  );

  // Slice data for current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <>
      {/* Header */}
      <Header
        title="Data Table"
        icon={"bi bi-table gradient-icon"}
        onProfile={handleProfile}
        onLogout={handleLogout}
      />

      {/* Search Bar */}
      <div className="ps-3 pe-3">
        <input
          type="text"
          className="search-bar"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Pagination Controls */}
      {!loading && !error && (
        <div className="d-flex justify-content-between align-items-center mt-3 px-3">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <Button
            className="mb-2"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
      {/* Table */}
      {!loading && !error && (
        <div className="px-3">
          <Table columns={columns} data={currentData} />
        </div>
      )}
    </>
  );
}
