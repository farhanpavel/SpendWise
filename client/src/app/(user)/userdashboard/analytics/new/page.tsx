"use client";
import React, { useState, useEffect } from "react";
import "../../../../../styles/Newform.css";
import { url } from "@/components/Url/page";
import { useRouter } from "next/navigation";

export default function NewTask() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    category: "",
    purpose: "",
    amount: 0,
  });

  const [categoryLimit, setCategoryLimit] = useState<number | null>(null);
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [currentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    if (formData.category) {
      fetchCategoryLimit(formData.category, currentDate);
      fetchCategoryTasks(formData.category, currentDate);
    } else {
      resetState();
    }
  }, [formData.category]);

  const fetchCategoryLimit = async (category: string, date: string) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/limit/${category}/${date}`
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

  const fetchCategoryTasks = async (category: string, date: string) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/tasks/${category}/${date}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch category tasks");
      }
      const tasks = await response.json();
      const total = tasks.reduce(
        (acc: number, task: { amount: number }) => acc + task.amount,
        0
      );
      setTotalSpent(total);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setTotalSpent(0);
    }
  };

  const resetState = () => {
    setCategoryLimit(null);
    setTotalSpent(0);
    setFormData((prev) => ({
      ...prev,
      category: "",
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: id === "amount" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, date: currentDate }),
      });
      if (!response.ok) {
        alert("Server Error");
        throw new Error("Failed to submit data");
      } else {
        alert("Success");
        router.back();
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const isLimitReached =
    categoryLimit !== null && totalSpent + formData.amount > categoryLimit;

  return (
    <div className="form-container">
      <h1>Details</h1>
      <h3>Enter Spend Information</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Expense Category</label>
          <select
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Groceries">Groceries</option>
            <option value="Transportation">Transportation</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Utility">Utility</option>
            <option value="Charity">Charity</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>
        {categoryLimit === null ? (
          <p style={{ color: "red" }}>Set the limit first for this category.</p>
        ) : totalSpent === categoryLimit ? (
          <p style={{ color: "red" }}>
            Limit reached for today. Cannot proceed.
          </p>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="amount">Expense Amount</label>
              <input
                type="number"
                id="amount"
                placeholder="Enter Amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="purpose">Purpose</label>
              <input
                type="text"
                id="purpose"
                placeholder="Enter Purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
              />
            </div>
            {isLimitReached ? (
              <p style={{ color: "red" }}>
                The limit has been reached. Cannot add more expenses.
              </p>
            ) : (
              <button type="submit" className="submit-btn">
                Submit
              </button>
            )}
          </>
        )}
      </form>
    </div>
  );
}
