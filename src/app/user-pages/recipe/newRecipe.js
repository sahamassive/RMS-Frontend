import React, { useEffect, useState } from "react";
import "./style.css";
import { Form } from "react-bootstrap";
import { baseUrl, resturant_id } from "../constant/global";
import axios from "axios";
import Swal from "sweetalert2";

function NewRecipe() {
  const [inputs, setInputs] = useState([{ value: "" }]);

  const handleInputChange = (index, event) => {
    const values = [...inputs];
    values[index].value = event.target.value;
    setInputs(values);
  };

  const handleAddInput = () => {
    setInputs([...inputs, { value: "" }]);
  };

  const handleRemoveInput = (index) => {
    const values = [...inputs];
    values.splice(index, 1);
    setInputs(values);
  };
  return (
    <div>
      {inputs.map((input, index) => (
        <div key={index}>
          <input
            type="text"
            value={input.value}
            onChange={(event) => handleInputChange(index, event)}
          />
          <button onClick={() => handleRemoveInput(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddInput}>Add Input</button>
    </div>
  );
}

export default NewRecipe;
