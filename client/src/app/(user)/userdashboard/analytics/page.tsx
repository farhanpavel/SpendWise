"use client";
import React, { useEffect, useState } from "react";
import "../../../../styles/Analytics.css";
import { url } from "@/components/Url/page";

const AnalyticsTable = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [limit, setLimit] = useState("");
  const [category, setCategory] = useState("");
  const [usedCategories, setUsedCategories] = useState([]);
  const [tasks, setTasks] = useState([]); // To store task data from the API
  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchUsedCategories();
    fetchTasks();
  }, []);

  const fetchUsedCategories = async () => {
    try {
      const response = await fetch(`${url}/api/limit?date=${currentDate}`);
      if (!response.ok) {
        throw new Error("Failed to fetch used categories");
      }
      const data = await response.json();

      // Create a mapping of category to limit for the current date
      const categoryLimitMap = data.reduce((acc, item) => {
        acc[item.category] = item.limit;
        return acc;
      }, {});

      setUsedCategories(categoryLimitMap);
    } catch (error) {
      console.error("Error fetching used categories:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${url}/api/tasks`);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleSetLimit = () => {
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setLimit("");
    setCategory("");
  };

  const handleSaveLimit = async () => {
    if (!category || !limit) {
      alert("Please select a category and set a limit");
      return;
    }

    try {
      const response = await fetch(`${url}/api/limit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          limit: Number(limit),
        }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        alert(message || "Failed to save the limit. Please try again.");
        throw new Error("Failed to save limit");
      }

      alert("Success");
      fetchUsedCategories();
      fetchTasks(); // Refresh tasks after saving
      handleDialogClose();
    } catch (error) {
      console.error("Error saving limit:", error);
    }
  };

  return (
    <div className="analytics-table">
      <div className="header-controls">
        <input
          type="text"
          placeholder="Filter Amount..."
          className="filter-input"
        />
        <div className="btn-handle">
          <button className="set-limit-btn" onClick={handleSetLimit}>
            Set Limit
          </button>
          <button className="set-limit-btn">New</button>
        </div>
      </div>
      <div className="card-section">
        <div className="first">
          <h1>Today's Date</h1>
          <h1>{currentDate}</h1>
        </div>
        <div className="second">
          <h1>Total Expense</h1>
          <h1>
            {tasks.reduce((acc, task) => acc + (task.amount || 0), 0)}{" "}
            {/* Calculate total expense */}
          </h1>
        </div>
        <div className="third">
          <h1>Limits</h1>
          {[
            "Groceries",
            "Transportation",
            "Healthcare",
            "Utility",
            "Charity",
            "Miscellaneous",
          ].map((cat) => (
            <div key={cat}>
              <h2>
                {cat}: {usedCategories[cat] ? usedCategories[cat] : 0}{" "}
                {/* Display limit for each category */}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Expense</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr
                key={task._id}
                title={`Purpose: ${task.purpose || "No purpose provided"}`}
                className="tooltip-row"
              >
                <td>{task.date.substring(0, 10) || "N/A"}</td>
                <td>{task.category || "N/A"}</td>
                <td>{task.amount || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h2>Set Limit</h2>
            <div className="dialog-field">
              <label>Date:</label>
              <input type="text" value={currentDate} readOnly />
            </div>
            <div className="dialog-field">
              <label>Expense Category:</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                {[
                  "Groceries",
                  "Transportation",
                  "Healthcare",
                  "Utility",
                  "Charity",
                  "Miscellaneous",
                ].map((cat) => (
                  <option key={cat} value={cat} disabled={usedCategories[cat]}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="dialog-field">
              <label>Set Limit:</label>
              <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                placeholder="Enter limit"
              />
            </div>
            <div className="dialog-actions">
              <button onClick={handleDialogClose} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleSaveLimit} className="save-btn">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsTable;
