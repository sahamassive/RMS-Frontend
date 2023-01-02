import React, { Component, useEffect, useState } from "react";
import "./style.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import axios, { all } from "axios";
const baseUrl = "https://346d-103-153-66-241.in.ngrok.io";

function CreateFood() {
  const [section, setSection] = useState();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [sectionId, setSectionId] = useState();
  const [brandId, setBrandId] = useState();
  const [categoryId, setCategoryId] = useState();
  const [fooName, setFoodName] = useState();
  const [description, setDescription] = useState();
  const [speciality, setSpeciality] = useState();
  const [price, setPrice] = useState();
  const [metaTag, setMetaTag] = useState();
  const [metaDes, setMetDes] = useState();
  const [metaKeyword, setMetaKeyword] = useState();
  useEffect(() => {
    axios.get(`${baseUrl}/api/sections`).then((response) => {
      setSection(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${baseUrl}/api/brands`).then((response) => {
      setBrand(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${baseUrl}/api/categories`).then((response) => {
      setCategory(response.data);
    });
  }, []);

  const insert = () => {
    axios
      .post(`${baseUrl}/api/food-insert`, {
        category_id: categoryId,
        brand_id: brandId,
        section_id: sectionId,
        name: fooName,
        description: description,
        speciality: speciality,
        price: price,
        meta_title: metaTag,
        meta_description: metaDes,
        meta_keywords: metaKeyword,
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

            <Form>
              <h2> Create new Food Item</h2>
              <div className="two_part">

                <div className="col-sm-3 background">
                  <lavel className="label-style">Food Image</lavel>
                  <div className="col-sm-6">
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                      <Form.Control type="file" multiple />
                    </Form.Group>
                  </div>
                </div>
                <div className="col-sm-9 background">
                  <div>
                    <div className="input_field two_part">
                      <div className="wid">
                        <Form.Label className="level-style">
                          Food name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Food name"
                          onChange={(event) => {
                            setFoodName(event.target.value);
                          }}
                        ></Form.Control>
                      </div>
                      <div className="wid">
                        <Form.Label className="level-style">
                          Description
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Description"
                          rows={3}
                          onChange={(event) => {
                            setDescription(event.target.value);
                          }}
                        ></Form.Control>
                      </div>
                    </div>
                    <div className="input_field two_part">
                      <div className="wid">
                        <Form.Label className="level-style">
                          Speciality
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Speciality"
                          onChange={(event) => {
                            setSpeciality(event.target.value);
                          }}
                        ></Form.Control>
                      </div>
                      <div className="wid">
                        <Form.Label className="level-style">Price</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Price"
                          onChange={(event) => {
                            setPrice(event.target.value);
                          }}
                        ></Form.Control>
                      </div>
                    </div>
                  </div>
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
                        Select Category
                      </Form.Label>
                      <select
                        className="select2"
                        onChange={(event) => {
                          setCategoryId(event.target.value);
                        }}
                      >
                        <option value="">Select Section</option>
                        {category
                          ? category.map((data) => (
                              <option value={data.id}>
                                {data.category_name}
                              </option>
                            ))
                          : null}
                      </select>
                    </div>

                    <div className="wid">
                      <Form.Label className="level-style">
                        Select Brand
                      </Form.Label>
                      <select
                        className="select2"
                        onChange={(event) => {
                          setBrandId(event.target.value);
                        }}
                      >
                        <option value="">Select Section</option>
                        {brand
                          ? brand.map((data) => (
                              <option value={data.id}>{data.name}</option>
                            ))
                          : null}
                      </select>
                    </div>
                  </div>
                  <div className="input_field">
                    <Form.Group>
                      <Form.Label className="level-style">Meta Tag</Form.Label>
                      <Form.Control
                        className="area"
                        as="textarea"
                        placeholder="Meat tag"
                        rows={3}
                        onChange={(event) => {
                          setMetaTag(event.target.value);
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
                  <a className="btn btn-warning top-space" onClick={insert}>
                    <i className="bi bi-save-fill"></i>Insert
                  </a>
                  <br></br>
                  <br></br>
                  <br></br>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateFood;
