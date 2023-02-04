import React, { Component, useEffect, useState } from "react";
import "../style.css";
import { Link } from "react-router-dom";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../../constant/global";



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
  const [preview, setPrview] = useState();
  const [image, setImage] = useState();

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
  const changeHandler = (event) => {
    setImage(event.target.files[0]);
    setPrview(URL.createObjectURL(event.target.files[0]));
  };

  const insert = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("category_id", categoryId);
    formData.append("brand_id", brandId);

    formData.append("section_id", sectionId);

    formData.append("name", fooName);

    formData.append("description", description);

    formData.append("speciality", speciality);
    formData.append("price", price);
    formData.append("meta_title", metaTag);
    formData.append("meta_description", metaDes);
    formData.append("meta_keywords", metaKeyword);
    formData.append("image", image);
    await axios
      .post(`${baseUrl}/api/food-insert`, formData)
      .then((response) => {
        Swal.fire({
          title: response.data.msg,
          icon: "success",
          confirmButtonText: "OK",
        });
        console.log(response);
      });
  };

  return (
    <div>
      <Form>
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
            <div className="btn-section">
            <h4 className="card-title">All Food</h4>
            <a
              className="btn-style btn btn-info"
              href="/catalogue/food"
            >
              <i className="bi bi-card-list"></i>All Food
            </a>
          </div>
              <div className="two_part">
                <div className="col-sm-3 background">
                  <label className="logo-label-style">Food Image</label>
                  <div className="col-sm-6">
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                      <Form.Control
                        type="file"
                        onChange={changeHandler}
                        multiple
                      />
                    </Form.Group>
                    <img src={preview} width="225rem"/>
                  </div>
                </div>
                <div className="col-sm-9 background">
                  <div>
                    <div className="input_field two_part">
                      <div className="wid">
                        <Form.Label className="label-style">
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
                        <Form.Label className="label-style">
                          Description
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Description"
                          className="area"
                          rows={3}
                          onChange={(event) => {
                            setDescription(event.target.value);
                          }}
                        ></Form.Control>
                      </div>
                    </div>
                    <div className="input_field two_part">
                      <div className="wid">
                        <Form.Label className="label-style">
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
                        <Form.Label className="label-style">Price</Form.Label>
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
                      <Form.Label className="label-style">
                        Select Section
                      </Form.Label>
                      <select
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
                      <Form.Label className="label-style">
                        Select Category
                      </Form.Label>
                      <select
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
                      <Form.Label className="label-style">
                        Select Brand
                      </Form.Label>
                      <select
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
                      <Form.Label className="label-style">Meta Tag</Form.Label>
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
                  <a className="btn btn-warning top-space" onClick={insert}>
                    <i className="bi bi-save-fill"></i>Insert
                  </a>
                  <br></br>
                  <br></br>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default CreateFood;
