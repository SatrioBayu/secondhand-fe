import React from "react";
import "../assets/css/ModalNavbar.css";

export default function Modal(props) {
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" id="exampleModalLabel">
              Categories
            </h2>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {props.data.map((item) => (
              <li key={item.id}>
                <a className="a-modal" href={`/catalog?category=${item.nama}`}>
                  {item.nama}
                </a>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
