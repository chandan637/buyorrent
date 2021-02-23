import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import LoadingPage from "../Common/Loading";
import { getProperty } from "../../services/propertyService";
import { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";

const DetailPage = (props: any): any => {
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState<any>({});
  // title: "",
  // type: "",
  // sqArea: 0,
  // description: "",
  // images: [],
  // price: 0,
  // priceCycle: "", // monthly for rent
  // contactNo: "",
  // isBuyable: false,
  // isRentable: false,
  // purpose: "",
  // city: "",
  // address: "",

  const fetchProperty = async () => {
    const id = props?.match?.params?.id;
    const propObj = await getProperty(id);
    setProperty(propObj.data.data);
  };

  const history = useHistory();

  useEffect(() => {
    fetchProperty();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Row className="justify-content-md-center">
      <Col md="3" />
      <Col md="6">
        <Card className="text-center">
          <Card.Header>Property Details</Card.Header>
          <Card.Body>
            <Card.Title> {property.title}</Card.Title>
            <Card.Text>Images comes here: (not implemented)</Card.Text>
            <Card.Text className='text-center'>
              <Row>
                <Col md="6">Address: {property.address}</Col>
                <Col md="6">Sq Area: {property.sqArea} </Col>
                <Col md="6">Contact No: {property.contactNo} </Col>
                <Col md="6">Price: {property.price} </Col>
                <Col md="6">Type: {property.type} </Col>
              </Row>
            </Card.Text>

            <Card.Text>{property.description}</Card.Text>
            <Button variant="primary" onClick={()=>{}}>
              {property.purpose === "rent" ? "Rent" : "Buy"} Property
            </Button>

            <Button variant="secondary" onClick={()=> history.push('/property-list')}>
              go back to list
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">
            posted on {new Date(property.createdAt).toDateString()}
          </Card.Footer>
        </Card>
      </Col>
      <Col md="3" />
    </Row>
  );
};

export default DetailPage;
