import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [category, setCategory] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [choice, setChoice] = useState(1);

  const onClose = () => {
    setNama("");
    setHarga("");
    setDeskripsi("");
    setError("");
    setImagesPreview([]);
    setImages([]);
    document.getElementById("customFile").value = "";
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    const formData = new FormData();
    e.preventDefault();
    formData.append("nama", nama);
    formData.append("harga", harga);
    formData.append("deskripsi", deskripsi);
    formData.append("idCategory", choice);
    if (images.length > 0) {
      for (let image of images) {
        formData.append("product_images", image);
      }
    }
    if (images.length > 4) {
      setError("You can only upload 4 images");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post("https://secondhand-backend-mac.herokuapp.com/products", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      location.reload();
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };

  const onUploadImages = (e) => {
    let images = [];
    setImages(e.target.files);
    for (const file of e.target.files) {
      images.push(URL.createObjectURL(file));
    }
    setImagesPreview(images);
  };

  useEffect(() => {
    axios
      .get("https://secondhand-backend-mac.herokuapp.com/categories")
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Create New Product
            </h5>
            <button onClick={onClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body m-3">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="d-flex justify-content-center">
              <form onSubmit={handleSubmit}>
                <div>
                  <h5>Product Name</h5>
                  <input required className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} name="nama" type="text" placeholder="Papel la casa" />
                </div>
                <div>
                  <h5>Price</h5>
                  <input required className="form-control" value={harga} onChange={(e) => setHarga(e.target.value)} name="harga" type="text" placeholder="Rp. 100" />
                </div>
                <div className="mt-3">
                  <h5>Category</h5>
                  <select
                    className="form-select"
                    onBlur={(e) => (e.target.size = 1)}
                    onFocus={(e) => (e.target.size = 8)}
                    value={choice}
                    onChange={(e) => (setChoice(e.target.value), (e.target.size = 1), e.target.blur())}
                    type="text"
                    placeholder="Shipping"
                  >
                    {category.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.nama}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-3">
                  <h5>Description</h5>
                  <textarea required className="form-control" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} name="deskripsi" type="text" placeholder="lorem ipsum" />
                </div>
                <div className="custom-file mt-3">
                  <h5>
                    Thumbnail <span className="fs-6 fw-bold">(max. 4 photos)</span>
                  </h5>
                  {imagesPreview && imagesPreview.map((item, index) => <img key={index} src={item} className="img-thumbnail" alt="thumbnail" />)}
                  <input required type="file" onChange={onUploadImages} name="product_images" multiple className="form-control" id="customFile" />
                </div>
                <div className="text-center mt-3">
                  {loading ? (
                    <button disabled type="submit" className="bid btn btn-success">
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Creating...
                    </button>
                  ) : (
                    <button type="submit" className="bid btn btn-success">
                      Create Product
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
