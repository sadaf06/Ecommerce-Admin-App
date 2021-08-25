import { React, useEffect, useState } from "react";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Components/Layout/indexLayout";
import UI from "../../Components/Layout/Ui";
import { addCategory, deleteCategory, fetchCat, updateAction } from "./CategoryAction";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import Modle from '../../Components/Modal';
import "./category.css"
/**
 * @author
 * @function Categrory
 **/

const Category = (props) => {
  const FetchedCategory = useSelector((state) => state.CategoryFectch);
  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [idFordelete, setIdFordelete] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [parentId, setParantid] = useState("");
  const [Newchecked, setChecked] = useState([]);
  const [Newexpanded, setExpanded] = useState([]);
  const [CheckedFullDetails, setCheckedFullDetails] = useState([]);
  const [ExpandedFullDetails, setExpandedFullDetails] = useState([]);
  const [productImage, setProductImage] = useState([]);
  const [showForEdit, setShowForEdit] = useState(false);
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const PictureArray = (e) => {
    setProductImage([
      ...productImage,
      e.target.files[0]
    ]
    )
  }
  const handleClose = () => setShow(false);
  const handleClose1 = () => {
    let form = new FormData();
    form.append('name', newCategory);
    form.append('parentId', parentId);
    form.append('type', type)
    for (let image of productImage) {
      form.append("categoryImage", image);
    }
    dispatch(addCategory(form));
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const CategoryFetch = (categories) => {
    let CatforLiTag = [];
    for (let category of categories) {
      CatforLiTag.push({
        value: category._id,
        label: category.name,
        children:
          category.childrens.length > 0 && CategoryFetch(category.childrens),
      });
    }
    return CatforLiTag;
  };
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
  const linearListOfCat = (categories, list = []) => {
    categories.forEach((cat, ind) => {
      list.push({
        name: cat.name,
        _id: cat._id,
        parentId: cat.parentId,
        slug: cat.slug,
        type: cat.type
      });
      cat.childrens.length > 0 && linearListOfCat(cat.childrens, list);
    });
    return list;
  };
  const EditModuleFunc = (checked, expanded, modalType) => {
    let checkedArray = [];
    let expandedArray = [];
    let category = linearListOfCat(FetchedCategory.category);
    checked.length > 0 &&
      checked.forEach((id, index) => {
        const checkedDetails = category.find((filtered) => filtered._id === id);
        checkedArray.push(checkedDetails);
      });
    expanded.length > 0 &&
      expanded.forEach((id, index) => {
        const expandedDetails = category.find(
          (filtered) => filtered._id === id
        );
        expandedArray.push(expandedDetails);
      });
    setCheckedFullDetails(checkedArray);
    setExpandedFullDetails(expandedArray);
    modalType === "delete" ? setDeleteModal(true) : setShowForEdit(true);
  };
  const funcForEditValue = (changeIn, value, index, type) => {
    if (type == "checked") {
      const updatecheckedArray = CheckedFullDetails.map((data, ind) =>
        index === ind ? { ...data, [changeIn]: value, "change": true } : data
      );
      setCheckedFullDetails(updatecheckedArray);
    } else if (type == "expanded") {
      const updateExpandedArray = ExpandedFullDetails.map((data, ind) =>
        index === ind ? { ...data, [changeIn]: value, "change": true } : data
      );
      setExpandedFullDetails(updateExpandedArray);
    }
  };
  const editCategoryModule = (selectedData, type, modaltype) => {
    return (
      selectedData.length > 0 &&
      selectedData.map((data, ind) => (
        <Row key={ind}>
          <Col>
            <UI type="text" value={data.name} onChange={(e) => {
              funcForEditValue("name", e.target.value, ind, type);
            }} />
          </Col>
          <Col>
            <select className="form-control" value={data.parentId} onChange={(e) => {
              funcForEditValue("parentId", e.target.value, ind, type);
            }} >
              <option>Select Category</option>
              {ForNewCategory(FetchedCategory.category)}
            </select>
          </Col>
          <Col>
            <select
              className="form-control"
              value={data.type}
              onChange={(e) => { funcForEditValue("type", e.target.value, ind, type); }}>
              <option>Select Category</option>
              <option value="store">store</option>
              <option value="page">page</option>
              <option value="product">product</option>
            </select>
          </Col>
        </Row>
      ))
    );
  };
  const updateFinal = async () => {
    let form = new FormData();
    let changedCategory = [];
    CheckedFullDetails.forEach((elem, ind) => {
      if (elem.change) {
        changedCategory.push(elem);
      }
    })
    ExpandedFullDetails.forEach((elem, ind) => {
      if (elem.change) {
        changedCategory.push(elem);
      }
    })
    changedCategory.forEach((elem, ind) => {
      form.append('_id', elem._id)
      form.append('name', elem.name)
      form.append('type', elem.type)
      form.append('parentId', elem.parentId == undefined ? "" : elem.parentId)
    })
    dispatch(updateAction(form));
    setShowForEdit(false);
  }

  const deleteCat = (checked) => {
    return (
      checked.map((data, ind) =>
        <h5 key={ind}>{data.name}</h5>
      ))
  }
  const DeleteCate = (checked) => {
    var DeleteId = [];
    checked.map((data, ind) => {
      DeleteId.push(data._id);
    })
    setDeleteModal(false)
    dispatch(deleteCategory(DeleteId))
  }
  return (
    <>
      <Layout sidebar>
        <Row>
          <Col md="12">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>Category</h1>
              <div>
                <button className="btn1"
                  onClick={handleShow}>
                  Add
              </button>
                <button className="btn1"
                  onClick={() => EditModuleFunc(Newchecked, Newexpanded, "delete")}
                >
                  Delete
            </button>
                <button className="btn1"
                  onClick={() => EditModuleFunc(Newchecked, Newexpanded, "edit")}
                >
                  Edit
            </button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <CheckboxTree
            nodes={CategoryFetch(FetchedCategory.category)}
            checked={Newchecked}
            expanded={Newexpanded}
            onCheck={(checked) => setChecked(checked)}
            onExpand={(expanded) => setExpanded(expanded)}
            iconsClass="fa5"
          />
        </Row>

        <Modle
          show={show}
          onHide={handleClose}
          tittle="Add New Category"
          btnOnClick={handleClose1}
          buttonName="Save Changes">
          <UI
            label="Category Name"
            type="text"
            holder={"Category"}
            value={newCategory}
            onChange={(e) => {
              setNewCategory(e.target.value);
            }}
          ></UI>
          <select
            className="form-control"
            onChange={(e) => setParantid(e.target.value)}
          >
            <option>Select Category</option>
            {ForNewCategory(FetchedCategory.category)}
          </select>
          <select
            className="form-control"
            style={{ margin: "4px 0" }}
            value={type}
            onChange={(e) => { setType(e.target.value) }}
          >
            <option>Select Category</option>
            <option value="store">store</option>
            <option value="page">page</option>
            <option value="product">product</option>
          </select>
          {productImage.length > 0 ? productImage.map((image, index) => <div key={index}>{index + 1}: {image.name}</div>) : null}
          <UI type="file" holder={"Choose image"}
            onChange={PictureArray} className="form-control"></UI>
        </Modle>
        <Modle
          show={showForEdit}
          onHide={() => setShowForEdit(false)}
          size="lg"
          tittle="Edit Category"
          btnOnClick={updateFinal}
          buttonName="Save Changes"
        >
          <Row>
            <Col>
              <h4>Checked Category</h4>
            </Col>
          </Row>
          {editCategoryModule(CheckedFullDetails, "checked", "edit")}
          <Row>
            <Col>
              <h4>Expanded Category</h4>
            </Col>
          </Row>
          {editCategoryModule(ExpandedFullDetails, "expanded", "edit")}
        </Modle>
        <Modle
          show={deleteModal}
          onHide={() => setDeleteModal(false)}
          tittle="Are You Sure to Delete Category"
          btnOnClick={() => DeleteCate(CheckedFullDetails)}
          buttonName="Yes"
          btnColor="danger"
          btnclose="No"
          btncloseColor="primary">
          {deleteCat(CheckedFullDetails)}
        </Modle>
      </Layout>
    </>
  );
};

export default Category;
