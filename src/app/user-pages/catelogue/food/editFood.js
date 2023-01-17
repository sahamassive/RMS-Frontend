import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../style.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import axios, { all } from "axios";
import { baseUrl } from "../../constant/global";

function EditFood() {
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
  const [secid, setSecid] = useState();
  const params = useParams();

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/food-edit/${params.id}`)

      .then((res) => {
        setFoodName(res.data.name);
        setDescription(res.data.description);
        setPrice(res.data.price);
        setSpeciality(res.data.speciality);
        setMetaTag(res.data.meta_title);
        setMetaKeyword(res.data.meta_keywords);
        setMetDes(res.data.meta_description);
        setImage(res.data.image);
        setSecid(res.data.section_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);
  
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

  const update = async (e) => {
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
              <h2>Edit Food Item</h2>
              <div className="two_part">
                <div className="col-sm-3 background">
                  <lavel className="label-style">Food Image</lavel>
                  <div className="col-sm-6">
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                      <Form.Control
                        type="file"
                        onChange={changeHandler}
                        multiple
                      />
                    </Form.Group>
                    <img
                      src={
                        preview ? preview : `${baseUrl}/foods/small/${image}`
                      }
                      width="225rem"
                    />
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
                          value={fooName}
                          onChange={(event) => {
                            setFoodName(event.target.value);
                          }}
                        ></Form.Control>
                      </div>
                      <div className="wid">
                        <Form.Label className="level-style">
                          Description
                        </Form.Label>
                        <Form.Control className="area"
                          as="textarea"
                          value={description}
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
                          value={speciality}
                          onChange={(event) => {
                            setSpeciality(event.target.value);
                          }}
                        ></Form.Control>
                      </div>
                      <div className="wid">
                        <Form.Label className="level-style">Price</Form.Label>
                        <Form.Control
                          type="number"
                          value={price}
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
                        <option value={secid}>Select Section</option>
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
                        value={metaTag}
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
                        value={metaDes}
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
                        value={metaKeyword}
                        rows={3}
                        onChange={(event) => {
                          setMetaKeyword(event.target.value);
                        }}
                      ></Form.Control>
                    </Form.Group>
                  </div>
                  <a className="btn btn-warning top-space" onClick={update}>
                    <i className="bi bi-save-fill"></i>Update
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

export default EditFood;
