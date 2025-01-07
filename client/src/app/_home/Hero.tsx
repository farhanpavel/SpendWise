import Image from "next/image";
import React from "react";
import "../../styles/Home.css";

export default function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-text">
        <h1>
          Track Expenses,
          <br /> Simplify Life
        </h1>
        <p>
          Welcome to SpendWise, your ultimate expense tracking solution.
          Effortlessly record daily expenses, set spending limits, and get
          detailed summaries of your finances. Manage your budget with ease
          using categorized expense tracking and alerts for limits. Stay in
          control with real-time updates and a clean, user-friendly design.
          Start making smarter financial decisions today with SpendWise!
        </p>
      </div>

      <div className="hero-image">
        <Image
          src={"/images/Hero1.gif"}
          width={450}
          height={430}
          alt="Hero Image"
        />
      </div>
    </div>
  );
}
