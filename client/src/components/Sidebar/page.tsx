import React, { useState } from "react";
import Link from "next/link";
import "../../styles/Sidebar.css";
import { GrOverview } from "react-icons/gr";

import { IoAnalyticsSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";

const navItems = [
  {
    title: "Analytics",
    href: "/userdashboard/analytics",
    icon: <IoAnalyticsSharp />,
  },
];

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="sidebar-container">
      <div
        className={`sidebar ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <div className="sidebar-logo">
          <Image src="/images/logo.png" width={50} height={50} alt="Logo" />
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item, index) => (
            <Link key={index} href={item.href} className="sidebar-link">
              <div className="sidebar-icon">{item.icon}</div>
              <span className="sidebar-title">{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
