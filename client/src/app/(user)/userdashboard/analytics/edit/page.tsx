"use client";
import React, { useState, useEffect } from "react";
import "../../../../../styles/Newform.css";
import { url } from "@/components/Url/page";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface TaskData {
  category?: string;
  amount?: number;
  purpose?: string;
  date?: string;
  _id?: string;
}

export default function Edit() {
  const router = useRouter();
  const cookieId = Cookies.get("id");
  const [formData, setFormData] = useState<TaskData>({});
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [categoryLimit, setCategoryLimit] = useState<number | null>(null);

  useEffect(() => {
    fetchCategoryTasks();
  }, []);

  useEffect(() => {
    if (formData.category && formData.date) {
      fetchCategoryLimit();
    }
  }, [formData.category, formData.date]);

  const fetchCategoryTasks = async () => {
    try {
      const response = await fetch(
        `${url}/api/tasks/data/alldata/id/${cookieId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch category tasks");
      }
      const task = await response.json();

      console.log("Fetched task:", task);

      const total = task._id === cookieId ? 0 : task.amount || 0;

      setTotalSpent(total);
      setFormData(task);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "amount" ? parseFloat(value) || 0 : value,
    }));
  };

  const fetchCategoryLimit = async () => {
    try {
      const response = await fetch(
        `${url}/api/limit/${formData.category}/${formData.date}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch category limit");
      }
      const data = await response.json();
      setCategoryLimit(data.limit);
    } catch (err) {
      console.error("Error fetching limit:", err);
      setCategoryLimit(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/api/tasks/${cookieId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        alert("Server Error");
        throw new Error("Failed to update data");
      }
      alert("Updated Successfully");
      router.back();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const isLimitReached =
    categoryLimit !== null &&
    totalSpent + (formData.amount ?? 0) > categoryLimit;

  return (
    <div className="form-container">
      <h1>Edit {formData.category || "Expense"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Expense Category</label>
          <input
            type="text"
            id="category"
            value={formData.category || ""}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Expense Amount</label>
          <input
            type="number"
            id="amount"
            value={formData.amount || ""}
            onChange={handleChange}
            placeholder="Enter Amount"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="purpose">Purpose</label>
          <input
            type="text"
            id="purpose"
            value={formData.purpose || ""}
            onChange={handleChange}
            placeholder="Enter Purpose"
            required
          />
        </div>
        {isLimitReached ? (
          <p style={{ color: "red" }}>
            The limit has been reached. Cannot add more expenses.
          </p>
        ) : (
          <button type="submit" className="submit-btn">
            Update
          </button>
        )}
      </form>
    </div>
  );
}
