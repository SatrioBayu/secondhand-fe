import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/Wishlist.css";
import Card from "../components/Card";
import LayoutNavbarFooter from "../components/LayoutNavbarFooter";
import PropagateLoader from "react-spinners/PropagateLoader";

const override = {
  display: "flex",
  margin: "0 auto",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh",
};

export default function Wishlist() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const wishlist = JSON.parse(localStorage.getItem("wishlist"));

  const fetchData = async () => {
    // try {
    const productArray = [];
    for (let i = 0; i < wishlist.length; i++) {
      try {
        const product = await axios.get(`https://secondhand-backend-mac.herokuapp.com/product/${wishlist[i].id}`);
        productArray.push(product.data.data);
      } catch (error) {
        const newWishlist = wishlist.filter((item) => item.id !== wishlist[i].id);
        localStorage.setItem("wishlist", JSON.stringify(newWishlist));
        continue;
      }
    }
    setProducts(productArray);
    setLoading(false);
  };

  useEffect(() => {
    if (wishlist) {
      fetchData();
    }
  }, []);

  return (
    <>
      {loading ? (
        <PropagateLoader cssOverride={override} size={50} color={"#FF7158"} loading={loading} />
      ) : (
        <LayoutNavbarFooter>
          <div className="container">
            {/* for desktop or tablet layout */}
            <div className="row catalog-horizontal">
              <div className="col-9">
                <h2 className="catalog-title">Wishlist</h2>
              </div>
              <div className="col-4 pt-2">
                <br />
                <div className="catalog-nav">
                  <h5 className="catalog-nav-title">Categories</h5>
                  <br />
                  <div className="catalog-nav-link d-flex justify-content-between">
                    <a href="/wishlist" className="catalog-link">
                      Wishlist
                    </a>
                    <i className="bx bx-chevron-right p-1"></i>
                  </div>
                  <hr />
                </div>
              </div>
              <div className="col-8">
                {products.length > 0 ? (
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-2 mb-5">
                    {products.map((product) => (
                      <a key={product.id} href={`/productdetails/${product.id}`}>
                        <Card data={product} />
                      </a>
                    ))}
                  </div>
                ) : (
                  <h3 className="catalog-title text-center">No product in wishlist</h3>
                )}
              </div>
            </div>

            {/* for Phone Layout */}
            <div className="catalog-vertical row">
              <div className="col mb-4">
                <h2 className="catalog-title text-center">Wishlist</h2>
              </div>
              {products.length > 0 ? (
                <div className="row-vertical row row-cols-2 row-cols-md-4 g-3 mt-2">
                  {products.map((product) => (
                    <a key={product.id} href={`/productdetails/${product.id}`}>
                      <Card data={product} />
                    </a>
                  ))}
                </div>
              ) : (
                <h3 className="catalog-title text-center">No product in wishlist</h3>
              )}
            </div>
          </div>
        </LayoutNavbarFooter>
      )}
    </>
  );
}
