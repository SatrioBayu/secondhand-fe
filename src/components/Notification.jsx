import React from "react";
import "../assets/css/Notification.css";
import { NavLink } from "react-router-dom";

export default function Notification(props) {
  return (
    <li>
      <p className="text-center fw-bold fs-6">Notification Buyer</p>
      {props.buyer &&
        props.buyer.map((data) => (
          <div key={data.id}>
            <NavLink className="dropdown-item" to="/dashboardbuyer">
              <div className="d-flex product">
                <div className="product-img">
                  <img src={data.Product.ProductImages[0].image} alt="Gambar" />
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
        ))}
      <p className="text-center fw-bold fs-6">Notification Seller</p>
      {props.seller &&
        props.seller.map((data) => (
          <div key={data.id}>
            <NavLink className="dropdown-item" to="/dashboardseller">
              <div className="d-flex product">
                <div className="product-img">
                  <img src={data.Product.ProductImages[0].image} alt="Gambar" />
                </div>
                <div className="product-details">
                  <h5>{data.Product.nama}</h5>
                  <p>Buyer Offer:</p>
                  <p>Rp. {data.harga}</p>
                  <h5 className="seller-agree">{data.User.nama.split(" ").sort((a, b) => a.length - b.length)[0]} bid your product</h5>
                </div>
              </div>
              <hr />
            </NavLink>
          </div>
        ))}
    </li>
  );
}
