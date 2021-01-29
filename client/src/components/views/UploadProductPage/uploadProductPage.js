import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import FileUpload from "../../utils/fileUpload";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" },
];

function UploadProductPage(props) {
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [priceValue, setPriceValue] = useState(0);
  const [continentValue, setContinentValue] = useState(1);

  const [Images, setImages] = useState([]);

  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    if (
      !titleValue ||
      !descriptionValue ||
      !priceValue ||
      !continentValue ||
      !Images
    ) {
      return alert("fill all the fields first!");
    }

    const variables = {
      writer: props.user.userData._id,
      title: titleValue,
      description: descriptionValue,
      price: priceValue,
      images: Images,
      continents: continentValue,
    };
    Axios.post("/api/product/uploadProduct", variables).then((response) => {
      if (response.data.success) {
        alert("Successfully uploaded");
        props.history.push("/");
      } else {
        alert("Failed to upload Product");
      }
    });
  };
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Travel Product</Title>
      </div>
      <Form onSubmit={onSubmit}>
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>Title</label>
        <Input
          onChange={(e) => setTitleValue(e.target.value)}
          value={titleValue}
        />
        <br />
        <br />
        <label>Description</label>
        <TextArea
          onChange={(e) => setDescriptionValue(e.target.value)}
          value={descriptionValue}
        />
        <br />
        <br />
        <label>Price($)</label>
        <Input
          onChange={(e) => setPriceValue(e.target.value)}
          value={descriptionValue}
          value={priceValue}
          type="number"
        />
        <select onChange={(e) => setContinentValue(e.target.value)}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
