import React, { useState, useEffect } from "react";
import Banner from "../assets/images/Banner.png";
import Jordan from "../assets/images/AirJordan.jpg";
import CatGadgets from "../assets/images/CatGadgets.png";
import CatFurniture from "../assets/images/CatFurniture.png";
import CatSneakers from "../assets/images/CatSneakers.png";
import CatTools from "../assets/images/CatTools.png";
import CatGaming from "../assets/images/CatGaming.png";
import CatHealth from "../assets/images/CatHealth.png";
import CatFashion from "../assets/images/CatFashion.png";
import CatHobby from "../assets/images/CatHobby.png";
import { NavLink } from "react-router-dom";
import Card from "../components/Card";
import "../assets/css/Home.css";
import "../assets/css/Card.css";
import LayoutNavbarFooter from "../components/LayoutNavbarFooter";
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

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://secondhand-backend-mac.herokuapp.com/products");
      setProducts(res.data.data);
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
            {/* Carousel */}
            <div id="carouselExampleInterval" className="carousel slide carousel-dark" data-bs-ride="carousel">
              <div className="carousel-inner">
                {products ? (
                  <div>
                    <div className="carousel-item active" data-bs-interval="2000">
                      <img src={products[3].ProductImages[0].image} className="w-100 imgCarousel" alt="img" />
                    </div>
                    <div className="carousel-item">
                      <img src={products[1].ProductImages[0].image} className="w-100 imgCarousel" alt="img" />
                    </div>
                    <div className="carousel-item">
                      <img src={products[4].ProductImages[0].image} className="w-100 imgCarousel" alt="img" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="carousel-item active" data-bs-interval="2000">
                      <img src={Banner} className="d-block w-100 imgCarousel" alt="img" />
                    </div>
                    <div className="carousel-item">
                      <img src={Jordan} className="d-block w-100 imgCarousel" alt="img" />
                    </div>
                  </div>
                )}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            {/* Card */}
            <div className="mt-5 mb-3">
              <h4>Trend Categories</h4>
            </div>
            <div className="d-flex flex-row flex-wrap justify-content-around">
              <NavLink to="/catalog?category=Gadgets">
                <button className="buttonCategories">
                  <div className="cardStyle">
                    <img src={CatGadgets} className="card-img-top" alt="..." />
                  </div>
                </button>
              </NavLink>
              <NavLink to="/catalog?category=Furniture">
                <button className="buttonCategories">
                  <div className="cardStyle">
                    <img src={CatFurniture} className="card-img-top" alt="..." />
                  </div>
                </button>
              </NavLink>
              <NavLink to="/catalog?category=Gaming">
                <button className="buttonCategories">
                  <div className="cardStyle">
                    <img src={CatGaming} className="card-img-top" alt="..." />
                  </div>
                </button>
              </NavLink>
              <NavLink to="/catalog?category=Sneakers">
                <button className="buttonCategories">
                  <div className="cardStyle">
                    <img src={CatSneakers} className="card-img-top" alt="..." />
                  </div>
                </button>
              </NavLink>
              <NavLink to="/catalog?category=Tools">
                <button className="buttonCategories">
                  <div className="cardStyle">
                    <img src={CatTools} className="card-img-top" alt="..." />
                  </div>
                </button>
              </NavLink>
              <NavLink to="/catalog?category=Fashion">
                <button className="buttonCategories">
                  <div className="cardStyle">
                    <img src={CatFashion} className="card-img-top" alt="..." />
                  </div>
                </button>
              </NavLink>
              <NavLink to="/catalog?category=Hobby">
                <button className="buttonCategories">
                  <div className="cardStyle">
                    <img src={CatHobby} className="card-img-top" alt="..." />
                  </div>
                </button>
              </NavLink>
              <NavLink to="/catalog?category=Health and Beauty">
                <button className="buttonCategories">
                  <div className="cardStyle">
                    <img src={CatHealth} className="card-img-top" alt="..." />
                  </div>
                </button>
              </NavLink>
            </div>

            {/* New Products */}
            <div className="home-title mt-5 mb-4">
              <h4>New Products</h4>
            </div>
            {products ? (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3 mt-2">
                {products.map((product) => (
                  <NavLink key={product.id} to={`/productDetails/${product.id}`}>
                    <Card data={product} />
                  </NavLink>
                ))}
              </div>
            ) : (
              <h3 className="text-center catalog-title">No Products</h3>
            )}
          </div>
        </LayoutNavbarFooter>
      )}
    </>
  );
}
