import React, { useState } from "react";
import "../assets/css/Login.css";
import axios from "axios";
import Pic from "../assets/images/pic.png";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    const data = { email, password, nama };
    const result = await axios
      .post("https://secondhand-backend-mac.herokuapp.com/register", data)
      .then((res) => {
        if (res.data.errors) {
          throw new Error(res.data.errors[0].message);
        }
        setError("");
        return "Berhasil";
      })
      .catch((error) => {
        setError(error.response.data.errors[0].message);
        setIsSubmit(false);
        return "Gagal";
      });
    if (result === "Berhasil") {
      navigate("/login");
    }
  };

  return (
    <div className="container container-login">
      <div className="row p-5 g-5">
        <div className="col-md-6 d-flex justify-content-center">
          <img src={Pic} alt="Woman" className="img-fluid" />
        </div>
        <div className="col-md-6 container-login--right">
          <h3>Get your secondhand now</h3>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="row mt-3">
            <div className="col-lg-8 col-md-12 container-login--right_form">
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input type="email" required onChange={(e) => setEmail(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" required onChange={(e) => setNama(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" required onChange={(e) => setPassword(e.target.value)} className="form-control" />
                </div>
                <div className="d-flex flex-column mb-3">
                  {isSubmit ? (
                    <button type="submit" disabled className="flex-fill btn-disabled">
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Signing Up ...
                    </button>
                  ) : (
                    <button type="submit" className="flex-fill btn-login">
                      Sign Up
                    </button>
                  )}
                </div>
                <div className="d-flex flex-column">
                  <a href="/login" className="flex-fill text-center btn-register">
                    Sign In
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
