import React, { useState } from "react";
import "../assets/css/Card.css";
import axios from "axios";
import EditProduct from "./ModalEditProduct";

export default function Card(props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.delete(`https://secondhand-backend-mac.herokuapp.com/product/${props.data.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  return (
    <div className="col">
      <div className="card h-100">
        <img src={props.data.ProductImages[0].image} className="card-img-top card-img" alt="img" />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title thumbnail-text">{props.data.nama}</h5>
          <p className="card-text price-text">Rp. {props.data.harga}</p>
          <div className="row mt-auto g-3">
            <div className="col-lg-6 d-flex">
              <button className="btn flex-fill btn-primary" data-bs-toggle="modal" data-bs-target={`#edit${props.data.id}`}>
                Edit
              </button>
            </div>
            <div className="col-lg-6 d-flex">
              {loading ? (
                <button disabled value={props.data.id} onClick={handleDelete} className="btn flex-fill btn-danger">
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Deleting...
                </button>
              ) : (
                <button value={props.data.id} onClick={handleDelete} className="btn flex-fill btn-danger">
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <EditProduct data={props.data} />
    </div>
  );
}
