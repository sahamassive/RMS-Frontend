import React, { Component, useEffect, useState } from "react";
import "../style.css";
import { Link } from "react-router-dom";
import {
  baseUrl,
  restaurant_id,
  axios,
  Swal,
  Form,
} from "../../constant/global";
import { useValidation } from "../../constant/useValidation";
import { check } from "../../constant/check";
const token = sessionStorage.getItem("token");

function CreateFood() {
  const [section, setSection] = useState();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [item, setItem] = useState();
  const [itemCode, setItemCode] = useState();

  const [sectionId, setSectionId] = useState();
  const [brandId, setBrandId] = useState();
  const [categoryId, setCategoryId] = useState();
  const [fooName, setFoodName] = useState();
  const [description, setDescription] = useState();
  const [speciality, setSpeciality] = useState();
  const [basicPrice, setBasicPric] = useState();
  const [price, setPrice] = useState();
  const [metaTag, setMetaTag] = useState();
  const [metaDes, setMetDes] = useState();
  const [metaKeyword, setMetaKeyword] = useState();
  const [preview, setPrview] = useState();
  const [image, setImage] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);


  const { values, handleChange, errors, validate } = useValidation({
    food: "",
    section: "",
    category: "",
    brand: "",
    recipe: "",
    image: "",
  });

  useEffect(() => {
    getCategories();
    getBrand();
    getSection();
    getItem();
  }, []);

  const getCategories = () => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    axios.get(`${baseUrl}/api/categories`).then((response) => {
      setCategory(response.data);
    });
  };
  const getBrand = () => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    axios.get(`${baseUrl}/api/brands`).then((response) => {
      setBrand(response.data);
    });
  };
  const getSection = () => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    axios.get(`${baseUrl}/api/sections`).then((response) => {
      setSection(response.data);
    });
  };
  const getItem = () => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    axios.get(`${baseUrl}/api/get-items/${restaurant_id}`).then((response) => {
      setItem(response.data);
    });
  };
  const changeHandler = (event) => {
    setImage(event.target.files[0]);
    setPrview(URL.createObjectURL(event.target.files[0]));
  };
  const handleFileInputChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
    const newPreviews = [];
    filesArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === filesArray.length) {
          setPreviewImages((prevPreviews) => [...prevPreviews, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const foodSet = (value) => {
    setItemCode(value);
    item.find((data) => {
      if (data.item_code == value) {
        setBasicPric(data.basic_price);
        setPrice(data.selling_price);
        setFoodName(data.item_name);
      }
    });
  };

  const insert = async (e) => {
    e.preventDefault();

    const isValid = validate();

    if (isValid) {
      const formData = new FormData();
      formData.append("restaurant_id", restaurant_id);
  
      formData.append("item_code", itemCode);
  
      formData.append("category_id", categoryId);
      formData.append("brand_id", brandId);
  
      formData.append("section_id", sectionId);
  
      formData.append("name", fooName);
  
      formData.append("description", description);
  
      formData.append("speciality", speciality);
      formData.append("basic_price", basicPrice);
      formData.append("price", price);
      formData.append("meta_title", metaTag);
      formData.append("meta_description", metaDes);
      formData.append("meta_keywords", metaKeyword);
      formData.append("image", image);
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append(`images[${i}]`, selectedFiles[i]);
      }
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
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
    }
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
                  <label className="logo-label-style">Display Image</label>
                  <div className="col-sm-6">
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                      <Form.Control
                        name="image"
                        onChangeCapture={handleChange}
                        type="file"
                        onChange={changeHandler}
                        multiple
                      />
                      {errors.image && (
                        <span className="error">{errors.image}</span>
                      )}
                    </Form.Group>
                    <img src={preview} width="225rem" />
                  </div>
                  <div className="col-sm-6">
                    <label className="logo-label-style">
                      Multiple Images Add
                    </label>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                      <Form.Control
                        type="file"
                        onChange={handleFileInputChange}
                        multiple
                      />
                    </Form.Group>
                    <div className="preview-images wid">
                      {previewImages
                        ? previewImages.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Preview ${index}`}
                              width="40%"
                            />
                          ))
                        : null}
                    </div>
                  </div>
                </div>

                <div className="col-sm-9 background">
                  <div>
                    <div className="input_field two_part">
                      <div className="wid">
                        <Form.Label className="label-style">
                          Select Food
                        </Form.Label>
                        <select
                          name="food"
                          onBlur={handleChange}
                          className="select2"
                          onChange={(event) => {
                            foodSet(event.target.value);
                          }}
                        >
                          <option value="">Select Food</option>
                          {item
                            ? item.map((data) => (
                                <option value={data.item_code}>
                                  {data.item_name}
                                </option>
                              ))
                            : null}
                        </select>
                        {errors.food && (
                          <span className="error">{errors.food}</span>
                        )}
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
                        <Form.Label className="label-style">
                          Basic Price
                        </Form.Label>
                        <Form.Control
                          id="id-style"
                          type="number"
                          placeholder="Price"
                          value={basicPrice ? basicPrice : null}
                          readOnly
                        ></Form.Control>
                      </div>
                      <div className="wid">
                        <Form.Label className="label-style">Price</Form.Label>
                        <Form.Control
                          id="id-style"
                          type="number"
                          placeholder="Price"
                          value={price ? price : null}
                          readOnly
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
                        name="section"
                        onBlur={handleChange}
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
                      {errors.section && (
                        <span className="error">{errors.section}</span>
                      )}
                    </div>

                    <div className="wid">
                      <Form.Label className="label-style">
                        Select Category
                      </Form.Label>
                      <select
                        name="category"
                        onBlur={handleChange}
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
                      {errors.category && (
                        <span className="error">{errors.category}</span>
                      )}
                    </div>

                    <div className="wid">
                      <Form.Label className="label-style">
                        Select Brand
                      </Form.Label>
                      <select
                        name="brand"
                        onBlur={handleChange}
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
                      {errors.brand && (
                        <span className="error">{errors.brand}</span>
                      )}
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
