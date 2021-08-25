import { React, useEffect, useState } from "react";
import { Col, Container, Row, Modal, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Components/Layout/indexLayout";
import UI from "../../Components/Layout/Ui";
import { addProduct, fetchProduct } from "./productAction";
import "./product.css"
import { url } from "../../urlConf";
/**
 * @author
 * @function Products
 **/

const Products = (props) => {
  const FetchedCategory = useSelector((state) => state.CategoryFectch);
  const FetchedProduct = useSelector((state) => state.ProductAdd);
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false)
  const [selectProductDetails, setSelectProductDetails] = useState(null)
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [productImage, setProductImage] = useState([]);
  const PictureArray = (e) => {
    setProductImage([
      ...productImage,
      e.target.files[0]
    ]
    )
  }
  const handleClose = () => setShow(false);
  const productDetailClose = () => setShowDetails(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => {
    let form = new FormData();
    form.append('name', name);
    form.append('price', price);
    form.append('quantity', quantity);
    form.append('description', description);
    form.append('category', category);
    for (let image of productImage) {
      form.append("productImage", image);
    }
    dispatch(addProduct(form))
    setName("");
    setPrice("");
    setQuantity("");
    setDescription("");
    setCategory("");
    setProductImage([]);
    setShow(false)
  };
  useEffect(() => {
    dispatch(fetchProduct());
  }, [FetchedProduct.AddedSucces])
  const ForNewCategory = (categories) => {
    let options = [];
    for (let category of categories) {
      options.push(
        <option key={category.name} value={category._id}>
          {category.name}
        </option>,
        category.childrens.length > 0
          ? ForNewCategory(category.childrens)
          : null
      );
    }
    return options;
  };
  const renderDetails = (selectprod) => {
    if (selectprod !== null) {
      return (
        <>
          <Row>
            <Col md="6">
              <h5>name</h5>
              <p>{selectprod.name}</p>
              <hr></hr>
            </Col>
            <Col md="6">
              <h5>Price</h5>
              <p>{selectprod.price}</p>
              <hr></hr>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <h5>Quantity</h5>
              <p>{selectprod.quantity}</p>
              <hr></hr>
            </Col>
            <Col md="6">
              <h5>Category</h5>
              <p>{selectprod.category.name}</p>
              <hr></hr>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <h5>Description</h5>
              <p>{selectprod.description}</p>
              <hr></hr>
            </Col>
          </Row>
          <h5>Pictures</h5>
          <Row>
            <Col style={{ display: "flex" }}>
              {selectprod.productImage.length > 0 ? selectprod.productImage.map(image =>
                <div className="image">
                  <img src={`${url}/public/${image.image}`} />
                </div>
              ) : null}
            </Col>
          </Row>
        </>
      )
    }
  }

  const tablebody = (FetchedProd) => {
    // console.log(FetchedProd)
    return (
      <Table responsive="md" style={{ border: "1px solid white", color: "white" }}>
        <thead>
          <tr>
            <th>S.NO</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {FetchedProd.length > 0 ? FetchedProd.map((prod, index) =>
            <tr key={prod._id} style={{ cursor: "pointer" }} onClick={() => {
              setSelectProductDetails(prod)
              setShowDetails(true);
            }} className="tableBody">
              <td key={index + 1} >{index + 1}</td>
              <td key={prod.name}>{prod.name}</td>
              <td key={prod.price}>{prod.price}</td>
              <td key={prod.quantity}>{prod.quantity}</td>
              <td key={prod.category.name}>{prod.category.name}</td>
            </tr>
          ) : null}
        </tbody>
      </Table>)
  }

  return (
    <>
      <Layout sidebar>
        <Row>
          <Col md="12">
            <div style={{ display: "flex", justifyContent: "space-between", }}>
              <h1>Products</h1>
              <button style={{ width: "100px", height: "40px", background: "blue", color: "white", }}
                onClick={handleShow}>
                Add
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <div>
              {tablebody(FetchedProduct.Product)}
            </div>
          </Col>
        </Row>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UI label="Product Name" type="text" holder={"Product Name"} value={name}
              onChange={(e) => setName(e.target.value)}></UI>
            <UI label="Price" type="text" holder={"Price"} value={price}
              onChange={(e) => { setPrice(e.target.value) }}></UI>
            <UI label="Quantity" type="text" holder={"Quantity"} value={quantity}
              onChange={(e) => { setQuantity(e.target.value) }}></UI>
            <UI label="Desription" type="text" holder={"Desription"} value={description}
              onChange={(e) => { setDescription(e.target.value) }}></UI>
            <select
              className="form-control"
              onChange={(e) => { setCategory(e.target.value) }}>
              <option>Select Category</option>
              {ForNewCategory(FetchedCategory.category)}
            </select>
            {productImage.length > 0 ? productImage.map((image, index) => <div key={index}>{index + 1}: {image.name}</div>) : null}
            <UI type="file" holder={"Choose image"}
              onChange={PictureArray}></UI>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose1}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showDetails} onHide={productDetailClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Product Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {renderDetails(selectProductDetails)}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={productDetailClose}>
              Close
            </Button>
            <Button variant="primary" onClick={productDetailClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Layout>
    </>
  );
};

export default Products;
