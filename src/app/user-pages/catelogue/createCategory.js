import React, { Component, useEffect, useState } from "react";
import "./style.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { baseUrl } from "../constant/global";

function CreateCategory() {
  const [sectionId, setSectionId] = useState();
  const [categoryName, setCategoryName] = useState();
  const [categoryId, setCategoryId] = useState();
  const [parentId, setParentId] = useState();
  const [discount, setDiscount] = useState();
  const [status, setStatus] = useState();
  const [url, setUrl] = useState();
  const [description, setDescription] = useState();
  const [metaTitle, setMetaTitle] = useState();
  const [metaDes, setMetDes] = useState();
  const [metaKeyword, setMetaKeyword] = useState();
  const [image, setImage] = useState();

  const [section, setSection] = useState();
  useEffect(() => {
    axios.get(`${baseUrl}/api/sections`).then((response) => {
      setSection(response.data);
    });
  }, []);
  const insert = () => {
    axios
      .post(`${baseUrl}/api/category-insert`, {
        category_name: categoryName,
        parent_id: categoryId,
        section_id: sectionId,
        category_image: image,
        category_discount: discount,
        description: description,
        url: url,
        meta_title: metaTitle,
        meta_description: metaDes,
        meta_keywords: metaKeyword,
        status: status,
      })
      .then((response) => {
        alert(response.data.msg);
      });
  };
  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">Create New Category</h4>
              <a className="btn-style btn btn-info" href="/catalogue/category">
                <i className="bi bi-list-columns-reverse"></i>All category
              </a>
            </div>
            <div className="col-sm-12 background">
              <div>
                <div className="input_field two_part">
                  <div className="wid">
                    <Form.Label className="level-style">
                      Select Section
                    </Form.Label>
                    <select
                      className="select2"
                      onChange={(event) => {
                        setSectionId(event.target.value);
                      }}
                    >
                      <option value="">Select Section</option>
                      {section
                        ? section.map((data) => (
                            <option value={data.id}>{data.name}</option>
                          ))
                        : null}
                    </select>
                  </div>
                  <div className="wid">
                    <Form.Label className="level-style">
                      Select category
                    </Form.Label>
                    <select
                      className="select2"
                      onChange={(event) => {
                        setCategoryId(event.target.value);
                      }}
                    >
                      <option value="">Select category</option>
                      <option value="1">Clothing</option>
                      <option value="2">Accessories</option>
                    </select>
                  </div>
                </div>
                <div className="input_field two_part">
                  <div className="wid">
                    <Form.Label className="level-style">
                      Category name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Category name"
                      onChange={(event) => {
                        setCategoryName(event.target.value);
                      }}
                    ></Form.Control>
                  </div>
                  <div className="wid">
                    <Form.Label className="level-style">Discount(%)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Discount ( % )"
                      onChange={(event) => {
                        setDiscount(event.target.value);
                      }}
                    ></Form.Control>
                  </div>
                </div>
                <div className="input_field two_part">
                  <div className="wid">
                    <Form.Label className="level-style">
                      Select Status
                    </Form.Label>
                    <select
                      className="select2"
                      onChange={(event) => {
                        setStatus(event.target.value);
                      }}
                    >
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="0">Not active</option>
                    </select>
                  </div>
                  <div className="wid">
                    <Form.Label className="level-style">URL</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="URL"
                      onChange={(event) => {
                        setUrl(event.target.value);
                      }}
                    ></Form.Control>
                  </div>
                </div>
                <div className="input_field">
                  <Form.Group>
                    <Form.Label className="level-style">Description</Form.Label>
                    <Form.Control
                      className="area"
                      as="textarea"
                      placeholder="Description"
                      rows={4}
                      onChange={(event) => {
                        setDescription(event.target.value);
                      }}
                    />
                  </Form.Group>
                </div>
                <div className="input_field">
                  <Form.Group>
                    <Form.Label className="level-style">Meta Title</Form.Label>
                    <Form.Control
                      className="area"
                      as="textarea"
                      placeholder="Meat title"
                      rows={2}
                      onChange={(event) => {
                        setMetaTitle(event.target.value);
                      }}
                    />
                  </Form.Group>
                </div>
                <div className="input_field">
                  <Form.Group>
                    <Form.Label className="level-style">
                      Meta description
                    </Form.Label>
                    <Form.Control
                      className="area"
                      as="textarea"
                      placeholder="Meta description"
                      rows={6}
                      onChange={(event) => {
                        setMetDes(event.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>
                </div>
                <div className="input_field">
                  <Form.Group>
                    <Form.Label className="level-style">
                      Meta keyword
                    </Form.Label>
                    <Form.Control
                      className="area"
                      as="textarea"
                      placeholder="Meta keyword"
                      rows={3}
                      onChange={(event) => {
                        setMetaKeyword(event.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>
                </div>
                <div className="input_field">
                  <Form.Label className="level-style">
                    Category image
                  </Form.Label>
                  <div className="section-03">
                    <Form.Group
                      controlId="formFileMultiple"
                      className="mb-3 search_box2"
                    >
                      <Form.Control
                        type="file"
                        name="file"
                        onChange={(e) =>
                          setImage(URL.revokeObjectURL(e.target.files[0]))
                        }
                      />
                    </Form.Group>
                    <img src={image} width="80px" height="50px" />
                  </div>
                </div>
                <a className="btn btn-success top-space2" onClick={insert}>
                  <i className="bi bi-save-fill"></i>Insert
                </a>
                <br></br>
                <br></br> <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateCategory;
