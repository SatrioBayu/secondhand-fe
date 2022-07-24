import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/Catalog.css";
import Card from "../components/Card";
import LayoutNavbarFooter from "../components/LayoutNavbarFooter";
import { NavLink } from "react-router-dom";

import PropagateLoader from "react-spinners/PropagateLoader";
const override = {
  display: "flex",
  margin: "0 auto",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh",
};
export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const category = new URLSearchParams(window.location.search).get("category");
  const search = new URLSearchParams(window.location.search).get("search");

  const fetchData = async () => {
    try {
      if (category) {
        const products = await axios.get(`https://secondhand-backend-mac.herokuapp.com/products?category=${category}`);
        if (products.data) {
          setProducts(products.data.data);
        }
      }
      if (search) {
        const products = await axios.get(`https://secondhand-backend-mac.herokuapp.com/products?search=${search}`);
        if (products.data) {
          setProducts(products.data.data);
        }
      }
      if (!category && !search) {
        const products = await axios.get(`https://secondhand-backend-mac.herokuapp.com/products`);
        setProducts(products.data.data);
      }
      const categories = await axios.get("https://secondhand-backend-mac.herokuapp.com/categories");
      setCategories(categories.data.data);
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
        <LayoutNavbarFooter>
          <div className="container">
            {/* for desktop or tablet layout */}
            <div className="row catalog-horizontal">
              <div className="col-9">
                <h2 className="catalog-title">{category || search || `Catalog`}</h2>
              </div>
              <div className="col-4 pt-2">
                <br />
                <div className="catalog-nav">
                  <h5 className="catalog-nav-title">Categories</h5>
                  <br />
                  <div className="catalog-nav-link">
                    <NavLink to="/catalog" className="catalog-link d-flex justify-content-between">
                      All Categories<i className="bx bx-chevron-right"></i>
                    </NavLink>
                    <ul>
                      {categories.map((category) => (
                        <a href={`/catalog?category=${category.nama}`} key={category.id} className="my-2 catalog-link d-flex justify-content-between">
                          {category.nama}
                          <i className="bx bx-chevron-right"></i>
                        </a>
                      ))}
                    </ul>
                  </div>
                  <hr />
                </div>
              </div>
              <div className="col-8">
                {products.length > 0 ? (
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-2 mb-5">
                    {products.map((product) => (
                      <NavLink key={product.id} to={`/productDetails/${product.id}`}>
                        <Card data={product} />
                      </NavLink>
                    ))}
                  </div>
                ) : (
                  <h3 className="catalog-title text-center">No Product Found</h3>
                )}
              </div>
            </div>

            {/* for Phone Layout */}
            <div className="catalog-vertical row row-cols-1 row-cols-md-4 g-1 mt-4">
              <div className="col mb-4">
                <h2 className="catalog-title">{category || search || "Catalog"}</h2>
              </div>
              <div className="catalog-nav">
                <h5 className="catalog-nav-title">Categories</h5>
                <br />
                <div className="catalog-nav-link">
                  <NavLink to="/catalog" className="catalog-link d-flex justify-content-between">
                    All Categories<i className="bx bx-chevron-right"></i>
                  </NavLink>
                  <ul>
                    {categories.map((category) => (
                      <a href={`/catalog?category=${category.nama}`} key={category.id} className="my-2 catalog-link d-flex justify-content-between">
                        {category.nama}
                        <i className="bx bx-chevron-right"></i>
                      </a>
                    ))}
                  </ul>
                </div>
                <hr />
              </div>
              {products.length > 0 ? (
                <div className="row-vertical row row-cols-sm-2 row-cols-1 g-2 mt-2">
                  {products.map((product) => (
                    <NavLink key={product.id} to={`/productDetails/${product.id}`}>
                      <Card data={product} />
                    </NavLink>
                  ))}
                </div>
              ) : (
                <h3 className="catalog-title text-center">No Product Found</h3>
              )}
            </div>
          </div>
        </LayoutNavbarFooter>
      )}
    </>
  );
}
