import React, { Component, useEffect, useState } from "react";
import "../style.css";
import {
  baseUrl,
  restaurant_id,
  axios,
  Swal,
  Form,
} from "../../constant/global";
import { useValidation } from "../../constant/useValidation";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { check } from "../../constant/check";

const token = sessionStorage.getItem("token");

function NewSupplier() {
  const [supplierName, setSupplierName] = useState();
  const [marketName, setMarketName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();

  const { values, handleChange, errors, validate } = useValidation({
    company: "",
    market: "",
    phone: "",
    address: "",
  });

  const Insert = async (event) => {
    event.preventDefault();

    const isValid = validate();

    if (isValid) {
      const formdata = new FormData();
      formdata.append("restaurant_id", restaurant_id);
      formdata.append("supplier_name", supplierName);
      formdata.append("market_name", marketName);
      formdata.append("email", email);
      formdata.append("phone", phone);
      formdata.append("address", address);
  
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  
      await axios
        .post(`${baseUrl}/api/supplier-insert`, formdata)
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
              <h4 className="card-title">Create New Supplier</h4>
              <a
                className="btn-style btn btn-primary"
                href={`/inventory/all-supplier/${restaurant_id}`}
              >
                <i className="bi bi-list-columns-reverse"></i>All Suppliers
              </a>
            </div>
            <div className="col-sm-12 background">
              <div>
                <div className="input_field two_part">
                  <div className="wid">
                    <Form.Label className="label-style">
                      Supplier name/Company name
                    </Form.Label>
                    <Form.Control
                      onChange={(event) => {
                        setSupplierName(event.target.value);
                      }}
                      type="text"
                      name="company"
                      onBlur={handleChange}
                      placeholder="Supplier name /Company name"
                    ></Form.Control>
                    {errors.company && (
                      <span className="error">{errors.company}</span>
                    )}
                  </div>
                  <div className="wid">
                    <Form.Label className="label-style">
                      Market/Bazar name
                    </Form.Label>
                    <Form.Control
                      onChange={(event) => {
                        setMarketName(event.target.value);
                      }}
                      name="market"
                      onBlur={handleChange}
                      type="text"
                      placeholder="Market/Bazar name"
                    ></Form.Control>
                    {errors.market && (
                      <span className="error">{errors.market}</span>
                    )}
                  </div>
                </div>
                <div className="input_field two_part">
                  <div className="wid">
                    <Form.Label className="label-style">
                      Email (Optional)
                    </Form.Label>
                    <Form.Control
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      type="email"
                      placeholder="E-mail"
                    ></Form.Control>
                  </div>
                  <div className="wid">
                    <Form.Label className="label-style">
                      Phone number
                    </Form.Label>
                    <div className="border-23 form-control">
                      <PhoneInput
                        name="phone"
                        onBlur={handleChange}
                      id="phone-in"
                      international
                      countryCallingCodeEditable={false}
                      defaultCountry="BD"
                      onChange={setPhone}
                      />
                    </div>
                    {errors.phone && (
                      <span className="error">{errors.phone}</span>
                    )}
                  </div>
                </div>
                <div className="input_field">
                  <Form.Group>
                    <Form.Label className="label-style">Address</Form.Label>
                    <Form.Control
                      onChange={(event) => {
                        setAddress(event.target.value);
                      }}
                      className="area"
                      name="address"
                      onBlur={handleChange}
                      as="textarea"
                      placeholder="Address"
                      rows={3}
                    ></Form.Control>
                    {errors.address && (
                      <span className="error">{errors.address}</span>
                    )}
                  </Form.Group>
                </div>
                <button className="btn btn-warning top-space" onClick={Insert}>
                  <i className="bi bi-save-fill"></i>Insert
                </button>
                <br></br> <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NewSupplier;
