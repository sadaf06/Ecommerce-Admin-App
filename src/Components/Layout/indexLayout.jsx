import React from "react";
import { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchCat } from "../../Containers/Category/CategoryAction";
import Header from "../Header";
/**
 * @author
 * @function Layout
 **/

const Layout = (props) => {
  const [classNav, setClassNav] = useState(true);
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col>
              <div className={classNav ? "sidebar navbar" : "sidebar"}>
                <div
                  className={classNav ? "toggle navbar" : "toggle"}
                  onClick={() => setClassNav(!classNav)}
                >
                  <span
                    style={{
                      marginRight: "50%", fontWeight: "bolder", letterSpacing: "5px",
                    }} >
                    {classNav ? "Click ME" : null}
                  </span>
                </div>
                <ul>
                  <li>
                    <NavLink to="/" exact>
                      <i className="fas fa-home"></i>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/category">
                      <i className="fas fa-sitemap"></i>
                      Categrory
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/products">
                      <i className="fab fa-product-hunt"></i>
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/order">
                      <i className="fas fa-blender-phone"></i>
                      Orders
                    </NavLink>
                  </li>
                </ul>
              </div>
            </Col>

            <Col md="9" style={{ marginLeft: "auto", marginTop: "60px" }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        <Col md={12} style={{ marginLeft: "auto", marginTop: "60px" }}>
          {props.children}
        </Col>
      )}
    </>
  );
};

export default Layout;
