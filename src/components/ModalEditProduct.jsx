import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditProduct(props) {
  const [nama, setNama] = useState(props.data.nama);
  const [harga, setHarga] = useState(props.data.harga);
  const [deskripsi, setDeskripsi] = useState(props.data.deskripsi);
  const [imagesPreview, setImagesPreview] = useState(props.data.ProductImages);
  const [images, setImages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(true);
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("harga", harga);
    formData.append("deskripsi", deskripsi);
    if (images.length > 0) {
      for (let image of images) {
        formData.append("product_images", image);
      }
    }
    try {
      const res = await axios.put(`https://secondhand-backend-mac.herokuapp.com/product/${props.data.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      location.reload();
    } catch (error) {
      console.log(error);
    }
    setIsEditing(false);
  };

  const onClose = (e) => {
    setImagesPreview(props.data.ProductImages);
    setNama(props.data.nama);
    setHarga(props.data.harga);
    setDeskripsi(props.data.deskripsi);
    setImages([]);
  };

  const onUploadImages = (e) => {
    let images = [];
    setImages(e.target.files);
    for (const file of e.target.files) {
      images.push({
        image: URL.createObjectURL(file),
      });
    }
    setImagesPreview(images);
  };

  return (
    <div className="modal fade" id={`edit${props.data.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Edit Product
            </h5>
            <button onClick={onClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body m-3">
            <div className="d-flex justify-content-center">
              <form onSubmit={handleSubmit}>
                <div>
                  <h5>Product Name</h5>
                  <input className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} name="nama" type="text" placeholder="Papel la casa" />
                </div>
                <div>
                  <h5>Price</h5>
                  <input className="form-control" value={harga} onChange={(e) => setHarga(e.target.value)} name="harga" type="text" placeholder="$100" />
                </div>
                <div className="mt-3">
                  <h5>Description</h5>
                  <textarea className="form-control" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} name="deskripsi" type="text" placeholder="lorem ipsum" />
                </div>
                <div className="custom-file mt-3">
                  <h5>Thumbnail</h5>
                  {imagesPreview && imagesPreview.map((item, index) => <img key={index} src={item.image} className="img-thumbnail" alt="thumbnail" />)}
                  <input type="file" onChange={onUploadImages} name="product_images" multiple className="form-control" id="customFile" />
                </div>
                <div className="text-center mt-3">
                  {isEditing ? (
                    <button disabled type="submit" className="bid btn btn-success">
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Saving...
                    </button>
                  ) : (
                    <button type="submit" className="bid btn btn-success">
                      Save
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
