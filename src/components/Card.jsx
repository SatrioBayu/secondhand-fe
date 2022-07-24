import React from "react";
import "../assets/css/Card.css";

export default function Card(props) {
  return (
    <div className="col h-100">
      <div className="card h-100">
        <img src={props.data.ProductImages[0].image} className="thumbnail-card" alt="img" />
        <div className="card-body">
          <h5 className="card-title thumbnail-text">{props.data.nama}</h5>
          <p className="card-text price-text">Rp. {props.data.harga}</p>
        </div>
      </div>
    </div>
  );
}
