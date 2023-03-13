import React, { useEffect, useState } from "react";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";
import { useValidation } from "../constant/useValidation";
import { check } from "../constant/check";

const token = sessionStorage.getItem("token");

function NewRecipe() {
  const [inputs, setInputs] = useState([{ value: "" }]);
  const [quantity, setQuantity] = useState([{ qty_value: "" }]);
  const [item, setItem] = useState();
  const [recipeItem, setRecipeItem] = useState();

  const { values, handleChange, errors, validate } = useValidation({
    name: "",
    ingredient: "",
    number: "",
  });

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/ingredient-list/${restaurant_id}`)
      .then((response) => {
        setItem(response.data);
      });
  }, []);

  const insert = (event) => {
    event.preventDefault();

    const isValid = validate();

    if (isValid) {
      axios
      .post(`${baseUrl}/api/recipe-insert`, {
        restaurant_id: restaurant_id,
        ingredient_id: inputs,
        ingredient_quantity: quantity,
        item: recipeItem,
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
  const handleInputChange = (index, event) => {
    const values = [...inputs];
    const qty = [...quantity];
    values[index].value = event.target.value;
    qty[index].qty_value = event.target.value;
    setInputs(values);
    setQuantity(qty);
  };

  const handleInputChangeQty = (index, event) => {
    const qty = [...quantity];

    qty[index].qty_value = event.target.value;

    setQuantity(qty);
  };
  const handleAddInput = () => {
    setInputs([...inputs, { value: "" }]);
    setQuantity([...quantity, { value: "" }]);
    console.log(inputs);
    console.log(quantity);
  };

  const handleRemoveInput = (index) => {
    const values = [...inputs];
    const qty = [...quantity];
    values.splice(index, 1);
    qty.splice(index, 1);
    setInputs(values);
    setQuantity(qty);
  };
  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">Create New Recipe</h4>
              <a className="btn-style btn btn-primary" href="/item/list">
                <i className="bi bi-list-columns-reverse"></i>All recipe
              </a>
            </div>

            <div className="col-sm-12 background">
              <div className="input_field two_part">
                <div className="wid">
                  <Form.Label className="label-style">Item Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    onBlur={handleChange}
                    placeholder="Item Name"
                    onChange={(event) => {
                      setRecipeItem(event.target.value);
                    }}
                  ></Form.Control>
                  {errors.name && (
                    <span className="error">{errors.name}</span>
                  )}
                </div>
              </div>
              {inputs.map((input, index) => (
                <div className="input_field two_part" key={index}>
                  <div className="wid">
                    <Form.Label className="label-style">
                      Select Ingredient
                    </Form.Label>

                    <select
                      className="wid"
                      name="ingredient"
                      onBlur={handleChange}
                      value={input.value}
                      onChange={(event) => handleInputChange(index, event)}
                    >
                      <option value="">Select Ingredient</option>
                      {item
                        ? item.map((data) => (
                            <option value={data.id}>{data.ingredient}</option>
                          ))
                        : null}
                    </select>
                    {errors.ingredient && (
                      <span className="error">{errors.ingredient}</span>
                    )}
                  </div>
                  <div className="wid">
                    <Form.Label className="label-style">
                      Ingredient Quantity
                    </Form.Label>
                    <input
                      className="form-control"
                      type="number"
                      name="number"
                      onBlur={handleChange}
                      value={quantity.qty_value}
                      onChange={(event) => handleInputChangeQty(index, event)}
                    />
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
                className="btn btn-light add-btn respomsive-add-btn"
                onClick={handleAddInput}
              >
                Add New Ingredient
              </button>
              <div className="d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-warning top-space" onClick={insert}>
                  <i className="bi bi-save-fill"></i>Insert
                </button>
              </div>
              <br></br>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewRecipe;
