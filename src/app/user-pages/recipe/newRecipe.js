import React, { useEffect, useState } from "react";
import './style.css';
import { Form } from "react-bootstrap";
import { baseUrl, resturant_id } from "../constant/global";
import axios from "axios";
import Swal from 'sweetalert2';

function NewRecipe() {
  const [foodName, setFoodName] = useState();
  const [food, setFood] = useState();
  const [branchId, setBranchId] = useState();

  useEffect(() => {
    axios
    .get(
        `${baseUrl}/api/quick-foods/${resturant_id}/${
        branchId ? branchId : resturant_id
    }`
    )
    .then((response) => {
        setFood(response.data);
        console.log(response.data);
    });
  }, [])
  
  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">Create New Recipe</h4>
              <a className="btn-style btn btn-info" href="/waste/all"><i className="bi bi-card-list"></i> All
                Recipe</a>
            </div>
            <div className="col-sm-12 background">
              <div className='input_field two_part'>
                <div className="wid">
                  <Form.Label className="label-style">Food name</Form.Label>
                  <select
                    onChange={(event) => {
                      setFoodName(event.target.value)
                    }}
                  >
                    <option value="">Select food...</option>
                    {
                      food ?
                        food.map((data) =>
                          <option value={data.id}>
                            {data.name}
                          </option>
                        ) : null
                    }
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewRecipe;