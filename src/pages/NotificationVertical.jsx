import React, { useState, useEffect } from "react";
import LayoutNavbarFooter from "../components/LayoutNavbarFooter";
import "../assets/css/Notification.css";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import { NavLink } from "react-router-dom";

const override = {
  display: "flex",
  margin: "0 auto",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh",
};

export default function Notification() {
  const [notifBuyer, setNotifBuyer] = useState([]);
  const [notifSeller, setNotifSeller] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const notifikasiBuyer = await axios.get("https://secondhand-backend-mac.herokuapp.com/notifikasiBuyer", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const notifikasiSeller = await axios.get("https://secondhand-backend-mac.herokuapp.com/notifikasiSeller", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotifBuyer(notifikasiBuyer.data.data);
      setNotifSeller(notifikasiSeller.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <PropagateLoader cssOverride={override} size={50} color={"#FF7158"} loading={loading} />
      ) : (
        <LayoutNavbarFooter>
          <div className="container container-fluid">
            <div className="row">
              <p className="fw-bold">Notifikasi Buyer</p>
              {notifBuyer ? (
                notifBuyer.map((data) => (
                  <div key={data.id} className="col-12">
                    <NavLink to="/dashboardbuyer">
                      <div className="d-flex product align-items-center">
                        <div className="product-img">
                          <img src={data.Product.ProductImages[0].image} alt="image" />
                        </div>
                        <div className="product-details">
                          <h5>{data.Product.nama}</h5>
                          <p>Your Offer:</p>
                          <p>Rp. {data.harga}</p>
                          {data.status === "Diterima" && <h5 className="seller-agree">seller agrees to your offer</h5>}
                          {data.status === "Ditolak" && <h5 className="seller-reject">seller rejects to your offer</h5>}
                        </div>
                      </div>
                      <hr />
                    </NavLink>
                  </div>
                ))
              ) : (
                <h6 className="text-center">There's no notification on your bid yet</h6>
              )}
              <p className="fw-bold">Notifikasi Seller</p>
              {notifSeller ? (
                notifSeller.map((data) => (
                  <div key={data.id} className="col-12">
                    <NavLink to="/dashboardseller">
                      <div className="d-flex product align-items-center">
                        <div className="product-img">
                          <img src={data.Product.ProductImages[0].image} alt="image" />
                        </div>
                        <div className="product-details">
                          <h5>{data.Product.nama}</h5>
                          <p>Buyer Offer:</p>
                          <p>Rp. {data.harga}</p>
                          <h5 className="seller-agree">{data.User.nama} bid your product</h5>
                        </div>
                      </div>
                      <hr />
                    </NavLink>
                  </div>
                ))
              ) : (
                <h6 className="text-center">There's no notification for your product yet</h6>
              )}
            </div>
          </div>
        </LayoutNavbarFooter>
      )}
    </>
  );
}
