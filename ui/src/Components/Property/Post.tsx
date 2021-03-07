import React, { useState } from "react";
import { Row, Col, Button, Form, Image } from "react-bootstrap";
import LoadingPage from "../Common/Loading";
import { createProperty } from "../../services/propertyService";
import { getKeyValue } from "../../utils/appUtils";
import { useHistory } from "react-router-dom";

interface IProperty {
  title: string;
  type: string;
  sqArea: number;
  description: string;
  images: File[];
  price: number;
  priceCycle: string;
  contactNo: string;
  isBuyable: boolean;
  isRentable: boolean;
  purpose: string;
  city: string;
  address: string;
}

const createFormData = (state: IProperty) => {
  return Object.keys(state).reduce((res: any, key: any) => {
    const value = getKeyValue(state, key);
    if (key === "images") {
      value.forEach((file: File, index: number) => {
        res.append(`images`, file);
      });
    } else {
      res.append(key, value);
    }
    return res;
  }, new FormData());
};

const PostPage = (): any => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<IProperty>({
    title: "",
    type: "residential",
    sqArea: 0,
    description: "",
    images: [],
    price: 0,
    priceCycle: "onetime", // monthly for rent
    contactNo: "",
    isBuyable: false,
    isRentable: false,
    purpose: "buy",
    city: "",
    address: "",
  });

  const history = useHistory();

  if (loading) {
    return <LoadingPage />;
  }

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formdata = createFormData(state);
      await createProperty(formdata);
      return history.push('/list-property');
    } finally {
      setLoading(false);
    }
  };

  const addFile = (e: any) => {
    const images = [...state.images, ...e.target.files];
    setState((prevState) => ({
      ...prevState,
      images,
    }));
  };

  const removeFile = (index: number) => {
    setState((prevState) => ({
      ...prevState,
      images: state.images.filter((img, imgIndex) => imgIndex !== index),
    }));
  };

  const validateForm = () => {
    return (
      state.title.length &&
      state.type.length &&
      state.sqArea &&
      state.price &&
      state.priceCycle.length &&
      state.contactNo.length &&
      state.purpose.length &&
      state.address.length &&
      state.images.length
    );
  };

  return (
    <Row className="justify-content-md-center">
      <Col md="12" className="text-center">
        <h3>Post Property</h3>
      </Col>
      <Col md="3" />
      <Col md="6">
        <div className="Login">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={state.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Property Type</Form.Label>
              <Form.Control as="select" onChange={handleChange}>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="purpose">
              <Form.Label>purpose</Form.Label>
              <Form.Control as="select" onChange={handleChange}>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="images">
              <Form.Label>Images</Form.Label>
              <Form.File
                // ref={fileUploadRef}
                id="images"
                label="Example file input"
                multiple
                onChange={addFile}
                accept="image/gif, image/jpeg, image/png"
              />
            </Form.Group>
            {state.images.length > 0 && (
              <Row>
                {state.images.map((imgObj, index) => (
                  <Col xs={6} md={3}>
                    <Image src={URL.createObjectURL(imgObj)} thumbnail />
                    <Button variant="link" onClick={() => removeFile(index)}>
                      Remove
                    </Button>
                  </Col>
                ))}
              </Row>
            )}

            <Form.Group controlId="sqArea">
              <Form.Label>Sq. Area</Form.Label>
              <Form.Control
                type="number"
                value={state.sqArea}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>
                {state.purpose === "rent" ? "Rent (Monthly)" : "Price"}
              </Form.Label>
              <Form.Control
                type="number"
                value={state.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="contactNo">
              <Form.Label>Contact No:</Form.Label>
              <Form.Control
                type="text"
                value={state.contactNo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="text"
                value={state.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={state.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!validateForm()}>
              Post Property
            </Button>
          </Form>
        </div>
      </Col>
      <Col md="3" />
    </Row>
  );
};

export default PostPage;
