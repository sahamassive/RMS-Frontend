import React, { Component, useEffect, useState } from "react";
import "../style.css";
import {
  baseUrl,
  restaurant_id,
  axios,
  Swal,
  Form,
} from "../../constant/global";
import { check } from "../../constant/check";
import { useValidation } from "../../constant/useValidation";
const token = sessionStorage.getItem("token");

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

  const { values, handleChange, errors, validate } = useValidation({
    name: "",
    section: "",
  });

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios.get(`${baseUrl}/api/sections`).then((response) => {
      setSection(response.data);
    });
  }, []);

  const insert = (event) => {
    event.preventDefault();

    const isValid = validate();

    if (isValid) {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      axios
        .post(`${baseUrl}/api/category-insert`, {
          category_name: categoryName,
          section_id: sectionId,
          description: description,
          meta_title: metaTitle,
          meta_description: metaDes,
          meta_keywords: metaKeyword,
        })
        .then((response) => {
          Swal.fire({
            title: response.data.msg,
            icon: "success",
            confirmButtonText: "OK",
          });
        });
    }
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
                <Form.Label className="label-style">
                  Category name
                </Form.Label>
                    <Form.Control
                      name="name"
                      onBlur={handleChange}
                  type="text"
                  placeholder="Category name"
                  onChange={(event) => {
                    setCategoryName(event.target.value);
                  }}
                    ></Form.Control>
                    {errors.name && (
                      <span className="error">{errors.name}</span>
                    )}
              </div>
                  <div className="wid">
                    <Form.Label className="label-style">
                      Select Section
                    </Form.Label>
                    <select
                      name="section"
                      onBlur={handleChange}
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
                    {errors.section && (
                      <span className="error">{errors.section}</span>
                    )}
                  </div>
                </div>
                <div className="input_field">
                  <Form.Group>
                    <Form.Label className="label-style">Description</Form.Label>
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
                    <Form.Label className="label-style">Meta Title</Form.Label>
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
                    <Form.Label className="label-style">
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
                    <Form.Label className="label-style">
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
