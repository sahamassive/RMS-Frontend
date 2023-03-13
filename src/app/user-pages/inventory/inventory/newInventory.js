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

function NewInventory() {
  const [item, setItem] = useState();
  const [suppliers, setSuppliers] = useState();
  const [supplierId, setSupplierId] = useState();
  const [date, setDate] = useState();
  const [invoiceId, setInvoiceId] = useState();
  const [ingredientId, setIngredientId] = useState([{ value: "" }]);
  const [unit, setUnit] = useState([{ value: "" }]);
  const [amount, setAmount] = useState([{ value: "" }]);
  const [price, setPrice] = useState([{ value: "" }]);
  const [totalPrice, setTotalPrice] = useState();

  const { values, handleChange, errors, validate } = useValidation({
    supplier: "",
    date: "",
    number: '',
  });

  const generateID = (p) => {
    let x =
      "INV-" +
      Math.floor(Math.random() * 500 + 100) +
      "-" +
      Math.floor(Math.random() * 99 + 10) +
      "-" +
      Math.floor(Math.random() * 999 + 500);
    setInvoiceId(x);
    setDate(p);
  };

  useEffect(() => {
    calTotal();
  }, [price]);

  const calTotal = () => {
    let sum = 0;

    price.forEach((element) => {
      console.log(element);
      sum = sum + parseFloat(element.value);
    });
    setTotalPrice(sum);
  };

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios.get(`${baseUrl}/api/suppliers/${restaurant_id}`).then((response) => {
      setSuppliers(response.data);
      //console.log(allData);
    });
  }, []);

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios
      .get(`${baseUrl}/api/ingredient-list/${restaurant_id}`)
      .then((response) => {
        setItem(response.data);
      });
  }, []);

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios
      .get(`${baseUrl}/api/supplier-list/${restaurant_id}`)
      .then((response) => {
        setItem(response.data);
      });
  }, []);

  const handleAddInput = () => {
    setIngredientId([...ingredientId, { value: "" }]);
    setUnit([...unit, { value: "" }]);
    setAmount([...amount, { value: "" }]);
    setPrice([...price, { value: "" }]);
  };

  const handleRemoveInput = (index) => {
    const values = [...ingredientId];
    const values2 = [...unit];
    const values3 = [...amount];
    const values4 = [...price];
    values.splice(index, 1);
    values2.splice(index, 1);
    values3.splice(index, 1);
    values4.splice(index, 1);
    setIngredientId(values);
    setUnit(values2);
    setAmount(values3);
    setPrice(values4);
  };

  const addIngredientIdValue = (event, index) => {
    const values = [...ingredientId];
    values[index].value = event.target.value;
    setIngredientId(values);
  };

  const addSetUnit = (event, index) => {
    const values = [...unit];
    values[index].value = event.target.value;
    setUnit(values);
  };

  const addAmount = (event, index) => {
    const values = [...amount];
    values[index].value = event.target.value;
    setAmount(values);
  };

  const addPrice = (event, index) => {
    const values = [...price];
    values[index].value = event.target.value;
    setPrice(values);
  };

  const Insert = async (event) => {
    event.preventDefault();

    const isValid = validate();

    if (isValid) { 
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

      await axios
        .post(`${baseUrl}/api/invoice-insert`, {
          restaurant_id: restaurant_id,
          supplier_id: supplierId,
          date: date,
          invoice_id: invoiceId,
          ingredient_id: ingredientId,
          total_price: totalPrice,
          amount: amount,
          unit: unit,
          price: price,
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
              <h4 className="card-title">Create New Inventory</h4>
              <div className="btn-style">
                <a className="btn btn-primary" href="/inventory/all-invoice">
                  <i className="bi bi-receipt"></i>All Invoices
                </a>
                <span> </span>
                <a className="btn btn-info" href="/inventory/all-inventory">
                  <i className="bi bi-buildings-fill"></i>All Inventory
                </a>
              </div>
            </div>
            <div className="col-sm-12 background">
              <div>
                <div className="input_field two_part">
                  <div className="wid">
                    <Form.Label className="label-style">
                      Supplier name/Company name
                    </Form.Label>
                    <select
                      name="supplier"
                      onBlur={handleChange}
                      onChange={(event) => {
                        setSupplierId(event.target.value);
                      }}
                    >
                      <option>Select from here...</option>
                      {suppliers
                        ? suppliers.map((supplier) => (
                            <option value={supplier.id}>
                              {supplier.supplier_name}
                            </option>
                          ))
                        : null}
                    </select>
                    {errors.supplier && (
                      <span className="error">{errors.supplier}</span>
                    )}
                  </div>
                  <div className="wid">
                    <Form.Label className="label-style">Date</Form.Label>
                    <Form.Control
                      name="date"
                      onBlur={handleChange}
                      type="date"
                      onChange={(event) => {
                        generateID(event.target.value);
                      }}
                    ></Form.Control>
                    {errors.date && (
                      <span className="error">{errors.date}</span>
                    )}
                  </div>
                </div>
                <div className="input_field two_part">
                  <div className="wid">
                    <Form.Label className="label-style">Invoice ID</Form.Label>
                    <Form.Control
                      id="id-style"
                      value={invoiceId ? invoiceId : null}
                      type="text"
                      readOnly
                    ></Form.Control>
                  </div>
                  <div className="wid">
                    <Form.Label className="label-style">
                      Total Invoice Price
                    </Form.Label>
                    <Form.Control
                      id="id-style"
                      value={totalPrice ? totalPrice : null}
                      type="number"
                      readOnly
                    ></Form.Control>
                  </div>
                </div>
                <br></br> <br></br>
              </div>
            </div>
            <div className="col-sm-12 background">
              <div>
                {ingredientId.map((input, index) => (
                  <div className="input_field two_part" key={index}>
                    <div className="wid">
                      <Form.Label className="label-style">
                        Select Ingredient
                      </Form.Label>
                      <select
                        className="select2 wid"
                        value={input.value}
                        onChange={(event) => {
                          addIngredientIdValue(event, index);
                        }}
                      >
                        <option value="">Select Ingredient</option>
                        {item
                          ? item.map((data) => (
                              <option value={data.id}>{data.ingredient}</option>
                            ))
                          : null}
                      </select>
                    </div>
                    <div className="wid">
                      <Form.Label className="label-style">Unit</Form.Label>
                      <select
                        className="select2"
                        onChange={(event) => {
                          addSetUnit(event, index);
                        }}
                      >
                        <option value="">Select Section...</option>
                        <option value="Kg">Kilogram(kg)</option>
                        <option value="Gm">Gram(gm)</option>
                        <option value="L">Liter</option>
                        <option value="Ps">Piece</option>
                      </select>
                    </div>
                    <div className="wid">
                      <Form.Label className="label-style">Quantity</Form.Label>
                      <Form.Control
                        onChange={(event) => {
                          addAmount(event, index);
                        }}
                        type="text"
                        name="number"
                        onBlur={handleChange}
                        placeholder="Quantity"
                      ></Form.Control>
                      {errors.number && (
                        <span className="error">{errors.number}</span>
                      )}
                    </div>
                    <div className="wid">
                      <Form.Label className="label-style">Price</Form.Label>
                      <Form.Control
                        onChange={(event) => {
                          addPrice(event, index);
                        }}
                        type="number"
                        name="number"
                        onBlur={handleChange}
                        placeholder="Price"
                      ></Form.Control>
                      {errors.number && (
                        <span className="error">{errors.number}</span>
                      )}
                    </div>
                    <div>
                      <button
                        className="icon-delete"
                        onClick={() => handleRemoveInput(index)}
                      >
                        <i className="bi bi-x-circle"></i>
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  className="btn btn-light add-btn"
                  onClick={handleAddInput}
                >
                  Add New Ingredient
                </button>
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button
                    className="btn btn-warning top-space"
                    onClick={Insert}
                  >
                    <i className="bi bi-save-fill"></i>Insert
                  </button>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewInventory;
