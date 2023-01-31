import React, { Component, useEffect, useState } from "react";
import "../style.css";
import $ from "jquery";
import "datatables.net";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../../constant/global";

function FoodAdd() {
  const [allData, setAllData] = useState("");
  const [branch, setBranch] = useState("");
  const [branchId, setBranchId] = useState("");
  const [details, setDetails] = useState([]);
  const addFood = [];
  useEffect(() => {
    getData();
    getBranch();
  }, []);

  const addTocart = (id) => {
    if (details.find((data) => data[0].food_id == id)) {
      Swal.fire({
        title: "Already Added",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      const newItem = allData.find((val) => {
        if (id === val.id) {
          addFood.push({
            food_id: val.id,
          });

          setDetails((state) => [...state, addFood]);
          Swal.fire({
            title: "Added",
            icon: "info",
            confirmButtonText: "OK",
          });
        }
      });
    }
  };
  const getData = () => {
    axios
      .get(`${baseUrl}/api/quick-foods/${restaurant_id}/${restaurant_id}`)
      .then((response) => {
        setAllData(response.data);
      });
  };
  const getBranch = () => {
    axios.get(`${baseUrl}/api/branch/${restaurant_id}`).then((response) => {
      setBranch(response.data);
    });
  };

  const foodSubmit = () => {
    axios
      .post(`${baseUrl}/api/branch-food-add`, {
        restaurant_id: restaurant_id,
        branch_id: branchId,
        details: details,
      })
      .then((response) => {
        Swal.fire({
          title: `${details.length} item added to branch`,
          icon: "info",
          confirmButtonText: "OK",
        });
      });
  };

  $.DataTable = require("datatables.net");
  $(document).ready(function () {
    $("#example").DataTable();
  });
  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">Add Food To Branch</h4>
            </div>
            <div className="btn-section">
              <h4 className="card-title">Select Branch</h4>
              <select
                className="form-control"
                onChange={(event) => {
                  setBranchId(event.target.value);
                }}
              >
                {branch
                  ? branch.map((data) => (
                      <option value={data.id}>{data.city}</option>
                    ))
                  : null}
              </select>
            </div>
            <div className="btn-section">
              <h4 className="card-title">
                {details.length > 1
                  ? `${details.length} items added`
                  : `${details.length} item added`}
              </h4>
              <button className="btn btn-primary" onClick={foodSubmit}>
                Submit
              </button>
            </div>
            <div className="table-responsive">
              {allData ? (
                <table id="example" className="table table-striped table-style">
                  <thead>
                    <tr>
                      <th>item Name</th>
                      <th>Image</th>

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map((data) => (
                      <tr>
                        <td>{data.name}</td>
                        <td>
                          <img
                            src={`${baseUrl}/foods/small/${data.image}`}
                            width="80px"
                            height="50px"
                          />
                        </td>

                        <td>
                          <button
                            className="btn btn-warning cart-style"
                            onClick={() => {
                              addTocart(data.id);
                            }}
                          >
                            <i className="bi bi-cart4"></i>Add to Cart
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodAdd;
