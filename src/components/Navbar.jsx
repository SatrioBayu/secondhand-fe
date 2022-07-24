import React, { useState } from "react";
import Modal from "./ModalNavbar";
import Notif from "../components/Notification";
import logo from "../assets/images/logo.svg";
import { NavLink } from "react-router-dom";
import LogoSeller from "../assets/images/logo-seller.svg";
import { MdNotificationsActive } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import "../assets/css/Navbar.css";

export default function Navbar(props) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    props.onLogout();
  };

  const handleDashboard = () => {
    navigate("/dashboardbuyer");
  };

  const handleWishlist = () => {
    navigate("/wishlist");
  };

  const handleSubmit = (e) => {
    navigate(`/catalog?search=${search}`);
  };

  return (
    <div className="container-nav">
      <Modal data={props.categories} />
      <input type="checkbox" id="check" />
      <nav>
        <div className="icon">
          <NavLink to="/">
            <img src={logo} alt="logo" /> SecondHand
          </NavLink>
        </div>
        <ol>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <div className="dropdown">
            <li>
              <button className="btn-dropdown" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <NavLink to="/">
                  Categories <i className="bx bx-chevron-down"></i>
                </NavLink>
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {props.categories.map((item) => (
                  <li key={item.id}>
                    <a className="dropdown-item" href={`/catalog?category=${item.nama}`}>
                      {item.nama}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </div>
        </ol>
        <form onSubmit={handleSubmit}>
          <div className="search-box">
            <input type="search" name="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
            <a href={`/catalog?search=${search}`}>
              <span className="fa fa-search"></span>
            </a>
          </div>
        </form>
        <ol>
          <li>
            <NavLink to="/shoppingcart">
              <span className="fa fa-shopping-basket"></span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              {props.isLoggedIn ? <>{props.notifBuyer || props.notifSeller ? <MdNotificationsActive size={`1.2em`} /> : <span className="fa fa-bell"></span>}</> : <span className="fa fa-bell"></span>}
            </NavLink>
            <ul className="dropdown-menu notification" aria-labelledby="dropdownMenuLink">
              {props.isLoggedIn && (props.notifBuyer || props.notifSeller) && <Notif seller={props.notifSeller} buyer={props.notifBuyer} />}
            </ul>
          </li>
          <li>
            <h4>|</h4>
          </li>
          {props.isLoggedIn ? (
            <>
              <li>
                <NavLink className="btn-seller" to="/dashboardseller">
                  <img src={LogoSeller} alt="seller" /> Seller
                  <span className="seller-notif"></span>
                </NavLink>
              </li>
              <li>
                <a className="profile-info dropdown" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                  <img className="img-fluid rounded-circle" src={props.image} alt="profile" />
                  Hi, {props.nama}
                  <ul className="dropdown-menu dropdown-profile" aria-labelledby="dropdownMenuLink">
                    <li>
                      <p className="dropdown-item" onClick={handleDashboard}>
                        Dashboard
                      </p>
                    </li>
                    <li>
                      <p className="dropdown-item" onClick={handleWishlist}>
                        Wishlist
                      </p>
                    </li>
                    <li>
                      <p className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </p>
                    </li>
                  </ul>
                </a>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login">Sign In</NavLink>
            </li>
          )}
        </ol>

        {/* Phone Layout */}
        <ol className="vertical-screen">
          <li className="nav-span">
            <NavLink to="/">Home</NavLink>
          </li>

          <li className="nav-span">
            <button type="button" className="btn-dropdown" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <p>Categories</p>
            </button>
          </li>

          <li className="nav-span">
            <NavLink to="/shoppingcart">Shopping Cart</NavLink>
          </li>
          <li className="nav-span">
            <NavLink to="/notification">Notification</NavLink>
          </li>
          <li className="nav-span">
            <NavLink to="/wishlist">Wishlist</NavLink>
          </li>
          {props.isLoggedIn ? (
            <>
              <li className="nav-span">
                <a onClick={handleLogout}>
                  <span className="fa fa-sign-out-alt"></span>
                  &nbsp; Sign Out
                </a>
              </li>
              <li className="d-flex justify-content-center gap-2 nav-signin">
                <NavLink to="/dashboardseller" className="vertical-logo">
                  <span>
                    <img className="img-fluid" src={LogoSeller} alt="seller" />
                  </span>
                </NavLink>
                <NavLink to="/dashboardbuyer" className="vertical-profile">
                  <span className="profile">
                    <img className="img-fluid rounded-circle" src={props.image} alt="profile" />
                  </span>
                </NavLink>
              </li>
            </>
          ) : (
            <li className="nav-signin">
              <NavLink to="/login">
                <span>
                  <i className="bx bx-log-in"></i> Sign In
                </span>
              </NavLink>
            </li>
          )}
        </ol>
        <label htmlFor="check" className="bar">
          <span className="fa fa-bars" id="bars"></span>
          <span className="fa fa-times" id="times"></span>
        </label>
      </nav>
    </div>
  );
}
