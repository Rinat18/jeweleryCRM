import React from "react";
import SideBar from "./SideBar/SideBar";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <div className="SideBar">
        <SideBar />
      </div>
      <div className="children">{children}</div>
    </div>
  );
}
