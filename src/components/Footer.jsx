import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/Footer.css";

export default function Footer() {
  return (
    <div className="mt-5 footer-container">
      <hr />
      <div className="container">
        <div className="row g-3 footer-row">
          <div className="col-lg-6">
            <h5 className="text-uppercase">About Us</h5>
            <p>
              SecondHand is a place to buy and sell goods online, especially "secondhand" goods. This platform opens and provides various types of need categories. Registered users In this
              application, you can act as a seller and a buyer by using the same 1 (one) account. This platform will bring together sellers and buyers to be able to negotiate goods and make
              transactions directly outside the platform.
            </p>
          </div>
          <div className="col-sm-4 col-md-2">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink className="footer-link" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="footer-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className="footer-link" to="/register">
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-sm-8 col-lg-4">
            <h5 className="text-uppercase">Categories</h5>
            <div className="row">
              <div className="col-sm-6">
                <ul className="list-unstyled">
                  <li>
                    <NavLink className="footer-link" to="/catalog?category=Electronic">
                      Electronic
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="footer-link" to="/catalog?category=Gadgets">
                      Gadgets
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="footer-link" to="/catalog?category=Sneakers">
                      Sneakers
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="footer-link" to="/catalog?category=Fashion">
                      Fashion
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="footer-link" to="/catalog?category=Tools">
                      Tools
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="col-sm-6">
                <ul className="list-unstyled">
                  <li>
                    <NavLink className="footer-link" to="/catalog?category=Health%20and%20Beauty">
                      Health & Beauty
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="footer-link" to="/catalog?category=Baby">
                      Baby
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="footer-link" to="/catalog?category=Hobby">
                      Hobby
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="footer-link" to="/catalog?category=Gaming">
                      Gaming
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="footer-link" to="/catalog?category=Furniture">
                      Furniture
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <p className="text-center">2022 Copyright Store. All Rights Reserved.</p>
    </div>
  );
}
