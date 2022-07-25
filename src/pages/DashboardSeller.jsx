import React, { useState, useEffect } from "react";
import SidebarSeller from "../components/SidebarSeller";
import SidebarSellerMobile from "../components/SidebarSellerMobile";
import "../assets/css/DashboardSeller.css";
import PropagateLoader from "react-spinners/PropagateLoader";
import axios from "axios";
import DefaultPic from "../assets/images/user_pc.png";

const override = {
  display: "flex",
  margin: "0 auto",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh",
};

export default function DashboardSeller() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const fetchData = async () => {
    try {
      const user = await axios.get(`https://secondhand-backend-mac.herokuapp.com/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const product = await axios.get(`https://secondhand-backend-mac.herokuapp.com/historySeller`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(user.data.data);
      setProduct(product.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async (e) => {
    const id = e.target.value;
    const status = "Diterima";
    try {
      const response = await axios.put(
        `https://secondhand-backend-mac.herokuapp.com/updateOrder/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  const handleReject = async (e) => {
    const id = e.target.value;
    const status = "Ditolak";
    try {
      const response = await axios.put(
        `https://secondhand-backend-mac.herokuapp.com/updateOrder/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
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
                  <h3>History Transactions</h3>
                  <p>Big result start from the small one</p>
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
              <div className="judul-buy">
                <h5 className="judul mt-3">Sell Product</h5>
                <hr className="line" />
              </div>
              <div className="list-dekstop">
                {product ? (
                  <div className="table-responsive-md">
                    <table className="table align-middle table-hover">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Buyer</th>
                          <th>Bid</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <img src={item.Product.ProductImages[0].image} className="rounded-5 p-3" alt="img" />
                            </td>
                            <td>
                              <h6>{item.User.nama}</h6>
                            </td>
                            <td>
                              <h6>{item.harga}</h6>
                            </td>
                            <td>
                              <h6>{item.status}</h6>
                            </td>
                            {item.status !== "Menunggu Konfirmasi" ? (
                              <td>
                                {item.status === "Diterima" ? (
                                  // <a target="_blank" href={`https://wa.me/${item.User.noHp}`}>
                                  <a
                                    target="_blank"
                                    href={`https://api.whatsapp.com/send?phone=+62${item.User.noHp.substring(1, item.User.noHp.length)}&text=Hai%20${item.User.nama},%0ASaya%20${
                                      item.Product.User.nama
                                    }%20penjual%20dari%20barang%20${item.Product.nama}.%0ASaya%20menyetujui%20tawaran%20anda%20dengan%20harga%20Rp.%20${item.harga}.`}
                                  >
                                    <button className="btn btn-success">
                                      <span className="fa fa-whatsapp"></span>
                                    </button>
                                  </a>
                                ) : (
                                  <a>
                                    <button disabled className="btn btn-success">
                                      <span className="fa fa-whatsapp"></span>
                                    </button>
                                  </a>
                                )}
                              </td>
                            ) : (
                              <td>
                                <div className="row g-3">
                                  <div className="col-md-12 d-flex justify-content-center">
                                    <button type="button" value={item.id} onClick={handleAccept} className="btn flex-fill btn-primary">
                                      Accept
                                    </button>
                                  </div>
                                  <div className="col-md-12 d-flex justify-content-center">
                                    <button type="button" value={item.id} onClick={handleReject} className="btn flex-fill btn-danger">
                                      Reject
                                    </button>
                                  </div>
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center">
                    <h5>You have no transaction</h5>
                  </div>
                )}
              </div>
              <div className="list-mobile">
                {product ? (
                  product.map((item) => (
                    <div key={item.id} className="card mb-3 rounded-4 mb-3">
                      <img src={item.Product.ProductImages[0].image} className="card-img rounded-5 p-3" alt="img" />
                      <div className="card-body">
                        <h3 className="card-title">{item.Product.nama}</h3>
                        <p className="text-product my-4">
                          Buyer: <span className="fw-light">{item.User.nama}</span>
                        </p>
                        <p className="text-product my-4">{item.status}</p>
                        <div className="row">
                          <div className="col-sm-12">
                            {item.status !== "Menunggu Konfirmasi" ? (
                              <div>
                                {item.status === "Diterima" ? (
                                  <a
                                    className="d-flex inline-block"
                                    target="_blank"
                                    href={`https://api.whatsapp.com/send?phone=+62${item.User.noHp.substring(1, item.User.noHp.length)}&text=Hai%20${item.User.nama},%0ASaya%20${
                                      item.Product.User.nama
                                    }%20penjual%20dari%20barang%20${item.Product.nama}.%0ASaya%20menyetujui%20tawaran%20anda%20dengan%20harga%20Rp.%20${item.harga}.`}
                                  >
                                    <button className="flex-fill btn btn-success">
                                      <span className="fa fa-whatsapp">&nbsp;Contact Buyer</span>
                                    </button>
                                  </a>
                                ) : (
                                  <a className="d-flex inline-block">
                                    <button disabled className="flex-fill btn btn-success">
                                      <span className="fa fa-whatsapp">&nbsp;Contact Buyer</span>
                                    </button>
                                  </a>
                                )}
                              </div>
                            ) : (
                              <div className="row g-3">
                                <div className="col-md-12 d-flex justify-content-center">
                                  <button type="button" value={item.id} onClick={handleAccept} className="btn flex-fill btn-primary">
                                    Accept
                                  </button>
                                </div>
                                <div className="col-md-12 d-flex justify-content-center">
                                  <button type="button" value={item.id} onClick={handleReject} className="btn flex-fill btn-danger">
                                    Reject
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h3 className="text-center">You have no transaction</h3>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
