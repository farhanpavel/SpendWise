import Image from "next/image";
import React from "react";
import Link from "next/link";
import "../../styles/Home.css";

export default function Header() {
  return (
    <div>
      <div className="Header-head">
        <div>
          <Image src={"/images/Logo.png"} width={50} height={30} alt="Logo" />
        </div>

        <div>
          <a href="/userdashboard/analytics">
            <button>Start</button>
          </a>
        </div>
      </div>
    </div>
  );
}
