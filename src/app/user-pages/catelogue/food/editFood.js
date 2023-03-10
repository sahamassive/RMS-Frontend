import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style.css";
import {
  baseUrl,
  restaurant_id,
  axios,
  Swal,
  Form,
} from "../../constant/global";
import { check } from "../../constant/check";

function EditFood() {
  const [section, setSection] = useState();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [sectionName, setSectionName] = useState();
  const [brandName, setBrandName] = useState();
  const [categoryName, setCategoryName] = useState();
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
        setBrandName(res.data.brand_name);
        setCategoryName(res.data.category_name);
        setSectionName(res.data.section_name);
        setDescription(res.data.description);
        setPrice(res.data.price);
        setSpeciality(res.data.speciality);
        setMetaTag(res.data.meta_title);
        setMetaKeyword(res.data.meta_keywords);
        setMetDes(res.data.meta_description);
        setImage(res.data.image);
        setSectionId(res.data.section_id);
        setCategoryId(res.data.category_id);
        setBrandId(res.data.brand_id);
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
      .post(`${baseUrl}/api/food-edit/${params.id}`, formData)
      .then((response) => {
        Swal.fire({
          title: response.data.msg,
          icon: "success",
          confirmButtonText: "OK",
        });
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
                <a className="btn-style btn btn-info" href="/catalogue/food">
                  <i className="bi bi-card-list"></i>All Food
                </a>
              </div>
              <div className="two_part">
                <div className="col-sm-3 background">
                  <Form.Label className="label-style">Food Image</Form.Label>
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
                        <Form.Control
                          className="area"
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
                        {section
                          ? section.map((data) => (
                              <option
                                key={data.id}
                                value={data.id}
                                selected={data.name == sectionName}
                              >
                                {data.name}
                              </option>
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
                        {category
                          ? category.map((data) => (
                              <option
                                value={data.id}
                                selected={data.category_name == categoryName}
                              >
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
                        {brand
                          ? brand.map((data) => (
                              <option
                                value={data.id}
                                selected={data.name == brandName}
                              >
                                {data.name}
                              </option>
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
