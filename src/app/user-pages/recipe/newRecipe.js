import React, { useEffect, useState } from "react";
import "./style.css";
import { Form } from "react-bootstrap";
import { baseUrl, resturant_id } from "../constant/global";
import axios from "axios";
import Swal from "sweetalert2";
import Ingredient from "./ingredient";

function NewRecipe() {
  const [inputs, setInputs] = useState([{ value: "" }]);
  const [quantity, setQuantity] = useState([{ qty_value: "" }]);
  const [item, setItem] = useState();
  const [recipeItem, setRecipeItem] = useState();
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/ingredient-list/${resturant_id}`)
      .then((response) => {
        setItem(response.data);
      });
  }, []);

  const insert = () => {
    axios
      .post(`${baseUrl}/api/recipe-insert`, {
        resturant_id: resturant_id,
        ingredient_name: inputs,
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
      <div className="input_field two_part">
        <div className="wid">
          <Form.Label className="level-style">Item Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Item Name"
            onChange={(event) => {
              setRecipeItem(event.target.value);
            }}
          ></Form.Control>
        </div>
      </div>
      {inputs.map((input, index) => (
        <div key={index}>
          <Form.Label className="level-style">Select Ingredient</Form.Label>

          <select
            className="select2"
            value={input.value}
            onChange={(event) => handleInputChange(index, event)}
          >
            <option value="">Select Ingredient</option>
            {item
              ? item.map((data) => (
                  <option value={data.id}>
                    {data.ingredient}({data.unit})
                  </option>
                ))
              : null}
          </select>
          <br></br>
          <Form.Label className="level-style">Ingredient Quantity</Form.Label>

          <input
            type="number"
            value={quantity.qty_value}
            onChange={(event) => handleInputChangeQty(index, event)}
          />
          <button onClick={() => handleRemoveInput(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddInput}>Add Input</button>
      <a className="btn btn-success top-space2" onClick={insert}>
        <i className="bi bi-save-fill"></i>Insert
      </a>
      <br></br>
      <br></br> <br></br>
    </div>
  );
}

export default NewRecipe;
