"use client";
import React, { useState } from "react";
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(`${url}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
        <div className="form-group">
          <label htmlFor="purpose">Expense Amount</label>
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

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
