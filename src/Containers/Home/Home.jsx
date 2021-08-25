import React from "react";
import Layout from "../../Components/Layout/indexLayout";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";
import "./homeStyle.css";

/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  return (
    <div>
      <Layout sidebar>
        <Row>
          <Col md="12" style={{ marginLeft: "auto" }}>
            <h1>Home</h1>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default Home;
