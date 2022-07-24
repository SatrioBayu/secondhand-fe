import React, { useState, useEffect } from "react";
import SidebarSeller from "../components/SidebarSeller";
import SidebarSellerMobile from "../components/SidebarSellerMobile";
import axios from "axios";
import "../assets/css/DashboardSeller.css";
import Card from "../components/CardDashboard";
import AddProduct from "../components/ModalAddProduct";
import PropagateLoader from "react-spinners/PropagateLoader";
import DefaultPic from "../assets/images/user_pc.png";

const override = {
  display: "flex",
  margin: "0 auto",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh",
};

export default function MyProduct() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [completeAccount, setCompleteAccount] = useState(false);
  const [excededLimit, setExcededLimit] = useState(false);

  const fetchData = async () => {
    try {
      const user = await axios.get(`https://secondhand-backend-mac.herokuapp.com/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const product = await axios.get(`https://secondhand-backend-mac.herokuapp.com/myProducts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (user.data.data.alamat && user.data.data.noHp && user.data.data.kota && user.data.data.image) {
        setCompleteAccount(true);
      }
      if (product.data.data && product.data.data.length >= 4) {
        setExcededLimit(true);
      }
      setUser(user.data.data);
      setProduct(product.data.data);
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
        <div className="main">
          <div className="sidebar-dekstop">
            <SidebarSeller />
          </div>
          <div className="sidebar-mobile">
            <SidebarSellerMobile image={user.image} nama={user.nama} />
          </div>
          {user && (
            <div className="page-transaksi-buyer">
              <div className="row mb-5 navbar-dekstop">
                <div className="col-md-6">
                  <h3>My Product</h3>
                  <p>Manage it well and get money</p>
                  {completeAccount ? (
                    <div>
                      {excededLimit ? (
                        <>
                          <button disabled className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Add New Product
                          </button>
                          <div className="alert alert-danger mt-2" role="alert">
                            You have reached the limit of product
                          </div>
                        </>
                      ) : (
                        <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                          Add New Product
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      <button disabled className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Add New Product
                      </button>
                      <div className="alert alert-danger mt-2" role="alert">
                        Complete your account information before add a product
                      </div>
                    </>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center justify-content-end">
                    <a className="navbar-brand" href="/account">
                      <img src={user.image || DefaultPic} alt="profil" className="foto-profil" />
                      Hi, {user.nama.split(" ").sort((a, b) => a.length - b.length)[0]}
                    </a>
                  </div>
                </div>
              </div>

              <AddProduct />

              <div className="row navbar-mobile">
                <div className="col-md-12">
                  <h3 className="catalog-title">My Product</h3>
                  <p>Manage it well and get money</p>
                  {completeAccount ? (
                    <>
                      {excededLimit ? (
                        <>
                          <button disabled className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Add New Product
                          </button>
                          <div className="alert alert-danger mt-2" role="alert">
                            You have reached the limit of product
                          </div>
                        </>
                      ) : (
                        <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                          Add New Product
                        </button>
                      )}
                      <AddProduct />
                    </>
                  ) : (
                    <>
                      <button disabled className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Add New Product
                      </button>
                      <div className="alert alert-danger mt-2" role="alert">
                        Complete your account information before add a product
                      </div>
                    </>
                  )}
                </div>
              </div>

              {product ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-4 mt-2 mb-5">{product && product.map((item) => <Card key={item.id} data={item} />)}</div>
              ) : (
                <h2 className="text-center">You don't have any product</h2>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
