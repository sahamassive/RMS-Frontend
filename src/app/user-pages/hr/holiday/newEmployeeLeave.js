import React, { useState } from "react";
import "../style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../../constant/global";

function NewEmployeeLeave() {
  const [startingTime, setStartingTime] = useState();
  const [endingTime, setEndingTime] = useState();
  const [reason, setReason] = useState();
  const [employeeId, setEmployeeId] = useState();
  const [allData, setAllData] = useState();

  const typeFunction = (type) => {
    axios.get(`${baseUrl}/api/get-employee/${type}`).then((response) => {
      setAllData(response.data);
      //console.log(response.data);
    });
  };
  const Insert = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("restaurant_id", restaurant_id);
    formData.append("emp_id", employeeId);
    formData.append("reason", reason);
    formData.append("start_time", startingTime);
    formData.append("end_time", endingTime);

    await axios
      .post(`${baseUrl}/api/leave-insert`, formData)
      .then((response) => {
        Swal.fire({
          title: response.data.msg,
          icon: "success",
          confirmButtonText: "OK",
        });
      });
  };
  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">New Employee Leave:</h4>
              <a className="btn-style btn btn-info" href="/hr/leave">
                <i class="bi bi-card-list"></i> All Leave
              </a>
            </div>
            <div className="background">
              <div className="col-sm-12 background">
                <div className="input_field two_part">
                  <div className="wid">
                    <Form.Label className="level-style">
                      Select employee type
                    </Form.Label>
                    <select
                      onChange={(event) => {
                        typeFunction(event.target.value);
                      }}
                    >
                      <option value="">Select here</option>
                      <option value="chef">Chef</option>
                      <option value="waiter">Waiter</option>
                      <option value="delivery_men">Delivery Men</option>
                      <option value="salesmarketing">Sales & Marketing</option>
                      <option value="manager">Manager</option>
                      <option value="cleaner">Cleaner</option>
                    </select>
                  </div>
                  <div className="wid">
                    <Form.Label className="level-style">
                      Select employee
                    </Form.Label>
                    <select
                      onChange={(event) => {
                        setEmployeeId(event.target.value);
                      }}
                    >
                      <option value="">Select from here...</option>
                      {allData
                        ? allData.map((data) => (
                            <option value={data.emp_id}>
                              {data.emp_id}, {data.first_name} {data.last_name}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </div>
                <div className="input_field two_part">
                  <div className="wid">
                    <Form.Label className="level-style">Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Amount"
                      onChange={(event) => {
                        setStartingTime(event.target.value);
                      }}
                    ></Form.Control>
                  </div>
                  <div className="wid">
                    <Form.Label className="level-style">End Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Price"
                      onChange={(event) => {
                        setEndingTime(event.target.value);
                      }}
                    ></Form.Control>
                  </div>
                </div>
                <div className="input_field">
                  <Form.Group>
                    <Form.Label className="level-style">
                      Reason of Leave
                    </Form.Label>
                    <Form.Control
                      className="area"
                      as="textarea"
                      placeholder="Reason of Leave"
                      rows={3}
                      onChange={(event) => {
                        setReason(event.target.value);
                      }}
                    />
                  </Form.Group>
                </div>
                <button onClick={Insert} className="btn btn-warning top-space2">
                  <i className="bi bi-save-fill"></i>Insert
                </button>
                <br></br>
                <br></br>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewEmployeeLeave;
