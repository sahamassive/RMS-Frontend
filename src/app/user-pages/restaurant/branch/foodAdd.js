import React, { Component, useEffect, useState } from "react";
import "../style.css";
import $ from "jquery";
import "datatables.net";
import {
  baseUrl,
  restaurant_id,
  axios,
  Swal,
  Form,
} from "../../constant/global";
import { check } from "../../constant/check";

const branch_id = 3;
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
            name: val.name,
            image: val.image
          });

          setDetails((state) => [...state, addFood]);
          Swal.fire({
            title: "Added",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      });
    }
  };

  const removecart = (id) => {
    setDetails((current) =>
      current.filter((data) => data[0].food_id !== id)
    );
  }

  const getData = () => {
    axios
      .get(`${baseUrl}/api/quick-foods-branch/${restaurant_id}/${branch_id}`)
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
    if (!branchId) {
      Swal.fire({
        title: `Please select a branch to submit`,
        icon: "info",
        confirmButtonText: "OK",
      });
    }
    axios
      .post(`${baseUrl}/api/branch-food-add`, {
        restaurant_id: restaurant_id,
        branch_id: branchId,
        details: details,
      })
      .then((response) => {
        Swal.fire({
          title: `${details.length} item added to branch`,
          icon: "success",
          confirmButtonText: "OK",
        });
        getData();
        getBranch();
        setDetails([]);
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
            <div className="">
              <div className="background">
              <div className="input_field two_part">
              <div className="wid">
                <Form.Label className="label-style">Select Branch</Form.Label>
                <select
                  onChange={(event) => {
                    setBranchId(event.target.value);
                  }}
                    >
                      <option value = "">Select Branch...</option>
                  {branch
                    ? branch.map((data) => (
                      <option value={data.id}>{data.city}</option>
                    ))
                    : null}
                </select>
                  </div>
              <div className="wid">
              </div>
                </div>
                <div className="input_field">
                {details ? (
                  <table className="table table-striped table-style">
                    <thead>
                      <tr>
                        <th>item Name</th>
                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details.map((data) => (
                        <tr>
                          <td>{data[0].name}</td>
                          <td>
                            <img
                              src={`${baseUrl}/foods/small/${data[0].image}`}
                              width="80px"
                              height="50px"
                            />
                          </td>

                          <td>
                            <button
                              className="btn btn-danger cart-style"
                              onClick={() => {
                                removecart(data[0].food_id);
                              }}
                            >
                              <i className="bi bi-x-square"></i>Cancel
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  ) : null}
                  <div className="d-grid gap-2 col-6 mx-auto">
                  <button className="btn btn-primary top-space" onClick={foodSubmit}>
                    <i className="bi bi-check-square-fill"></i>Confirm
                  </button>
                  <br></br>
                </div>
                </div>
              </div>
              <br></br>
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
                              <i className="bi bi-plus-square"></i>Add
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodAdd;
