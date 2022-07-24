import React, { useState, useEffect } from "react";
import SidebarBuyer from "../components/SidebarBuyer";
import SidebarBuyerMobile from "../components/SidebarBuyerMobile";
import "../assets/css/AccountSeller.css";
import DefaultPic from "../assets/images/user_pc.png";
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

export default function Account() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHp, setNoHp] = useState("");
  const [kota, setKota] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("kota", kota);
    formData.append("alamat", alamat);
    formData.append("noHp", noHp);
    formData.append("picture", uploadedImage);
    try {
      const res = await axios.put(`https://secondhand-backend-mac.herokuapp.com/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.errors) {
        throw new Error(res.errors[0].message);
      }
      setSuccess(res.data.message);
      console.log(res);
      setPassword("");
      setUploading(false);
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error) {
      setError(error.response.data.errors[0].message);
      setUploading(false);
    }
  };

  const onUploadImages = (e) => {
    const image = e.target.files[0];
    setUploadedImage(image);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(image);
  };

  useEffect(() => {
    axios
      .get("https://secondhand-backend-mac.herokuapp.com/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setNama(res.data.data.nama);
        setEmail(res.data.data.email);
        setAlamat(res.data.data.alamat);
        setNoHp(res.data.data.noHp);
        setKota(res.data.data.kota);
        setImage(res.data.data.image);
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
            <SidebarBuyerMobile image={user.image || DefaultPic} nama={user.nama.split(" ").sort((a, b) => a.length - b.length)[0]} />
          </div>
          <div className="page-account-buyer">
            <div className="row mb-5 navbar-dekstop">
              <div className="col-md-6">
                <h3>My Account</h3>
                <p>Update your current profile</p>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center justify-content-end">
                  <a className="navbar-brand" href="#">
                    <img src={user.image || DefaultPic} alt="profil" className="foto-profil" />
                    Hi, {user.nama.split(" ").sort((a, b) => a.length - b.length)[0]}
                  </a>
                </div>
              </div>
            </div>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success" role="alert">
                {success}
              </div>
            )}
            <div className="form-account">
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="d-flex flex-column align-items-center">
                  <label htmlFor="upload">
                    <img src={imagePreview || image || DefaultPic} alt="Avatar" className="image-profil" />
                  </label>
                  <label htmlFor="upload">
                    <span className="fas fa-edit"></span>
                  </label>
                  <input type="file" onChange={onUploadImages} id="upload" />
                </div>
                <div className="col-md-6 mt-4">
                  <label htmlFor="inputName" className="form-label">
                    Name
                  </label>
                  <input type="text" required onChange={(e) => setNama(e.target.value)} className="form-control" value={nama} id="inputName" />
                </div>
                <div className="col-md-6 mt-4">
                  <label htmlFor="inputEmail" className="form-label">
                    Email
                  </label>
                  <input type="email" required onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" id="inputEmail" />
                </div>
                <div className="col-md-6 mt-4">
                  <label htmlFor="inputAddress1" className="form-label">
                    City
                  </label>
                  <input type="text" required onChange={(e) => setKota(e.target.value)} value={kota} className="form-control" id="inputAddress1" placeholder="1234 Main St" />
                </div>
                <div className="col-md-6 mt-4">
                  <label htmlFor="inputAddress2" className="form-label">
                    Address
                  </label>
                  <input type="text" required onChange={(e) => setAlamat(e.target.value)} value={alamat} className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                </div>
                <div className="col-6 mt-4">
                  <label htmlFor="inputMobile" className="form-label">
                    Mobile Phone
                  </label>
                  <input type="text" required onChange={(e) => setNoHp(e.target.value)} value={noHp} className="form-control" id="inputMobile" />
                </div>
                <div className="col-6 mt-4">
                  <label htmlFor="inputMobile" className="form-label">
                    Password
                  </label>
                  <input type="password" required onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="inputPassword" />
                </div>
                <div className="col-12 mt-5">
                  {password ? (
                    <>
                      {uploading ? (
                        <button disabled type="submit" className="btn btn-success btn-save">
                          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          Saving...
                        </button>
                      ) : (
                        <button type="submit" className="btn btn-success btn-save">
                          Save Now
                        </button>
                      )}
                    </>
                  ) : (
                    <button type="submit" disabled className="btn btn-success btn-save">
                      Save Now
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
