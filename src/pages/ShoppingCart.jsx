import React, { useEffect, useState } from "react";
import "../assets/css/shoppingcart.css";
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

export default function ShoppingCart() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const products = await axios.get("https://secondhand-backend-mac.herokuapp.com/historyBuyer", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const filter = products.data.data.filter((product) => product.status === "Menunggu Konfirmasi");
      setProducts(filter);
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
          <div className="container container-fluid mb-5">
            {products.length > 0 ? (
              <div className="table-responsive-sm">
                <table className="table table-borderless align-middle">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Image</th>
                      <th scope="col">Seller</th>
                      <th scope="col">Price</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product.id}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <img src={product.Product.ProductImages[0].image} className="img-fluid" alt="shoes" />
                        </td>
                        <td>
                          <h4>{product.Product.User.nama}</h4>
                        </td>
                        <td>
                          <h4>Rp. {product.harga}</h4>
                        </td>
                        <td>
                          <h4 className="status">{product.status}</h4>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="row">
                <div className="col-12">
                  <h4 className="catalog-title text-center">You haven't bid any product yet</h4>
                </div>
              </div>
            )}
          </div>
        </LayoutNavbarFooter>
      )}
    </>
  );
}
