"use client";
import React, { useEffect, useState } from "react";
import "../../../../styles/Analytics.css";
import { url } from "@/components/Url/page";
import { useRouter } from "next/navigation";

interface Task {
  _id: string;
  date: string;
  category: string;
  amount: number;
  purpose?: string;
}

interface CategoryLimit {
  category: string;
  limit: number;
}

const AnalyticsTable: React.FC = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [limit, setLimit] = useState<string>(""); // limit as string because it's initially an empty string
  const [category, setCategory] = useState<string>(""); // category as string for selecting from options
  const [usedCategories, setUsedCategories] = useState<{
    [key: string]: number;
  }>({}); // usedCategories as a map of category name to limit
  const [tasks, setTasks] = useState<Task[]>([]); // tasks as an array of Task objects
  const currentDate = new Date().toISOString().split("T")[0];
  console.log(currentDate);
  const router = useRouter();

  useEffect(() => {
    fetchUsedCategories();
    fetchTasks();
  }, []);

  const fetchUsedCategories = async (): Promise<void> => {
    try {
      const response = await fetch(`${url}/api/limit/data/all/${currentDate}`);
      if (!response.ok) {
        throw new Error("Failed to fetch used categories");
      }

      const data: CategoryLimit[] = await response.json();

      const categoryLimitMap: { [key: string]: number } = data.reduce(
        (acc: { [key: string]: number }, item: CategoryLimit) => {
          acc[item.category] = item.limit;
          return acc;
        },
        {} as { [key: string]: number } // Type the accumulator explicitly
      );

      setUsedCategories(categoryLimitMap);
    } catch (error) {
      console.error("Error fetching used categories:", error);
    }
  };

  const fetchTasks = async (): Promise<void> => {
    try {
      const response = await fetch(`${url}/api/tasks/data/all/${currentDate}`);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data: Task[] = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const calculateRemaining = (category: string): number => {
    const categoryLimit = usedCategories[category] || 0;
    const categoryExpenses = tasks
      .filter((task) => task.category === category)
      .reduce((acc, task) => acc + task.amount, 0);
    return categoryLimit - categoryExpenses;
  };

  const handleSetLimit = (): void => {
    setShowDialog(true);
  };

  const handleDialogClose = (): void => {
    setShowDialog(false);
    setLimit("");
    setCategory("");
  };

  const handleSaveLimit = async (): Promise<void> => {
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
      fetchTasks();
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
          <button
            className="set-limit-btn"
            onClick={() => {
              router.push("/userdashboard/analytics/new");
            }}
          >
            New
          </button>
        </div>
      </div>

      <div className="card-container">
        {/* Today's Date Section */}
        <div className="card card-date">
          <h2 className="card-title">Today's Date</h2>
          <p className="card-content">{currentDate}</p>
        </div>

        {/* Remaining Amount Section */}
        <div className="card card-remaining">
          <h2 className="card-title">Remaining Amount</h2>
          <div className="card-list">
            {[
              "Groceries",
              "Transportation",
              "Healthcare",
              "Utility",
              "Charity",
              "Miscellaneous",
            ].map((cat) => {
              const remaining = calculateRemaining(cat);
              return (
                <div key={cat} className="card-item">
                  <span className="card-item-label">{cat}:</span>
                  <span
                    className={`card-item-value ${
                      remaining < 0 ? "exceeded" : "within-limit"
                    }`}
                  >
                    {usedCategories[cat]
                      ? remaining >= 0
                        ? remaining
                        : "Limit Exceeded"
                      : "Limit Not Set"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Limits Section */}
        <div className="card card-limits">
          <h2 className="card-title">Limits</h2>
          <div className="card-list">
            {[
              "Groceries",
              "Transportation",
              "Healthcare",
              "Utility",
              "Charity",
              "Miscellaneous",
            ].map((cat) => (
              <div key={cat} className="card-item">
                <span className="card-item-label">{cat}:</span>
                <span className="card-item-value">
                  {usedCategories[cat] || "Not Set"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks Table */}
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
              <td colSpan={3} style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Set Limit Dialog */}
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
                  <option
                    key={cat}
                    value={cat}
                    disabled={usedCategories[cat] !== undefined} // Disabled if limit is set
                  >
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
