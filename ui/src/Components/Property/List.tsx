import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Button, Card, CardColumns } from "react-bootstrap";
import LoadingPage from "../Common/Loading";

import { listProperty } from "../../services/propertyService";

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
          <Button
            onClick={() => history.push("/post-property")}
            style={{ float: "right" }}
          >
            Post Property
          </Button>
          <h6 className="border-bottom border-gray pb-2 mb-0">
            Recent Property
          </h6>

          <CardColumns>
            {(properties || []).map((property: any = {}) => (
              <Card style={{ width: "18rem" }}>
                <Card.Img src={property.images[0].path.replace('public','')}/>
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
          </CardColumns>
        </div>
      </Col>
      <Col md="2" />
    </Row>
  );
};

export default ListPage;
