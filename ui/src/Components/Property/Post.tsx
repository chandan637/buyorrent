import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import LoadingPage from "../Common/Loading";
import { createProperty } from "../../services/propertyService";

const PostPage = (): any => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
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
    try{
    const newPost = await createProperty(state);
    }finally{
    setLoading(false);
    }
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
      state.address.length
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
              <Form.File id="images" label="Example file input" multiple />
            </Form.Group>

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
            <Button
              block
              size="lg"
              type="submit"
              disabled={!validateForm()}
            >
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
