import React from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { AiFillAlert, AiFillWarning } from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa";
import "../../styles/Home.css";

export default function Feature() {
  return (
    <div className="feature-container">
      <h1>Our Components</h1>

      <div className="feature-cards">
        <div className="feature-card">
          <div className="feature-icon-zero">
            <GiTakeMyMoney />
          </div>
          <h1>Quick Expense Logging</h1>
          <p>Easily record daily expenses by category.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-one">
            <FaLocationArrow />
          </div>
          <h1>Seamless Tracking</h1>
          <p>View categorized summaries of all your spending.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-two">
            <AiFillAlert />
          </div>
          <h1>Limit Alerts</h1>
          <p>Get notified when you approach spending limits.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-three">
            <AiFillWarning />
          </div>
          <h1>Smart Budgeting</h1>
          <p>Set limits and stay in control of your finances.</p>
        </div>
      </div>
    </div>
  );
}
