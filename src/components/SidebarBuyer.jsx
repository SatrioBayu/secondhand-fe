import React from "react";
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from "cdbreact";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/css/SidebarBuyer.css";

import Logo from "../assets/images/logo.svg";

const SidebarBuyer = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="main">
      <CDBSidebar className="sidebar">
        <CDBSidebarHeader>
          <NavLink to="/" className="text-decoration-none">
            <img src={Logo} alt="logo" />
          </NavLink>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/dashboardbuyer" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="columns" className="text">
                Dashboard
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/account" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="table" className="text">
                My Account
              </CDBSidebarMenuItem>
            </NavLink>
            <a onClick={handleLogout}>
              <CDBSidebarMenuItem icon="sign-out-alt" className="text">
                Signout
              </CDBSidebarMenuItem>
            </a>
            <a activeclassname="activeClicked">
              <CDBSidebarMenuItem className="mx-5">qwertyuiopasdfghjklzxcvbnm</CDBSidebarMenuItem>
            </a>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default SidebarBuyer;
