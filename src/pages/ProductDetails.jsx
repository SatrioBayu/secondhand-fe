import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LayoutNavbarFooter from "../components/LayoutNavbarFooter";
import "../assets/css/ProductDetails.css";
import ModalBid from "../components/ModalBid";
import PropagateLoader from "react-spinners/PropagateLoader";
import axios from "axios";

const override = {
  display: "flex",
  margin: "0 auto",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh",
};

export default function ProductDetails() {
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(false);
  const [product, setProduct] = useState({});
  const [ownedProduct, setOwnedProduct] = useState(false);
  const [index, setIndex] = useState(0);
  const [completeAccount, setCompleteAccount] = useState(false);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://secondhand-backend-mac.herokuapp.com/product/${id}`);
      if (localStorage.getItem("token")) {
        const user = await axios.get(`https://secondhand-backend-mac.herokuapp.com/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (user.data.data.alamat && user.data.data.noHp && user.data.data.kota && user.data.data.image) {
          setCompleteAccount(true);
        }
        if (res.data.data.userId == user.data.data.id) {
          setOwnedProduct(true);
        }
      } else {
        setOwnedProduct(true);
      }
      setProduct(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    const localStorageWishlist = localStorage.getItem("wishlist");
    if (localStorageWishlist) {
      const wishlistData = JSON.parse(localStorageWishlist);
      const alreadyWishlist = wishlistData.find((item) => item.id == id);
      if (alreadyWishlist) {
        setWishlist(true);
      }
    }
  }, []);

  const onClickWishlist = () => {
    const localStorageWishlist = localStorage.getItem("wishlist");
    const wishlistData = JSON.parse(localStorageWishlist);
    const data = {
      id: product.id,
      name: product.nama,
    };
    if (wishlistData) {
      if (wishlist == true) {
        const newWishlist = wishlistData.filter((item) => item.id !== data.id);
        localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      } else {
        wishlistData.push(data);
        localStorage.setItem("wishlist", JSON.stringify(wishlistData));
      }
    } else {
      localStorage.setItem("wishlist", JSON.stringify([data]));
    }
    setWishlist(!wishlist);
  };
  return (
    <>
      {loading ? (
        <PropagateLoader cssOverride={override} size={50} color={"#FF7158"} loading={loading} />
      ) : (
        <LayoutNavbarFooter>
          <ModalBid data={product} />
          <div className="container container-fluid">
            {/* Product Thumbnails */}
            <div className="row mb-5">
              <div className="col d-flex justify-content-center">
                <img className="thumbnail-active" src={product.ProductImages[index].image} alt="gambar" />
              </div>
            </div>
            <hr />
            <div className="row mt-5">
              {product.ProductImages.map((item, index) => (
                <div key={item.id} className="col-3">
                  <img className="thumbnail" onClick={(e) => setIndex(index)} src={product.ProductImages[index].image} alt="Gambar" />
                </div>
              ))}
            </div>

            {/* Product Title */}
            <div className="row mt-5">
              <div className="col">
                <a className="text-muted" href={`/catalog?category=${product.Categories[0].nama}`}>
                  #{product.Categories[0].nama}
                </a>
                <h1 className="product-title">{product.nama}</h1>
                <h5 className="product-price">Rp. {product.harga}</h5>
              </div>
              <div className="col my-3">
                <div className="text-end">
                  {ownedProduct ? (
                    <button type="button" disabled className="bid btn btn-success">
                      Bid
                    </button>
                  ) : (
                    <div>
                      {completeAccount ? (
                        <button type="button" className="bid btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                          Bid
                        </button>
                      ) : (
                        <button type="button" disabled className="bid btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                          Bid
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div className="mt-4 text-end">
                  {wishlist ? (
                    <button type="button" onClick={onClickWishlist} className="wishlist btn btn-outline-danger">
                      <i className="bx bx-check-double"></i> Wishlist
                    </button>
                  ) : (
                    <button type="button" onClick={onClickWishlist} className="wishlist btn btn-outline-danger">
                      <i className="bx bx-add-to-queue"></i> Wishlist
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="row mb-4">
              <div className="col-md-8">
                <p>{product.deskripsi}</p>
              </div>
            </div>
          </div>
        </LayoutNavbarFooter>
      )}
    </>
  );
}
