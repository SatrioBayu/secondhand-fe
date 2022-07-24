import React, { useState, useEffect } from "react";
import SidebarBuyer from "../components/SidebarBuyer";
import SidebarBuyerMobile from "../components/SidebarBuyerMobile";
import "../assets/css/AccountBuyer.css";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";

const override = {
  display: "flex",
  margin: "0 auto",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh",
};

export default function AccountBuyer() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://secondhand-backend-mac.herokuapp.com/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {loading ? (
        <PropagateLoader cssOverride={override} size={50} color={"#FF7158"} loading={loading} />
      ) : (
        <div className="main">
          <div className="sidebar-dekstop">
            <SidebarBuyer />
          </div>
          <div className="sidebar-mobile">
            <SidebarBuyerMobile image={user.image} nama={user.nama} />
          </div>
          {user && (
            <div className="page-account-buyer">
              <div className="row mb-5 navbar-dekstop">
                <div className="col-md-6">
                  <h3>My Account</h3>
                  <p>Update your current profile</p>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center justify-content-end">
                    <a className="navbar-brand" href="#">
                      <img src={user.image} alt="profil" className="foto-profil" />
                      Hi, {user.nama}
                    </a>
                  </div>
                </div>
              </div>
              <div className="form-account">
                <form className="row g-3">
                  <div className="col-md-6 row-image">
                    <div className="container">
                      <div className="row align-items-start">
                        <div className="col-5">
                          <img src={user.image} alt="Avatar" className="image-profil" />
                        </div>
                        <div className="col">
                          Edit Profile Photo <i className="fas fa-edit"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mt-4"></div>
                  <div className="col-md-6 mt-4">
                    <label for="inputName" className="form-label">
                      Nama
                    </label>
                    <input type="text" className="form-control" value={user.nama} id="inputName" />
                  </div>
                  <div className="col-md-6 mt-4">
                    <label for="inputEmail" className="form-label">
                      Email
                    </label>
                    <input type="email" value={user.email} className="form-control" id="inputEmail" />
                  </div>
                  <div className="col-md-6 mt-4">
                    <label for="inputAddress1" className="form-label">
                      Kota
                    </label>
                    <input type="text" value={user.kota} className="form-control" id="inputAddress1" placeholder="1234 Main St" />
                  </div>
                  <div className="col-md-6 mt-4">
                    <label for="inputAddress2" className="form-label">
                      Alamat
                    </label>
                    <input type="text" value={user.alamat} className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                  </div>
                  <div className="col-6 mt-4">
                    <label for="inputMobile" className="form-label">
                      No Hp
                    </label>
                    <input type="text" value={user.noHp} className="form-control" id="inputMobile" />
                  </div>
                  <div className="col-12 mt-5">
                    <button type="submit" className="btn btn-success btn-save">
                      Save Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
