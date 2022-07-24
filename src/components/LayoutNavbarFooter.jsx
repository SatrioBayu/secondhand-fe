import React, { useState, useEffect } from "react";
import DefaultPic from "../assets/images/user_pc.png";
import Navbar from "./Navbar";
import Footer from "./Footer";
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

export default function LayoutNavbarFooter({ children }) {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false);
  const [nama, setNama] = useState("");
  const [image, setImage] = useState("");
  const [notifBuyer, setNotifBuyer] = useState([]);
  const [notifSeller, setNotifSeller] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchDataUser = async () => {
    try {
      const user = await axios.get(`https://secondhand-backend-mac.herokuapp.com/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const notifikasiBuyer = await axios.get("https://secondhand-backend-mac.herokuapp.com/notifikasiBuyer", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const notifikasiSeller = await axios.get("https://secondhand-backend-mac.herokuapp.com/notifikasiSeller", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const shortName = user.data.data.nama.split(" ");
      const shortest = shortName.sort((a, b) => a.length - b.length);
      setNama(shortest[0]);
      setImage(user.data.data.image || DefaultPic);
      setNotifSeller(notifikasiSeller.data.data);
      setNotifBuyer(notifikasiBuyer.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const data = await axios.get("https://secondhand-backend-mac.herokuapp.com/categories");
      setCategories(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    if (isLoggedIn) {
      fetchDataUser();
    } else {
      setLoading(false);
    }
  }, []);

  const handlelogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <>
      {loading ? (
        <PropagateLoader cssOverride={override} size={50} color={"#FF7158"} loading={loading} />
      ) : (
        <div className="content">
          <Navbar nama={nama} image={image} categories={categories} notifSeller={notifSeller} notifBuyer={notifBuyer} isLoggedIn={isLoggedIn} onLogout={handlelogout} />
          <div className="my-2">{children}</div>
          <Footer />
        </div>
      )}
    </>
  );
}
