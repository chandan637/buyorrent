import React, { useEffect, useState } from "react";
// import { useUser } from "../Common/UserContext";
// import { useToken } from "../Common/TokenContext";
import useDataApi from "../Common/useDataApi";
import { useHistory } from "react-router-dom";
import { Row, Col, Button, Card, CardGroup } from "react-bootstrap";
import LoadingPage from "../Common/Loading";

import { listProperty } from "../../services/propertyService";

interface Property {
  title: string;
  sqArea: number;
  description: string;
  images: { url: string; name: string }[];
  price: number;
  priceCycle: string;
  contactNo: string;
  isBuyable: boolean;
  isRentable: boolean;
  soldOn: number; // epoc date
  purchasedBy: string; //
  createdBy: string;
  createdAt: number; // epoc date
  city: String;
  address: String;
}

const ListPage = (): any => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getProperty = async () => {
    const propList = await listProperty();

    setProperties(propList.data.data);
    setLoading(false);
  };

  const history = useHistory();

  useEffect(() => {
    getProperty();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <Row className="justify-content-md-center">
      <Col md="2" />
      <Col md="8">
        <div className="my-3 p-3 bg-white rounded shadow-sm">
        <Button onClick={()=> history.push('/post-property')} style={{float: 'right'}}>Post Property</Button>
          <h6 className="border-bottom border-gray pb-2 mb-0">
            Recent Property
          </h6>
          
          <CardGroup>
            {(properties || []).map((property: any = {}) => (
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="prop-tile.svg" />
                <Card.Body>
                  <Card.Title>{property.title}</Card.Title>
                  <Card.Text>{property.description}</Card.Text>
                  <small className="text-muted">
                    posted on {new Date(property.createdAt).toDateString()}
                  </small>

                  <Card.Footer>
                    <Button
                      variant="primary"
                      style={{ width: "100%", opacity: 1 }}
                      onClick={() => history.push(`/property/${property._id}`)}
                    >
                      View details
                    </Button>
                  </Card.Footer>
                </Card.Body>
              </Card>
            ))}
          </CardGroup>
        </div>
      </Col>
      <Col md="2" />
    </Row>
  );
};

export default ListPage;
