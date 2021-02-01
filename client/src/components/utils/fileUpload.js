import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import Axios from "axios";

function FileUpload({ refreshFunction }) {
  const [Images, setImages] = useState([]);

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    Axios.post("/api/product/uploadImage", formData, config).then(
      (response) => {
        if (response.data.success) {
          setImages([...Images, response.data.image]);
          refreshFunction([...Images, response.data.image]);
        } else {
          alert("Failed to save the Image in Server");
        }
      }
    );
  };
  const onDelete = (image) => {
    const currentIndex = Images.indexOf(image);
    const newImages = [...Images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    refreshFunction(newImages);
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              display: "flex",
              width: "300px",
              height: "240px",
              border: "1px solid lightgray",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>

      <div
        style={{
          height: "240px",
          width: "350px",
          display: "flex",
          overflowX: "scroll",
          overflowY: "hidden",
        }}
      >
        {Images.map((image, index) => (
          <div onClick={onDelete}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:5000/${image}`}
              alt={`productImg-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
