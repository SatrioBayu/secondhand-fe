import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultPic from "../assets/images/user_pc.png";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import "../assets/css/SidebarSellerMobile.css";
import PropagateLoader from "react-spinners/PropagateLoader";

const override = {
  display: "flex",
  margin: "0 auto",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh",
};

export default function SideBuyerMobile(props) {
  const [nama, setNama] = useState(props.nama);
  const [image, setImage] = useState(props.image);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <nav className="navbar bg-light fixed-top">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              <a href="/">
                <img src={Logo} className="logo-sidebar-mobile" />
              </a>
              SecondHand
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item item-mobile text">
                <a className="nav-link active" aria-current="page" href="/dashboardbuyer">
                  Dashboard
                </a>
              </li>
              <li className="nav-item item-mobile text">
                <a className="nav-link active" href="/account">
                  My Account
                </a>
              </li>
              <li className="nav-item item-mobile text">
                <a className="nav-link active" onClick={handleLogout} href="/">
                  Sign Out
                </a>
              </li>
            </ul>
          </div>
        </div>
        <a className="navbar-brand" href="#">
          <img src={image || DefaultPic} alt="profil" className="foto-profil" />
          Hi, {nama.split(" ").sort((a, b) => a.length - b.length)[0]}
        </a>
      </div>
    </nav>
  );
}
