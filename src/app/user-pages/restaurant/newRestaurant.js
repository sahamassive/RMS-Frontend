import React, { useState } from "react";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";
import { check } from "../constant/check";
import validator from "validator";
import { useValidation } from "../constant/useValidation";
import countrydata from "./../Country/Countrydata.json";
const token = sessionStorage.getItem("token");

function NewRestaurant() {
  const [restaurantName, setRestaurantName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [metaTag, setMetaTag] = useState();
  const [address, setAddress] = useState();
  const [metaDescription, setMetaDescription] = useState();
  const [metaKeywords, setMetaKeywords] = useState();
  const [image, setImage] = useState();
  const [preview, setPrview] = useState();
  // const [errors, setErrors] = useState({});

  const { values, handleChange, errors, validate } = useValidation({
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    state: "",
    city: "",
    image: "",
  });

  const insert = async (e) => {
    e.preventDefault();

    //validate
    // const newErrors = {};
    // const mobileNoRegex = /^\d{10}$/;
    // if (validator.isEmpty(restaurantName)) {
    //   newErrors.restaurantName = "Name is required";
    // }
    // if (!validator.isMobilePhone(phoneNumber)) {
    //   newErrors.phoneNumber = "";
    // }
    // if (!validator.isEmail(email)) {
    //   newErrors.email = "Invalid email address";
    // }

    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    // } else {

    const isValid = validate();

    if (isValid) {
      const formData = new FormData();

      formData.append("restaurant_name", restaurantName);
      formData.append("phone", phoneNumber);
      formData.append("email", email);
      formData.append("country", selectedCountry);
      formData.append("city", selectedCity);
      formData.append("state", selectedState);
      formData.append("address", address);
      formData.append("meta_tag", metaTag);
      formData.append("meta_description", metaDescription);
      formData.append("meta_keyword", metaKeywords);
      formData.append("image", image);

      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      await axios
        .post(`${baseUrl}/api/restaurant-insert`, formData)
        .then((response) => {
          Swal.fire({
            title: response.data.msg,
            icon: "success",
            confirmButtonText: "OK",
          });
        });
    }

    //
  };
  const changeHandler = (event) => {
    setImage(event.target.files[0]);
    setPrview(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">All Restaurant</h4>
              <a className="btn-style btn btn-info" href="/restaurant/all">
                <i class="bi bi-card-list"></i> All Restaurant
              </a>
            </div>
            <div>
              <Form>
                <div className="two_part">
                  <div className="background col-md-3">
                    <label className="logo-label-style">Restaurant logo</label>
                    <div className="col-sm-6">
                      <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Control
                          type="file"
                          multiple
                          name="image"
                          onChange={changeHandler}
                          onChangeCapture={handleChange}
                        />
                      </Form.Group>
                      {errors.image && (
                        <span className="error">{errors.image}</span>
                      )}
                      <img src={preview} width="212rem" />
                    </div>
                  </div>
                  <div className="background col">
                    <p className="header-style">
                      Enter All restaurant Information:
                    </p>
                    <div className="res-class">
                      <div className="input_field">
                        <Form.Label className="label-style">
                          Restaurant name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Restaurant name"
                          onBlur={handleChange}
                          onChange={(event) => {
                            setRestaurantName(event.target.value);
                          }}
                        ></Form.Control>
                        {errors.name && (
                          <span className="error">{errors.name}</span>
                        )}
                      </div>
                      <div className="input_field two_part">
                        <div className="wid">
                          <Form.Label className="label-style">
                            Contact no.
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Contact no."
                            name="phone"
                            onBlur={handleChange}
                            onChange={(event) => {
                              setPhoneNumber(event.target.value);
                            }}
                          ></Form.Control>
                          {errors.phone && (
                            <span className="error">{errors.phone}</span>
                          )}
                        </div>
                        <div className="wid">
                          <Form.Label className="label-style">
                            E-mail
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            onBlur={handleChange}
                            onChange={(event) => {
                              setEmail(event.target.value);
                            }}
                          ></Form.Control>
                          {errors.email && (
                            <span className="error">{errors.email}</span>
                          )}
                        </div>
                      </div>
                      <div className="input_field">
                        <Form.Label className="label-style">Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Address"
                          value={address}
                          onBlur={handleChange}
                          name="address"
                          onChange={(event) => {
                            setAddress(event.target.value);
                          }}
                        ></Form.Control>
                        {errors.address && (
                          <span className="error">{errors.address}</span>
                        )}
                      </div>
                      <div className="input_field two_part">
                        <div className="wid">
                          <Form.Label className="label-style">
                            Select your country
                          </Form.Label>
                          <select
                            value={selectedCountry}
                            name="country"
                            onBlur={handleChange}
                            onChange={(event) =>
                              setSelectedCountry(event.target.value)
                            }
                          >
                            <option value="">Select a country</option>
                            {countrydata.map((country) => (
                              <option key={country.name} value={country.name}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                          {errors.country && (
                            <span className="error">{errors.address}</span>
                          )}
                        </div>
                        <div className="wid">
                          <Form.Label className="label-style">
                            Select your state
                          </Form.Label>
                          <select
                            value={selectedState}
                            onBlur={handleChange}
                            name="state"
                            onChange={(event) =>
                              setSelectedState(event.target.value)
                            }
                            disabled={!selectedCountry}
                          >
                            <option value="">Select a state</option>
                            {selectedCountry &&
                              countrydata
                                .find(
                                  (country) => country.name === selectedCountry
                                )
                                .states.map((state) => (
                                  <option key={state.name} value={state.name}>
                                    {state.name}
                                  </option>
                                ))}
                          </select>
                          {errors.state && (
                            <span className="error">{errors.state}</span>
                          )}
                        </div>
                        <div className="wid">
                          <Form.Label className="label-style">
                            Select your city
                          </Form.Label>
                          <select
                            id="city"
                            name="city"
                            value={selectedCity}
                            onBlur={handleChange}
                            onChange={(event) =>
                              setSelectedCity(event.target.value)
                            }
                            disabled={!selectedState}
                          >
                            <option value="">Select a city</option>
                            {selectedState &&
                              countrydata
                                .find(
                                  (country) => country.name === selectedCountry
                                )
                                .states.find(
                                  (state) => state.name === selectedState
                                )
                                .cities.map((city) => (
                                  <option key={city.id} value={city.name}>
                                    {city.name}
                                  </option>
                                ))}
                          </select>
                          {errors.city && (
                            <span className="error">{errors.city}</span>
                          )}
                        </div>
                      </div>
                      <div className="input_field">
                        <Form.Group>
                          <Form.Label className="label-style">
                            Meta Tag
                          </Form.Label>
                          <Form.Control
                            className="area"
                            as="textarea"
                            placeholder="Meat tag"
                            onChange={(event) => {
                              setMetaTag(event.target.value);
                            }}
                            rows={3}
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
                            onChange={(event) => {
                              setMetaDescription(event.target.value);
                            }}
                            rows={6}
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
                            onChange={(event) => {
                              setMetaKeywords(event.target.value);
                            }}
                            rows={3}
                          ></Form.Control>
                        </Form.Group>
                      </div>
                      <div className="input_field">
                        <button onClick={insert} className="btn btn-warning">
                          <i className="bi bi-save-fill"></i>Insert
                        </button>
                        <br></br>
                        <br></br>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NewRestaurant;
