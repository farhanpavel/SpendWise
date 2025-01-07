"use client";
import Sidebar from "@/components/Sidebar/page";

export default function Landing({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="landing-container">
      <Sidebar />
      <div className="content-area">{children}</div>
    </div>
  );
}
