import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../Components/Layout/indexLayout";

/**
 * @author
 * @function Order
 **/

const Order = (props) => {
  return (
    <>
      <Layout sidebar>
        <Row>
          <Col md="12" style={{ marginLeft: "auto" }}>
            <h1>Orders</h1>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default Order;
